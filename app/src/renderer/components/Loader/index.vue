<template>
	<transition name="fade">
		<div v-if="isLoading" class="loader">
			<div class="text">
				{{text}}
			</div>
		</div>
	</transition>
</template>

<script>
let animData = null;

export default {
  name: 'loader',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: 'loading...'
    }
  }
};
</script>

<style lang="scss" scoped>
.loader {
  background-color: rgba(#ffffff, 0.9);
  position: fixed;
  width: 100%;
  height: 100%;
  font-size: 1.4rem;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}
.fade-leave,
.fade-leave-to {
  opacity: 0;
}
</style>
