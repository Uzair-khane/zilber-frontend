<template>
  <div class="fixed top-0 w-full z-[100]">
    <div class="bg-gold text-charcoal py-1.5 text-center text-[10px] uppercase tracking-[0.2em] font-bold">
      Free Delivery Nationwide on Orders Above PKR 10,000
    </div>

    <header class="bg-charcoal/90 backdrop-blur-md border-b border-gold/20 text-offwhite py-2 lg:py-0 transition-all duration-300">
      <div class="container mx-auto px-4 lg:px-8 flex justify-between items-center h-20">
        
        <div class="flex-shrink-0">
          <NuxtLink to="/">
            <img src="../assets/images/logo.png" alt="Zilber Premium" class="h-14 lg:h-32 -ml-16  w-auto object-contain hover:scale-105 transition-transform">
          </NuxtLink>
        </div>

        <nav class="hidden lg:flex items-center space-x-10">
          <NuxtLink v-for="link in navLinks" :key="link.name" :to="link.path" 
            class="relative group text-[11px] font-bold uppercase tracking-[0.15em] hover:text-gold transition-colors duration-300 py-8">
            {{ link.name }}
            <span class="absolute bottom-6 left-0 w-0 h-[2px] bg-gold transition-all duration-300 group-hover:w-full"></span>
          </NuxtLink>
        </nav>

        <div class="flex items-center space-x-6">
          <button class="hover:text-gold transition-all hidden sm:block">
            <Icon name="lucide:search" class="w-5 h-5" />
          </button>

          <NuxtLink to="/cart" class="relative hover:text-gold transition-all group">
            <Icon name="lucide:shopping-bag" class="w-6 h-6" />
            <span class="absolute -top-2 -right-2 bg-gold text-charcoal text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border border-charcoal">
              0
            </span>
          </NuxtLink>

          <button class="lg:hidden hover:text-gold transition-colors" @click="toggleMenu">
            <Icon :name="mobileMenuOpen ? 'lucide:x' : 'lucide:menu'" class="w-7 h-7" />
          </button>
        </div>
      </div>

      <transition 
        enter-active-class="transition duration-300 ease-out" 
        enter-from-class="translate-x-full" 
        enter-to-class="translate-x-0" 
        leave-active-class="transition duration-200 ease-in" 
        leave-from-class="translate-x-0" 
        leave-to-class="translate-x-full"
      >
        <div v-if="mobileMenuOpen" class="fixed inset-0 bg-charcoal z-50 flex flex-col p-8 lg:hidden">
          <div class="flex justify-between items-center mb-12">
            <img src="../assets/images/logo.png" alt="Zilber" class="h-10 w-auto">
            <button @click="toggleMenu" class="text-gold"><Icon name="lucide:x" class="w-8 h-8" /></button>
          </div>
          
          <div class="flex flex-col space-y-6">
            <NuxtLink v-for="link in navLinks" :key="link.name" :to="link.path" 
              class="text-2xl font-serif text-offwhite hover:text-gold border-b border-white/5 pb-4"
              @click="mobileMenuOpen = false">
              {{ link.name }}
            </NuxtLink>
          </div>

          <div class="mt-auto flex flex-col gap-4">
            <button class="bg-gold text-charcoal py-4 font-bold uppercase tracking-widest rounded-sm">Track Order</button>
            <div class="flex justify-center gap-6 text-gold mt-4">
              <Icon name="lucide:instagram" class="w-6 h-6" />
              <Icon name="lucide:facebook" class="w-6 h-6" />
            </div>
          </div>
        </div>
      </transition>
    </header>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const toggleMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  // Prevent scrolling when menu is open
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
}

const navLinks = [
  { name: 'Kaptan', path: '/collections/kaptan' },
  { name: 'Zalmi', path: '/collections/zalmi' },
  { name: 'Panjeedar', path: '/collections/panjeedar' },
  { name: 'New Arrivals', path: '/collections/new-arrivals' },
  { name: 'About Zilber', path: '/about' }
]
</script>

<style>
/* Custom Colors for Zilber Brand */
:root {
  --charcoal: #1A1A1A;
  --gold: #D4AF37;
  --offwhite: #FAF9F6;
}

.bg-charcoal { background-color: var(--charcoal); }
.text-gold { color: var(--gold); }
.bg-gold { background-color: var(--gold); }
.text-offwhite { color: var(--offwhite); }
.text-charcoal { color: var(--charcoal); }
</style>