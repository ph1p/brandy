<template>
	<div class="main-container">
		<Loader :isLoading="isLoading" :text="'Load Image...'" />

		<Sidebar v-if="background"></Sidebar>

		<div class="content" ref="contentElement" :style="{gridColumn: background ? '' : '1/-1'}">
			<div class="" v-if="!background">drag image</div>

			<div class="stage" ref="stageElement" v-show="background">
				<div class="stage-info" v-if="preset !== null && !isLoading">
					<span class="stage-info-title">{{preset.title}}</span>
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
import { fabric } from 'fabric';
import Sidebar from './Sidebar';
import Loader from '../components/Loader';

fabric.isWebglSupported(fabric.textureSize);

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

import logo from '../assets/img/logo.svg';
import logo2 from '../assets/img/logo2.svg';

import logoBlack from '../assets/img/logo_black.svg';
import logo2Black from '../assets/img/logo2_black.svg';

export default {
  name: 'main-page',
  data() {
    return {
      settings: {},
      canvas: null,
      filter: {},
      texts: {},
      logo: {},
      measurements: {},
      preset: {},
      background: ''
    };
  },
  components: {
    Sidebar,
    Loader
  },
  computed: {
    ...mapGetters('canvas', ['isLoading', 'stroke'])
  },
  methods: {
    ...mapActions('canvas', ['stopLoading', 'startLoading']),
    setImageStroke() {
      console.log('setImageStroke');
      const leftStrokeCanvas = this.canvas.getItemByName('leftStroke');
      const topStrokeCanvas = this.canvas.getItemByName('topStroke');
      const rightStrokeCanvas = this.canvas.getItemByName('rightStroke');
      const bottomStrokeCanvas = this.canvas.getItemByName('bottomStroke');

      const strokeWidth = this.stroke.width || 0;
      const strokeColor = this.stroke.color || '#ffffff';

      const height = this.canvas.getHeight();
      const width = this.canvas.getWidth();

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

        this.canvas.add(leftStroke);
        this.canvas.add(topStroke);
        this.canvas.add(rightStroke);
        this.canvas.add(bottomStroke);
      } else {
        leftStrokeCanvas.set(lines[0]);
        topStrokeCanvas.set(lines[1]);
        rightStrokeCanvas.set(lines[2]);
        bottomStrokeCanvas.set(lines[3]);
      }

      this.canvas.bringToFront(leftStrokeCanvas);
      this.canvas.bringToFront(topStrokeCanvas);
      this.canvas.bringToFront(rightStrokeCanvas);
      this.canvas.bringToFront(bottomStrokeCanvas);

      this.canvas.renderAll();
    },
    setMeasurements() {
      console.log('setMeasurements');
      const img = this.canvas.getItemByName('backgroundImage');

      if (img) {
        const { width, height } = this.measurements;
        let scaleFactor = width / img.width;

        this.canvas.setWidth(width);
        this.canvas.setHeight(height);

        if (img.width > img.height && height >= width) {
          scaleFactor = height / img.height;
        }

        img.set({
          scaleY: scaleFactor,
          scaleX: scaleFactor,
          left: width / 2,
          top: height / 2,
          originX: 'center',
          originY: 'center'
        });

        this.canvas.renderAll();
      }
    },
    setLogo() {
      let image;
      let logoSize;

      switch (this.logo.brand) {
        case 'b1w':
          image = logo;
          logoSize = this.logo.logoSize;
          break;
        case 'b2w':
          image = logo2;
          logoSize = this.logo.logo2Size;
          break;
        case 'b1b':
          image = logoBlack;
          logoSize = this.logo.logoSize;
          break;
        case 'b2b':
          image = logo2Black;
          logoSize = this.logo.logo2Size;
          break;
      }
      const logoElement = this.canvas.getItemByName('logo');

      fabric.loadSVGFromURL(image, (logoImg, options) => {
        const svg = fabric.util.groupSVGElements(logoImg, options);

        this.canvas.remove(this.canvas.getItemByName('logo'));

        svg.set('name', 'logo');

        svg.scaleToWidth(logoSize);

        this.canvas.add(svg);

        svg.top = this.canvas.getHeight() - svg.height * svg.scaleY - 40;
        svg.left = this.canvas.getWidth() / 2 - svg.width * svg.scaleX / 2;

        switch (this.logo.brandDirectionHorizontal) {
          case 'right':
            svg.left = this.canvas.getWidth() - svg.width * svg.scaleX - 50;
            break;
          case 'left':
            svg.left = 50;
            break;
        }

        switch (this.logo.brandDirectionVertical) {
          case 'top':
            svg.top = 50;
            break;
          case 'center':
            svg.top = this.canvas.getHeight() / 2 - svg.height * svg.scaleY / 2;
            break;
        }

        this.stopLoading();

        this.canvas.renderAll();
      });
    },
    setFilters() {
      const f = fabric.Image.filters;
      const img = this.canvas.getItemByName('backgroundImage');
      img.filters = [];
      if (this.filter) {
        if (this.filter.blur) {
          const blur = new fabric.Image.filters.Blur({
            blur: parseFloat(this.filter.blur)
          });
          img.filters.push(blur);
        }

        if (this.filter.filters && this.filter.filters.length > 0) {
          this.filter.filters.forEach(({ mode, opacity, color }) => {
            const filter = new fabric.Image.filters.BlendColor({
              color: color,
              alpha: parseFloat(opacity),
              mode: mode
            });
            img.filters.push(filter);
          });
        }

        img.applyFilters(img.filters);

        this.canvas.renderAll();
      }
    },
    setTexts() {
      let title;
      let subtitle;
      let subtitleFound = false;
      let titleFound = false;

      const titleObj = this.canvas.getItemByName('title');
      const subtitleObj = this.canvas.getItemByName('subtitle');

      if (titleObj) {
        if (this.texts.title === '') {
          this.canvas.remove(titleObj);
        } else {
          title = titleObj;
          titleFound = true;
        }
      }

      if (subtitleObj) {
        if (this.texts.subtitle === '') {
          this.canvas.remove(subtitleObj);
        } else {
          subtitle = subtitleObj;
          subtitleFound = true;
        }
      }

      if (this.texts.title !== '') {
        if (!titleFound) {
          title = new fabric.Text('', {
            fontFamily: 'Varela Round',
            fontSize: 120,
            fontWeight: 900,
            fill: '#fff',
            textAlign: 'center',
            hasControls: false,
            selectable: false,
            hoverCursor: 'normal'
          });
          title.set('name', 'title');

          this.canvas.add(title);
        }

        title.set({
          text: this.texts.title,
          fontSize: this.texts.fontSize
        });

        let directionTitle = this.measurements.width / 2 - title.width / 2;
        switch (this.texts.textAlign) {
          case 'right':
            directionTitle = this.measurements.width - title.width - 50;
            break;
          case 'left':
            directionTitle = 50;
            break;
        }

        title.set({
          left: directionTitle,
          textAlign: this.texts.textAlign,
          top: this.measurements.height / 2 - title.height / 2
        });
      }

      if (this.texts.subtitle !== '') {
        if (!subtitleFound) {
          subtitle = new fabric.Text('', {
            fontFamily: 'Varela Round',
            fontSize: 120 / 2,
            fontWeight: 100,
            fill: '#fff',
            textAlign: 'center',
            hasControls: false,
            selectable: false,
            hoverCursor: 'normal'
          });
          subtitle.set('name', 'subtitle');
          this.canvas.add(subtitle);
        }

        subtitle.set({
          text: this.texts.subtitle,
          fontSize: this.texts.fontSize / 2
        });

        let directionSubtitle = this.measurements.width / 2 - subtitle.width / 2;
        switch (this.texts.textAlign) {
          case 'right':
            directionSubtitle = this.measurements.width - subtitle.width - 55;
            break;
          case 'left':
            directionSubtitle = 55;
            break;
        }

        subtitle.set({
          left: directionSubtitle,
          textAlign: this.texts.textAlign,
          top: this.measurements.height / 2 - subtitle.height / 2 + ((title ? title.height : 0) - subtitle.height / 2)
        });
      }

      this.canvas.renderAll();
    },
    scaleStage() {
      const contentElement = this.$refs.contentElement;

      if (typeof contentElement !== 'undefined') {
        const scale = Math.min(
          (contentElement.offsetWidth - 100) / this.canvas.getWidth(),
          (contentElement.offsetHeight - 180) / this.canvas.getHeight()
        );

        if (scale <= 1) {
          this.$refs.stageElement.style.transform = 'scale(' + scale + ') translate(-50%, -50%)';
        }
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.scaleStage);
    this.$off('changeFilter');
    this.$off('changeTexts');
    this.$off('changeLogo');
    this.$off('changeMeasurements');
    this.$off('changePreset');
    this.$off('changeBackground');
  },
  watch: {
    texts: 'setTexts',
    logo: 'setLogo',
    filter: 'setFilters',
    stroke: {
      deep: true,
      handler() {
        this.setImageStroke();
      }
    },
    measurements: 'setMeasurements'
  },
  created() {
    ipcRenderer.on('compressed-background-image', (event, image) => {
      const blob = new Blob([image], {
        type: 'image/jpeg'
      });
      const objectURL = URL.createObjectURL(blob);

      fabric.Image.fromURL(objectURL, newImage => {
        const backgroundImage = this.canvas.getItemByName('backgroundImage');

        if (backgroundImage) {
          this.canvas.fxRemove(backgroundImage);
        }

        newImage.set('name', 'backgroundImage');

        this.canvas.setWidth(this.canvas.width);
        this.canvas.setHeight(this.canvas.width);

        newImage.set({
          hasControls: false
        });

        this.canvas.add(newImage);
        this.canvas.sendToBack(newImage);

        this.setMeasurements();
        this.scaleStage();
        this.setTexts();
        this.setFilters();
        this.setLogo();
        this.setImageStroke();

        this.canvas.renderAll();

        this.stopLoading();
      });
    });
  },
  mounted() {
    this.$store.dispatch('canvas/updateSettings', {
      backgroundPath: 'fsdfdsf'
    });

    console.log(this.$store.getters['canvas/isLoading']);

    fabric.filterBackend = new fabric.WebglFilterBackend();

    if (!this.canvas) {
      this.canvas = new fabric.Canvas(this.$refs.canvasElement, {
        controlsAboveOverlay: true,
        preserveObjectStacking: true,

        perPixelTargetFind: true,
        enableRetinaScaling: true,
        renderOnAddRemove: true
      });
      window.can = this.canvas;

      this.canvas.selection = false;
      this.canvas.setHeight(canvas.width);
      this.canvas.setWidth(canvas.height);
      this.canvas.hasBorders = false;

      this.canvas.on('object:moving', function(e) {
        var obj = e.target;
        // if object is too big ignore
        if (obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width) {
          return;
        }
        obj.setCoords();
        // top-left  corner
        if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
          obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
          obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
        }
        // bot-right corner
        if (
          obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height ||
          obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width
        ) {
          obj.top = Math.min(
            obj.top,
            obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top
          );
          obj.left = Math.min(
            obj.left,
            obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left
          );
        }
      });
    }

    this.$on('changeFilter', opt => {
      this.filter = opt;
    });

    this.$on('changeTexts', opt => {
      this.texts = opt;
    });

    this.$on('changeLogo', opt => {
      this.logo = opt;
    });

    this.$on('changeMeasurements', opt => {
      this.measurements = opt;
    });

    this.$on('changePreset', preset => {
      this.preset = preset;
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

      this.background = e.dataTransfer.files[0].path;

      this.canvas.clear();

      ipcRenderer.send('compress-image', {
        image: this.background,
        isBackground: true
      });

      this.startLoading();

      WebFont.load({
        google: {
          families: ['Varela Round']
        },
        active: () => {
          this.$emit('loaded');
        }
      });
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
