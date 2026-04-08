<template>
  <div class="min-h-screen bg-[#FAF9F6] pt-32 pb-24 md:pb-32">
    <div class="max-w-[1200px] mx-auto px-6 lg:px-10">

      <header class="text-center mb-16 py-7 animate-fade-in">
        <span class="text-[10px] uppercase tracking-[0.5em] text-[#292929] font-bold block mb-4">Zilber Fine Craftsmanship</span>
        <h1 class="font-serif  text-5xl md:text-7xl text-[#1A1A1A] mb-6 tracking-tight">Your Shopping Bag</h1>
        <div class="flex items-center justify-center gap-4">
          <div class="h-[1px] w-16 bg-black/10"></div>
          <span class="text-[10px] uppercase tracking-[0.3em] text-black/40 font-medium">
            {{ cartStore.totalItems }} {{ cartStore.totalItems === 1 ? 'Piece' : 'Pieces' }} Selected
          </span>
          <div class="h-[1px] w-16 bg-black/10"></div>
        </div>
      </header>

      <div v-if="cartStore.items.length === 0"
           class="text-center py-32 border border-black/[0.03] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.02)] animate-fade-in">
        <div class="w-20 h-20 bg-[#FAF9F6] border border-black/[0.05] flex items-center justify-center mx-auto mb-6">
          <Icon name="ph:shopping-bag-open-light" class="w-10 h-10 text-black/10" />
        </div>
        <p class="text-black/30 uppercase tracking-[0.4em] text-[10px] mb-8 font-bold">Your collection is currently empty.</p>
        <NuxtLink to="/"
                  class="group relative px-14 py-5 bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-[0.2em] inline-flex items-center gap-3 overflow-hidden transition-all hover:bg-[#2c2c2c] hover:shadow-xl">
          <span class="relative z-10">Start Exploring</span>
          <Icon name="lucide:arrow-right" class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        <div class="lg:col-span-8 space-y-6 animate-slide-up">
          <div v-for="item in cartStore.items" :key="item.id + '-' + item.size"
               class="group relative flex flex-col sm:flex-row gap-8 bg-white border border-black/[0.05] hover:border-[#D4AF37]/40 p-8 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">

            <div class="w-full sm:w-32 aspect-[3/4] bg-[#FAF9F6] overflow-hidden flex-shrink-0 border border-black/[0.03]">
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div v-else class="w-full h-full flex items-center justify-center font-serif italic text-black/5 text-2xl">Z</div>
            </div>

            <div class="flex-1 flex flex-col justify-between py-1">
              <div class="flex justify-between items-start">
                <div>
                  <span class="text-[9px] font-bold tracking-[0.4em] uppercase text-[#1f1f1f] block mb-2">Zilber Premium</span>
                  <h3 class="font-serif font-semibold text-3xl text-[#1A1A1A] mb-2 leading-none">{{ item.name }}</h3>
                  <div class="flex items-center gap-3 mt-4">
                    <span class="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A] bg-[#FAF9F6] px-3 py-1.5 border border-black/[0.05]">
                      Size: UK {{ item.size || 'N/A' }}
                    </span>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-sans text-xl font-bold text-[#1A1A1A] tracking-tighter">
                    Rs. {{ (item.price * item.quantity).toLocaleString() }}
                  </p>
                  <p class="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-medium">
                    Rs. {{ Number(item.price).toLocaleString() }} / Unit
                  </p>
                </div>
              </div>

              <div class="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-black/[0.03] mt-6">
                <div class="flex items-center border border-black/10 bg-white overflow-hidden">
                  <button @click="item.quantity > 1 ? item.quantity-- : null"
                          class="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-black hover:bg-[#FAF9F6] transition-all border-r border-black/10">
                    <Icon name="lucide:minus" class="w-3 h-3" />
                  </button>
                  <span class="w-12 text-center text-xs font-bold text-[#1A1A1A] flex items-center justify-center">
                    {{ item.quantity }}
                  </span>
                  <button @click="item.quantity++"
                          class="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-black hover:bg-[#FAF9F6] transition-all border-l border-black/10">
                    <Icon name="lucide:plus" class="w-3 h-3" />
                  </button>
                </div>

                <button @click="cartStore.removeFromCart(item.id, item.size)"
                        class="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] flex items-center gap-2 hover:text-red-600 transition-all group/btn">
                  <Icon name="ph:trash-light" class="w-4 h-4 transition-transform group-hover/btn:rotate-12" /> 
                  <span class="border-b border-transparent hover:border-red-600">Remove Item</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <aside class="lg:col-span-4 lg:sticky lg:top-32 animate-slide-up">
          <div class="bg-white border border-black/[0.06] shadow-[0_30px_60px_rgba(0,0,0,0.04)] overflow-hidden">
            
            <div class="h-1 bg-[#afa4a493]"></div>

            <div class="p-10">
              <h2 class="font-serif  text-3xl text-[#1A1A1A] mb-8">Summary</h2>

              <div class="space-y-5 mb-10">
                <div class="flex justify-between text-[11px] uppercase tracking-[0.2em] text-gray-400 font-semibold">
                  <span>Subtotal</span>
                  <span class="text-[#1A1A1A]">Rs. {{ cartStore.totalPrice.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between text-[11px] uppercase tracking-[0.2em] text-gray-400 font-semibold">
                  <span>Shipping</span>
                  <span class="text-emerald-600">Complimentary</span>
                </div>
                
                <div class="h-[1px] bg-black/[0.05] my-2"></div>

                <div class="flex justify-between items-end ">
                  <span class="font-serif  text-2xl text-[#1A1A1A]">Total Amount : </span>
                  <div class="text-right">
                    <span class="block text-2xl font-bold text-[#1A1A1A] ">
                      Rs. {{ cartStore.totalPrice.toLocaleString() }}
                    </span>
                  </div>
                </div>
              </div>

              <NuxtLink to="/checkout"
                        class="group relative w-full py-6 bg-[#1A1A1A] text-white text-[11px] font-bold uppercase tracking-[0.3em] overflow-hidden transition-all flex items-center justify-center gap-3 hover:bg-[#202020]">
                <span class="relative z-10 flex items-center gap-3">
                  Proceed to Checkout
                  <Icon name="ph:arrow-right-light" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </NuxtLink>

              <NuxtLink to="/"
                        class="mt-4 w-full py-5 border border-black/10 text-[#1A1A1A] text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#FAF9F6] transition-all flex items-center justify-center gap-2">
                Continue Selection
              </NuxtLink>

              <div class="mt-10 pt-8 border-t border-black/[0.05] grid grid-cols-3 gap-4">
                <div class="flex flex-col items-center gap-2">
                  <Icon name="ph:shield-check" class="w-5 h-5 text-[#D4AF37]" />
                  <span class="text-[8px] uppercase tracking-tighter text-gray-400 font-bold">Secure</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                  <Icon name="ph:truck" class="w-5 h-5 text-[#D4AF37]" />
                  <span class="text-[8px] uppercase tracking-tighter text-gray-400 font-bold">Express</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                  <Icon name="ph:hand-coins" class="w-5 h-5 text-[#D4AF37]" />
                  <span class="text-[8px] uppercase tracking-tighter text-gray-400 font-bold">COD</span>
                </div>
              </div>
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

onMounted(() => cartStore.loadFromStorage())

useHead({
  title: 'Your Shopping Bag | Zilber Luxury',
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,500;1,600;1,700&display=swap');

.font-serif { font-family: 'Cormorant Garamond', serif; }
.animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
.animate-slide-up { opacity: 0; animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
</style>