<template>
  <div class="py-12 bg-offwhite min-h-screen">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Breadcrumbs -->
      <nav class="text-sm font-medium text-gray-500 mb-8 uppercase tracking-wider">
        <NuxtLink to="/" class="hover:text-gold transition-colors">Home</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/collections/kaptan" class="hover:text-gold transition-colors">Kaptan</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-charcoal">{{ product.name }}</span>
      </nav>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Gallery Section -->
        <div>
          <!-- Main Image Swiper -->
          <Swiper
            :modules="[SwiperNavigation, SwiperThumbs]"
            :navigation="true"
            :thumbs="{ swiper: thumbsSwiper }"
            class="mb-4 aspect-square bg-gray-100 rounded-sm overflow-hidden"
          >
            <SwiperSlide v-for="(img, idx) in product.images" :key="'main-'+idx">
              <NuxtImg :src="img" alt="Product View" class="w-full h-full object-cover" />
            </SwiperSlide>
          </Swiper>
          
          <!-- Thumbnails Swiper -->
          <Swiper
            @swiper="setThumbsSwiper"
            :modules="[SwiperThumbs]"
            :slides-per-view="4"
            :space-between="16"
            watch-slides-progress
            class="thumbnail-swiper"
          >
            <SwiperSlide v-for="(img, idx) in product.images" :key="'thumb-'+idx" class="cursor-pointer opacity-50 transition-opacity">
              <div class="aspect-square bg-gray-100 rounded-sm border-2 border-transparent transition-colors">
                <NuxtImg :src="img" alt="Thumbnail" class="w-full h-full object-cover" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <!-- Product Details -->
        <div class="flex flex-col">
          <h1 class="text-4xl md:text-5xl font-serif text-charcoal mb-2">{{ product.name }}</h1>
          <p class="text-2xl text-gold font-medium mb-6">PKR {{ product.price.toLocaleString() }}</p>
          
          <div class="prose prose-sm text-gray-600 mb-8 max-w-none font-light leading-relaxed">
            <p>Experience the epitome of craftsmanship with the {{ product.name }}. Designed for the modern gentleman, this Chappal combines traditional heritage with contemporary luxury.</p>
            <ul class="list-disc pl-5 space-y-2 mt-4 text-charcoal">
              <li><span class="font-medium">Leather:</span> {{ product.leather_quality }}</li>
              <li><span class="font-medium">Sole:</span> {{ product.sole_type }}</li>
              <li><span class="font-medium">Stitching:</span> Hand-stitched with double thread</li>
            </ul>
          </div>

          <!-- Size Selection -->
          <div class="mb-8">
            <h3 class="text-sm uppercase tracking-widest font-medium mb-3">Select Size (UK)</h3>
            <div class="flex flex-wrap gap-3">
              <button 
                v-for="size in product.sizes" 
                :key="size"
                @click="selectedSize = size"
                :class="[
                  'w-12 h-12 flex items-center justify-center border font-medium transition-all duration-300',
                  selectedSize === size ? 'border-gold bg-gold text-white shadow-lg' : 'border-gray-300 text-charcoal hover:border-charcoal hover:bg-gray-100'
                ]"
              >
                {{ size }}
              </button>
            </div>
            <p v-if="!selectedSize" class="text-xs text-red-500 mt-2 font-medium">Please select a size to continue</p>
          </div>

          <div class="flex items-center space-x-4 mb-8">
            <span class="text-sm font-medium uppercase tracking-widest text-gray-500">Availability:</span>
            <span class="text-sm font-bold text-green-600 uppercase tracking-widest">In Stock</span>
          </div>

          <!-- Desktop CTA Actions -->
          <div class="hidden md:grid grid-cols-2 gap-4 mt-auto">
            <button class="bg-charcoal text-white font-medium py-4 uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-lg shadow-charcoal/20">
              Add to Cart
            </button>
            <button class="bg-[#25D366] text-white font-medium py-4 uppercase tracking-widest hover:bg-[#128C7E] transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-green-600/20">
              <Icon name="mdi:whatsapp" class="w-6 h-6" />
              <span>Order on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Sticky Mobile Actions -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 bg-white p-4 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.15)] z-40 grid grid-cols-2 gap-3 border-t border-gray-100">
      <button class="bg-charcoal text-white font-medium py-3 text-sm uppercase tracking-wider rounded-sm transition-colors shadow-lg shadow-charcoal/20">
        Add to Cart
      </button>
      <button class="bg-[#25D366] text-white font-medium py-3 text-sm uppercase tracking-wider rounded-sm flex items-center justify-center space-x-1 shadow-lg shadow-green-600/20">
        <Icon name="mdi:whatsapp" class="w-5 h-5" />
        <span>WhatsApp</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

const SwiperNavigation = Navigation
const SwiperThumbs = Thumbs
const thumbsSwiper = ref(null)

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper
}

const selectedSize = ref(null)

// Mock Data Structure matching backend
const product = ref({
  id: 1,
  name: "Zilber Signature Kaptan",
  category: "Kaptan",
  price: 9500,
  stock: 12,
  leather_quality: "Full-Grain Cowhide",
  sole_type: "Orthopedic Memory Foam",
  sizes: [7, 8, 9, 10, 11, 12],
  images: [
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1608256246200-53e65329e344?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ]
})
</script>

<style scoped>
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #D4AF37;
}

.thumbnail-swiper .swiper-slide-thumb-active {
  opacity: 1;
}
.thumbnail-swiper .swiper-slide-thumb-active div {
  border-color: #D4AF37;
}

/* Ensure mobile space for sticky bar */
@media (max-width: 768px) {
  .min-h-screen {
    padding-bottom: 80px; 
  }
}
</style>
