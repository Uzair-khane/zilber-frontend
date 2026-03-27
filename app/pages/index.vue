<template>
  <div class="relative min-h-screen bg-offwhite overflow-x-hidden">
    
    <a 
      href="https://wa.me/923149535884?text=Salam Zilber! I'm interested in your premium Chappal collection." 
      target="_blank"
      class="fixed bottom-8 right-8 z-[100] group flex items-center gap-3 transition-all duration-500"
    >
      <span class="bg-charcoal text-gold px-4 py-2 rounded-full text-sm font-bold shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gold/30">
        Order on WhatsApp
      </span>
      <div class="bg-[#25D366] p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-transform duration-300 border-2 border-white">
        <Icon name="logos:whatsapp-icon" class="w-8 h-8 brightness-0 invert" />
      </div>
    </a>

    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-charcoal">
        <img 
          src="../assets/images/heroimage.png" 
          alt="Zilber Hero" 
          class="w-full h-full object-cover opacity-70 scale-105 animate-slow-zoom"
        >
      </div>
      <div class="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal"></div>
      
      <div class="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 class="text-6xl md:text-8xl font-serif text-gold mb-6 tracking-tighter drop-shadow-2xl">
          The Modern Artisan
        </h1>
        <p class="text-xl md:text-2xl text-offwhite font-light tracking-widest mb-10 max-w-3xl mx-auto opacity-90">
          Redefining traditional Charsada footwear with unprecedented luxury and unparalleled precision.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/collections/new-arrivals" class="bg-gold text-charcoal px-10 py-4 font-bold uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 shadow-xl">
            Explore Collection
          </NuxtLink>
          <a href="https://wa.me/923149535884" class="border border-white/40 text-white px-10 py-4 font-bold uppercase tracking-[0.2em] hover:bg-white/10 backdrop-blur-sm transition-all duration-500">
            Direct Contact
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
            <span class="text-gold uppercase tracking-[0.3em] text-xs font-bold">Latest Heritage</span>
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
          <SwiperSlide v-for="i in 6" :key="i">
            <div class="group relative bg-white p-4 shadow-sm hover:shadow-2xl transition-all duration-500">
              <div class="relative overflow-hidden aspect-[3/4] mb-6">
                <img src="../assets/images/heroimage.png" alt="Product" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div class="absolute top-4 left-4 bg-gold text-charcoal px-3 py-1 text-[10px] font-black uppercase tracking-tighter">New Arrival</div>
                
                <div class="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-4">
                  <button class="bg-white text-charcoal px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-gold transition-colors">Select Size</button>
                  <button class="bg-gold text-charcoal p-3 hover:bg-white transition-colors"><Icon name="lucide:shopping-bag" /></button>
                </div>
              </div>
              <div class="text-center">
                <h3 class="font-serif text-xl text-charcoal mb-2">Premium Kaptan Edition</h3>
                <p class="text-gold font-black tracking-widest uppercase text-sm italic">PKR 8,500</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>

    <section class="py-32 bg-charcoal text-offwhite border-t-8 border-gold relative overflow-hidden">
      <div class="absolute inset-0 opacity-5 pointer-events-none">
        <div class="absolute inset-0" style="background-image: url('https://www.transparenttextures.com/patterns/leather.png')"></div>
      </div>

      <div class="container mx-auto px-4 max-w-6xl relative z-10">
        <div class="text-center mb-20">
          <span class="text-gold uppercase tracking-[0.4em] text-xs font-bold">The Difference</span>
          <h2 class="text-5xl md:text-6xl font-serif text-gold mt-4 mb-6">The Zilber Standard</h2>
          <div class="h-1 w-24 bg-gold mx-auto"></div>
          <p class="text-gray-400 mt-8 max-w-2xl mx-auto font-light text-xl italic leading-relaxed">
            "We don't just make footwear; we preserve a 100-year-old legacy with modern comfort."
          </p>
        </div>
        
        <div class="overflow-hidden border border-gold/20 rounded-sm shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]">
          <table class="w-full text-left border-collapse bg-[#1F1F1F]">
            <thead>
              <tr class="bg-black/40">
                <th class="py-8 px-8 text-sm uppercase tracking-widest font-bold text-gray-500 w-1/3 border-b border-gold/10">Feature</th>
                <th class="py-8 px-8 text-sm uppercase tracking-widest font-bold text-gray-500 w-1/3 text-center border-b border-gold/10 border-x border-white/5">Local Market</th>
                <th class="py-8 px-8 text-lg uppercase tracking-[0.2em] font-black text-gold w-1/3 text-center border-b-2 border-gold bg-gold/5">The Zilber Way</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              <tr class="group hover:bg-white/5 transition-colors">
                <td class="py-7 px-8 font-serif text-lg">Leather Material</td>
                <td class="py-7 px-8 text-gray-500 text-center border-x border-white/5">Faux / Rexine</td>
                <td class="py-7 px-8 text-offwhite font-bold text-center bg-gold/5">A-Grade Full Grain Cowhide</td>
              </tr>
              <tr class="group hover:bg-white/5 transition-colors">
                <td class="py-7 px-8 font-serif text-lg">Insole Tech</td>
                <td class="py-7 px-8 text-gray-500 text-center border-x border-white/5">Hard Cardboard</td>
                <td class="py-7 px-8 text-offwhite font-bold text-center bg-gold/5">Ortho-Memory Foam Layer</td>
              </tr>
              <tr class="group hover:bg-white/5 transition-colors">
                <td class="py-7 px-8 font-serif text-lg">Sole Durability</td>
                <td class="py-7 px-8 text-gray-500 text-center border-x border-white/5">Recycled Rubber</td>
                <td class="py-7 px-8 text-offwhite font-bold text-center bg-gold/5">Military-Grade Tyre Sole</td>
              </tr>
              <tr class="group hover:bg-white/5 transition-colors">
                <td class="py-7 px-8 font-serif text-lg">Craftsmanship</td>
                <td class="py-7 px-8 text-gray-500 text-center border-x border-white/5">Mass Produced</td>
                <td class="py-7 px-8 text-offwhite font-bold text-center bg-gold/5">100% Hand-Stitched Artisan Work</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Product from '../components/products/Product.vue'
</script>

<style scoped>
/* Swiper Custom Styling */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #D4AF37;
  background: rgba(26, 26, 26, 0.8);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transform: scale(0.7);
  transition: all 0.3s;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background: #D4AF37;
  color: #1A1A1A;
}

:deep(.swiper-pagination-bullet-active) {
  background: #D4AF37;
  width: 30px;
  border-radius: 4px;
}

/* Animations */
@keyframes slow-zoom {
  from { transform: scale(1); }
  to { transform: scale(1.1); }
}

.animate-slow-zoom {
  animation: slow-zoom 20s infinite alternate ease-in-out;
}

/* Base Colors */
.text-gold { color: #D4AF37; }
.bg-gold { background-color: #D4AF37; }
.bg-charcoal { background-color: #1A1A1A; }
.text-charcoal { color: #1A1A1A; }
.text-offwhite { color: #FAF9F6; }
.bg-offwhite { background-color: #FAF9F6; }
</style>