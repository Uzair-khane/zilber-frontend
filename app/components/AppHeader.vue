<template>
  <div class="fixed top-0 w-full z-[100] font-['Inter',sans-serif]">
    <div class="bg-[#2C3E50] text-white py-2.5 px-4 text-center text-[10px] font-semibold tracking-[0.15em] uppercase">
      Free Delivery All Over Pakistan Shop Now at Zilber.store
    </div>

    <header class="bg-white/95 backdrop-blur-md border-b border-[#F2F2F2] text-[#1B1B1B]">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-[60px] flex items-center justify-between h-[70px] lg:h-[90px]">

        <div class="flex-shrink-0">
          <NuxtLink to="/" @click="closeMobileMenu" class="group block overflow-hidden">
            <img src="../assets/images/logo1.png" alt="Zilber Premium"
              class="h-[38px] lg:h-[70px] w-auto grayscale group-hover:grayscale-0 transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-0.5" />
          </NuxtLink>
        </div>

        <nav class="hidden lg:flex items-center gap-10 h-full">
          <NuxtLink v-for="link in navLinks" :key="link.name" :to="link.path"
            class="relative text-[11px] font-semibold tracking-wider uppercase text-[#333333] hover:text-[#2C3E50] transition-colors duration-300 py-2 group">
            {{ link.name }}
            <span
              class="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-[#2C3E50] transition-all duration-300 ease-out -translate-x-1/2 group-hover:w-full"></span>
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-3 lg:gap-4">
          <button class="p-2 hover:text-[#2C3E50] hover:-translate-y-1 transition-all duration-300 hidden sm:block">
            <Icon name="lucide:search" class="w-[22px] h-[22px] stroke-[1.5]" />
          </button>

          <NuxtLink to="/cart"
            class="p-2 relative hover:text-[#2C3E50] hover:-translate-y-1 transition-all duration-300">
            <Icon name="lucide:shopping-bag" class="w-[22px] h-[22px] stroke-[1.5]" />
            <span v-if="cartStore.totalItems > 0"
              class="absolute top-1 right-1 bg-[#1B1B1B] text-white text-[8px] font-bold min-w-[16px] h-[16px] rounded-full flex items-center justify-center border-2 border-white">
              {{ cartStore.totalItems }}
            </span>
          </NuxtLink>

          <button @click="toggleMenu" class="p-2 lg:hidden text-[#1B1B1B]">
            <Icon name="lucide:menu" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>

    <div v-if="mobileMenuOpen" class="fixed inset-0 z-[150]">
      <Transition name="fade" appear>
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="closeMobileMenu"></div>
      </Transition>

      <Transition name="slide" appear>
        <div class="absolute top-0 left-0 w-full max-w-[320px] h-full bg-white p-8 flex flex-col shadow-2xl">
          <div class="flex items-center justify-between mb-10">
            <img src="../assets/images/logo.png" alt="Zilber" class="h-8 w-auto grayscale" />
            <button @click="closeMobileMenu" class="p-2 rounded-full border border-gray-100">
              <Icon name="lucide:x" class="w-5 h-5 text-gray-800" />
            </button>
          </div>

          <nav class="flex flex-col">
            <NuxtLink v-for="link in navLinks" :key="link.name" :to="link.path"
              class="flex justify-between items-center py-4 border-b border-gray-50 text-[13px] font-semibold uppercase tracking-wide group"
              @click="closeMobileMenu">
              <span class="group-hover:translate-x-2 transition-transform duration-300">{{ link.name }}</span>
              <Icon name="lucide:arrow-right"
                class="w-4 h-4 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </NuxtLink>
          </nav>

          <div class="mt-auto pt-8 border-t border-gray-100 flex justify-center gap-8 text-gray-400">
            <Icon name="lucide:instagram" class="w-5 h-5 hover:text-[#2C3E50] cursor-pointer transition-colors" />
            <Icon name="lucide:facebook" class="w-5 h-5 hover:text-[#2C3E50] cursor-pointer transition-colors" />
            <Icon name="lucide:phone" class="w-5 h-5 hover:text-[#2C3E50] cursor-pointer transition-colors" />
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const mobileMenuOpen = ref(false)

const toggleMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (process.client) {
    document.body.style.overflow = mobileMenuOpen.value ? 'hidden' : ''
  }
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  if (process.client) {
    document.body.style.overflow = ''
  }
}

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Kaptan Edition', path: '/collections/kaptan' },
  { name: 'Zalmi Special', path: '/collections/zalmi' },
  { name: 'Panjeedar', path: '/collections/panjeedar' },
  { name: 'New Arrivals', path: '/collections/new-arrivals' },
  { name: 'Artisan Story', path: '/about' },
]

const handleEscape = (e) => {
  if (e.key === 'Escape') closeMobileMenu()
}

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>