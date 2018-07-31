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
			<label for="filterBlur">Blur <span>{{Math.round(filter.blur * 100)}} %</span></label>
			<input type="range" v-model="filter.blur" name="filterBlur" min="0" max="1" step="0.01">
		</div>


		<div class="filter__add">
			<button @click="addFilter">hinzufügen</button>
		</div>

		<div class="filter__item" v-for="(filter, index) in filter.filters" :key="`filter-${index}`">
			<div class="filter__remove">
				<button @click="removeFilter(index)">löschen</button>
			</div>

			<div class="filter__mode">
				<label for="filterOpacity">Mode</label>
				<select name="blendingMode" v-model="filter.mode" class="filter__blending-mode">
					<option value="diff">Diff</option>
					<option value="subtract">Subtract</option>
					<option value="multiply">Multiply</option>
					<option value="screen">Screen</option>
					<option value="lighten">Lighten</option>
					<option value="darken">Darken</option>
					<option value="filter">filter</option>
					<option value="exclusion">Exclusion</option>
					<option value="tint">Tint</option>
				</select>
			</div>

			<div class="filter__color">
				<label for="filterColor">Color</label>
				<input type="color" name="filterColor" v-model="filter.color" />
			</div>

			<div class="filter__opacity">
				<label for="filterOpacity">Opacity</label>
				<input type="range" v-model="filter.opacity" name="filterOpacity" min="0" max="1" step="0.01">
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'filter-item',
  props: {
    filterPresets: Array,
    filter: Object
  },
  data() {
    return {
      selectedFilterPreset: ''
    };
  },
  methods: {
    setFilterPreset(preset) {
      if (this.selectedFilterPreset === preset.name) {
        this.$parent.filter = {
          blur: 0,
          filters: []
        };
        this.selectedFilterPreset = '';
      } else {
        this.$parent.$emit('change:filter', Object.assign({}, preset));
        this.selectedFilterPreset = preset.name;
      }
    },
    removeFilter(index) {
      this.selectedFilterPreset = '';
      this.$parent.$emit('remove:filter', index);
    },
    addFilter() {
      this.selectedFilterPreset = '';
      this.$parent.$emit('add:filter', {
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
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(3, 1fr);
    &:first-child {
      margin-top: 20px;
    }
    &:last-child {
      border-bottom: 0;
      margin-bottom: 0;
    }
  }
  &__presets,
  &__opacity,
  &__blur,
  &__color,
  &__mode {
    margin-bottom: 20px;
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
  button {
    cursor: pointer;
    width: 100%;
    background-color: #62a968;
    color: #fff;
    border: 0;
    padding: 10px;
    border-radius: 5px;
    &:hover {
      opacity: 0.8;
    }
  }
  &__add {
    margin-bottom: 20px;
  }
  &__remove {
    grid-column: 3/-1;
    button {
      background-color: #d35757;
    }
  }
  &__blur {
    grid-column: 1/-1;
  }
  &__opacity {
    input {
      width: 100%;
      margin: 0 0 15px;
    }
  }
  &__color {
    input {
      padding: 0;
      margin: 0 5% 0 0;
      border: 0;
      background-color: transparent;
      height: 25px;
      border-radius: 5px;
      display: block;
      width: 100%;
    }
  }
  &__mode {
    select {
      display: block;
    }
  }
}
</style>
