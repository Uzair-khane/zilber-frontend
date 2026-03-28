<template>
  <div class="min-h-screen bg-[#FDFCFB] pt-32 pb-20">
    <div class="max-w-[1100px] mx-auto px-6">
      
      <div class="text-center mb-12 animate-fade-in">
        <h1 class="font-serif italic text-4xl md:text-5xl text-[#1A1A1A] mb-4">Complete Your Order</h1>
        <p class="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold">Select Your Preferred Confirmation Method</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div class="lg:col-span-7 bg-white p-8 border border-gray-100 shadow-sm rounded-sm animate-slide-up">
          <h2 class="font-serif text-2xl italic mb-8 border-b border-gray-50 pb-4">Shipping Details</h2>
          
          <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div class="space-y-2">
                <label class="text-[10px] uppercase font-bold tracking-widest text-gray-400">Full Name</label>
                <input type="text" v-model="form.name" placeholder="Your Name" 
                       class="w-full p-4 bg-[#F9F9F9] border border-transparent focus:border-black focus:bg-white transition-all outline-none text-sm">
              </div>
              <div class="space-y-2">
                <label class="text-[10px] uppercase font-bold tracking-widest text-gray-400">Phone Number</label>
                <input type="text" v-model="form.phone" placeholder="03xx xxxxxxx" 
                       class="w-full p-4 bg-[#F9F9F9] border border-transparent focus:border-black focus:bg-white transition-all outline-none text-sm">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div class="space-y-2">
                <label class="text-[10px] uppercase font-bold tracking-widest text-gray-400">City</label>
                <input type="text" v-model="form.city" placeholder="City Name" 
                       class="w-full p-4 bg-[#F9F9F9] border border-transparent focus:border-black focus:bg-white transition-all outline-none text-sm">
              </div>
              <div class="space-y-2">
                <label class="text-[10px] uppercase font-bold tracking-widest text-gray-400">Payment</label>
                <div class="p-4 bg-[#FCF9F0] border border-[#D4AF37] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                   <Icon name="ph:money-fill" /> Cash On Delivery
                </div>
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-[10px] uppercase font-bold tracking-widest text-gray-400">Shipping Address</label>
              <textarea v-model="form.address" rows="3" placeholder="Full Address..." 
                        class="w-full p-4 bg-[#F9F9F9] border border-transparent focus:border-black focus:bg-white transition-all outline-none text-sm"></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
              
              <button @click="handleEmailOrder" :disabled="isProcessing"
                      class="group relative py-5 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] overflow-hidden transition-all hover:shadow-xl active:scale-95 disabled:bg-gray-400">
                <span class="relative z-10 flex items-center justify-center gap-2">
                  <Icon v-if="isProcessing" name="line-md:loading-twotone-loop" />
                  <Icon v-else name="ph:envelope-simple-fill" />
                  {{ isProcessing ? 'Sending...' : 'Confirm Order via Email' }}
                </span>
                <div class="absolute inset-0 bg-[#1a1a1a] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>

              <button @click="sendToWhatsApp"
                      class="group relative py-5 bg-[#25D366] text-white text-[10px] font-bold uppercase tracking-[0.2em] overflow-hidden transition-all hover:shadow-xl active:scale-95 disabled:bg-opacity-50">
                <span class="relative z-10 flex items-center justify-center gap-2">
                  <Icon name="logos:whatsapp-icon" class="brightness-0 invert" />
                  Order via WhatsApp
                </span>
                <div class="absolute inset-0 bg-[#128C7E] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>

            </div>
            <p v-if="mailSuccess" class="text-center text-green-600 text-[11px] font-bold uppercase tracking-widest animate-pulse mt-4">
              ✔ Order Confirmed! We have received your order.
            </p>
          </div>
        </div>

        <div class="lg:col-span-5 animate-slide-up" style="animation-delay: 0.2s">
          <div class="bg-white p-8 border border-gray-100 shadow-sm sticky top-32 rounded-sm">
            <h2 class="font-serif text-2xl italic mb-6 border-b border-gray-50 pb-4">Your Selection</h2>
            
            <div class="max-h-[300px] overflow-y-auto mb-8 pr-2 space-y-4 custom-scrollbar">
              <div v-for="item in cartStore.items" :key="item.id + item.size" class="flex gap-4">
                <div class="w-16 h-20 bg-[#F9F9F9] flex-shrink-0">
                  <img v-if="item.image?.[0]?.url" :src="`http://localhost:1337${item.image[0].url}`" class="w-full h-full object-cover">
                </div>
                <div class="flex-1">
                  <h4 class="text-[11px] font-bold uppercase tracking-tight">{{ item.name }}</h4>
                  <p class="text-[10px] text-gray-400 uppercase mt-1">Size: {{ item.size }} | Qty: {{ item.quantity }}</p>
                  <p class="text-xs font-bold mt-1 text-black">Rs. {{ (item.price * item.quantity).toLocaleString() }}</p>
                </div>
              </div>
            </div>

            <div class="space-y-4 pt-4 border-t border-gray-100">
              <div class="flex justify-between text-[11px] uppercase tracking-widest text-gray-400">
                <span>Subtotal</span>
                <span class="text-black">Rs. {{ cartStore.totalPrice.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-[11px] uppercase tracking-widest text-gray-400">
                <span>Shipping</span>
                <span class="text-green-600 font-bold">FREE</span>
              </div>
              <div class="h-[1px] bg-gray-50 my-2"></div>
              <div class="flex justify-between items-baseline">
                <span class="font-serif text-3xl italic">Total</span>
                <span class="text-2xl font-black tracking-tighter text-[#1A1A1A]">Rs. {{ cartStore.totalPrice.toLocaleString() }}</span>
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

const form = ref({ name: '', phone: '', city: '', address: '' })
const isProcessing = ref(false)
const mailSuccess = ref(false)

// Function 1: Pure WhatsApp logic
const sendToWhatsApp = () => {
  if (!form.value.name || !form.value.phone || !form.value.address) {
    return alert('Please fill shipping details first.')
  }

  const itemsText = cartStore.items.map(item => 
    `• *${item.name}* (Size: ${item.size || 'N/A'}, Qty: ${item.quantity})`
  ).join('\n')

  const message = `*NEW ZILBER ORDER (WHATSAPP)*\n\n*Customer:* ${form.value.name}\n*Phone:* ${form.value.phone}\n*Address:* ${form.value.address}, ${form.value.city}\n\n*Items:*\n${itemsText}\n\n*Total:* Rs. ${cartStore.totalPrice.toLocaleString()}`;

  const whatsappNumber = "923149535884" 
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank')
}

// Function 2: Pure NodeMailer (Email) logic (Express Backend)
const handleEmailOrder = async () => {
  if (!form.value.name || !form.value.phone || !form.value.address) {
    return alert('Please fill shipping details first.')
  }

  isProcessing.value = true
  mailSuccess.value = false

  try {
    // Note: If you are running Express locally on port 3000, un-comment the next URL setup:
    // const apiUrl = "http://localhost:3000/api/send-email"; 
    // And comment out the relative URL below:
    const apiUrl = "/api/send-email";

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customer: form.value,
        items: cartStore.items,
        total: cartStore.totalPrice
      })
    })

    const data = await response.json()
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Email Failed")
    }

    mailSuccess.value = true
    
    // Optional: Clear form data after successful call
    // cartStore.clearCart() // if exist
  } catch (err) {
    console.error("API Error: ", err)
    alert('Failed to process email. Please try via WhatsApp.')
  } finally {
    isProcessing.value = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300;1,500;1,600&family=Plus+Jakarta+Sans:wght@300;400;600;700&display=swap');
div { font-family: 'Plus Jakarta Sans', sans-serif; }
.font-serif { font-family: 'Cormorant Garamond', serif; }
.animate-fade-in { animation: fadeIn 1s ease-out forwards; }
.animate-slide-up { opacity: 0; animation: slideUp 0.8s forwards; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.custom-scrollbar::-webkit-scrollbar { width: 3px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #000; }
</style>