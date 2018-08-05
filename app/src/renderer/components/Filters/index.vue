<template>
	<div class="filter">
		<div class="filter__presets">
			<div v-for="(preset, index) in filterPresets" :key="`${preset.name}-${index}`"
			:style="{backgroundColor: preset.color}"
			:class="{active: selectedFilterPreset === preset.name}" @click="setFilterPreset(preset)">
			{{preset.name}}
			</div>
		</div>

		<div class="filter__blur">
			<label for="filterBlur">Blur <span>{{Math.round(filterBlur * 100)}} %</span></label>
			<input type="range" @input="e => setFilterBlur(e.target.value)" :value="filterBlur" name="filterBlur" min="0" max="1" step="0.01">
		</div>

		<div class="filter__add">
			<span @click="addNewFilter" v-html="feather.toSvg('plus', {width: 20, height: 20})"></span>
		</div>

		<div class="filter__item" v-for="({ mode, opacity, color }, index) in filters" :key="`filter-${index}`">

			<div class="filter__mode">
				<!-- <label for="filterOpacity">Mode</label> -->
				<select name="blendingMode" @change="e => updateFilter({ index, mode: e.target.value })" class="filter__blending-mode">
					<option v-for="option in defaultFilters" :key="option" :value="option" :selected="option === mode">{{option}}</option>
				</select>
			</div>

			<div class="filter__color">
				<!-- <label for="filterColor">Color</label> -->
				<input type="color" name="filterColor" :value="color" @change="e => updateFilter({ index, color: e.target.value })" />
			</div>

			<div class="filter__opacity">
				<!-- <label for="filterOpacity">Opacity</label> -->
				<input type="range" :value="opacity" @input="e => updateFilter({ index, opacity: e.target.value })" name="filterOpacity" min="0" max="1" step="0.01">
			</div>

			<div class="filter__remove">
				<span @click="removeFilter(index)" v-html="feather.toSvg('x', {color: '#000', width: 22, height:22})"></span>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { filterPresets } from '../../presets';

export default {
  name: 'filter-item',

  data() {
    return {
      selectedFilterPreset: '',
      defaultFilters: ['diff', 'subtract', 'multiply', 'screen', 'lighten', 'darken', 'filter', 'exclusion', 'tint'],
      filterPresets
    };
  },
  computed: {
    ...mapGetters('canvas', ['filterBlur', 'filters'])
  },
  methods: {
    ...mapActions('canvas', ['setFilterBlur', 'addFilter', 'updateFilter', 'removeFilter', 'setFilterBlur']),
    setFilterPreset(preset) {
      // if (this.selectedFilterPreset === preset.name) {
      //   this.$parent.filter = {
      //     blur: 0,
      //     filters: []
      //   };
      //   this.selectedFilterPreset = '';
      // } else {
      //   this.$parent.$emit('change:filter', Object.assign({}, preset));
      //   this.selectedFilterPreset = preset.name;
      // }

      this.setFilterBlur(preset.blur);
      preset.filters.forEach(p => this.addFilter(p));
    },
    addNewFilter() {
      this.addFilter({
        opacity: 1,
        mode: 'diff',
        color: '#ffffff'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
// filter
.filter {
  &:after {
    content: '';
    clear: both;
    display: table;
  }
  label {
    font-weight: bold;
    span {
      font-weight: normal;
    }
  }
  &__item {
    border-top: 1px solid #ddd;
    margin-top: 20px;
    padding-top: 20px;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 24px 1fr 22px;
    &:nth-child(1) {
      border-top: 1px dashed #ddd;
    }
    &:last-child {
      border-bottom: 0;
      margin-bottom: 0;
    }
  }
  &__presets {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 10px;
    div {
      width: 100%;
      height: 40px;
      border: 1px solid lighten($mainColor, 35%);
      border-radius: 5px;
      &.active {
        border-color: $blue;
        box-shadow: 0 0 4px lighten($blue, 20%);
      }
    }
  }
  &__add {
    margin: 20px 0;
    svg, span {
      cursor: pointer;
    }
    span {
      cursor: pointer;
      background-color: #62a968;
      color: #fff;
      border: 0;
      padding: 4px 5px 2px;
      border-radius: 5px;
      display: inline-block;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  &__remove {
    text-align: right;
    overflow: hidden;
    height: 18px;
    cursor: pointer;
    span {
      display: inline-block;
    }
    svg, span {
      cursor: pointer;
    }
  }
  &__blur {
    grid-column: 1/-1;
    margin-top: 20px;
  }
  &__opacity {
    input {
      width: 100%;
    }
  }
  &__color {
  }
  &__mode {
    select {
      width: 100%;
      display: block;
    }
  }
}
</style>
