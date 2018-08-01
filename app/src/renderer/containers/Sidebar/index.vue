<template>
	<div class="sidebar">
		<div class="sidebar__sections">

			<div class="sidebar__sectionsItem">
				<div class="sidebar__sectionsItem-title" @click="arePresetsOpen = !arePresetsOpen" :class="{active: arePresetsOpen}">
					Presets
				</div>
				<div class="sidebar__sectionsItem-content" v-if="arePresetsOpen">
					<ul class="preset-list">
						<li :key="presetItem.info.title" v-for="presetItem in presets" :class="{active: presetItem.info.title === preset.info.title}" @click="setCurrentPreset(presetItem)">
							<div class="preset-list__icon" :class="[presetItem.info.icon]">
								<img v-if="presetItem.info.icon === 'twitter'" src="~renderer/assets/img/icons/ic_twitter.svg">
								<img v-if="presetItem.info.icon === 'facebook'" src="~renderer/assets/img/icons/ic_facebook.svg">
								<img v-if="presetItem.info.icon === 'instagram'" src="~renderer/assets/img/icons/ic_instagram.svg">
							</div>
							<div class="preset-list__title">{{presetItem.info.title}}</div>
							<div class="preset-list__measurement">{{presetItem.measurements.width}}x{{presetItem.measurements.height}}</div>
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

						<div class="brand__color">
							<label for="logoColor">Color</label>
							<input type="color" name="logoColor" v-model="logoColor" />
						</div>

						<div class="brand__section" :class="{active: logoType === 'b1w'}" @click="logoType = 'b1w'">
							<img src="~renderer/assets/img/logo.svg" />
						</div>
						<div class="brand__section" :class="{active: logoType === 'b2w'}" @click="logoType = 'b2w'">
							<img src="~renderer/assets/img/logo2.svg" />
						</div>

						<ul class="brand__directionHorizontal">
							<li @click="logoDirectionH = 'left'" :class="{active: logoDirectionH === 'left'}">
								<img src="~renderer/assets/img/icons/align_left.svg" />
							</li>
							<li @click="logoDirectionH = 'center'" :class="{active: logoDirectionH === 'center'}">
								<img src="~renderer/assets/img/icons/align_mid.svg" />
							</li>
							<li @click="logoDirectionH = 'right'" :class="{active: logoDirectionH === 'right'}">
								<img src="~renderer/assets/img/icons/align_right.svg" />
							</li>
						</ul>
						<ul class="brand__directionVertical">
							<li @click="logoDirectionV = 'top'" :class="{active: logoDirectionV === 'top'}">
								<img src="~renderer/assets/img/icons/top_align.svg" />
							</li>
							<li @click="logoDirectionV = 'center'" :class="{active: logoDirectionV === 'center'}">
								<img src="~renderer/assets/img/icons/center_align.svg" />
							</li>
							<li @click="logoDirectionV = 'bottom'" :class="{active: logoDirectionV === 'bottom'}">
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
					<input type="range" v-model="strokeWidth" name="strokeWidth" min="0" max="20" step="1">

					<label for="strokeColor">Color</label>
					<input type="color" name="strokeColor" v-model="strokeColor" />

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
import { mapGetters, mapActions } from 'vuex';
import { remote, ipcRenderer } from 'electron';
import Filters from '../../components/Filters';

import { presets, filterPresets } from '../../presets';

export default {
  name: 'sidebar',
  components: {
    Filters
  },
  data() {
    return {
      arePresetsOpen: true,
      areLogosOpen: false,
      areFiltersOpen: false,
      areFontsOpen: false,
      areStrokeOptionsOpen: false,
      title: '',
      subtitle: '',
      activePreset: 0,
      selectedFilterPreset: null,
      filter: {
        blur: 0,
        filters: []
      },
      filterPresets,
      presets
    };
  },
  watch: {
    textProperties(value) {
      this.$parent.$emit('changeTexts', value);
    },
    filter: {
      deep: true,
      handler(value) {
        this.$parent.$emit('changeFilter', value);
      }
    }
  },
  computed: {
    ...mapGetters('canvas', ['isLoading', 'stroke', 'font', 'text', 'preset', 'logo']),
    strokeWidth: {
      get() {
        return this.stroke.width;
      },
      set(value) {
        this.setStroke({
          width: parseInt(value, 0)
        });
      }
    },
    strokeColor: {
      get() {
        return this.stroke.color;
      },
      set(value) {
        this.setStroke({
          color: value
        });
      }
    },
    logoColor: {
      get() {
        return this.logo.color;
      },
      set(value) {
        this.setLogo({
          color: value
        });
      }
		},
    logoType: {
      get() {
        return this.logo.type;
      },
      set(value) {
        this.setLogo({
          type: value
        });
      }
		},
    logoDirectionH: {
      get() {
        return this.logo.directionH;
      },
      set(value) {
        this.setLogo({
          directionH: value
        });
      }
    },
    logoDirectionV: {
      get() {
        return this.logo.directionV;
      },
      set(value) {
        this.setLogo({
          directionV: value
        });
      }
    },
    textAlign: {
      get() {
        return this.text.align;
      },
      set(value) {
        this.setText({
          align: value
        });
      }
    },
    textProperties() {
      return {
        title: this.title,
        subtitle: this.subtitle,
        fontSize: this.preset.font.size,
        width: this.preset.measurements.width,
        height: this.preset.measurements.height
      };
    }
  },
  methods: {
    ...mapActions('canvas', [
      'stopLoading',
      'startLoading',
      'setStroke',
      'setFont',
      'setText',
      'setPresetInfo',
      'setMeasurements',
			'setLogo',
			'setBackgroundPath'
    ]),
    setCurrentPreset(preset) {
      this.setPresetInfo(preset.info);
      this.setFont(preset.font);
      this.setMeasurements(preset.measurements);
    },
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

					this.setBackgroundPath(fileName);
        }
      );
    }
  },
  created() {
    if (!this.preset.info.title) {
      this.setCurrentPreset(this.presets[0]);
    }
  },
  mounted() {
    this.$parent.$on('loaded', () => {
      this.$parent.$emit('changeLogo', this.logoProperties);
      this.$parent.$emit('changeTexts', this.textProperties);
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
input[type="color"] {
	-webkit-appearance: none;
	border: none;
	width: 32px;
	height: 32px;
}
input[type="color"]::-webkit-color-swatch-wrapper {
	padding: 0;
}
input[type="color"]::-webkit-color-swatch {
	border: none;
}
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
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px;
      width: 100%;

			&__color {
				grid-column: span 2;
				label {
					font-weight: bold;
				}
			}

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
