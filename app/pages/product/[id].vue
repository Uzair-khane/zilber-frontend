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

        <!-- Image -->
        <div class="lg:col-span-7">
          <div class="aspect-[3/4] bg-[#F7F7F7] overflow-hidden group rounded-xl border border-gray-100 shadow-sm">
            <img :src="fullImageUrl" :alt="product.name"
              class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              @error="(e) => e.target.src = '/placeholder.png'" />
          </div>
        </div>

        <!-- Details -->
        <div class="lg:col-span-5">
          <div class="lg:sticky lg:top-32">
            <span class="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] block mb-4">Pure Handcrafted
              Leather</span>

            <h1 class="text-3xl md:text-4xl font-light text-[#1A1A1A] mb-4 tracking-tight uppercase font-serif italic">
              {{ product.name }}
            </h1>

            <p class="text-2xl font-medium text-gray-900 mb-8 tracking-tighter">
              Rs. {{ Number(product.price).toLocaleString() }}.00
            </p>

            <div class="w-full h-[1px] bg-gray-100 mb-10"></div>

            <!-- Size -->
            <div class="mb-8">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-[11px] font-bold uppercase tracking-widest">Size (UK)</h3>
                <button class="text-[9px] underline text-gray-400 uppercase tracking-widest hover:text-black">Size
                  Guide</button>
              </div>
              <div class="flex flex-wrap gap-2">
                <button v-for="size in [6, 7, 8, 9, 10, 11, 12]" :key="size" @click="selectedSize = size"
                  class="w-[55px] h-[50px] border transition-all text-sm font-medium flex items-center justify-center rounded-sm"
                  :class="selectedSize === size ? 'border-black bg-black text-white shadow-lg' : 'border-gray-200 text-gray-500 hover:border-black'">
                  {{ size }}
                </button>
              </div>
              <p v-if="sizeWarning"
                class="mt-2 font-montserrat text-[10px] text-red-400 font-bold tracking-widest uppercase animate-pulse">
                Please select a size first!
              </p>
            </div>

            <!-- Quantity -->
            <div class="mb-10">
              <h3 class="text-[11px] font-bold uppercase tracking-widest mb-4">Quantity</h3>
              <div class="flex items-center w-max border border-gray-200 rounded-sm">
                <button @click="qty > 1 ? qty-- : null"
                  class="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <Icon name="lucide:minus" class="w-3.5 h-3.5" />
                </button>
                <span
                  class="w-14 text-center font-medium text-sm border-x border-gray-200 h-12 flex items-center justify-center">{{
                    qty }}</span>
                <button @click="qty++"
                  class="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <Icon name="lucide:plus" class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <!-- Buttons -->
            <div class="flex flex-col gap-3">
              <button @click="handleAddToCart"
                class="relative w-full h-16 bg-black text-white uppercase text-[11px] font-bold tracking-[0.2em] overflow-hidden transition-all active:scale-[0.98]">
                <div v-if="!cartAdded" class="flex items-center justify-center gap-3">
                  <Icon name="lucide:shopping-bag" class="w-4 h-4" /> Add to Cart
                </div>
                <div v-else class="absolute inset-0 bg-emerald-700 flex items-center justify-center gap-3">
                  <Icon name="lucide:check" class="w-4 h-4" /> Item Added!
                </div>
              </button>

              <button @click="orderOnWhatsApp"
                class="w-full h-16 border border-gray-200 flex items-center justify-center gap-3 uppercase text-[11px] font-bold tracking-[0.2em] hover:bg-gray-50 transition-all active:scale-[0.98]">
                <Icon name="logos:whatsapp-icon" class="text-xl" /> Order via WhatsApp
              </button>
            </div>

            <!-- Cart success toast -->
            <transition name="toast">
              <div v-if="cartAdded"
                class="mt-4 flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
                <p class="font-montserrat text-[10px] font-bold text-emerald-700 uppercase tracking-widest">
                  Added to cart —
                  <NuxtLink to="/cart" class="underline">View Cart</NuxtLink>
                </p>
              </div>
            </transition>

            <div class="mt-12 pt-8 border-t border-gray-100">
              <h3 class="text-[11px] font-bold uppercase tracking-widest mb-4">Product Details</h3>
              <p class="text-sm text-gray-500 leading-relaxed font-light italic">
                {{ product.description || `This exclusive Zilber piece is handcrafted with the finest materials,
                ensuring both luxury and durability for any occasion.` }}
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
      <NuxtLink to="/" class="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] underline">Return to
        Gallery</NuxtLink>
    </div>
  </div>
</template>
<script setup>
import { useCartStore } from '~/stores/cart'

const route = useRoute()
const cartStore = useCartStore()
const selectedSize = ref(null)
const qty = ref(1)
const cartAdded = ref(false)
const sizeWarning = ref(false)

// 1. Runtime Config se API URL uthayein
const config = useRuntimeConfig()
const API_URL = config.public.apiUrl.replace(/\/$/, '') // Aakhir wala slash hata deta hai

// 2. Fetch mein dynamic URL use karein
const { data: product, pending } = await useFetch(`${API_URL}/api/products/${route.params.id}`)

// 3. Full image URL ka sahi logic (localhost ko nikaal kar)
const fullImageUrl = computed(() => {
  if (!product.value?.image) return '/placeholder.png'

  // Agar image URL pehle se mukammal hai (http se shuru ho raha hai)
  if (product.value.image.startsWith('http')) return product.value.image

  // Warna API_URL ke saath join karein (extra slashes saaf karke)
  const cleanImagePath = product.value.image.replace(/^\/+/, '')
  return `${API_URL}/${cleanImagePath}`
})

const handleAddToCart = () => {
  if (!selectedSize.value) {
    sizeWarning.value = true
    setTimeout(() => sizeWarning.value = false, 2000)
    return
  }

  // Full image URL ke saath cart mein add karein
  cartStore.addToCart({
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    description: product.value.description,
    image: fullImageUrl.value
  }, selectedSize.value, qty.value)

  cartAdded.value = true
  setTimeout(() => cartAdded.value = false, 3000)
}

const orderOnWhatsApp = () => {
  if (!selectedSize.value) {
    sizeWarning.value = true
    setTimeout(() => sizeWarning.value = false, 2000)
    return
  }
  const totalPrice = Number(product.value.price) * qty.value
  const message =
    `🛍️ *NEW ZILBER ORDER*\n\n` +
    `👤 *Customer Order*\n` +
    `Product: ${product.value.name}\n` +
    `Size: UK-${selectedSize.value}\n` +
    `Quantity: ${qty.value}\n` +
    `Price: Rs. ${totalPrice.toLocaleString()}\n` +
    `Image: ${fullImageUrl.value}\n\n` +
    `_Please confirm my order. Thank you!_`

  window.open(`https://wa.me/923149535884?text=${encodeURIComponent(message)}`, '_blank')
}

onMounted(() => cartStore.loadFromStorage())
</script>

<style scoped>
.font-serif {
  font-family: 'Cormorant Garamond', serif;
}

.font-montserrat {
  font-family: 'Montserrat', sans-serif;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
```

---

## Image Flow Summary: ✅
```
Database (URL stored)
↓ getImageUrl() → Full URL banta hai
Product Listing Page
↓ fullImageUrl pass hoti hai cart mein
Product Detail Page
↓ image: fullImageUrl.value
Cart Store (localStorage)
↓ item.image = full URL
Cart Page → image dikhti hai ✅
Checkout Page → image dikhti hai ✅
WhatsApp message → image URL jata hai ✅