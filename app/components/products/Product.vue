<template>
  <div class="page-wrap bg-[#FAF9F6] min-h-screen py-16 pb-32">
    <div class="container max-w-[1600px] mx-auto px-4 md:px-12 lg:px-20">

      <div class="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-12 mb-20 border-b border-black/5 pb-12">
        <div class="header-left">
          <p class="font-montserrat text-[11px] font-black tracking-[0.5em] uppercase text-slate-800 mb-4">
            Legacy of Peshawar
          </p>
          <h2 class=" font-medium text-2xl md:text-5xl text-[#1A1A1A] tracking-tighter leading-none mb-6">
            The Archive
          </h2>
          <div class="flex items-center gap-4">
            <span class="h-[1px] w-12 bg-[#202020]"></span>
            <p class="font-montserrat text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
              Discovering <span class="text-[#1A1A1A]">{{ filteredProducts.length }}</span> Masterpieces
            </p>
          </div>
        </div>

        <div class="flex flex-col items-end gap-8 w-full lg:w-auto">
          <div class="relative w-full lg:w-[450px] group">
            <Icon name="lucide:search"
              class="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#4b4b4b] transition-colors" />
            <input v-model="searchQuery" type="text" placeholder="SEARCH BY NAME OR STYLE..."
              class="w-full bg-transparent border-b border-black/10 py-4 pl-8 pr-4 font-montserrat text-[12px] tracking-widest text-[#1A1A1A] outline-none focus:border-[#535353] transition-all placeholder:text-gray-300 uppercase" />
          </div>

          <div class="flex flex-wrap justify-end gap-3">
            <button v-for="cat in categories" :key="cat" @click="activeCategory = cat" :class="[
              'px-6 py-2 font-montserrat text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 border',
              activeCategory === cat
                ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-2xl scale-105'
                : 'bg-transparent border-black/5 text-gray-400 hover:border-[#D4AF37] hover:text-[#D4AF37]'
            ]">
              {{ cat }}
            </button>
          </div>
        </div>
      </div>

      <div v-if="filteredProducts.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20">
        <div v-for="product in filteredProducts" :key="product.id"
          class="group relative flex flex-col bg-transparent transition-all duration-700">
          <NuxtLink :to="`/product/${product.id}`" class="block overflow-hidden relative aspect-[4/5] bg-[#F2F0EB]">
            <img :src="getImageUrl(product.image)" :alt="product.name"
              class="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" />

            <div class="absolute top-6 left-6">
              <span
                class="bg-gray-100 text-slate-700 rounded-md px-2 py-1 font-montserrat text-[9px] font-bold uppercase tracking-[0.2em]">
                Avilable
              </span>
            </div>

            <div
              class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-8">
              <div class="w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                <div
                  class="bg-white py-4 text-center text-black font-montserrat text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl">
                  View Detail
                </div>
              </div>
            </div>
          </NuxtLink>

          <div class=" px-1 py-5 shadow-sm flex flex-col gap-4">
            <div class="flex justify-between items-start">
              <div class="flex flex-col gap-1">
                <NuxtLink :to="`/product/${product.id}`">
                  <h3
                    class=" px-2 text-1xl font-semibold font-sans text-[#1A1A1A] group-hover:text-[#424242] transition-colors leading-tight">
                    {{ product.name }}
                  </h3>
                </NuxtLink>
              </div>

              <button @click.stop.prevent="handleAddToCart(product)" :class="[
                ' px-3 flex items-center justify-center transition-all duration-500 ',
                addedToCart.has(product.id)
                  ? ' border-green-600 text-green-500'
                  : 'bg-transparent border-black/10 hover:text-yellow-600'
              ]">
                <Icon :name="addedToCart.has(product.id) ? 'lucide:check' : 'lucide:shopping-cart'" class="w-5 h-5" />
              </button>
            </div>

            <div class="flex items-center ">
              <span class="w-2 bg-black/10"></span>
              <span class="font-montserrat text-[16px] font-bold text-[#1A1A1A] tracking-tighter">
                <span class="text-[13px] font-medium text-slate-600 mr-1 uppercase">Rs.</span>{{
                  Number(product.price).toLocaleString() }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="py-40 text-center flex flex-col items-center border border-dashed border-black/10">
        <Icon name="lucide:layers" class="w-12 h-12 text-gray-200 mb-6" />
        <h3 class="font-serif italic text-4xl text-[#1A1A1A] mb-4">No matching articles found</h3>
        <p class="font-montserrat text-[10px] text-gray-400 tracking-[0.3em] uppercase mb-10">Refine your criteria for
          luxury</p>
        <button @click="clearAll"
          class="px-12 py-4 bg-black text-white font-montserrat text-[10px] font-black tracking-[0.3em] uppercase hover:bg-[#D4AF37] transition-all">
          Clear All Filters
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const allProducts = ref([])
const searchQuery = ref('')
const activeCategory = ref('All')
const addedToCart = ref(new Set())
const categories = ['All', 'Kaptan', 'Zalmi', 'Panjeedar', 'Exclusive']
const config = useRuntimeConfig()
const API_URL = config.public.apiUrl ?? 'http://72.61.124.30/api2'
// Logic remains identical to your original code
const getImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder.png'
  console.log("api path", API_URL + "image", imagePath)
  return API_URL + imagePath
}

const fetchProducts = async () => {
  try {
    const response = await fetch(API_URL + 'api/products')
    const result = await response.json()
    allProducts.value = result
  } catch (error) {
    console.error('Backend fetch error:', error)
  }
}

const handleAddToCart = (product) => {
  const productWithFullImage = {
    ...product,
    image: getImageUrl(product.image)
  }
  cartStore.addToCart(productWithFullImage, null, 1)
  addedToCart.value = new Set([...addedToCart.value, product.id])
  setTimeout(() => {
    const updated = new Set(addedToCart.value)
    updated.delete(product.id)
    addedToCart.value = updated
  }, 2000)
}

const filteredProducts = computed(() =>
  allProducts.value.filter(p => {
    const q = searchQuery.value.trim().toLowerCase()
    const cat = activeCategory.value.toLowerCase()
    const nameMatch = p.name.toLowerCase()
    return (!q || nameMatch.includes(q)) && (cat === 'all' || nameMatch.includes(cat))
  })
)

const clearAll = () => {
  searchQuery.value = ''
  activeCategory.value = 'All'
}

onMounted(() => {
  cartStore.loadFromStorage()
  fetchProducts()
})
</script>

<style scoped>
/* Nuxt/Tailwind handles fonts, but explicit override for premium feel */
.font-serif {
  font-family: 'Cormorant Garamond', serif;
}

.font-montserrat {
  font-family: 'Montserrat', sans-serif;
}
</style>