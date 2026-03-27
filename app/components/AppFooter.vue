<template>
  <footer class="bg-charcoal text-offwhite py-16">
    <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
      
      <!-- Column 1: Brand & Socials -->
      <div>
        <h2 class="text-2xl font-serif text-gold tracking-widest mb-4">ZILBER</h2>
        <p class="text-sm text-gray-400 mb-6">
          Authentic, handcrafted Charsada Chappals bringing traditional elegance to modern footwear. Experience the premium standard.
        </p>
        <div class="flex space-x-4">
          <a href="#" class="hover:text-gold transition-colors"><Icon name="mdi:facebook" class="w-6 h-6" /></a>
          <a href="#" class="hover:text-gold transition-colors"><Icon name="mdi:instagram" class="w-6 h-6" /></a>
          <a href="#" class="hover:text-gold transition-colors"><Icon name="mdi:twitter" class="w-6 h-6" /></a>
        </div>
      </div>

      <!-- Column 2: Customer Care -->
      <div>
        <h3 class="font-serif text-lg text-gold mb-4">Customer Care</h3>
        <ul class="space-y-2 text-sm text-gray-400">
          <li><NuxtLink to="/contact" class="hover:text-white transition-colors">Contact Us</NuxtLink></li>
          <li><NuxtLink to="/shipping" class="hover:text-white transition-colors">Shipping & Delivery</NuxtLink></li>
          <li><NuxtLink to="/returns" class="hover:text-white transition-colors">Exchange & Returns</NuxtLink></li>
          <li><NuxtLink to="/faq" class="hover:text-white transition-colors">FAQs</NuxtLink></li>
        </ul>
      </div>

      <!-- Column 3: Information -->
      <div>
        <h3 class="font-serif text-lg text-gold mb-4">Information</h3>
        <ul class="space-y-2 text-sm text-gray-400">
          <li><NuxtLink to="/about" class="hover:text-white transition-colors">Our Story</NuxtLink></li>
          <li><NuxtLink to="/materials" class="hover:text-white transition-colors">Leather Quality</NuxtLink></li>
          <li><NuxtLink to="/privacy" class="hover:text-white transition-colors">Privacy Policy</NuxtLink></li>
          <li><NuxtLink to="/terms" class="hover:text-white transition-colors">Terms of Service</NuxtLink></li>
        </ul>
      </div>

      <!-- Column 4: Newsletter -->
      <div>
        <h3 class="font-serif text-lg text-gold mb-4">Newsletter</h3>
        <p class="text-sm text-gray-400 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
        <form @submit.prevent="submitNewsletter" class="flex flex-col space-y-3">
          <input 
            v-model="email" 
            type="email" 
            placeholder="Enter your email address" 
            class="bg-transparent border border-gray-600 px-4 py-2 text-sm text-offwhite focus:outline-none focus:border-gold transition-colors"
            required
          />
          <button type="submit" class="bg-gold text-charcoal font-medium py-2 text-sm uppercase tracking-wider hover:bg-yellow-600 transition-colors">
            Subscribe
          </button>
        </form>
      </div>

    </div>
    <div class="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
      &copy; {{ new Date().getFullYear() }} Zilber Footwear. All Rights Reserved.
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

const submitNewsletter = () => {
  // Integrate with backend /api/newsletter
  console.log('Newsletter submitted:', email.value)
  email.value = ''
  alert('Thank you for subscribing to Zilber!')
}
</script>
