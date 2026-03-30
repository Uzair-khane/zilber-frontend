<template>
  <div class="page-wrap bg-[#F7F4EF] min-h-screen py-[52px] pb-24">
    <div class="container max-w-[1400px] mx-auto px-4 md:px-8 lg:px-[56px]">

      <div class="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 mb-12">
        <div class="header-left">
          <p class="font-montserrat text-[10px] font-bold tracking-[0.4em] uppercase text-[#D4AF37] mb-3">
            Handcrafted in Pakistan
          </p>
          <h2 class="font-cormorant italic font-semibold text-[clamp(48px,8vw,80px)] text-[#1A1A1A] tracking-tighter leading-[0.9] mb-4">
            The Archive
          </h2>
          <div class="flex items-center gap-3">
            <span class="h-[1px] w-8 bg-[#D4AF37]"></span>
            <p class="font-montserrat text-[11px] font-medium tracking-widest uppercase text-gray-500">
              Showing <span class="text-[#1A1A1A] font-bold">{{ filteredProducts.length }}</span> Curated Pieces
            </p>
          </div>
        </div>

        <div class="flex flex-col items-end gap-5 w-full lg:w-auto lg:min-w-[400px]">
          <div class="relative w-full">
            <Icon name="lucide:search" class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by name or style..."
              class="w-full bg-white border border-black/5 rounded-full py-4 px-12 font-montserrat text-[13px] text-[#1A1A1A] shadow-sm outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all placeholder:text-gray-300"
            />
          </div>
          <div class="flex flex-wrap justify-end gap-2">
            <button
              v-for="cat in categories"
              :key="cat"
              @click="activeCategory = cat"
              :class="[
                'px-5 py-2.5 rounded-full font-montserrat text-[9px] font-bold tracking-[0.15em] uppercase border transition-all',
                activeCategory === cat
                  ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-xl translate-y-[-2px]'
                  : 'bg-transparent border-black/10 text-gray-500 hover:border-[#D4AF37] hover:text-[#D4AF37]'
              ]"
            >
              {{ cat }}
            </button>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="group relative flex flex-col bg-white rounded-[32px] p-3 border border-transparent hover:border-[#D4AF37]/20 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-700"
        >
          <NuxtLink :to="`/product/${product.id}`" class="block">
            <div class="relative aspect-[1/1.2] rounded-[24px] overflow-hidden bg-[#F2F0EB]">
              <img
                :src="getImageUrl(product.image)"
                :alt="product.name"
                class="w-full h-full object-cover scale-[1.01] group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
              <div class="absolute top-4 left-4">
                <span class="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full font-montserrat text-[8px] font-bold uppercase tracking-tighter text-[#1A1A1A]">
                  Artisan Choice
                </span>
              </div>
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                <div class="flex flex-col items-center gap-3 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                  <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl">
                    <Icon name="lucide:arrow-right" class="w-5 h-5 text-[#1A1A1A]" />
                  </div>
                  <span class="text-white font-montserrat text-[10px] font-bold uppercase tracking-[0.2em]">View Details</span>
                </div>
              </div>
            </div>
          </NuxtLink>

          <div class="pt-6 pb-4 px-3 flex flex-col gap-2">
            <div>
              <span class="font-montserrat text-[8px] font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-1 block">Zilber Premium</span>
              <NuxtLink :to="`/product/${product.id}`">
                <h3 class="font-cormorant text-2xl font-bold text-[#1A1A1A] leading-[1.1] group-hover:text-[#D4AF37] transition-colors">
                  {{ product.name }}
                </h3>
              </NuxtLink>
            </div>
            <div class="flex items-center justify-between mt-4">
              <span class="font-montserrat text-[14px] font-black text-[#1A1A1A]">
                <span class="text-[10px] font-medium text-gray-400 mr-1">PKR</span>{{ Number(product.price).toLocaleString() }}
              </span>
              <button
                @click.stop.prevent="handleAddToCart(product)"
                :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500',
                  addedToCart.has(product.id)
                    ? 'bg-green-500 rotate-[360deg]'
                    : 'bg-[#1A1A1A] hover:bg-[#D4AF37] hover:shadow-lg'
                ]"
              >
                <Icon :name="addedToCart.has(product.id) ? 'lucide:check' : 'lucide:plus'" class="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="py-32 text-center flex flex-col items-center">
        <div class="relative mb-8">
          <div class="absolute inset-0 bg-[#D4AF37]/10 blur-3xl rounded-full"></div>
          <Icon name="lucide:search-x" class="relative w-16 h-16 text-gray-300" />
        </div>
        <h3 class="font-cormorant text-3xl font-light italic text-[#1A1A1A] mb-2">The collection is currently empty</h3>
        <p class="font-montserrat text-xs text-gray-400 tracking-widest uppercase mb-8">Refine your search for excellence</p>
        <button @click="clearAll" class="px-10 py-4 bg-transparent border border-black/10 text-[#1A1A1A] rounded-full font-montserrat text-[10px] font-bold tracking-widest uppercase hover:bg-[#1A1A1A] hover:text-white transition-all">
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

// Image URL helper — full URL return karta hai
const getImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder.png'
  if (imagePath.startsWith('http')) return imagePath
  return `http://localhost:5000/${imagePath.replace(/^\/+/, '')}`
}

const fetchProducts = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/products')
    const result = await response.json()
    allProducts.value = result
  } catch (error) {
    console.error('Backend fetch error:', error)
  }
}

const handleAddToCart = (product) => {
  // Full image URL pass karo cart mein
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
.font-cormorant { font-family: 'Cormorant Garamond', serif; }
.font-montserrat { font-family: 'Montserrat', sans-serif; }
</style>