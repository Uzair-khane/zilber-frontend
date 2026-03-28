<template>
  <div class="gallery-container">
    <div 
      class="slider-viewport" 
      @mouseenter="startZoom" 
      @mouseleave="stopZoom" 
      @mousemove="onMouseMove"
    >
      <Transition name="fade-slide" mode="out-in">
        <img
          :key="activeImg"
          :src="product.images[activeImg]"
          :alt="product.name"
          class="display-img"
          :style="zoomStyle"
        />
      </Transition>

      <button class="nav-btn prev" @click="prevImg" aria-label="Previous">
        <Icon name="lucide:chevron-left" class="nav-icon" />
      </button>
      <button class="nav-btn next" @click="nextImg" aria-label="Next">
        <Icon name="lucide:chevron-right" class="nav-icon" />
      </button>
    </div>

    <div class="thumbnail-strip">
      <div 
        v-for="(img, i) in product.images" 
        :key="i"
        class="thumb-wrapper"
        :class="{ 'is-active': activeImg === i }"
        @click="activeImg = i"
      >
        <img :src="img" class="thumb-img" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const activeImg = ref(0)
const isZooming = ref(false)
const mousePos = ref({ x: 50, y: 50 })

const prevImg = () => {
  activeImg.value = (activeImg.value - 1 + props.product.images.length) % props.product.images.length
}
const nextImg = () => {
  activeImg.value = (activeImg.value + 1) % props.product.images.length
}

const startZoom = () => { isZooming.value = true }
const stopZoom = () => {
  isZooming.value = false
  mousePos.value = { x: 50, y: 50 }
}

const onMouseMove = (e) => {
  if (!isZooming.value) return
  const rect = e.currentTarget.getBoundingClientRect()
  mousePos.value = {
    x: ((e.clientX - rect.left) / rect.width) * 100,
    y: ((e.clientY - rect.top) / rect.height) * 100,
  }
}

const zoomStyle = computed(() => {
  if (!isZooming.value) return { transform: 'scale(1)' }
  return {
    transform: `scale(1.5)`,
    transformOrigin: `${mousePos.value.x}% ${mousePos.value.y}%`,
  }
})
</script>

<style scoped>
.gallery-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Viewport logic */
.slider-viewport {
  position: relative;
  aspect-ratio: 4/5;
  background: #F2EFE9;
  border-radius: 4px;
  overflow: hidden;
  cursor: zoom-in;
}

.display-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-out;
}

/* Minimalist Nav Buttons */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 10;
}

.slider-viewport:hover .nav-btn {
  opacity: 1;
}

.nav-btn:hover {
  background: #1A1A1A;
}

.nav-btn:hover .nav-icon {
  color: #D4AF37;
}

.prev { left: 0; border-radius: 0 4px 4px 0; }
.next { right: 0; border-radius: 4px 0 0 4px; }

.nav-icon {
  width: 20px;
  height: 20px;
  color: #1A1A1A;
}

/* Thumbnail Styling */
.thumbnail-strip {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scrollbar-width: none;
}

.thumbnail-strip::-webkit-scrollbar { display: none; }

.thumb-wrapper {
  flex: 0 0 70px;
  height: 85px;
  border-radius: 2px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.thumb-wrapper.is-active {
  opacity: 1;
  border-color: #D4AF37;
}

.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: scale(1.02);
}

.fade-slide-leave-to {
  opacity: 0;
}
</style>