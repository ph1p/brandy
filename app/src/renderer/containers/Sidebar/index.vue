<template>
	<div class="sidebar">
		<div class="sidebar__sections">

			<div class="sidebar__sectionsItem">
				<div class="sidebar__sectionsItem-title" @click="arePresetsOpen = !arePresetsOpen" :class="{active: arePresetsOpen}">
					Presets
				</div>
				<div class="sidebar__sectionsItem-content" v-if="arePresetsOpen">
					<ul class="preset-list">
						<li :key="preset.title" v-for="(preset, index) in presets" :class="{active: activePreset === index}" @click="activePreset = index">
							<div class="preset-list__icon" :class="[preset.icon]">
								<img v-if="preset.icon === 'twitter'" src="~renderer/assets/img/icons/ic_twitter.svg">
								<img v-if="preset.icon === 'facebook'" src="~renderer/assets/img/icons/ic_facebook.svg">
								<img v-if="preset.icon === 'instagram'" src="~renderer/assets/img/icons/ic_instagram.svg">
							</div>
							<div class="preset-list__title">{{preset.title}}</div>
							<div class="preset-list__measurement">{{preset.width}}x{{preset.height}}</div>
						</li>
					</ul>
				</div>
			</div>

			<div class="sidebar__sectionsItem">
				<div class="sidebar__sectionsItem-title" @click="areLogosOpen = !areLogosOpen" :class="{active: areLogosOpen}">
					Logo
				</div>
				<div class="sidebar__sectionsItem-content" v-if="areLogosOpen">
					<div class="brand">

						<div class="brand__section" :class="{active: brand === 'b1w'}" @click="brand = 'b1w'">
							<img src="~renderer/assets/img/logo.svg" />
						</div>
						<div class="brand__section" :class="{active: brand === 'b2w'}" @click="brand = 'b2w'">
							<img src="~renderer/assets/img/logo2.svg" />
						</div>
						<div class="brand__section" :class="{active: brand === 'b1b'}" @click="brand = 'b1b'">
							<img src="~renderer/assets/img/logo_black.svg" />
						</div>
						<div class="brand__section" :class="{active: brand === 'b2b'}" @click="brand = 'b2b'">
							<img src="~renderer/assets/img/logo2_black.svg" />
						</div>

						<ul class="brand__directionHorizontal">
							<li @click="brandDirectionHorizontal = 'left'" :class="{active: brandDirectionHorizontal === 'left'}">
								<img src="~renderer/assets/img/icons/align_left.svg" />
							</li>
							<li @click="brandDirectionHorizontal = 'center'" :class="{active: brandDirectionHorizontal === 'center'}">
								<img src="~renderer/assets/img/icons/align_mid.svg" />
							</li>
							<li @click="brandDirectionHorizontal = 'right'" :class="{active: brandDirectionHorizontal === 'right'}">
								<img src="~renderer/assets/img/icons/align_right.svg" />
							</li>
						</ul>
						<ul class="brand__directionVertical">
							<li @click="brandDirectionVertical = 'top'" :class="{active: brandDirectionVertical === 'top'}">
								<img src="~renderer/assets/img/icons/top_align.svg" />
							</li>
							<li @click="brandDirectionVertical = 'center'" :class="{active: brandDirectionVertical === 'center'}">
								<img src="~renderer/assets/img/icons/center_align.svg" />
							</li>
							<li @click="brandDirectionVertical = 'bottom'" :class="{active: brandDirectionVertical === 'bottom'}">
								<img src="~renderer/assets/img/icons/bottom_align.svg" />
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="sidebar__sectionsItem">
				<div class="sidebar__sectionsItem-title" @click="areFiltersOpen = !areFiltersOpen" :class="{active: areFiltersOpen}">
					Filter
				</div>
				<div class="sidebar__sectionsItem-content" v-if="areFiltersOpen">

					<Filters :filter="filter" :filterPresets="filterPresets" />

				</div>
			</div>

			<div class="sidebar__sectionsItem">
				<div class="sidebar__sectionsItem-title" @click="areStrokeOptionsOpen = !areStrokeOptionsOpen" :class="{active: areStrokeOptionsOpen}">
					Stroke
				</div>
				<div class="sidebar__sectionsItem-content" v-if="areStrokeOptionsOpen">

					<label for="strokeWidth">Width</label>
					<input type="range" v-model="stroke.width" name="strokeWidth" min="0" max="20" step="1">

					<label for="strokeColor">Color</label>
					<input type="color" name="strokeColor" v-model="stroke.color" />

				</div>
			</div>


			<div class="sidebar__sectionsItem last">
				<div class="sidebar__sectionsItem-title" @click="areFontsOpen = !areFontsOpen" :class="{active: areFontsOpen}">
					Schrift
				</div>
				<div class="sidebar__sectionsItem-content" v-if="areFontsOpen">

					<div class="texts">
						<div class="texts__title">
							<ul class="texts__align">
								<li @click="textAlign = 'left';" :class="{active: textAlign === 'left'}"><img src="~renderer/assets/img/icons/text_left.svg"></li>
								<li @click="textAlign = 'center';" :class="{active: textAlign === 'center'}"><img src="~renderer/assets/img/icons/text_mid.svg"></li>
								<li @click="textAlign = 'right';" :class="{active: textAlign === 'right'}"><img src="~renderer/assets/img/icons/text.svg"></li>
							</ul>
							<input type="text" v-model="title" placeholder="Titel">
						</div>
						<div class="texts__subtitle">
							<input type="text" v-model="subtitle" placeholder="Subtitel">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="sidebar__bottom">
			<button @click="openFile" class="open-image">
			<span>Bild hinzufügen</span>
			<img src="~renderer/assets/img/icons/ic_add.svg">
		</button>
			<button @click="exportImage" class="export-image">
			<span>Bild exportieren</span>
			<img src="~renderer/assets/img/icons/ic_arrow.svg">
		</button>
		</div>
	</div>
</template>
<script>
import { remote, ipcRenderer } from 'electron';
import Filters from '../../components/Filters';

export default {
  name: 'sidebar',
  components: {
    Filters
  },
  data() {
    return {
      backgroundImage: '',
      settings: {},
      arePresetsOpen: true,
      areLogosOpen: false,
      areFiltersOpen: false,
      areFontsOpen: false,
      areStrokeOptionsOpen: false,
      brand: 'b1w',
      brandDirectionHorizontal: 'center',
      brandDirectionVertical: 'bottom',
      title: '',
      subtitle: '',
      textAlign: 'center',
      activePreset: 0,
      selectedFilterPreset: null,
      stroke: {
        color: '#ffffff',
        width: 0
      },
      filter: {
        blur: 0,
        filters: []
      }
    };
  },
  watch: {
    textProperties(value) {
      this.$parent.$emit('changeTexts', value);
    },
    logoProperties(value) {
      this.$parent.$emit('changeLogo', value);
    },
    backgroundImage(path) {
      this.$parent.$emit('changeBackground', path);
    },
    stroke: {
      deep: true,
      handler(value) {
        this.$parent.$emit('changeStroke', {
          width: parseInt(value.width, 0),
          color: value.color
        });
      }
    },
    filter: {
      deep: true,
      handler(value) {
        this.$parent.$emit('changeFilter', value);
      }
    },
    activePreset(value) {
      this.$parent.$emit('changeTexts', this.textProperties);
      this.$parent.$emit('changePreset', this.activePresetObj);
      this.$parent.$emit('changeMeasurements', {
        width: this.activePresetObj.width,
        height: this.activePresetObj.height
      });
    }
  },
  computed: {
    presets() {
      return [
        {
          icon: 'instagram',
          title: 'Instagram',
          width: 1080,
          height: 1080,
          logo: 180,
          logo2: 95,
          fontSize: 120
        },
        {
          icon: 'instagram',
          title: 'Instagram big',
          width: 1080,
          height: 1350,
          logo: 180,
          logo2: 95,
          fontSize: 120
        },
        {
          icon: 'twitter',
          title: 'Twitter header',
          width: 1500,
          height: 500,
          logo: 220,
          logo2: 95,
          fontSize: 80
        },
        {
          icon: 'twitter',
          title: 'Twitter desktop grid',
          width: 1200,
          height: 1200,
          logo: 160,
          logo2: 95,
          fontSize: 130
        },
        {
          icon: 'twitter',
          title: 'Twitter mobile grid',
          width: 1200,
          height: 675,
          logo: 160,
          logo2: 95,
          fontSize: 110
        },
        {
          icon: 'twitter',
          title: 'Twitter appcard mit Bild',
          width: 800,
          height: 320,
          logo: 120,
          logo2: 95,
          fontSize: 60
        },
        {
          icon: 'facebook',
          title: 'Facebook ad',
          width: 1200,
          height: 628,
          logo: 160,
          logo2: 95,
          fontSize: 110
        },
        {
          icon: 'facebook',
          title: 'Facebook carousel',
          width: 1080,
          height: 1080,
          logo: 180,
          logo2: 95,
          fontSize: 120
        }
      ];
    },
    filterPresets() {
      return [
        {
          name: 'spotify',
          blur: 0,
          filters: [
            {
              color: '#08b76c',
              opacity: 1,
              mode: 'multiply'
            },
            {
              color: '#0a3463',
              opacity: 1,
              mode: 'lighten'
            }
          ]
        },
        {
          name: 'law&order',
          blur: 0,
          filters: [
            // {
            //   opacity: 1,
            //   mode: 'unset'
            // },
            {
              color: '#c35655',
              opacity: 1,
              mode: 'screen'
            }
          ]
        },
        {
          name: 'dark',
          blur: 0.1,
          filters: [
            {
              color: '#EF3340',
              opacity: 1,
              mode: 'darken'
            }
          ]
        }
      ];
    },
    logoProperties() {
      return {
        brand: this.brand,
        brandDirectionHorizontal: this.brandDirectionHorizontal,
        brandDirectionVertical: this.brandDirectionVertical,
        logoSize: this.activePresetObj.logo,
        logo2Size: this.activePresetObj.logo2
      };
    },
    activePresetObj() {
      return this.presets[this.activePreset];
    },
    textProperties() {
      return {
        textAlign: this.textAlign,
        title: this.title,
        subtitle: this.subtitle,
        fontSize: this.activePresetObj.fontSize,
        width: this.activePresetObj.width,
        height: this.activePresetObj.height
      };
    }
  },
  methods: {
    exportImage() {
      const canvas = document.getElementById('canvas');
      const dataURL = canvas.toDataURL('image/png').replace(/^data:image\/png;base64,/, '');

      remote.dialog.showSaveDialog(
        {
          title: `brandy_image_${new Date().getTime()}.png`,
          showsTagField: false,
          defaultPath: `brandy_image_${new Date().getTime()}.jpg`,
          filters: [
            {
              name: `brandy_image_${new Date().getTime()}.png`,
              extensions: ['png', 'jpg']
            }
          ]
        },
        fileName => {
          if (fileName === undefined) return;

          ipcRenderer.send('compress-image', {
            image: dataURL,
            isBase64: true,
            savePath: fileName
          });

          ipcRenderer.on('compressed-image', (event, image) => {
            console.log(image);
          });
        }
      );
    },
    openFile() {
      remote.dialog.showOpenDialog(
        {
          filters: [
            {
              name: 'image',
              extensions: ['jpg', 'jpeg', 'png']
            }
          ]
        },
        fileNames => {
          if (fileNames === undefined) return;

          const fileName = fileNames[0];

          this.backgroundImage = fileName;
        }
      );
    }
  },
  mounted() {
    this.$parent.$on('loaded', () => {
      this.$parent.$emit('changeLogo', this.logoProperties);
			this.$parent.$emit('changeTexts', this.textProperties);
			console.log('changePreset');
      this.$parent.$emit('changePreset', this.activePresetObj);
      this.$parent.$emit('changeStroke', this.stroke);
      this.$parent.$emit('changeMeasurements', {
        width: this.activePresetObj.width,
        height: this.activePresetObj.height
      });
    });

    this.$on('change:filter', filter => {
      this.filter = filter;
    });

    this.$on('remove:filter', index => {
      this.filter.filters = this.filter.filters.filter((filter, i) => i !== index);
    });

    this.$on('add:filter', filter => {
      this.filter.filters = this.filter.filters.concat(filter);
    });

    document.onkeydown = event => {
      if ((event.ctrlKey || event.metaKey) && event.which == 83) {
        event.preventDefault();

        this.exportImage();
      }
      return true;
    };
  }
};
</script>
<style lang="scss" scoped>
.sidebar {
  width: 300px;
  height: 100%;
  position: relative;
  background-color: #fff;
  border-right: 1px solid $lightGrey;
  overflow: auto;
  &__sections {
    display: grid;
    grid-template-rows: repeat(4, min-content);
    position: absolute;
    height: calc(100% - 72px);
    width: 100%;
    overflow: auto;
    &:first-child {
      .sidebar__sectionsItem {
        border-top: 0;
      }
    }
    &:last-child {
      .sidebar__sectionsItem {
        border-bottom: 0;
      }
    }
    &Item {
      border-width: 0 0 1px;
      border-color: #eee;
      border-style: solid;
      &.last {
        border-bottom: 0;
      }
      &-title {
        text-transform: uppercase;
        color: lighten($mainColor, 10%);
        font-size: 11px;
        padding: 15px;
        position: relative;
        &:before {
          content: '';
          position: absolute;
          right: 15px;
          top: 18px;
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid $mainColor;
        }
        &.active {
          &:before {
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 5px solid $mainColor;
            border-top: 0;
            top: 18px;
          }
        }
      }
      &-content {
        // margin-top: 15px;
        padding: 0 15px 15px;
      }
    }

    // LOGOS
    .brand {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 10px;
      width: 100%;

      &__section {
        border: 1px solid lighten($mainColor, 35%);
        background-color: lighten($mainColor, 45%);
        border-radius: 5px;
        padding: 10px 0;
        text-align: center;
        cursor: pointer;
        &.active {
          border-color: $blue;
          box-shadow: 0 0 4px lighten($blue, 20%);
        }
        &:hover {
          border-color: $blue;
        }
        img {
          cursor: pointer;
          display: inline-block;
          align-self: center;
          width: 50%;
        }
      }
      &__directionHorizontal,
      &__directionVertical {
        grid-row: 2;
        grid-column: span 2;

        margin: 0;
        padding: 0;
        display: inline-block;
        list-style: none;
        li {
          width: 31%;
          text-align: center;
          display: inline-block;
          cursor: pointer;

          img {
            width: 11px;
            cursor: pointer;
            opacity: 0.5;
            filter: grayscale(100%);
          }
          &.active {
            img {
              opacity: 1;
              filter: grayscale(0);
            }
          }
        }
      }
      &__directionVertical {
        li {
          img {
            width: 15px;
          }
        }
      }
    }

    // PRESETS
    .preset-list {
      list-style: none;
      margin: 0 -15px -15px;
      padding: 0;
      li {
        padding: 15px;
        &.active {
          color: $blue;
        }
        &:hover {
          background-color: lighten($mainColor, 53%);
        }
        &:nth-child(even) {
          background-color: lighten($mainColor, 57%);
          &:hover {
            background-color: lighten($mainColor, 53%);
          }
        }
        &:after {
          content: '';
          clear: both;
          display: table;
        }
      }
      &__icon {
        width: 15px;
        margin-right: 7px;
        display: inline-block;
        &.twitter {
        }
        &.facebook {
          width: 7px;
          position: relative;
          bottom: -1px;
          margin-left: 4px;
          margin-right: 11px;
        }
        &.instagram {
          position: relative;
          width: 15px;
          bottom: -2px;
        }
      }
      &__title {
        display: inline-block;
        font-weight: 100;
        font-size: 12px;
      }
      &__measurement {
        display: inline-block;
        text-align: right;
        color: lighten($mainColor, 35%);
        font-size: 12px;
      }
    }

    // TEXTS
    .texts {
      margin: 20px 0;
      input {
        border-width: 0 0 1px 0;
        border-color: lighten($mainColor, 35%);
        border-style: solid;
        width: 100%;
        padding: 0 0 7px;
        font-size: 12px;
        font-weight: 100;
        &:focus {
          border-color: $blue;
        }
      }
      &__title {
        position: relative;
        input {
          padding-right: 60px;
        }
      }
      &__subtitle {
        margin-top: 15px;
      }
      &__align {
        position: absolute;
        right: 0;
        top: 0;
        list-style: none;
        margin: 0;
        padding: 0;
        li {
          display: inline-block;
          margin-left: 4px;

          img {
            width: 12px;
            cursor: pointer;
            opacity: 0.5;
            filter: grayscale(100%);
          }
          &.active {
            img {
              opacity: 1;
              filter: grayscale(0);
            }
          }
        }
      }
    }
  }
  // BOTTOM
  &__bottom {
    margin-top: auto;
    position: absolute;
    width: 100%;
    bottom: 0;
    &:after {
      content: '';
      clear: both;
      display: table;
    }
    .export-image,
    .open-image {
      display: block;
      width: 100%;
      border-width: 1px 0 0 0;
      border-style: solid;
      border-color: #eee;
      background-color: #fff;
      padding: 10px 15px;
      font-size: 12px;
      cursor: pointer;
      font-weight: bold;
      color: $mainColor;
      span {
        float: left;
      }
      img {
        float: right;
        width: 12px;
      }
      &:hover {
        background-color: lighten($mainColor, 58%);
      }
    }
    .open-image {
    }
    .export-image {
    }
  }
}
</style>
