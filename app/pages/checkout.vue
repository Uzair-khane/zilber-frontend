<template>
  <div class="min-h-screen bg-[#FAF9F6] pt-32 pb-20 font-sans">
    <div class="max-w-[1100px] mx-auto px-6 py-8">

      <div class="text-center mb-14 animate-fade-in">
        <span class="text-[10px] uppercase tracking-[0.5em] text-[#1f1f1f] font-bold block mb-4">
          Zilber Premium Footwear
        </span>
        <h1 class="font-serif  text-5xl md:text-6xl text-[#1A1A1A] mb-4 tracking-tight">Complete Your Order</h1>
        <p class="text-[10px] uppercase tracking-[0.3em] text-black/40 font-medium">
          Secure checkout — Cash on Delivery available
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        <div
          class="lg:col-span-7 bg-white border border-black/[0.05] shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden animate-slide-up">
          <div class="h-1 bg-[#a1a09b7a]"></div>
          <div class="p-10">
            <div class="flex items-center gap-4 mb-10">
              <div class="w-1.5 h-8 bg-[#1A1A1A]"></div>
              <h2 class="font-serif  text-3xl text-[#1A1A1A]">Shipping Details</h2>
            </div>

            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    class="text-[10px] uppercase font-bold tracking-[0.2em] text-black/40 mb-3 block text-left">Full
                    Name</label>
                  <input type="text" v-model="form.name" placeholder="Enter your full name"
                    class="w-full bg-[#FAF9F6] border border-black/10 px-5 py-4 text-xs text-black placeholder-slate-400 outline-none transition-all" />
                </div>
                <div>
                  <label
                    class="text-[10px] uppercase font-bold tracking-[0.2em] text-black/40 mb-3 block text-left">Phone
                    Number</label>
                  <input type="text" v-model="form.phone" placeholder="03xx xxxxxxx"
                    class="w-full bg-[#FAF9F6] border border-black/10 px-5 py-4 text-xs text-black placeholder-slate-400 outline-none  transition-all" />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    class="text-[10px] uppercase font-bold tracking-[0.2em] text-black/40 mb-3 block text-left">City</label>
                  <input type="text" v-model="form.city" placeholder="Your city"
                    class="w-full bg-[#FAF9F6] border border-black/10 px-5 py-4 text-xs text-black placeholder-slate-400 outline-none  transition-all" />
                </div>
                <div>
                  <label
                    class="text-[10px] uppercase font-bold tracking-[0.2em] text-black/40 mb-3 block text-left">Payment
                    Method</label>
                  <div class="flex items-center gap-3 bg-white border border-[#D4AF37]/30 px-5 py-4">
                    <Icon name="ph:money-fill" class="text-[#D4AF37] w-5 h-5" />
                    <span class="text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A]">Cash On Delivery</span>
                  </div>
                </div>
              </div>

              <div>
                <label class="text-[10px] uppercase font-bold tracking-[0.2em] text-black/40 mb-3 block text-left">Full
                  Address</label>
                <textarea v-model="form.address" rows="3" placeholder="Street, area, landmark..."
                  class="w-full bg-[#FAF9F6] border border-black/10 px-5 py-4 text-xs text-black placeholder-slate-400 outline-none  transition-all resize-none"></textarea>
              </div>

              <transition name="fade">
                <div v-if="validationError" class="flex items-center gap-3 bg-red-50 border border-red-100 px-5 py-4">
                  <Icon name="ph:warning-circle-bold" class="text-red-500 w-5 h-5" />
                  <p class="text-[10px] text-red-600 font-bold uppercase tracking-widest">Please fill in all fields
                    correctly.</p>
                </div>
              </transition>

              <transition name="fade">
                <div v-if="orderSuccess"
                  class="flex items-center gap-3 bg-emerald-50 border border-emerald-100 px-5 py-4">
                  <Icon name="ph:check-circle-fill" class="text-emerald-500 w-5 h-5" />
                  <p class="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">
                    Order #{{ orderId }} Confirmed! We'll contact you soon.
                  </p>
                </div>
              </transition>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <button @click="placeOrder('whatsapp')" :disabled="isProcessing"
                  class="group py-5 bg-[#25D366] text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-[#20bd5a] hover:shadow-lg active:scale-95 flex items-center justify-center gap-3 disabled:opacity-40">
                  <Icon name="logos:whatsapp-icon" class="brightness-0 invert w-5 h-5" />
                  Order via WhatsApp
                </button>

                <button @click="placeOrder('email')" :disabled="isProcessing"
                  class="group py-5 bg-[#1A1A1A] text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-[#2e2e2e] active:scale-95 flex items-center justify-center gap-3 disabled:opacity-40">
                  <Icon v-if="isProcessing" name="line-md:loading-twotone-loop" class="w-5 h-5 text-white" />
                  <Icon v-else name="ph:paper-plane-tilt-fill" class="w-5 h-5 text-white" />
                  {{ isProcessing ? 'Processing...' : 'Confirm via Email' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5 animate-slide-up lg:sticky lg:top-32">
          <div class="bg-white border border-black/[0.05] shadow-[0_30px_60px_rgba(0,0,0,0.03)] overflow-hidden">
            <div class="h-1 bg-black"></div>
            <div class="p-10">
              <div class="flex items-center gap-3 mb-8">
                <h2 class="font-serif text-3xl text-[#1A1A1A]">Your Selection</h2>
              </div>

              <div class="max-h-[350px] overflow-y-auto pr-2 space-y-5 custom-scrollbar mb-10">
                <div v-for="item in cartStore.items" :key="item.id + item.size"
                  class="flex gap-5 p-4 bg-[#FAF9F6] border border-black/[0.03] hover:border-[#D4AF37]/30 transition-all">
                  <div class="w-16 h-20 bg-white flex-shrink-0 border border-black/[0.05] overflow-hidden">
                    <img v-if="item.image" :src="item.image" :alt="item.name"
                      class="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500" />
                    <div v-else class="w-full h-full flex items-center justify-center font-serif italic text-black/10">Z
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <span
                      class="text-[8px] font-bold tracking-[0.4em] uppercase text-[#D4AF37] block mb-1">Premium</span>
                    <h4 class="font-serif italic text-base text-[#1A1A1A] leading-tight truncate">{{ item.name }}</h4>
                    <div class="flex items-center gap-2 mt-2">
                      <span class="text-[9px] text-black/50 font-bold uppercase tracking-widest">UK {{ item.size ||
                        'N/A' }}</span>
                      <span class="text-black/20 text-[9px]">|</span>
                      <span class="text-[9px] text-black/50 font-bold uppercase tracking-widest">Qty {{ item.quantity
                      }}</span>
                    </div>
                    <p class="text-[12px] font-bold text-[#1A1A1A] mt-2">
                      Rs. {{ (item.price * item.quantity).toLocaleString() }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="space-y-4 pt-6 border-t border-black/[0.05]">
                <div class="flex justify-between text-[11px] uppercase tracking-widest text-black/40 font-semibold">
                  <span>Subtotal</span>
                  <span class="text-[#1A1A1A]">Rs. {{ cartStore.totalPrice.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between text-[11px] uppercase tracking-widest text-black/40 font-semibold">
                  <span>Shipping</span>
                  <span class="text-emerald-600 font-bold">FREE</span>
                </div>
                <div class="h-[1px] bg-black/[0.05] my-2"></div>
                <div class="flex justify-between items-end">
                  <span class="font-serif  text-2xl text-[#1A1A1A]">Grand Total</span>
                  <span class="text-3xl font-bold text-[#1A1A1A] tracking-tighter">
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
const API_URL = config.public.apiUrl ?? 'http://72.61.124.30/api2'

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

const getFullImageUrl = (imagePath) => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http')) return imagePath
  return `${API_URL}/${imagePath.replace(/^\/+/, '')}`
}

const formatDate = () => {
  return new Date().toLocaleDateString('en-PK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const sendToWhatsApp = (generatedOrderId) => {
  try {
    const itemsMessage = cartStore.items.map((item, index) => {
      const imageUrl = getFullImageUrl(item.image)
      return (
        `${index + 1}. ${item.name}\n` +
        `   📏 Size: UK-${item.size || 'N/A'}\n` +
        `   🔢 Quantity: ${item.quantity}\n` +
        `   🏷️ Price: Rs. ${(item.price * item.quantity).toLocaleString()}` +
        (imageUrl ? `\n   🖼️ Image: ${imageUrl}` : '')
      )
    }).join('\n\n')

    const message =
      `🛍️ *NEW ZILBER ORDER #${generatedOrderId}*\n\n` +

      `👤 *Customer Details*\n` +
      `Name: ${form.value.name}\n` +
      `Phone: ${form.value.phone}\n` +
      `🏙️ City: ${form.value.city}\n` +
      `📍 Address: ${form.value.address}\n` +
      `📅 Date: ${formatDate()}\n\n` +

      `🛒 *Order Items*\n` +
      `${itemsMessage}\n\n` +

      `💰 *Grand Total:* Rs. ${cartStore.totalPrice.toLocaleString()}\n` +
      `🚚 *Shipping:* FREE\n` +
      `🧾 *Payment:* Cash on Delivery\n\n` +

      `Please confirm this order. JazakAllah! 🙏`
    const whatsappUrl = `https://wa.me/923149535884?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  } catch (error) {
    console.error('WhatsApp redirect error:', error)
  }
}

const placeOrder = async (method) => {
  if (!validateForm()) return
  isProcessing.value = true

  try {
    const res = await $fetch(API_URL + 'api/orders', {
      method: 'POST',
      body: {
        customer: form.value,
        items: cartStore.items,
        total: cartStore.totalPrice
      }
    })

    orderId.value = res.orderId
    orderSuccess.value = true

    if (method === 'whatsapp') {
      sendToWhatsApp(res.orderId)
    }

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

useHead({ title: 'Checkout | Zilber Luxury Footwear' })
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,500;1,600;1,700&display=swap');

.font-serif {
  font-family: 'Cormorant Garamond', serif;
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-slide-up {
  opacity: 0;
  animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #FAF9F6;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #D4AF37;
}
</style>