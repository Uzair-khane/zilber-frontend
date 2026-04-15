<template>
  <div class="relative min-h-screen bg-offwhite overflow-x-hidden">
    
    <a 
      href="https://wa.me/923149535884?text=Welcome to the world of Zilber. 👞✨

Thank you for reaching out. We are thrilled to help you find the perfect pair of handcrafted Peshawari Chappals. Whether it’s for a wedding or daily luxury, our master artisans are at your service.." 
      target="_blank"
      class="fixed bottom-8 right-8 z-[100] group flex items-center gap-3 transition-all duration-500"
    >
      <span class="bg-charcoal text-white px-4 py-2 rounded-full text-sm font-bold shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 border">
        Order on WhatsApp
      </span>
      <div class="bg-[#25D366] p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-transform duration-300 border-2 border-white">
        <Icon name="logos:whatsapp-icon" class="w-8 h-8" />
      </div>
    </a>

    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-charcoal">
        <img 
          src="../assets/images/HeroImages/hero5.png" 
          alt="Zilber Hero" 
          class="w-full h-full object-cover opacity-70 scale-105 animate-slow-zoom"
        >
      </div>
      <div class="absolute inset-0 "></div>
      
     <div class="relative z-10 text-center px-4 max-w-5xl mx-auto">
  <h1 class="text-5xl sm:text-5xl md:text-6xl mt-5 lg:text-7xl font-serif text-white mb-6 tracking-tighter drop-shadow-2xl">
  Zilber The Gold Standard of Handcrafted Leather
  </h1>

  <p class="text-xl md:text-2xl text-offwhite font-light tracking-widest mb-10 max-w-3xl mx-auto opacity-90">
   Zilber brings you the legendary Charsada and Peshawari Chappal, redefined with premium leather and elite precision. Designed for those who appreciate perfection.
  </p>

  <div class="flex flex-col sm:flex-row gap-4 justify-center">
    <NuxtLink 
      to="/collections/new-arrivals" 
      class="bg-black text-white px-10 py-4 font-bold uppercase hover:bg-[#0e0d0d] transition-all duration-500 shadow-xl"
    >
      Shop the Collection
    </NuxtLink>

    <a 
      href="https://wa.me/923149535884" 
      class="border border-white/40 text-white px-10 py-4 font-bold uppercase tracking-[0.2em] hover:bg-white/10 backdrop-blur-sm transition-all duration-500"
    >
      Custom Order
    </a>
  </div>
</div>
    </section>
<div>
  <Product/>
</div>
    <section class="py-24 bg-offwhite relative">
      <div class="container mx-auto px-4 lg:px-12">
        <div class="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4 border-b border-charcoal/10 pb-6">
          <div>
            <span class="bg-gray-100 text-slate-700 rounded-md px-2 py-1 font-montserrat text-[9px] font-bold uppercase tracking-[0.2em]">Latest Heritage</span>
            <h2 class="text-5xl font-serif text-charcoal mt-2">New Arrivals</h2>
          </div>
          <NuxtLink to="/collections/new-arrivals" class="group flex items-center gap-2 text-charcoal uppercase tracking-widest text-sm font-bold">
            View All Collection
            <Icon name="lucide:arrow-right" class="group-hover:translate-x-2 transition-transform" />
          </NuxtLink>
        </div>
        
       <Swiper 
  :modules="[Navigation, Pagination, Autoplay]"
  :slides-per-view="1"
  :space-between="30"
  :autoplay="{ delay: 4000 }"
  :breakpoints="{
    '640': { slidesPerView: 2 },
    '1024': { slidesPerView: 3 },
    '1280': { slidesPerView: 4 }
  }"
  navigation
  class="w-full pb-20 custom-swiper"
>
  <SwiperSlide v-for="product in products" :key="product.id">
    <div class="group relative shadow-sm hover:shadow-2xl transition-all duration-500">
      <div class="relative overflow-hidden aspect-[3/4] mb-6">
        
        <img 
          :src="product.image" 
          alt="Product" 
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
        />
        
        <div class="absolute top-4 left-4 bg-gray-100 text-slate-700 rounded-md px-2 py-1 font-montserrat text-[9px] font-bold uppercase tracking-[0.2em]">
          New Arrival
        </div>
      </div>
    </div>
  </SwiperSlide>
</Swiper>
      </div>
    </section>

    <div><WhyChoseUs /></div>
    <div>
      <OurCustomer/>
    </div>
    <div>
      <FAQ/>
    </div>
  <div>
    <TheDiffrence/>
  </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Product from '../components/products/Product.vue'
import WhyChoseUs from '../components/WhyChoseUs.vue'
import OurCustomer from '../components/OurCustomer.vue'
import FAQ from '../components/FAQ.vue'
import hero1 from '@/assets/images/HeroImages/hero1.png'
import hero2 from '@/assets/images/HeroImages/hero2.png'
import hero3 from '@/assets/images/HeroImages/hero3.png'
import hero4 from '@/assets/images/HeroImages/hero4.png'
import hero5 from '@/assets/images/HeroImages/hero5.png'
import TheDiffrence from '../components/TheDiffrence.vue'

const products = [
  { id: 1, image: hero1 },
  { id: 2, image: hero2 },
  { id: 3, image: hero3 },
  { id: 4, image: hero4 },
  { id: 5, image: hero5 },
  { id: 6, image: hero1 },
  { id: 7, image: hero2 },
  { id: 8, image: hero3 },
  { id: 9, image: hero4 },
  { id: 10, image: hero5 },
]
</script>

<style scoped>
/* Swiper Navigation: Refined Glassmorphism & Motion */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: white;
  /* Charcoal with backdrop blur for a premium glass feel */
  background: rgba(26, 26, 26, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  /* Initial state is subtle */
  transform: scale(0.65);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover State: Gold Glow & Scale Up */
:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  /* background: #D4AF37; */
  
  color: #f1eeee;
  transform: scale(0.8);
  border-color: #ecebe8;
  box-shadow: 0 0 30px rgba(212, 175, 55, 0.3);
}

/* Pagination: Minimalist Luxury Sliders */
:deep(.swiper-pagination-bullet) {
  background: rgba(255, 255, 255, 0.3);
  opacity: 1;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.swiper-pagination-bullet-active) {
  background: #D4AF37;
  /* Elongated active state (Pill shape) */
  width: 40px !important;
  border-radius: 20px;
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);
}

/* Higher Fidelity Slow Zoom */
@keyframes slow-zoom {
  0% { 
    transform: scale(1) rotate(0deg); 
  }
  100% { 
    transform: scale(1.12) rotate(0.02deg); 
  }
}

.animate-slow-zoom {
  /* Increased duration for a more "expensive" cinematic feel */
  animation: slow-zoom 25s infinite alternate ease-in-out;
  will-change: transform;
}

/* Brand Palette Extensions */
.text-gold { color: #D4AF37; }
.bg-gold { background-color: #D4AF37; }
.bg-charcoal { background-color: #1A1A1A; }
.text-charcoal { color: #1A1A1A; }
.text-offwhite { color: #FAF9F6; }
.bg-offwhite { background-color: #FAF9F6; }

/* Adding a subtle overlay utility for Swiper images */
.swiper-overlay {
  background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(26,26,26,0.7) 100%);
}
</style>