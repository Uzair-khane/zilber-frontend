<template>
  <div class="page-wrap bg-[#F7F4EF] min-h-screen py-[52px] pb-24">
    <div class="container max-w-[1400px] mx-auto px-4 md:px-8 lg:px-[56px]">

      <div class="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 mb-10">
        <div class="header-left">
          <p class="font-montserrat text-[9px] font-bold tracking-[0.35em] uppercase text-[#D4AF37] mb-2.5">
            Zilber Premium Footwear
          </p>
          <h2 class="font-cormorant italic font-semibold text-[clamp(44px,7vw,72px)] text-[#1A1A1A] tracking-tighter leading-none mb-3">
            The Archive
          </h2>
          <p class="flex items-baseline gap-2">
            <span class="font-cormorant text-2xl font-semibold text-[#D4AF37]">{{ filteredProducts.length }}</span>
            <span class="font-montserrat text-[10px] font-semibold tracking-widest uppercase text-gray-400">Handcrafted Masterpieces</span>
          </p>
        </div>

        <div class="flex flex-col items-end gap-3.5 w-full lg:w-auto lg:min-w-[340px]">
          <div class="relative w-full lg:max-w-[320px]">
            <Icon name="lucide:search" class="absolute left-3.5 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-gray-400 pointer-events-none" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search chappals..."
              class="w-full bg-white border-[1.5px] border-black/10 rounded-md py-3 px-10 font-montserrat text-xs font-medium text-[#1A1A1A] outline-none focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 transition-all"
            />
          </div>

          <div class="flex flex-wrap gap-2">
            <button
              v-for="cat in categories"
              :key="cat"
              @click="activeCategory = cat"
              :class="[
                'px-4 py-2 rounded-full font-montserrat text-[10px] font-bold tracking-widest uppercase border-[1.5px] transition-all whitespace-nowrap',
                activeCategory === cat 
                  ? 'bg-[#1A1A1A] border-[#1A1A1A] text-[#FAF9F6] shadow-lg shadow-black/20' 
                  : 'bg-white border-black/10 text-gray-600 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5'
              ]"
            >
              {{ cat }}
            </button>
          </div>
        </div>
      </div>

      <div v-if="filteredProducts.length > 0" class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-7">
        <NuxtLink
          v-for="product in filteredProducts"
          :key="product.id"
          :to="`/product/${product.documentId || product.id}`" 
          class="group flex flex-col bg-white rounded-xl overflow-hidden border border-black/5 hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 cursor-pointer"
        >
          <div class="relative aspect-[4/5] bg-[#EDE9E0] overflow-hidden">
            <img
              :src="product.image && product.image[0] ? `http://localhost:1337${product.image[0].url}` : '/placeholder.png'"
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pt-[50%]"></div>
            
            <div class="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="flex items-center gap-2 bg-white/95 text-[#1A1A1A] px-5 py-2.5 rounded-full font-montserrat text-[10px] font-bold uppercase tracking-widest translate-y-3 group-hover:translate-y-0 transition-transform">
                  <Icon name="lucide:eye" class="w-3 h-3" />
                  <span>View Detail</span>
                </div>
            </div>

            <div class="absolute bottom-3 left-3 font-montserrat text-sm font-extrabold text-white tracking-tight drop-shadow-md">
              PKR {{ product.price.toLocaleString() }}
            </div>
          </div>

          <div class="p-4 flex flex-col gap-1.5 flex-grow">
            <div class="flex justify-between items-center">
              <span class="font-montserrat text-[9px] font-bold tracking-[0.2em] uppercase text-[#D4AF37]">Premium</span>
            </div>
            <h3 class="font-cormorant italic text-base md:text-lg font-semibold text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors line-clamp-2">
              {{ product.name }}
            </h3>
            <div class="flex items-center justify-between mt-auto pt-2.5 border-t border-black/5">
              <span class="font-montserrat text-xs font-extrabold text-[#1A1A1A]">PKR {{ product.price.toLocaleString() }}</span>
              <button @click.stop.prevent="handleAddToCart(product.id)" class="bg-[#1A1A1A] p-2 rounded-lg hover:bg-[#D4AF37] transition-colors">
                 <Icon name="lucide:shopping-bag" class="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="py-20 text-center flex flex-col items-center gap-4">
        <div class="w-18 h-18 rounded-full bg-black/5 flex items-center justify-center p-6">
          <Icon name="lucide:search-x" class="w-8 h-8 text-gray-300" />
        </div>
        <h3 class="font-cormorant text-2xl font-semibold text-[#1A1A1A]">No masterpieces found</h3>
        <p class="font-montserrat text-xs text-gray-400">Try changing your filters or search query.</p>
        <button @click="clearAll" class="mt-2 px-7 py-3 bg-[#1A1A1A] text-white rounded-lg font-montserrat text-[10px] font-bold tracking-widest uppercase hover:bg-[#D4AF37] transition-colors">
          Reset All
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const allProducts = ref([])
const searchQuery = ref('')
const activeCategory = ref('All')
const addedToCart = ref(new Set())
const categories = ['All', 'Kaptan', 'Zalmi', 'Panjeedar', 'Exclusive']

const fetchProducts = async () => {
  try {
    const response = await fetch('http://localhost:1337/api/shoes?populate=*')
    const result = await response.json()
    allProducts.value = result.data 
  } catch (error) {
    console.error("Strapi error:", error)
  }
}

onMounted(() => {
  fetchProducts()
})

const filteredProducts = computed(() =>
  allProducts.value.filter(p => {
    const q = searchQuery.value.trim().toLowerCase()
    const cat = activeCategory.value.toLowerCase()
    const matchesSearch = !q || p.name.toLowerCase().includes(q)
    const matchesCat = cat === 'all' || p.name.toLowerCase().includes(cat)
    return matchesSearch && matchesCat
  })
)

const clearAll = () => {
  searchQuery.value = ''
  activeCategory.value = 'All'
}

const handleAddToCart = (id) => {
  addedToCart.value.add(id)
  setTimeout(() => addedToCart.value.delete(id), 2000)
}
</script>