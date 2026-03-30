<template>
  <div class="min-h-screen bg-[#0D0D0D] pt-32 pb-24 md:pb-32">
    <div class="max-w-[1200px] mx-auto px-6 lg:px-10">

      <!-- Header -->
      <header class="text-center mb-16 animate-fade-in">
        <span class="text-[9px] uppercase tracking-[0.5em] text-[#D4AF37] font-bold block mb-4">Zilber Fine Craftsmanship</span>
        <h1 class="font-serif italic text-5xl md:text-7xl text-white mb-6">Your Shopping Bag</h1>
        <div class="flex items-center justify-center gap-4">
          <div class="h-[1px] w-16 bg-white/10"></div>
          <span class="text-[9px] uppercase tracking-[0.3em] text-white/30">
            {{ cartStore.totalItems }} {{ cartStore.totalItems === 1 ? 'Piece' : 'Pieces' }} Selected
          </span>
          <div class="h-[1px] w-16 bg-white/10"></div>
        </div>
      </header>

      <!-- Empty State -->
      <div v-if="cartStore.items.length === 0"
           class="text-center py-32 border border-white/[0.06] rounded-2xl bg-[#111] animate-fade-in">
        <div class="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-6">
          <Icon name="ph:shopping-bag-open-light" class="w-10 h-10 text-white/10" />
        </div>
        <p class="text-white/20 uppercase tracking-[0.3em] text-[10px] mb-8">Your collection is currently empty.</p>
        <NuxtLink to="/"
                  class="group relative px-12 py-5 bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-[0.2em] inline-flex items-center gap-3 overflow-hidden transition-all hover:shadow-[0_8px_32px_rgba(212,175,55,0.3)]">
          <span class="relative z-10">Start Exploring</span>
          <Icon name="lucide:arrow-right" class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </NuxtLink>
      </div>

      <!-- Cart Items -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        <!-- Items List -->
        <div class="lg:col-span-8 space-y-4 animate-slide-up">
          <div v-for="item in cartStore.items" :key="item.id + '-' + item.size"
               class="group relative flex flex-col sm:flex-row gap-6 bg-[#111] border border-white/[0.06] hover:border-[#D4AF37]/20 p-6 rounded-2xl transition-all duration-500">

            <!-- Remove button -->
            <button @click="cartStore.removeFromCart(item.id, item.size)"
                    class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/20 hover:text-red-400 hover:border-red-400/30 transition-all opacity-0 group-hover:opacity-100">
              <Icon name="lucide:x" class="w-3.5 h-3.5" />
            </button>

            <!-- Product Image -->
            <div class="w-full sm:w-28 aspect-[3/4] bg-[#1A1A1A] overflow-hidden rounded-xl flex-shrink-0 border border-white/[0.06]">
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div v-else class="w-full h-full flex items-center justify-center font-serif italic text-white/10 text-lg">Z</div>
            </div>

            <!-- Product Info -->
            <div class="flex-1 flex flex-col justify-between py-1">
              <div class="flex justify-between items-start pr-8">
                <div>
                  <span class="font-montserrat text-[8px] font-bold tracking-[0.3em] uppercase text-[#D4AF37] block mb-1">Zilber Premium</span>
                  <h3 class="font-serif italic text-2xl text-white mb-1">{{ item.name }}</h3>
                  <div class="flex items-center gap-3 mt-2">
                    <span class="font-montserrat text-[9px] uppercase tracking-widest text-white/30 border border-white/10 px-2 py-1 rounded-md">
                      UK {{ item.size || 'N/A' }}
                    </span>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-montserrat text-lg font-black text-white tracking-tighter">
                    Rs. {{ (item.price * item.quantity).toLocaleString() }}
                  </p>
                  <p class="font-montserrat text-[9px] text-white/25 mt-1">
                    Rs. {{ Number(item.price).toLocaleString() }} each
                  </p>
                </div>
              </div>

              <div class="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/[0.05] mt-4">
                <!-- Quantity -->
                <div class="flex items-center border border-white/[0.08] rounded-xl overflow-hidden">
                  <button @click="item.quantity > 1 ? item.quantity-- : null"
                          class="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.05] transition-all">
                    <Icon name="lucide:minus" class="w-3 h-3" />
                  </button>
                  <span class="w-10 text-center font-montserrat text-xs font-bold text-white border-x border-white/[0.08] h-10 flex items-center justify-center">
                    {{ item.quantity }}
                  </span>
                  <button @click="item.quantity++"
                          class="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.05] transition-all">
                    <Icon name="lucide:plus" class="w-3 h-3" />
                  </button>
                </div>

                <!-- Remove -->
                <button @click="cartStore.removeFromCart(item.id, item.size)"
                        class="font-montserrat text-[9px] text-white/20 font-bold uppercase tracking-widest flex items-center gap-2 hover:text-red-400 transition-colors">
                  <Icon name="ph:trash-light" class="w-3.5 h-3.5" /> Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <aside class="lg:col-span-4 lg:sticky lg:top-32 animate-slide-up">
          <div class="bg-[#111] border border-white/[0.06] rounded-2xl overflow-hidden">

            <!-- Gold top line -->
            <div class="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>

            <div class="p-8">
              <h2 class="font-serif italic text-3xl text-white mb-8">Order Summary</h2>

              <div class="space-y-4 mb-8">
                <div class="flex justify-between text-[10px] uppercase tracking-widest text-white/30">
                  <span>Subtotal</span>
                  <span class="text-white font-bold">Rs. {{ cartStore.totalPrice.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between text-[10px] uppercase tracking-widest text-white/30">
                  <span>Shipping</span>
                  <span class="text-emerald-400 font-bold">FREE</span>
                </div>
                <div class="flex justify-between text-[10px] uppercase tracking-widest text-white/30">
                  <span>Tax & Duties</span>
                  <span class="text-white/50">Inclusive</span>
                </div>

                <div class="h-[1px] bg-white/[0.05] my-2"></div>

                <div class="flex justify-between items-baseline">
                  <span class="font-serif italic text-2xl text-white">Total</span>
                  <div class="text-right">
                    <span class="block font-montserrat text-2xl font-black text-[#D4AF37]">
                      Rs. {{ cartStore.totalPrice.toLocaleString() }}
                    </span>
                    <span class="font-montserrat text-[8px] text-white/20 uppercase tracking-widest">Installments Available</span>
                  </div>
                </div>
              </div>

              <NuxtLink to="/checkout"
                        class="group relative w-full py-5 bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-[0.3em] overflow-hidden transition-all hover:shadow-[0_8px_32px_rgba(212,175,55,0.3)] flex items-center justify-center gap-3 rounded-xl">
                <span class="relative z-10 flex items-center gap-3">
                  Proceed to Checkout
                  <Icon name="ph:arrow-right-light" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </NuxtLink>

              <NuxtLink to="/"
                        class="mt-3 w-full py-4 border border-white/[0.08] text-white/30 text-[10px] font-bold uppercase tracking-widest hover:border-white/20 hover:text-white/60 transition-all flex items-center justify-center gap-2 rounded-xl">
                Continue Shopping
              </NuxtLink>

              <!-- Trust badges -->
              <div class="mt-8 pt-6 border-t border-white/[0.05] flex justify-center gap-6">
                <div class="flex flex-col items-center gap-1.5">
                  <Icon name="ph:shield-check-fill" class="w-5 h-5 text-white/15" />
                  <span class="font-montserrat text-[7px] uppercase tracking-widest text-white/15">Secure</span>
                </div>
                <div class="flex flex-col items-center gap-1.5">
                  <Icon name="ph:truck-fill" class="w-5 h-5 text-white/15" />
                  <span class="font-montserrat text-[7px] uppercase tracking-widest text-white/15">Free Ship</span>
                </div>
                <div class="flex flex-col items-center gap-1.5">
                  <Icon name="ph:credit-card-fill" class="w-5 h-5 text-white/15" />
                  <span class="font-montserrat text-[7px] uppercase tracking-widest text-white/15">COD</span>
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
  title: 'Your Cart | Zilber Luxury Footwear',
})
</script>

<style scoped>
.font-serif { font-family: 'Cormorant Garamond', serif; }
.font-montserrat { font-family: 'Montserrat', sans-serif; }
.animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
.animate-slide-up { opacity: 0; animation: slideUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
</style>