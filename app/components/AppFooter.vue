<template>
  <footer class="bg-[#FAF9F6] text-[#1A1A1A] pt-14 pb-5 border-t border-black/5 font-sans">
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
      
      <div class="flex flex-col gap-5 lg:-mt-10">
        <div class="w-32 transition-transform duration-500 hover:scale-105">
          <img src="../assets/images/logo1.png" alt="Zilber Logo" class="w-full h-auto brightness-0 -ml-8" />
        </div>
        <p class="text-[13px] text-gray-500 leading-relaxed ">
        Zilber Real leather, handmade comfort. We bring you the original Charsadda and Peshawari Chappal with a modern touch. Quality you can feel, style that lasts.
        </p>

        <div class="flex gap-3 mt-2">
          <a href="#" class="flex items-center justify-center w-10 h-10 rounded-full border border-black/10 text-[#1A1A1A] transition-all duration-300 hover:-translate-y-1 hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white hover:shadow-lg">
            <Icon name="mdi:facebook" class="w-5 h-5" />
          </a>
          <a href="#" class="flex items-center justify-center w-10 h-10 rounded-full border border-black/10 text-[#1A1A1A] transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:border-transparent hover:text-white hover:shadow-lg">
            <Icon name="mdi:instagram" class="w-5 h-5" />
          </a>
          <a href="#" class="flex items-center justify-center w-10 h-10 rounded-full border border-black/10 text-[#1A1A1A] transition-all duration-300 hover:-translate-y-1 hover:bg-black hover:border-black hover:text-white hover:shadow-lg">
            <Icon name="ic:baseline-tiktok" class="w-5 h-5" />
          </a>
          <a href="#" class="flex items-center justify-center w-10 h-10 rounded-full border border-black/10 text-[#1A1A1A] transition-all duration-300 hover:-translate-y-1 hover:bg-[#25D366] hover:border-[#25D366] hover:text-white hover:shadow-lg">
            <Icon name="mdi:whatsapp" class="w-5 h-5" />
          </a>
        </div>
      </div>

      <div>
        <h3 class="text-[10px] tracking-[0.3em] uppercase text-[#1A1A1A] mb-6 font-extrabold">Collections</h3>
        <ul class="flex flex-col gap-3">
          <li v-for="link in ['Home', 'Kaptan Edition', 'Zalmi Series', 'New Arrivals']" :key="link">
            <NuxtLink to="#" class="relative text-[14px] text-gray-500 hover:text-black transition-colors duration-300 group inline-block">
              {{ link }}
              <span class="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="text-[10px] tracking-[0.3em] uppercase text-[#1A1A1A] mb-6 font-extrabold">Customer Care</h3>
        <ul class="flex flex-col gap-3">
          <li v-for="link in ['Track Order', 'Shipping Policy', 'FAQ']" :key="link">
            <NuxtLink to="#" class="relative text-[14px] text-gray-500 hover:text-black transition-colors duration-300 group inline-block">
              {{ link }}
              <span class="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="flex flex-col gap-4">
        <h3 class="text-[10px] tracking-[0.3em] uppercase text-[#1A1A1A] mb-6 font-extrabold">Direct Support</h3>
        <p class="text-[13px] text-gray-500 leading-relaxed">
          Message us on WhatsApp for quick support and fast checkout.
        </p>
        <button 
          @click="openWhatsApp" 
          class="flex items-center justify-center gap-2 bg-[#10db76] text-white py-3.5 px-6 rounded-[2px] text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-[#25D366] hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(37,211,102,0.2)] active:scale-95"
        >
          <Icon name="mdi:whatsapp" class="w-5 h-5" />
          Order on WhatsApp
        </button>
      </div>

    </div>

    <div class="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-black/[0.05]">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-[10px] uppercase text-center tracking-[0.2em] text-gray-400 font-medium">
          © {{ new Date().getFullYear() }} Zilber Footwear. All Rights Reserved.
        </p>
        <div class="flex gap-6 text-[10px] uppercase tracking-widest text-gray-400">
          <a href="#" class="hover:text-black transition-colors duration-300">Privacy</a>
          <a href="#" class="hover:text-black transition-colors duration-300">Terms</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const openWhatsApp = () => {
  const msg = encodeURIComponent("Hi Zilber! I want to place an order.")
  window.open(`https://wa.me/923001234567?text=${msg}`, '_blank')
}
</script>