<template>
  <div v-if="pending" class="min-h-screen flex items-center justify-center bg-white">
    <div class="flex flex-col items-center">
      <div class="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
      <p class="mt-4 font-montserrat text-[10px] font-bold tracking-[0.4em] text-gray-400 uppercase">Zilber Loading</p>
    </div>
  </div>

  <div v-else-if="product" class="min-h-screen bg-white mt-24 md:mt-32 pb-20">
    <div class="max-w-[1300px] mx-auto px-6 lg:px-12">
      
      <nav class="flex items-center gap-2 text-[10px] uppercase tracking-[2px] text-gray-400 mb-10">
        <NuxtLink to="/" class="hover:text-black transition-colors">Home</NuxtLink>
        <span>/</span>
        <span class="text-black font-semibold">{{ product.name }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        <div class="lg:col-span-7">
          <div class="aspect-[3/4] bg-[#F7F7F7] overflow-hidden group rounded-xl border border-gray-100 shadow-sm">
            <img 
              :src="getImageUrl(product.image)" 
              :alt="product.name"
              class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              @error="(e) => e.target.src = '/placeholder.png'"
            />
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="lg:sticky lg:top-32">
            <div class="mb-4">
              <span class="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Pure Handcrafted Leather</span>
            </div>

            <h1 class="text-3xl md:text-4xl font-light text-[#1A1A1A] mb-4 tracking-tight uppercase font-serif italic">
              {{ product.name }}
            </h1>

            <p class="text-2xl font-medium text-gray-900 mb-8 tracking-tighter">
              Rs. {{ Number(product.price).toLocaleString() }}.00
            </p>

            <div class="w-full h-[1px] bg-gray-100 mb-10"></div>

            <div class="mb-8">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-[11px] font-bold uppercase tracking-widest">Size (UK)</h3>
                <button class="text-[9px] underline text-gray-400 uppercase tracking-widest hover:text-black">Size Guide</button>
              </div>
              <div class="flex flex-wrap gap-2">
                <button v-for="size in [6, 7, 8, 9, 10, 11, 12]" :key="size" 
                  @click="selectedSize = size"
                  class="w-[55px] h-[50px] border transition-all text-sm font-medium flex items-center justify-center rounded-sm"
                  :class="selectedSize === size ? 'border-black bg-black text-white shadow-lg' : 'border-gray-200 text-gray-500 hover:border-black'">
                  {{ size }}
                </button>
              </div>
            </div>

            <div class="mb-10">
              <h3 class="text-[11px] font-bold uppercase tracking-widest mb-4">Quantity</h3>
              <div class="flex items-center w-max border border-gray-200 rounded-sm">
                <button @click="qty > 1 ? qty-- : null" class="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <Icon name="lucide:minus" class="w-3.5 h-3.5" />
                </button>
                <span class="w-14 text-center font-medium text-sm border-x border-gray-200 h-12 flex items-center justify-center">
                  {{ qty }}
                </span>
                <button @click="qty++" class="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <Icon name="lucide:plus" class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div class="flex flex-col gap-3">
              <button @click="handleAddToCart" 
                class="relative w-full h-16 bg-black text-white uppercase text-[11px] font-bold tracking-[0.2em] overflow-hidden group transition-all active:scale-[0.98]">
                <div v-if="!cartAdded" class="flex items-center justify-center gap-3">
                  <Icon name="lucide:shopping-bag" class="w-4 h-4" /> Add to Cart
                </div>
                <div v-else class="flex items-center justify-center gap-3 bg-emerald-700 w-full h-full absolute inset-0">
                  <Icon name="lucide:check" class="w-4 h-4" /> Item Added
                </div>
              </button>

              <button @click="orderOnWhatsApp" 
                class="w-full h-16 border border-gray-200 flex items-center justify-center gap-3 uppercase text-[11px] font-bold tracking-[0.2em] hover:bg-gray-50 transition-all active:scale-[0.98]">
                <Icon name="logos:whatsapp-icon" class="text-xl" /> Order via WhatsApp
              </button>
            </div>

            <div class="mt-12 pt-8 border-t border-gray-100">
              <h3 class="text-[11px] font-bold uppercase tracking-widest mb-4">Product Details</h3>
              <p class="text-sm text-gray-500 leading-relaxed font-light italic">
                {{ product.description || 'This exclusive Zilber piece is handcrafted with the finest materials, ensuring both luxury and durability for any occasion.' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="min-h-screen flex items-center justify-center text-center p-6">
    <div>
      <h2 class="font-serif italic text-2xl mb-4">Masterpiece Not Found</h2>
      <NuxtLink to="/" class="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] underline">Return to Gallery</NuxtLink>
    </div>
  </div>
</template>

<script setup>
// Props/Route setup
const route = useRoute()
const selectedSize = ref(null)
const qty = ref(1)
const cartAdded = ref(false)

// 1. Fetching from your NEW Node.js Backend (Port 5000)
// useFetch automatically handles the async state
const { data: product, pending, error } = await useFetch(`http://localhost:5000/api/products/${route.params.id}`)

// 2. Image URL Helper (Matches your Admin Dashboard logic)
const getImageUrl = (path) => {
  if (!path) return '/placeholder.png'
  // Check if it's already a full URL or needs the backend prefix
  return path.startsWith('http') ? path : `http://localhost:5000/${path.replace(/^\/+/, '')}`
}

// 3. Add to Cart Logic
const handleAddToCart = () => {
  if (!selectedSize.value) {
    alert('Please select your UK size before adding to cart.')
    return
  }
  
  // Yahan aap apna Pinia store call kar saktay hain:
  // cartStore.addItem({ ...product.value, size: selectedSize.value, quantity: qty.value })
  
  cartAdded.value = true
  setTimeout(() => {
    cartAdded.value = false
  }, 2000)
}

// 4. WhatsApp Order Logic
const orderOnWhatsApp = () => {
  if (!selectedSize.value) {
    alert('Please select a size first.')
    return
  }
  
  const totalPrice = Number(product.value.price) * qty.value
  const message = `*New Order from Zilber Web*%0A%0A` +
                  `*Product:* ${product.value.name}%0A` +
                  `*Size:* UK-${selectedSize.value}%0A` +
                  `*Quantity:* ${qty.value}%0A` +
                  `*Price:* Rs. ${totalPrice.toLocaleString()}%0A%0A` +
                  `Please confirm my order. Thank you!`
  
  const whatsappNumber = "923001234567" // Apna number yahan add karein
  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300;1,400;1,600&family=Montserrat:wght@300;400;700;900&display=swap');

.font-serif {
  font-family: 'Cormorant Garamond', serif;
}

.font-montserrat {
  font-family: 'Montserrat', sans-serif;
}
</style>