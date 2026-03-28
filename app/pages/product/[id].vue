<template>
  <div v-if="pending" class="min-h-screen flex items-center justify-center bg-white">
    <div class="flex flex-col items-center">
      <div class="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
      <p class="mt-4 font-serif italic text-gray-400">ZILBER</p>
    </div>
  </div>

  <div v-else-if="product" class="min-h-screen bg-white mt-24 md:mt-32 pb-20">
    <div class="max-w-[1300px] mx-auto px-6 lg:px-12">
      
      <nav class="flex items-center gap-2 text-[10px] uppercase tracking-[2px] text-gray-400 mb-10">
        <NuxtLink to="/" class="hover:text-black">Home</NuxtLink>
        <span>/</span>
        <span class="text-black font-semibold">{{ product.name }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        <div class="lg:col-span-7 grid grid-cols-2 gap-3 md:gap-4">
          <div v-for="(img, idx) in displayImages" :key="idx" 
               class="aspect-[3/4] bg-[#F7F7F7] overflow-hidden group">
            <img :src="`http://localhost:1337${img.url}`" 
                 class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
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

            <p class="text-2xl font-medium text-gray-900 mb-8 tracking-tighter">Rs. {{ product.price?.toLocaleString() }}.00</p>

            <div class="w-full h-[1px] bg-gray-100 mb-10"></div>

            <div class="mb-8">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-[11px] font-bold uppercase tracking-widest">Size (UK)</h3>
                <button class="text-[9px] underline text-gray-400 uppercase tracking-widest">Size Guide</button>
              </div>
              <div class="flex flex-wrap gap-2">
                <button v-for="size in [6, 7, 8, 9, 10, 11, 12]" :key="size" 
                  @click="selectedSize = size"
                  class="w-[55px] h-[50px] border transition-all text-sm font-medium flex items-center justify-center"
                  :class="selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-500 hover:border-black'">
                  {{ size }}
                </button>
              </div>
            </div>

            <div class="mb-10">
              <h3 class="text-[11px] font-bold uppercase tracking-widest mb-4">Quantity</h3>
              <div class="flex items-center w-max border border-gray-200">
                <button @click="qty > 1 ? qty-- : null" class="w-12 h-12 flex items-center justify-center hover:bg-gray-50">
                  <Icon name="lucide:minus" class="w-4 h-4" />
                </button>
                <span class="w-14 text-center font-medium text-sm">{{ qty }}</span>
                <button @click="qty++" class="w-12 h-12 flex items-center justify-center hover:bg-gray-50 border-l border-gray-200">
                  <Icon name="lucide:plus" class="w-4 h-4" />
                </button>
              </div>
            </div>

            <div class="flex flex-col gap-3">
              <button @click="handleAddToCart" 
                class="relative w-full h-16 bg-black text-white uppercase text-[11px] font-bold tracking-[0.2em] overflow-hidden group">
                <div v-if="!cartAdded" class="flex items-center justify-center gap-3">
                  <Icon name="lucide:shopping-bag" /> Add to Cart
                </div>
                <div v-else class="flex items-center justify-center gap-3 bg-green-700 w-full h-full absolute inset-0">
                  <Icon name="lucide:check" /> Item Added
                </div>
              </button>

              <button @click="orderOnWhatsApp" 
                class="w-full h-16 border border-gray-200 flex items-center justify-center gap-3 uppercase text-[11px] font-bold tracking-[0.2em] hover:bg-gray-50 transition-colors">
                <Icon name="logos:whatsapp-icon" class="text-xl" /> Order via WhatsApp
              </button>
            </div>

            <div class="mt-12 pt-8 border-t border-gray-100">
              <p class="text-sm text-gray-500 leading-relaxed font-light italic">
                {{ product.descreption?.[0]?.children?.[0]?.text || 'Expertly crafted with premium leather for the modern gentleman.' }}
              </p>
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
const route = useRoute()

const selectedSize = ref(null)
const qty = ref(1)
const cartAdded = ref(false)

const { data: response, pending } = await useFetch(`http://localhost:1337/api/shoes/${route.params.id}?populate=*`)
const product = computed(() => response.value?.data)
const displayImages = computed(() => product.value?.image?.slice(0, 4) || [])

const handleAddToCart = () => {
  if (!selectedSize.value) return alert('Please select a size first')
  
  // Pinia Store logic call
  cartStore.addToCart(product.value, selectedSize.value, qty.value)
  
  cartAdded.value = true
  setTimeout(() => cartAdded.value = false, 2000)
}

const orderOnWhatsApp = () => {
  const msg = `Hi Zilber! I want to order:\nProduct: ${product.value.name}\nSize: ${selectedSize.value}\nQty: ${qty.value}\nTotal: Rs. ${product.value.price * qty.value}`
  window.open(`https://wa.me/923001234567?text=${encodeURIComponent(msg)}`, '_blank')
}
</script>