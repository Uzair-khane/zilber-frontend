<template>
  <div v-if="product" class="bg-offwhite min-h-screen py-20 font-serif">
    <div class="container mx-auto px-4 lg:px-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div class="aspect-[3/4] overflow-hidden border border-charcoal/5 shadow-2xl">
          <img src="@/assets/images/heroimage.png" class="w-full h-full object-cover" />
        </div>

        <div class="flex flex-col justify-center">
          <span class="text-gold uppercase tracking-[0.4em] text-xs font-black mb-4 italic">{{ product.category }} Collection</span>
          <h1 class="text-6xl text-charcoal mb-6 italic">{{ product.name }}</h1>
          <p class="text-4xl text-charcoal font-black mb-8 border-b pb-6">PKR {{ product.price.toLocaleString() }}</p>
          
          <div class="mb-10 text-gray-600 leading-relaxed italic">
            "Every stitch in this {{ product.category }} masterpiece tells a story of Charsada's legendary craftsmanship, redefined by Zilber."
          </div>

          <a :href="`https://wa.me/923149535884?text=Salam! I want to order ${product.name}`" 
             class="bg-charcoal text-offwhite py-6 text-center uppercase tracking-[0.3em] font-black text-xs hover:bg-gold hover:text-charcoal transition-all">
            Inquire on WhatsApp
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug

// Matching logic with the grid data
const categories = ['All', 'Kaptan', 'Zalmi', 'Panjeedar', 'Suede', 'Exclusive']
const allProducts = Array.from({ length: 45 }, (_, i) => {
  const cat = categories[(i % 5) + 1]
  return {
    name: `Zilber ${cat} - Edition ${i + 1}`,
    slug: `zilber-design-${i + 1}`,
    category: cat,
    price: 8500 + (i * 150)
  }
})

const product = allProducts.find(p => p.slug === slug)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
.bg-offwhite { background-color: #FAF9F6; }
.text-charcoal { color: #1A1A1A; }
.text-gold { color: #D4AF37; }
</style>