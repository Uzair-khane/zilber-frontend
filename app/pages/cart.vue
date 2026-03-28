<template>
  <div class="min-h-screen bg-[#FDFCFB] pt-32 pb-24 md:pb-32">
    <div class="max-w-[1200px] mx-auto px-6 lg:px-10">
      
      <header class="text-center mb-16 space-y-4 animate-fade-in">
        <span class="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-bold">Zilber Fine Craftsmanship</span>
        <h1 class="font-serif italic text-5xl md:text-6xl text-[#1A1A1A]">Your Shopping Bag</h1>
        <div class="flex items-center justify-center gap-4">
          <div class="h-[1px] w-12 bg-gray-200"></div>
          <span class="text-[10px] uppercase tracking-widest text-gray-400">Total Items: {{ cartStore.totalItems }}</span>
          <div class="h-[1px] w-12 bg-gray-200"></div>
        </div>
      </header>

      <div v-if="cartStore.items.length === 0" class="text-center py-32 bg-white border border-dashed border-gray-200 rounded-2xl animate-fade-in">
        <div class="relative inline-block mb-8">
          <Icon name="ph:shopping-bag-open-light" class="w-20 h-20 text-gray-100" />
          <Icon name="ph:sparkle-fill" class="absolute -top-2 -right-2 text-[#D4AF37] animate-pulse" />
        </div>
        <p class="text-gray-400 uppercase tracking-[0.2em] text-[11px] mb-10">Your collection is currently empty.</p>
        <NuxtLink to="/" class="group relative px-12 py-5 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] inline-block overflow-hidden transition-all shadow-xl hover:shadow-2xl active:scale-95">
          <span class="relative z-10">Start Exploring</span>
          <div class="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div class="lg:col-span-8 space-y-6 animate-slide-up">
          <div v-for="(item, index) in cartStore.items" :key="item.id + '-' + item.size" 
               class="group relative flex flex-col sm:flex-row gap-8 bg-white p-6 md:p-8 border border-gray-50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.05)] transition-all duration-500 rounded-sm">
            
            <button @click="cartStore.removeFromCart(item.id, item.size)" 
                    class="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
              <Icon name="lucide:x" class="w-5 h-5" />
            </button>

            <div class="w-full sm:w-32 aspect-[3/4] bg-[#F9F9F9] overflow-hidden rounded-sm flex-shrink-0">
              <img v-if="item.image?.[0]?.url" 
                   :src="`http://localhost:1337${item.image[0].url}`" 
                   class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div v-else class="w-full h-full flex items-center justify-center font-serif italic text-gray-200">Zilber</div>
            </div>

            <div class="flex-1 flex flex-col justify-between py-2">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-serif text-3xl italic text-[#1A1A1A] mb-2 tracking-tight">
                    {{ item.name }}
                  </h3>
                  <p class="text-[10px] uppercase font-bold text-[#D4AF37] tracking-[0.2em] mb-4">Handmade in Pakistan</p>
                </div>
                <div class="text-right">
                  <p class="text-xl font-bold text-gray-900 tracking-tighter">Rs. {{ (item.price * item.quantity).toLocaleString() }}</p>
                </div>
              </div>

              <div class="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-gray-50">
                <div class="flex items-center gap-8">
                  <div class="space-y-1">
                    <p class="text-[9px] uppercase font-bold text-gray-400 tracking-widest">Selected Size</p>
                    <p class="text-sm font-bold">{{ item.size }}</p>
                  </div>
                  
                  <div class="space-y-1">
                    <p class="text-[9px] uppercase font-bold text-gray-400 tracking-widest text-center">Qty</p>
                    <div class="flex items-center border border-gray-100 rounded-sm overflow-hidden">
                      <button @click="item.quantity > 1 ? item.quantity-- : null" class="px-3 py-1 hover:bg-gray-50 transition">-</button>
                      <span class="px-3 py-1 text-xs font-bold border-x border-gray-100 min-w-[30px] text-center">{{ item.quantity }}</span>
                      <button @click="item.quantity++" class="px-3 py-1 hover:bg-gray-50 transition">+</button>
                    </div>
                  </div>
                </div>

                <button @click="cartStore.removeFromCart(item.id, item.size)" 
                        class="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] flex items-center gap-2 hover:text-black transition-colors">
                  <Icon name="ph:trash-light" class="w-4 h-4" /> Remove Piece
                </button>
              </div>
            </div>
          </div>
        </div>

        <aside class="lg:col-span-4 lg:sticky lg:top-32 animate-slide-up animation-delay-300">
          <div class="bg-white p-10 border border-gray-50 shadow-[0_20px_50px_rgba(0,0,0,0.04)] rounded-sm">
            <h2 class="font-serif text-3xl italic mb-10 text-[#1A1A1A]">Order Summary</h2>
            
            <div class="space-y-5 mb-10">
              <div class="flex justify-between text-[11px] uppercase tracking-widest text-gray-400">
                <span>Items Subtotal</span>
                <span class="text-black font-bold">Rs. {{ cartStore.totalPrice.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-[11px] uppercase tracking-widest text-gray-400">
                <span>Expedited Shipping</span>
                <span class="text-green-600 font-black tracking-tighter italic">FREE</span>
              </div>
              <div class="flex justify-between text-[11px] uppercase tracking-widest text-gray-400">
                <span>Tax & Duties</span>
                <span class="text-black">Inclusive</span>
              </div>
              
              <div class="h-[1px] bg-gradient-to-r from-transparent via-gray-100 to-transparent my-6"></div>
              
              <div class="flex justify-between items-baseline">
                <span class="font-serif text-3xl italic">Grand Total</span>
                <div class="text-right">
                  <span class="block text-2xl font-black tracking-tighter text-[#1A1A1A]">Rs. {{ cartStore.totalPrice.toLocaleString() }}</span>
                  <span class="text-[9px] text-gray-400 uppercase tracking-widest">Easy Monthly Installments Available</span>
                </div>
              </div>
            </div>

           <NuxtLink 
  to="/checkout" 
  class="group relative w-full py-6 bg-black text-white text-[11px] font-bold uppercase tracking-[0.3em] overflow-hidden transition-all hover:shadow-2xl active:scale-95 flex items-center justify-center"
>
  <span class="relative z-10 flex items-center justify-center gap-3">
    Proceed to Checkout <Icon name="ph:arrow-right-light" class="group-hover:translate-x-2 transition-transform" />
  </span>
  <div class="absolute inset-0 bg-[#D4AF37] -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
</NuxtLink>

            <div class="mt-8 flex justify-center gap-6 opacity-40 grayscale group-hover:grayscale-0 transition-all">
              <Icon name="ph:shield-check-fill" class="w-6 h-6" />
              <Icon name="ph:credit-card-fill" class="w-6 h-6" />
              <Icon name="ph:truck-fill" class="w-6 h-6" />
            </div>
          </div>
        </aside>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'
const cartStore = useCartStore()

// Meta for SEO & Head
useHead({
  title: 'Your Cart | Zilber Luxury Footwear',
  meta: [{ name: 'description', content: 'Review your selection of premium handcrafted Zilber shoes.' }]
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300;1,500;1,600&family=Plus+Jakarta+Sans:wght@300;400;600;700&display=swap');

div { font-family: 'Plus Jakarta Sans', sans-serif; }
.font-serif { font-family: 'Cormorant Garamond', serif; }

/* Custom Animations */
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-slide-up {
  opacity: 0;
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Glassmorphism subtle effect for mobile sticky nav if you add one */
.glass-effect {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}
</style>