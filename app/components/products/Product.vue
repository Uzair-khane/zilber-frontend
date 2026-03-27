<template>
  <div class="bg-offwhite py-16 min-h-screen">
    <div class="container mx-auto px-4 lg:px-8">
      
      <div class="flex flex-col lg:flex-row justify-between items-center mb-16 gap-8">
        <div class="text-center lg:text-left">
          <h2 class="text-5xl md:text-6xl text-charcoal mb-3 italic tracking-tighter font-serif">
            The Zilber Archive
          </h2>
          <p class="text-gold uppercase tracking-[0.4em] text-[10px] font-black">
            Curated Collection of {{ filteredProducts.length }} Masterpieces
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 w-full lg:w-auto items-center">
          <div class="relative w-full sm:w-64">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search Chappal..." 
              class="w-full bg-white border border-charcoal/10 px-4 py-2.5 text-xs focus:border-gold outline-none transition-all uppercase tracking-widest font-serif"
            />
            <Icon name="lucide:search" class="absolute right-3 top-2.5 text-gray-400 w-4 h-4" />
          </div>

          <div class="flex gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
            <button 
              v-for="cat in categories" :key="cat"
              @click="activeCategory = cat"
              :class="[
                'px-6 py-2.5 text-[9px] uppercase tracking-[0.2em] font-black transition-all duration-300 border whitespace-nowrap font-serif',
                activeCategory === cat ? 'bg-gold border-gold text-charcoal shadow-lg' : 'bg-white border-charcoal/10 text-charcoal hover:border-gold'
              ]"
            >
              {{ cat }}
            </button>
          </div>
        </div>
      </div>

      <TransitionGroup 
        name="product-fade" 
        tag="div" 
        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-12 gap-x-6 lg:gap-x-8"
      >
        <div 
          v-for="product in filteredProducts" 
          :key="product.id" 
          class="group flex flex-col h-full bg-white shadow-sm hover:shadow-2xl transition-all duration-500 rounded-sm overflow-hidden border border-gray-100"
        >
          <NuxtLink :to="`/product/${product.slug}`" class="relative overflow-hidden aspect-[3/4] block bg-gray-200">
            <img 
              src="@/assets/images/heroimage.png" 
              :alt="product.name" 
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-in-out"
            />
            
            <div class="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center border-4 border-gold/0 group-hover:border-gold/20 m-2 transition-all">
               <div class="bg-white/90 backdrop-blur-md text-charcoal px-6 py-2.5 text-[10px] uppercase font-black tracking-[0.3em] transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 font-serif">
                 View Masterpiece
               </div>
            </div>

            <div v-if="product.isNew" class="absolute top-4 left-4 bg-gold text-charcoal px-3 py-1 text-[9px] font-black uppercase tracking-widest font-serif">
              New Arrival
            </div>
          </NuxtLink>

          <div class="p-5 flex flex-col flex-grow text-center">
            <span class="text-[8px] text-gold uppercase tracking-[0.3em] mb-2 font-bold font-serif">{{ product.category }} Collection</span>
            <h3 class="text-base text-charcoal mb-2 line-clamp-1 group-hover:text-gold transition-colors font-serif italic">
              {{ product.name }}
            </h3>
            <p class="text-charcoal font-black text-sm tracking-widest mb-5 font-serif">
              PKR {{ product.price.toLocaleString() }}
            </p>

            <button 
              @click.stop="handleAddToCart(product)"
              class="mt-auto flex items-center justify-center gap-3 w-full bg-charcoal text-offwhite py-3.5 text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-gold hover:text-charcoal transition-all duration-300 shadow-xl active:scale-95 group/btn font-serif"
            >
              <Icon name="lucide:shopping-bag" class="w-4 h-4 group-hover/btn:scale-125 transition-transform" />
              Add to Cart
            </button>
          </div>
        </div>
      </TransitionGroup>

      <div v-if="filteredProducts.length === 0" class="py-32 text-center border-2 border-dashed border-gray-200">
        <Icon name="lucide:package-search" class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500 font-serif italic text-lg">No designs match your search "{{ searchQuery }}"</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const activeCategory = ref('All')
const categories = ['All', 'Kaptan', 'Zalmi', 'Panjeedar', 'Suede', 'Exclusive']

// Generating 45 Products
const allProducts = ref(
  Array.from({ length: 45 }, (_, i) => {
    const cat = categories[(i % 5) + 1]
    return {
      id: i + 1,
      name: `Zilber ${cat} - Edition ${i + 1}`,
      slug: `zilber-design-${i + 1}`,
      category: cat,
      price: 8500 + (i * 150),
      isNew: i < 8,
      image: 'heroimage.png'
    }
  })
)

const filteredProducts = computed(() => {
  return allProducts.value.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCat = activeCategory.value === 'All' || p.category === activeCategory.value
    return matchesSearch && matchesCat
  })
})

const handleAddToCart = (product) => {
  alert(`Artisan Item: ${product.name} added to your Zilber bag.`)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

.font-serif {
  font-family: 'Playfair Display', serif;
}

/* Colors */
.text-gold { color: #D4AF37; }
.bg-gold { background-color: #D4AF37; }
.text-charcoal { color: #1A1A1A; }
.bg-charcoal { background-color: #1A1A1A; }
.text-offwhite { color: #FAF9F6; }
.bg-offwhite { background-color: #FAF9F6; }

/* Filter Animations */
.product-fade-move,
.product-fade-enter-active,
.product-fade-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.product-fade-enter-from,
.product-fade-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}
.product-fade-leave-active {
  position: absolute;
}

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>