<template>
  <div class="min-h-screen bg-[#0D0D0D] pt-32 pb-20">
    <div class="max-w-[1100px] mx-auto px-6">

      <div class="text-center mb-14 animate-fade-in">
        <span class="font-montserrat text-[9px] uppercase tracking-[0.5em] text-[#D4AF37] font-bold block mb-4">
          Zilber Premium Footwear
        </span>
        <h1 class="font-serif italic text-5xl md:text-6xl text-white mb-4">Complete Your Order</h1>
        <p class="font-montserrat text-[9px] uppercase tracking-[0.3em] text-white/25">
          Secure checkout — Cash on Delivery available
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        <!-- Form -->
        <div class="lg:col-span-7 bg-[#111] border border-white/[0.06] rounded-2xl overflow-hidden animate-slide-up">
          <div class="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
          <div class="p-8">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-1 h-6 rounded-full bg-[#D4AF37]"></div>
              <h2 class="font-serif italic text-2xl text-white">Shipping Details</h2>
            </div>

            <div class="space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label class="font-montserrat text-[8px] uppercase font-bold tracking-[0.3em] text-white/30 mb-2 block">Full Name</label>
                  <input type="text" v-model="form.name" placeholder="Your full name"
                    class="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 font-montserrat text-xs text-white placeholder-white/20 outline-none focus:border-[#D4AF37]/50 transition-all" />
                </div>
                <div>
                  <label class="font-montserrat text-[8px] uppercase font-bold tracking-[0.3em] text-white/30 mb-2 block">Phone Number</label>
                  <input type="text" v-model="form.phone" placeholder="03xx xxxxxxx"
                    class="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 font-montserrat text-xs text-white placeholder-white/20 outline-none focus:border-[#D4AF37]/50 transition-all" />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label class="font-montserrat text-[8px] uppercase font-bold tracking-[0.3em] text-white/30 mb-2 block">City</label>
                  <input type="text" v-model="form.city" placeholder="Your city"
                    class="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 font-montserrat text-xs text-white placeholder-white/20 outline-none focus:border-[#D4AF37]/50 transition-all" />
                </div>
                <div>
                  <label class="font-montserrat text-[8px] uppercase font-bold tracking-[0.3em] text-white/30 mb-2 block">Payment</label>
                  <div class="flex items-center gap-3 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl px-4 py-3.5">
                    <Icon name="ph:money-fill" class="text-[#D4AF37] w-4 h-4" />
                    <span class="font-montserrat text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">Cash On Delivery</span>
                  </div>
                </div>
              </div>

              <div>
                <label class="font-montserrat text-[8px] uppercase font-bold tracking-[0.3em] text-white/30 mb-2 block">Full Address</label>
                <textarea v-model="form.address" rows="3" placeholder="Street, area, landmark..."
                  class="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 font-montserrat text-xs text-white placeholder-white/20 outline-none focus:border-[#D4AF37]/50 transition-all resize-none"></textarea>
              </div>

              <!-- Validation Error -->
              <transition name="fade">
                <div v-if="validationError" class="flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                  <div class="w-2 h-2 rounded-full bg-red-400 shrink-0"></div>
                  <p class="font-montserrat text-[10px] text-red-400">Please fill in all fields before placing order.</p>
                </div>
              </transition>

              <!-- Success -->
              <transition name="fade">
                <div v-if="orderSuccess" class="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                  <div class="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <p class="font-montserrat text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                    Order #{{ orderId }} Confirmed! We'll contact you soon.
                  </p>
                </div>
              </transition>

              <!-- Buttons -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <button @click="placeOrder('whatsapp')" :disabled="isProcessing"
                  class="group py-5 bg-[#25D366] text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:shadow-[0_8px_32px_rgba(37,211,102,0.3)] active:scale-95 rounded-xl flex items-center justify-center gap-2 disabled:opacity-40">
                  <Icon name="logos:whatsapp-icon" class="brightness-0 invert w-4 h-4" />
                  Order via WhatsApp
                </button>

                <button @click="placeOrder('email')" :disabled="isProcessing"
                  class="group py-5 bg-white/[0.05] border border-white/[0.08] text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:border-white/20 active:scale-95 rounded-xl flex items-center justify-center gap-2 disabled:opacity-40">
                  <Icon v-if="isProcessing" name="line-md:loading-twotone-loop" class="w-4 h-4" />
                  <Icon v-else name="ph:envelope-simple-fill" class="w-4 h-4" />
                  {{ isProcessing ? 'Saving...' : 'Confirm via Email' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-5 animate-slide-up lg:sticky lg:top-32">
          <div class="bg-[#111] border border-white/[0.06] rounded-2xl overflow-hidden">
            <div class="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
            <div class="p-8">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-1 h-5 rounded-full bg-[#D4AF37]"></div>
                <h2 class="font-serif italic text-2xl text-white">Your Selection</h2>
              </div>

              <div class="max-h-[320px] overflow-y-auto pr-1 space-y-4 custom-scrollbar mb-8">
                <div v-for="item in cartStore.items" :key="item.id + item.size"
                  class="flex gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-colors">
                  <div class="w-16 h-20 bg-[#1A1A1A] flex-shrink-0 rounded-lg overflow-hidden border border-white/[0.06]">
                    <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex items-center justify-center font-serif italic text-white/10">Z</div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <span class="font-montserrat text-[7px] font-bold tracking-[0.3em] uppercase text-[#D4AF37] block mb-1">Zilber</span>
                    <h4 class="font-serif italic text-sm text-white leading-tight truncate">{{ item.name }}</h4>
                    <p class="font-montserrat text-[9px] text-white/25 uppercase tracking-widest mt-1">
                      UK {{ item.size || 'N/A' }} · Qty {{ item.quantity }}
                    </p>
                    <p class="font-montserrat text-xs font-black text-[#D4AF37] mt-1">
                      Rs. {{ (item.price * item.quantity).toLocaleString() }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="space-y-3 pt-4 border-t border-white/[0.05]">
                <div class="flex justify-between text-[10px] uppercase tracking-widest text-white/25">
                  <span>Subtotal</span>
                  <span class="text-white/50">Rs. {{ cartStore.totalPrice.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between text-[10px] uppercase tracking-widest text-white/25">
                  <span>Shipping</span>
                  <span class="text-emerald-400 font-bold">FREE</span>
                </div>
                <div class="h-[1px] bg-white/[0.05]"></div>
                <div class="flex justify-between items-baseline">
                  <span class="font-serif italic text-2xl text-white">Total</span>
                  <span class="font-montserrat text-2xl font-black text-[#D4AF37]">
                    Rs. {{ cartStore.totalPrice.toLocaleString() }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'
const cartStore = useCartStore()
const config = useRuntimeConfig()
const API_URL = config.public.apiUrl

const form = ref({ name: '', phone: '', city: '', address: '' })
const isProcessing = ref(false)
const orderSuccess = ref(false)
const validationError = ref(false)
const orderId = ref(null)

onMounted(() => cartStore.loadFromStorage())

const validateForm = () => {
  if (!form.value.name || !form.value.phone || !form.value.address || !form.value.city) {
    validationError.value = true
    setTimeout(() => validationError.value = false, 3000)
    return false
  }
  return true
}

// Main function — DB mein save karo + WhatsApp/Email bhejo
const placeOrder = async (method) => {
  if (!validateForm()) return
  isProcessing.value = true

  try {
    // 1. Pehle DB mein save karo
    const res = await $fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      body: {
        customer: form.value,
        items: cartStore.items,
        total: cartStore.totalPrice
      }
    })

    orderId.value = res.orderId
    orderSuccess.value = true

    // 2. WhatsApp ya Email bhejo
    if (method === 'whatsapp') {
      sendToWhatsApp()
    }

    // 3. Cart clear karo
    setTimeout(() => {
      cartStore.items = []
      cartStore.saveToStorage()
      form.value = { name: '', phone: '', city: '', address: '' }
    }, 2000)

  } catch (err) {
    console.error('Order error:', err)
    validationError.value = true
  } finally {
    isProcessing.value = false
  }
}

const sendToWhatsApp = () => {
  const itemsText = cartStore.items.map(item =>
    `• *${item.name}*\n  Size: UK-${item.size || 'N/A'} | Qty: ${item.quantity} | Rs. ${(item.price * item.quantity).toLocaleString()}`
  ).join('\n\n')

  const message =
    `🛍️ *NEW ZILBER ORDER #${orderId.value}*\n\n` +
    `👤 *Customer Details*\n` +
    `Name: ${form.value.name}\n` +
    `Phone: ${form.value.phone}\n` +
    `City: ${form.value.city}\n` +
    `Address: ${form.value.address}\n\n` +
    `📦 *Order Items*\n${itemsText}\n\n` +
    `💰 *Grand Total: Rs. ${cartStore.totalPrice.toLocaleString()}*\n` +
    `🚚 Shipping: FREE\n` +
    `💵 Payment: Cash on Delivery\n\n` +
    `_Please confirm this order. Thank you!_`

  window.open(`https://wa.me/923149535884?text=${encodeURIComponent(message)}`, '_blank')
}

useHead({ title: 'Checkout | Zilber Luxury Footwear' })
</script>

<style scoped>
.font-serif { font-family: 'Cormorant Garamond', serif; }
.font-montserrat { font-family: 'Montserrat', sans-serif; }
.animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
.animate-slide-up { opacity: 0; animation: slideUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
.fade-enter-active, .fade-leave-active { transition: all 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-6px); }
.custom-scrollbar::-webkit-scrollbar { width: 2px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 4px; }
</style>