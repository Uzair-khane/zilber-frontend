<template>
  <div class="fixed top-0 w-full z-[100]">
    <!-- Announcement Bar -->
    <div class="announcement-bar">
      Free Delivery Nationwide on Orders Above PKR 10,000
    </div>

    <header class="main-header">
      <div class="header-container">

        <!-- LEFT: Logo -->
        <div class="logo-wrap">
          <NuxtLink to="/" @click="closeMobileMenu">
            <img src="../assets/images/logo.png" alt="Zilber Premium" class="logo-img" />
          </NuxtLink>
        </div>

        <!-- CENTER: Desktop Nav -->
        <nav class="desktop-nav">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.path"
            class="desktop-nav-link"
          >
            {{ link.name }}
            <span class="underline-bar"></span>
          </NuxtLink>
        </nav>

        <!-- RIGHT: Icons -->
        <div class="icons-wrap">
          <!-- Search desktop only -->
          <button class="icon-btn search-btn">
            <Icon name="lucide:search" class="icon" />
          </button>

          <NuxtLink to="/cart" class="icon-btn cart-btn">
            <Icon name="lucide:shopping-bag" class="icon" />
            <span class="cart-badge" v-if="cartStore.totalItems > 0">{{ cartStore.totalItems }}</span>
          </NuxtLink>

          <!-- Hamburger mobile only -->
          <button class="hamburger-btn" @click="toggleMenu" aria-label="Open menu">
            <Icon name="lucide:menu" class="icon" />
          </button>
        </div>
      </div>
    </header>

    <!-- Backdrop -->
    <Transition name="fade">
      <div v-if="mobileMenuOpen" class="backdrop" @click="closeMobileMenu" />
    </Transition>

    <!-- Mobile Slide Menu -->
    <Transition name="slide">
      <div v-if="mobileMenuOpen" class="mobile-menu">

        <!-- Menu Top -->
        <div class="mobile-menu-top">
          <img src="../assets/images/logo.png" alt="Zilber" class="mobile-logo" />
          <button class="close-btn" @click="closeMobileMenu">
            <Icon name="lucide:x" class="icon" />
          </button>
        </div>

        <!-- Nav Links -->
        <nav class="mobile-nav">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.path"
            class="mobile-nav-link"
            @click="closeMobileMenu"
          >
            <span class="link-text">{{ link.name }}</span>
            <Icon name="lucide:chevron-right" class="chevron-icon" />
          </NuxtLink>
        </nav>

        <!-- Bottom Buttons -->
        <div class="mobile-bottom">
          <!-- <div class="bottom-btns">
            <button class="btn-account">Account</button>
            <button class="btn-track">Track Order</button>
          </div> -->
          <div class="social-row">
            <Icon name="lucide:instagram" class="social-icon" />
            <Icon name="lucide:facebook" class="social-icon" />
            <Icon name="lucide:phone" class="social-icon" />
          </div>
        </div>

      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const mobileMenuOpen = ref(false)

const toggleMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  document.body.style.overflow = mobileMenuOpen.value ? 'hidden' : ''
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  document.body.style.overflow = ''
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

onMounted(() => window.addEventListener('keydown', handleEscape))
onUnmounted(() => window.removeEventListener('keydown', handleEscape))
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap');

/* ─── Announcement Bar ─── */
.announcement-bar {
  background-color: #D4AF37;
  color: #1a1a1a;
  padding: 8px 16px;
  text-align: center;
  font-size: 9px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

/* ─── Header ─── */
.main-header {
  background-color: rgba(26, 26, 26, 0.97);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(212, 175, 55, 0.1);
  color: #f5f0e8;
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

@media (min-width: 1024px) {
  .header-container {
    padding: 0 48px;
    height: 88px;
  }
}

/* ─── Logo ─── */
.logo-wrap { flex-shrink: 0; }

.logo-img {
  height: 40px;
  width: auto;
  object-fit: contain;
  transition: transform 0.4s ease;
  display: block;
}

.logo-img:hover { transform: scale(1.05); }

@media (min-width: 768px) { .logo-img { height: 52px; } }
@media (min-width: 1024px) { .logo-img { height: 72px; } }

/* ─── Desktop Nav ─── */
.desktop-nav {
  display: none;
  align-items: center;
  gap: 36px;
}

@media (min-width: 1024px) { .desktop-nav { display: flex; } }

.desktop-nav-link {
  position: relative;
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #f5f0e8;
  text-decoration: none;
  padding: 6px 0;
  transition: color 0.3s ease;
}

.desktop-nav-link:hover { color: #D4AF37; }

.underline-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background-color: #D4AF37;
  transition: width 0.4s ease;
}

.desktop-nav-link:hover .underline-bar { width: 100%; }

/* ─── Icons ─── */
.icons-wrap {
  display: flex;
  align-items: center;
  gap: 2px;
}

.icon-btn {
  position: relative;
  padding: 8px;
  color: #f5f0e8;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-btn:hover { color: #D4AF37; }

.icon { width: 20px; height: 20px; }

.search-btn { display: none; }
@media (min-width: 1024px) { .search-btn { display: flex; } }

.cart-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  background-color: #D4AF37;
  color: #1a1a1a;
  font-size: 8px;
  font-weight: 800;
  min-width: 15px;
  height: 15px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat', sans-serif;
  border: 1px solid #1a1a1a;
  padding: 0 2px;
}

.hamburger-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: none;
  border: none;
  color: #f5f0e8;
  cursor: pointer;
  transition: color 0.3s ease;
}

.hamburger-btn:hover { color: #D4AF37; }

@media (min-width: 1024px) { .hamburger-btn { display: none; } }

/* ─── Backdrop ─── */
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 150;
}

.fade-enter-active,
.fade-leave-active { transition: opacity 0.35s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }

/* ─── Mobile Menu ─── */
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: min(340px, 82vw);
  height: 100dvh;
  background: #ffffff;
  z-index: 200;
  display: flex;
  flex-direction: column;
  padding: 24px 20px 32px;
  overflow-y: auto;
  box-shadow: 6px 0 40px rgba(0, 0, 0, 0.2);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-enter-from,
.slide-leave-to { transform: translateX(-100%); }
.slide-enter-to,
.slide-leave-from { transform: translateX(0); }

/* ─── Mobile Menu Top ─── */
.mobile-menu-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(26, 26, 26, 0.08);
}

.mobile-logo {
  height: 34px;
  width: auto;
  object-fit: contain;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: none;
  border: 1px solid rgba(26, 26, 26, 0.15);
  border-radius: 999px;
  color: #1a1a1a;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  border-color: #D4AF37;
  color: #D4AF37;
}

/* ─── Mobile Nav Links ─── */
.mobile-nav {
  display: flex;
  flex-direction: column;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 4px;
  border-bottom: 1px solid rgba(26, 26, 26, 0.07);
  text-decoration: none;
  color: #1a1a1a;
  transition: color 0.3s ease, padding-left 0.3s ease, background 0.3s ease;
  border-radius: 4px;
}

.mobile-nav-link:hover {
  color: #D4AF37;
  padding-left: 10px;
  background: rgba(212, 175, 55, 0.04);
}

.link-text {
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.chevron-icon {
  width: 15px;
  height: 15px;
  opacity: 0.2;
  color: #1a1a1a;
  flex-shrink: 0;
  transition: opacity 0.3s ease, transform 0.3s ease, color 0.3s ease;
}

.mobile-nav-link:hover .chevron-icon {
  opacity: 1;
  transform: translateX(4px);
  color: #D4AF37;
}

/* ─── Mobile Bottom ─── */
.mobile-bottom {
  margin-top: auto;
  padding-top: 24px;
}

.bottom-btns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 20px;
}

.btn-account {
  background: rgba(26, 26, 26, 0.05);
  border: 1px solid rgba(26, 26, 26, 0.12);
  color: #1a1a1a;
  padding: 14px;
  font-family: 'Montserrat', sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-account:hover { background: rgba(26, 26, 26, 0.1); }

.btn-track {
  background: #D4AF37;
  border: none;
  color: #1a1a1a;
  padding: 14px;
  font-family: 'Montserrat', sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: filter 0.2s ease;
}

.btn-track:hover { filter: brightness(1.08); }

.social-row {
  display: flex;
  justify-content: center;
  gap: 28px;
  padding-top: 16px;
  border-top: 1px solid rgba(26, 26, 26, 0.08);
  color: #1a1a1a;
}

.social-icon {
  width: 19px;
  height: 19px;
  cursor: pointer;
  transition: color 0.25s ease, transform 0.25s ease;
}

.social-icon:hover {
  color: #D4AF37;
  transform: scale(1.15);
}

/* ─── Scrollbar ─── */
.mobile-menu::-webkit-scrollbar { width: 2px; }
.mobile-menu::-webkit-scrollbar-thumb { background-color: #D4AF37; }
</style>