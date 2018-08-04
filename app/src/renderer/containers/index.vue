<template>
	<div class="main-container">
		<Loader :isLoading="isLoading" :text="'Load Image...'" />

		<Sidebar v-if="backgroundPath"></Sidebar>

		<div class="content" ref="contentElement" :style="{gridColumn: backgroundPath ? '' : '1/-1'}">
			<div class="" v-if="!backgroundPath">drag image</div>

			<div class="stage" ref="stageElement" v-show="backgroundPath">
				<div class="stage-info" v-if="preset !== null && !isLoading">
					<span class="stage-info-title">{{preset.info.title}}</span>
					<span class="stage-info-measurements">{{measurements.width}}px x {{measurements.height}}px</span>
				</div>
				<canvas v-show="!isLoading" id="canvas" ref="canvasElement"></canvas>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { ipcRenderer } from 'electron';
import FontFaceObserver from 'fontfaceobserver';
import { fabric } from 'fabric';
import Sidebar from './Sidebar';
import Loader from '../components/Loader';

let canvas = null;

fabric.isWebglSupported(fabric.textureSize);
fabric.filterBackend = new fabric.WebglFilterBackend();

// https://github.com/fabricjs/fabric.js/issues/4347
fabric.IText.prototype.set({
  _getNonTransformedDimensions() {
    // Object dimensions
    return new fabric.Point(
      this.width + (this.paddingX || this.padding),
      this.height + (this.paddingY || this.padding)
    );
  },
  _calculateCurrentDimensions() {
    // Controls dimensions
    return fabric.util.transformPoint(this._getTransformedDimensions(), this.getViewportTransform(), true);
  }
});

fabric.Canvas.prototype.getItemByName = function(name) {
  var object = null,
    objects = this.getObjects();

  for (var i = 0, len = this.size(); i < len; i++) {
    if (objects[i].name && objects[i].name === name) {
      object = objects[i];
      break;
    }
  }

  return object;
};

export default {
  name: 'main-page',
  components: {
    Sidebar,
    Loader
  },
  computed: {
    ...mapGetters('canvas', [
      'isLoading',
      'filters',
      'stroke',
      'font',
      'text',
      'measurements',
      'preset',
      'logo',
      'backgroundPath',
      'filterBlur',
      'currentLogo'
    ])
  },
  methods: {
    ...mapActions('canvas', ['stopLoading', 'startLoading', 'setBackgroundPath']),
    setImageStroke() {
      const leftStrokeCanvas = canvas.getItemByName('leftStroke');
      const topStrokeCanvas = canvas.getItemByName('topStroke');
      const rightStrokeCanvas = canvas.getItemByName('rightStroke');
      const bottomStrokeCanvas = canvas.getItemByName('bottomStroke');

      const strokeWidth = this.stroke.width || 0;
      const strokeColor = this.stroke.color || '#ffffff';

      const height = canvas.getHeight();
      const width = canvas.getWidth();

      const lines = [
        {
          left: -1,
          top: 0,
          hasControls: false,
          fill: strokeColor,
          width: strokeWidth,
          height
        },
        {
          left: -1,
          top: -1,
          hasControls: false,
          fill: strokeColor,
          height: strokeWidth,
          width
        },
        {
          left: width - strokeWidth,
          top: 0,
          hasControls: false,
          fill: strokeColor,
          width: strokeWidth,
          height
        },
        {
          left: 0,
          originX: 'left',
          originY: 'bottom',
          top: height + 1,
          hasControls: false,
          fill: strokeColor,
          height: strokeWidth,
          width: width
        }
      ];

      if (
        leftStrokeCanvas === null &&
        topStrokeCanvas === null &&
        rightStrokeCanvas === null &&
        bottomStrokeCanvas === null
      ) {
        const leftStroke = new fabric.Rect(lines[0]);
        const topStroke = new fabric.Rect(lines[1]);
        const rightStroke = new fabric.Rect(lines[2]);
        const bottomStroke = new fabric.Rect(lines[3]);

        leftStroke.set('name', 'leftStroke');
        topStroke.set('name', 'topStroke');
        rightStroke.set('name', 'rightStroke');
        bottomStroke.set('name', 'bottomStroke');

        canvas.add(leftStroke);
        canvas.add(topStroke);
        canvas.add(rightStroke);
        canvas.add(bottomStroke);
      } else {
        leftStrokeCanvas.set(lines[0]);
        topStrokeCanvas.set(lines[1]);
        rightStrokeCanvas.set(lines[2]);
        bottomStrokeCanvas.set(lines[3]);
      }

      canvas.bringToFront(leftStrokeCanvas);
      canvas.bringToFront(topStrokeCanvas);
      canvas.bringToFront(rightStrokeCanvas);
      canvas.bringToFront(bottomStrokeCanvas);

      canvas.renderAll();
    },
    setMeasurements() {
      const img = canvas.getItemByName('backgroundImage');

      if (img) {
        const { width, height } = this.measurements;
        let scaleFactor = width / img.width;

        canvas.setWidth(width);
        canvas.setHeight(height);

        if ((img.width > img.height && height >= width) || height >= width) {
          scaleFactor = height / img.height;
        }

        img.set({
          scaleY: scaleFactor,
          scaleX: scaleFactor,
          left: 0,
          top: 0
        });

        this.setLogoSettings();

        canvas.renderAll();
      }
    },
    setLogoImage() {
      // ipcRenderer.send('compress-image', {
      //   data: 'path',
      //   name: 'logo'
      // });
      const logoElement = canvas.getItemByName('logo');

      if (logoElement) {
        canvas.remove(logoElement);
      }

      if (this.currentLogo) {
        fabric.loadSVGFromString(this.currentLogo.data, (logoImg, options) => {
          let svg = fabric.util.groupSVGElements(logoImg, options);
          svg.set({
            name: 'logo',
            hasControls: true,
            selectable: true
          });

          canvas.add(svg);

          this.setLogoSettings();
        });
      }
    },
    setLogoSettings() {
      let logoSize;

      switch (this.logo.current) {
        case 'logo_appcom1':
          logoSize = this.preset.info.logo;
          break;
        case 'logo_appcom2':
          logoSize = this.preset.info.logo2;
          break;
      }

      const svg = canvas.getItemByName('logo');

      if (svg && this.logo) {
        svg.scaleToWidth(logoSize);

        let top = canvas.getHeight() - svg.height * svg.scaleY - 40;
        let left = canvas.getWidth() / 2 - svg.width * svg.scaleX / 2;

        switch (this.logo.directionH) {
          case 'right':
            left = canvas.getWidth() - svg.width * svg.scaleX - 50;
            break;
          case 'left':
            left = 50;
            break;
        }

        switch (this.logo.directionV) {
          case 'top':
            top = 50;
            break;
          case 'center':
            top = canvas.getHeight() / 2 - svg.height * svg.scaleY / 2;
            break;
        }

        svg.set({
          fill: this.logo.color,
          left,
          top
        });

        this.stopLoading();

        canvas.renderAll();
      }
    },
    setFilters() {
      const f = fabric.Image.filters;
      const img = canvas.getItemByName('backgroundImage');
      img.filters = [];
      if (this.filterBlur) {
        const blur = new fabric.Image.filters.Blur({
          blur: this.filterBlur
        });
        img.filters.push(blur);
      }

      if (this.filters) {
        if (this.filters && this.filters.length > 0) {
          this.filters.forEach(({ mode, opacity, color }) => {
            const filter = new fabric.Image.filters.BlendColor({
              color: color,
              alpha: parseFloat(opacity),
              mode: mode
            });
            img.filters.push(filter);
          });
        }

        img.applyFilters(img.filters);

        canvas.renderAll();
      }
    },
    setTexts() {
      let textObject = canvas.getItemByName('text');

      const title = this.text.title;
      const subTitle = this.text.subtitle;

      if (!textObject) {
        const textObj = new fabric.IText(`${title}\n${subTitle}`, {
          name: 'text',
          left: 0,
          top: 0,
          hasControls: false,
          selectable: false,
          hoverCursor: 'normal',
          editable: false
        });

        textObject = textObj;
        canvas.add(textObj);
      }

      textObject.set('fontFamily', 'Varela Round');

      textObject.setCoords();

      textObject.set({
        targetFindTolerance: 0,
        lineHeight: 1,
        fontSize: this.font.size,
        fill: this.font.color,
        text: `${title}\n${subTitle}`,
        padding: 50,
        textAlign: this.text.align,
        styles: {
          1: Array.from(subTitle).reduce((before, current, index) => {
            return {
              ...before,
              [index]: {
                fontSize: this.font.size / 2
              }
            };
          }, {})
        }
      });

      switch (this.text.align) {
        case 'right':
          textObject.left = canvas.width - textObject.width - textObject.padding;
          break;
        case 'left':
          textObject.left = 0;
          break;
        case 'center':
          textObject.center();
          break;
      }

      textObject.centerV();
      console.log('setFont');
      canvas.requestRenderAll();
    },
    scaleStage() {
      const contentElement = this.$refs.contentElement;

      if (typeof contentElement !== 'undefined') {
        const scale = Math.min(
          (contentElement.offsetWidth - 100) / canvas.getWidth(),
          (contentElement.offsetHeight - 180) / canvas.getHeight()
        );

        if (scale <= 1) {
          this.$refs.stageElement.style.transform = 'scale(' + scale + ') translate(-50%, -50%)';
        }
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.scaleStage);
  },
  watch: {
    filterBlur: 'setFilters',
    currentLogo: {
      deep: true,
      handler() {
        this.setLogoImage();
      }
    },
    filters: {
      deep: true,
      handler() {
        this.setFilters();
      }
    },
    backgroundPath(path) {
      if (path !== '') {
        canvas.clear();
        this.startLoading();
        ipcRenderer.send('compress-image', {
          data: path,
          name: 'background',
          type: 'buffer'
        });
      }
    },
    stroke: {
      deep: true,
      handler() {
        this.setImageStroke();
      }
    },
    text: {
      deep: true,
      handler() {
        this.setTexts();
      }
    },
    font: {
      deep: true,
      handler() {
        this.setTexts();
      }
    },
    measurements: {
      deep: true,
      handler() {
        this.setMeasurements();
      }
    },
    logo: {
      deep: true,
      handler(v) {
        this.setLogoSettings();
      }
    },
    preset: {
      deep: true,
      handler() {
        this.scaleStage();
        this.setLogoImage();
        this.setLogoSettings();
        this.setTexts();
      }
    }
  },
  created() {
    this.setBackgroundPath('');

    ipcRenderer.on('compressed-image-logo', data => {
      console.log(data);
    });

    ipcRenderer.on('compressed-image-background', (event, image) => {
      const blob = new Blob([image], {
        type: 'image/jpeg'
      });
      const objectURL = URL.createObjectURL(blob);

      fabric.Image.fromURL(objectURL, newImage => {
        const backgroundImage = canvas.getItemByName('backgroundImage');

        if (backgroundImage) {
          canvas.fxRemove(backgroundImage);
        }

        newImage.set('name', 'backgroundImage');

        canvas.setWidth(canvas.width);
        canvas.setHeight(canvas.width);

        newImage.set({
          hasControls: false
        });

        canvas.add(newImage);
        canvas.sendToBack(newImage);

        this.setMeasurements();
        this.setFilters();
        this.setLogoImage();
        this.setLogoSettings();
        this.setImageStroke();
        this.scaleStage();
        this.setTexts();

        canvas.renderAll();

        this.stopLoading();
      });
    });
  },
  mounted() {
    const font = new FontFaceObserver('Varela Round');
    font.load().then(() => {
      if (!canvas) {
        canvas = new fabric.Canvas(this.$refs.canvasElement, {
          controlsAboveOverlay: true,
          preserveObjectStacking: true,
          enableRetinaScaling: true,
          renderOnAddRemove: true
        });
        window.can = canvas;

        canvas.selection = false;
        canvas.setHeight(canvas.width);
        canvas.setWidth(canvas.height);
        canvas.hasBorders = false;

        canvas.on('object:moving', e => {
          var obj = e.target;

          let { height: objectHeight, width: objectWidth } = obj;
          let { width: canvasWidth, height: canvasHeight } = obj.canvas;

          if (obj.top > 0) {
            obj.top = 0;
          }

          if (Math.abs(obj.top) > Math.abs(canvasHeight - objectHeight * obj.scaleY)) {
            obj.top = canvasHeight - objectHeight * obj.scaleY;
          }

          if (obj.left > 0 || objectWidth * obj.scaleX === canvasWidth) {
            obj.left = 0;
          }

          if (Math.abs(obj.left) > Math.abs(canvasWidth - objectWidth * obj.scaleX)) {
            obj.left = canvasWidth - objectWidth * obj.scaleX;
          }
        });
      }
    });

    // SCALE
    window.addEventListener('resize', this.scaleStage);

    // DRAG & DROP
    document.ondragover = () => {
      return false;
    };

    document.ondragleave = () => {
      return false;
    };

    document.ondragend = () => {
      this.startLoading();
      return false;
    };

    document.ondrop = e => {
      e.preventDefault();
      e.stopPropagation();

      this.setBackgroundPath(e.dataTransfer.files[0].path);
    };
  }
};
</script>

<style scoped lang="scss">
.main-container {
  height: 100%;
  height: 100%;
  flex-direction: row;
  display: grid;
  grid-template-columns: 300px 1fr;
  .content {
    background-color: $bgColor;
    position: relative;
    .stage-info {
      position: absolute;
      width: 100%;
      top: -25px;
      transform: scale(1);
      &-title {
        float: left;
      }
      &-measurements {
        float: right;
      }
    }
    .stage {
      margin: 0 auto;
      position: absolute;
      top: 50%;
      left: 50%;
      box-shadow: 0 20px 50px rgba($mainColor, 0.2);
      background-color: #ddd;
      transform-origin: 0 0;
      &__canvas {
        margin: 0 auto;
      }
      .canvas-container {
        display: block;
        transform-origin: 0 0;
      }
    }
  }
}
</style>
