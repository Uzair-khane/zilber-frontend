<template>
  <footer class="bg-[#1A1A1A] text-[#F7F4EF] pt-16 pb-10">

    <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">

      <!-- Brand -->
      <div>
        <h2 class="text-2xl tracking-[0.3em] text-[#D4AF37] font-semibold mb-4">
          ZILBER
        </h2>

        <p class="text-sm text-gray-400 leading-relaxed mb-6">
          Authentic handcrafted Charsadda Chappals — jahan riwayat milti hai modern comfort se.
        </p>

        <!-- Social Icons -->
        <div class="flex gap-4">
          <a href="#" class="social-icon">
            <Icon name="mdi:facebook" />
          </a>
          <a href="#" class="social-icon">
            <Icon name="mdi:instagram" />
          </a>
          <a href="#" class="social-icon">
            <Icon name="ic:baseline-tiktok" />
          </a>
          <a href="#" class="social-icon whatsapp">
            <Icon name="mdi:whatsapp" />
          </a>
        </div>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="footer-title">Quick Links</h3>
        <ul class="footer-links">
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/collections/kaptan">Kaptan</NuxtLink></li>
          <li><NuxtLink to="/collections/zalmi">Zalmi</NuxtLink></li>
          <li><NuxtLink to="/collections/new-arrivals">New Arrivals</NuxtLink></li>
        </ul>
      </div>

      <!-- Help -->
      <div>
        <h3 class="footer-title">Customer Care</h3>
        <ul class="footer-links">
          <li><NuxtLink to="/contact">Contact Us</NuxtLink></li>
          <li><NuxtLink to="/shipping">Shipping Info</NuxtLink></li>
          <li><NuxtLink to="/returns">Returns</NuxtLink></li>
          <li><NuxtLink to="/faq">FAQ</NuxtLink></li>
        </ul>
      </div>

      <!-- WhatsApp CTA -->
      <div>
        <h3 class="footer-title">Need Help?</h3>

        <p class="text-sm text-gray-400 mb-4">
          Order directly on WhatsApp for quick support and fast checkout.
        </p>

        <button class="whatsapp-btn" @click="openWhatsApp">
          <Icon name="mdi:whatsapp" class="w-5 h-5" />
          Chat on WhatsApp
        </button>
      </div>

    </div>

    <!-- Bottom -->
    <div class="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
      © {{ new Date().getFullYear() }} Zilber Footwear. All Rights Reserved.
    </div>

  </footer>
</template>

<script setup>
const openWhatsApp = () => {
  const msg = encodeURIComponent("Hi Zilber! I want to place an order.")
  window.open(`https://wa.me/923001234567?text=${msg}`, '_blank')
}
</script>

<style scoped>

/* Titles */
.footer-title {
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #D4AF37;
  margin-bottom: 16px;
  font-weight: 700;
}

/* Links */
.footer-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-links a {
  font-size: 13px;
  color: #bbb;
  transition: all 0.3s ease;
}

.footer-links a:hover {
  color: #D4AF37;
  transform: translateX(4px);
}

/* Social Icons */
.social-icon {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 50%;
  color: #bbb;
  transition: all 0.3s ease;
}

.social-icon:hover {
  color: #D4AF37;
  border-color: #D4AF37;
  transform: translateY(-3px);
}

/* WhatsApp special */
.whatsapp:hover {
  color: #25D366 !important;
  border-color: #25D366 !important;
}

/* WhatsApp Button */
.whatsapp-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #25D366;
  color: white;
  padding: 12px 18px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.whatsapp-btn:hover {
  background: #128C7E;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37,211,102,0.3);
}

</style>