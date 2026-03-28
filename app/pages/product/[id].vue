<template>
  <div class="pdp-wrap" :style="`padding-bottom: ${isMobile ? '100px' : '80px'}`">

    <!-- ─── Breadcrumb ─── -->
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <NuxtLink to="/" class="bc-link">Home</NuxtLink>
      <span class="bc-sep">→</span>
      <NuxtLink :to="`/collections/${product.category.toLowerCase()}`" class="bc-link">{{ product.category }}</NuxtLink>
      <span class="bc-sep">→</span>
      <span class="bc-current">{{ product.name }}</span>
    </nav>

    <div class="pdp-grid">

      <!-- ═══ LEFT: Custom Slider ═══ -->
      <Slider :product="product" />

      <!-- ═══ RIGHT: Product Info ═══ -->
      <div class="info-col">

        <!-- Category + Rating -->
        <div class="info-top">
          <span class="product-tag">{{ product.category }} Collection</span>
          <div class="rating-wrap">
            <div class="stars">
              <Icon
                v-for="s in 5"
                :key="s"
                :name="s <= Math.round(product.rating) ? 'lucide:star' : 'lucide:star'"
                class="star-icon"
                :class="s <= Math.round(product.rating) ? 'star-filled' : 'star-empty'"
              />
            </div>
            <span class="rating-text">{{ product.rating }} ({{ product.reviewCount }} reviews)</span>
          </div>
        </div>

        <!-- Name -->
        <h1 class="product-name">{{ product.name }}</h1>

        <!-- Price -->
        <div class="price-row">
          <span class="price-main">PKR {{ product.price.toLocaleString() }}</span>
          <span v-if="product.originalPrice" class="price-old">
            PKR {{ product.originalPrice.toLocaleString() }}
          </span>
          <span v-if="product.discount" class="price-save">
            Save PKR {{ (product.originalPrice - product.price).toLocaleString() }}
          </span>
        </div>

        <!-- Short Description -->
        <p class="product-desc">{{ product.shortDesc }}</p>

        <!-- Features -->
        <div class="features-grid">
          <div v-for="feat in product.features" :key="feat.label" class="feat-item">
            <Icon :name="feat.icon" class="feat-icon" />
            <div>
              <p class="feat-label">{{ feat.label }}</p>
              <p class="feat-value">{{ feat.value }}</p>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="divider"></div>

        <!-- Size Selection -->
        <div class="size-section">
          <div class="size-header">
            <h3 class="size-title">Select Size <span class="size-unit">(UK)</span></h3>
            <button class="size-guide-btn">Size Guide →</button>
          </div>

          <div class="size-grid">
            <button
              v-for="size in product.sizes"
              :key="size"
              @click="selectedSize = size"
              :class="['size-btn', selectedSize === size ? 'size-active' : 'size-inactive']"
              :disabled="product.unavailableSizes?.includes(size)"
              
            >
              {{ size }}
            </button>
          </div>

          <p v-if="!selectedSize" class="size-hint">
            <Icon name="lucide:alert-circle" class="hint-icon" />
            Please select a size to continue
          </p>
          <p v-else class="size-selected-msg">
            <Icon name="lucide:check-circle" class="check-icon" />
            Size {{ selectedSize }} selected
          </p>
        </div>

        <!-- Divider -->
        <div class="divider"></div>

        <!-- Stock + Delivery -->
        <div class="meta-row">
          <div class="meta-item">
            <Icon name="lucide:package-check" class="meta-icon meta-green" />
            <span class="meta-text">In Stock — {{ product.stock }} pairs left</span>
          </div>
          <div class="meta-item">
            <Icon name="lucide:truck" class="meta-icon meta-gold" />
            <span class="meta-text">Free delivery on orders above PKR 10,000</span>
          </div>
          <div class="meta-item">
            <Icon name="lucide:rotate-ccw" class="meta-icon meta-blue" />
            <span class="meta-text">7-day easy returns & exchanges</span>
          </div>
        </div>

        <!-- Quantity -->
        <div class="qty-row">
          <span class="qty-label">Qty:</span>
          <div class="qty-controls">
            <button class="qty-btn" @click="qty > 1 && qty--" :disabled="qty <= 1">−</button>
            <span class="qty-num">{{ qty }}</span>
            <button class="qty-btn" @click="qty < product.stock && qty++" :disabled="qty >= product.stock">+</button>
          </div>
        </div>

        <!-- Desktop CTA -->
        <div class="cta-wrap hidden-mobile">
          <button
            class="cta-cart"
            :class="{ 'cta-cart-added': cartAdded }"
            @click="addToCart"
            :disabled="!selectedSize"
          >
            <Transition name="cta-icon" mode="out-in">
              <Icon v-if="cartAdded" key="check" name="lucide:check" class="cta-icon" />
              <Icon v-else key="bag" name="lucide:shopping-bag" class="cta-icon" />
            </Transition>
            {{ cartAdded ? 'Added to Cart!' : 'Add to Cart' }}
          </button>

          <button class="cta-whatsapp" @click="orderOnWhatsApp">
            <Icon name="mdi:whatsapp" class="cta-icon" />
            Order on WhatsApp
          </button>
        </div>

        <!-- Wishlist -->
        <button class="wishlist-btn hidden-mobile" @click="wishlisted = !wishlisted">
          <Icon :name="wishlisted ? 'lucide:heart' : 'lucide:heart'" class="wish-icon" :class="{ 'wish-active': wishlisted }" />
          {{ wishlisted ? 'Saved to Wishlist' : 'Add to Wishlist' }}
        </button>

      </div>
    </div>

    <!-- ─── Description Tabs ─── -->
    <div class="tabs-section">
      <div class="tabs-header">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-btn"
          :class="{ 'tab-active': activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <Transition name="tab-fade" mode="out-in">
        <div :key="activeTab" class="tab-content">
          <!-- Description -->
          <div v-if="activeTab === 'desc'" class="desc-content">
            <p class="desc-text">{{ product.longDesc }}</p>
            <div class="specs-grid">
              <div v-for="spec in product.specs" :key="spec.label" class="spec-row">
                <span class="spec-label">{{ spec.label }}</span>
                <span class="spec-value">{{ spec.value }}</span>
              </div>
            </div>
          </div>

          <!-- Care -->
          <div v-if="activeTab === 'care'" class="care-content">
            <div class="care-grid">
              <div v-for="tip in product.careTips" :key="tip.title" class="care-item">
                <Icon :name="tip.icon" class="care-icon" />
                <h4 class="care-title">{{ tip.title }}</h4>
                <p class="care-text">{{ tip.text }}</p>
              </div>
            </div>
          </div>

          <!-- Shipping -->
          <div v-if="activeTab === 'shipping'" class="shipping-content">
            <div class="shipping-grid">
              <div v-for="opt in product.shippingOptions" :key="opt.name" class="ship-card">
                <Icon :name="opt.icon" class="ship-icon" />
                <div>
                  <h4 class="ship-name">{{ opt.name }}</h4>
                  <p class="ship-detail">{{ opt.detail }}</p>
                  <p class="ship-price">{{ opt.price }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- ═══ Sticky Mobile Bar ═══ -->
    <div class="mobile-sticky">
      <div class="sticky-price">
        <span class="sticky-name">{{ product.name }}</span>
        <span class="sticky-pkr">PKR {{ product.price.toLocaleString() }}</span>
      </div>
      <div class="sticky-actions">
        <button
          class="sticky-cart"
          :class="{ 'sticky-cart-added': cartAdded }"
          @click="addToCart"
          :disabled="!selectedSize"
        >
          <Icon :name="cartAdded ? 'lucide:check' : 'lucide:shopping-bag'" class="sticky-icon" />
        </button>
        <button class="sticky-wa" @click="orderOnWhatsApp">
          <Icon name="mdi:whatsapp" class="sticky-icon" />
          WhatsApp
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()

// Slider component extracted

// ── UI State ──
const selectedSize = ref(null)
const qty = ref(1)
const cartAdded = ref(false)
const wishlisted = ref(false)
const activeTab = ref('desc')
const isMobile = ref(false)

const checkMobile = () => { isMobile.value = window.innerWidth < 768 }
onMounted(() => { checkMobile(); window.addEventListener('resize', checkMobile) })
onUnmounted(() => window.removeEventListener('resize', checkMobile))

const tabs = [
  { id: 'desc',     label: 'Description & Specs' },
  { id: 'care',     label: 'Care Instructions' },
  { id: 'shipping', label: 'Shipping & Returns' },
]

const addToCart = () => {
  if (!selectedSize.value) return
  cartStore.addToCart(product.value, selectedSize.value, qty.value)
  cartAdded.value = true
  setTimeout(() => { cartAdded.value = false }, 2500)
}

const orderOnWhatsApp = () => {
  const msg = encodeURIComponent(
    `Hi! I'd like to order:\n*${product.value.name}*\nSize: ${selectedSize.value || 'Not selected'}\nQty: ${qty.value}\nPrice: PKR ${product.value.price.toLocaleString()}`
  )
  window.open(`https://wa.me/923001234567?text=${msg}`, '_blank')
}

// ── Dynamic Product Data ──
const product = ref({
  id: 1,
  name: 'Zilber Signature Kaptan',
  category: 'Kaptan',
  price: 9500,
  originalPrice: 11500,
  discount: 17,
  stock: 12,
  rating: 4.8,
  reviewCount: 142,
  isNew: true,
  isBestseller: true,
  sizes: [6, 7, 8, 9, 10, 11, 12],
  unavailableSizes: [6],

  shortDesc: 'A masterpiece of traditional craftsmanship, the Signature Kaptan blends centuries-old artisan techniques with modern ergonomic comfort. Each pair is individually hand-stitched by master craftsmen in Peshawar.',

  longDesc: 'The Zilber Signature Kaptan represents the pinnacle of Pakistani footwear heritage. Crafted from the finest full-grain cowhide sourced from premium tanneries, every detail — from the hand-stitched borders to the orthopedic memory foam insole — reflects an uncompromising commitment to quality. Each pair takes up to 14 hours to complete and is signed off by our master craftsman before leaving the workshop.',

  features: [
    { icon: 'lucide:gem',       label: 'Leather',    value: 'Full-Grain Cowhide' },
    { icon: 'lucide:layers',    label: 'Sole',       value: 'Orthopedic Memory Foam' },
    { icon: 'lucide:scissors',  label: 'Stitching',  value: 'Hand-stitched, Double Thread' },
    { icon: 'lucide:shield',    label: 'Durability', value: '5-Year Craftsmanship Warranty' },
  ],

  specs: [
    { label: 'Material',         value: 'Full-Grain Cowhide Leather' },
    { label: 'Sole',             value: 'Orthopedic Memory Foam + Rubber Base' },
    { label: 'Stitching',        value: 'Hand-stitched, Double Thread' },
    { label: 'Origin',           value: 'Handcrafted in Peshawar, Pakistan' },
    { label: 'Production Time',  value: '14 Hours Per Pair' },
    { label: 'Weight',           value: 'Approx. 380g per pair' },
    { label: 'Lining',           value: 'Natural Leather Inner Lining' },
    { label: 'Warranty',         value: '5-Year Craftsmanship Guarantee' },
  ],

  careTips: [
    { icon: 'lucide:droplets',   title: 'Moisture Protection',  text: 'Apply leather conditioner every 4–6 weeks to maintain suppleness and prevent cracking.' },
    { icon: 'lucide:sun',        title: 'Avoid Direct Sunlight', text: 'Store away from direct sunlight and heat sources to prevent fading and dryness.' },
    { icon: 'lucide:brush',      title: 'Regular Cleaning',     text: 'Use a soft dry cloth to remove dust after each use. For deeper cleaning, use a leather-safe cleaner.' },
    { icon: 'lucide:archive',    title: 'Proper Storage',       text: 'Store in the provided dust bag in a cool, dry place. Use cedar shoe trees to maintain shape.' },
  ],

  shippingOptions: [
    { icon: 'lucide:package',    name: 'Standard Delivery',   detail: '3–5 Business Days',  price: 'PKR 200' },
    { icon: 'lucide:zap',        name: 'Express Delivery',    detail: '1–2 Business Days',  price: 'PKR 500' },
    { icon: 'lucide:truck',      name: 'Free Shipping',       detail: 'On orders above PKR 10,000', price: 'Free' },
    { icon: 'lucide:rotate-ccw', name: 'Easy Returns',        detail: '7-Day Return Policy', price: 'Free Return Pickup' },
  ],

  images: [
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=900&q=85&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1608256246200-53e65329e344?w=900&q=85&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=900&q=85&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=900&q=85&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=85&auto=format&fit=crop',
  ],
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400;1,600;1,700&display=swap');

/* ═══════════════════════════════
   CSS VARIABLES
═══════════════════════════════ */
:root {
  --gold:     #D4AF37;
  --gold-dark:#B8960E;
  --charcoal: #1A1A1A;
  --offwhite: #F7F4EF;
  --white:    #ffffff;
  --gray-100: #F2EFE9;
  --gray-300: #C8C4BC;
  --gray-500: #888880;
  --green:    #1A7A3C;
  --wa-green: #25D366;
  --wa-dark:  #128C7E;
  --blue:     #1A5A9A;
  --font-display: 'Cormorant Garamond', serif;
  --font-body:    'Montserrat', sans-serif;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --shadow-card: 0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04);
  --shadow-hover: 0 20px 60px rgba(0,0,0,0.13), 0 4px 16px rgba(0,0,0,0.06);
  --transition: 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

/* ═══════════════════════════════
   PAGE WRAP
═══════════════════════════════ */
.pdp-wrap {
  background: var(--offwhite);
  min-height: 100vh;
  padding: 0 0 80px;
  animation: pageIn 0.5s ease both;
}

@keyframes pageIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ═══════════════════════════════
   BREADCRUMB
═══════════════════════════════ */
.breadcrumb {
  padding: 20px 24px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

@media (min-width: 1024px) { .breadcrumb { padding: 24px 56px 0; } }

.bc-link {
  color: var(--gray-500);
  text-decoration: none;
  transition: color var(--transition);
}
.bc-link:hover { color: var(--gold); }
.bc-sep { color: var(--gray-300); font-size: 9px; }
.bc-current { color: var(--charcoal); font-weight: 700; }

/* ═══════════════════════════════
   MAIN GRID
═══════════════════════════════ */
.pdp-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  padding: 24px 16px 0;
  max-width: 1400px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .pdp-grid {
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    padding: 36px 32px 0;
    align-items: start;
  }
}

@media (min-width: 1024px) {
  .pdp-grid {
    grid-template-columns: 1.05fr 1fr;
    gap: 72px;
    padding: 40px 56px 0;
  }
}

/* Slider styles extracted to Slider.vue */

/* ═══════════════════════════════
   PRODUCT INFO COLUMN
═══════════════════════════════ */
.info-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 8px;
}

/* Top row */
.info-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.product-tag {
  font-family: var(--font-body);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--gold);
  background: rgba(212,175,55,0.1);
  padding: 5px 12px;
  border-radius: 3px;
}

.rating-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stars { display: flex; gap: 2px; }

.star-icon { width: 13px; height: 13px; }
.star-filled { color: var(--gold); fill: var(--gold); }
.star-empty  { color: var(--gray-300); }

.rating-text {
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  color: var(--gray-500);
}

/* Name */
.product-name {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 600;
  font-size: clamp(32px, 4.5vw, 52px);
  color: var(--charcoal);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

/* Price */
.price-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}

.price-main {
  font-family: var(--font-body);
  font-size: clamp(22px, 3vw, 28px);
  font-weight: 800;
  color: var(--charcoal);
  letter-spacing: -0.01em;
}

.price-old {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  color: var(--gray-300);
  text-decoration: line-through;
}

.price-save {
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--green);
  background: rgba(26,122,60,0.09);
  padding: 4px 10px;
  border-radius: 3px;
}

/* Description */
.product-desc {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 400;
  color: #555;
  line-height: 1.8;
}

/* Features grid */
.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.feat-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: var(--white);
  border: 1px solid rgba(26,26,26,0.07);
  border-radius: var(--radius-sm);
  padding: 12px;
  transition: border-color var(--transition), box-shadow var(--transition);
}

.feat-item:hover {
  border-color: rgba(212,175,55,0.3);
  box-shadow: 0 4px 16px rgba(212,175,55,0.08);
}

.feat-icon {
  width: 16px;
  height: 16px;
  color: var(--gold);
  flex-shrink: 0;
  margin-top: 2px;
}

.feat-label {
  font-family: var(--font-body);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gray-500);
  margin-bottom: 2px;
}

.feat-value {
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  color: var(--charcoal);
  line-height: 1.4;
}

/* Divider */
.divider {
  height: 1px;
  background: rgba(26,26,26,0.07);
}

/* ─── Size Section ─── */
.size-section { display: flex; flex-direction: column; gap: 12px; }

.size-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.size-title {
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--charcoal);
}

.size-unit {
  font-weight: 500;
  color: var(--gray-500);
}

.size-guide-btn {
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 600;
  color: var(--gold-dark);
  background: none;
  border: none;
  cursor: pointer;
  transition: color var(--transition);
}
.size-guide-btn:hover { color: var(--charcoal); }

.size-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.size-btn {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid rgba(26,26,26,0.15);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 700;
  color: var(--charcoal);
  background: var(--white);
  cursor: pointer;
  transition: all var(--transition);
}

.size-btn:hover:not(:disabled) {
  border-color: var(--gold);
  color: var(--gold);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(212,175,55,0.2);
}

.size-active {
  background: var(--charcoal) !important;
  border-color: var(--charcoal) !important;
  color: var(--white) !important;
  box-shadow: 0 4px 16px rgba(26,26,26,0.25);
  transform: translateY(-2px);
}

.size-disabled {
  opacity: 0.3;
  cursor: not-allowed;
  text-decoration: line-through;
}

.size-hint {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  color: #C0392B;
}

.size-selected-msg {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  color: var(--green);
}

.hint-icon, .check-icon { width: 13px; height: 13px; flex-shrink: 0; }

/* ─── Meta Info ─── */
.meta-row { display: flex; flex-direction: column; gap: 10px; }

.meta-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 500;
  color: #555;
}

.meta-icon { width: 15px; height: 15px; flex-shrink: 0; }
.meta-green { color: var(--green); }
.meta-gold  { color: var(--gold); }
.meta-blue  { color: var(--blue); }

/* ─── Quantity ─── */
.qty-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.qty-label {
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gray-500);
}

.qty-controls {
  display: flex;
  align-items: center;
  border: 1.5px solid rgba(26,26,26,0.12);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.qty-btn {
  width: 38px;
  height: 38px;
  background: none;
  border: none;
  font-size: 18px;
  font-weight: 300;
  color: var(--charcoal);
  cursor: pointer;
  transition: background var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}
.qty-btn:hover:not(:disabled) { background: var(--gray-100); }
.qty-btn:disabled { opacity: 0.3; cursor: not-allowed; }

.qty-num {
  width: 44px;
  text-align: center;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 700;
  color: var(--charcoal);
  border-left: 1px solid rgba(26,26,26,0.1);
  border-right: 1px solid rgba(26,26,26,0.1);
}

/* ─── CTA Buttons ─── */
.cta-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.cta-cart {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 16px 12px;
  background: var(--charcoal);
  color: var(--white);
  border: 2px solid var(--charcoal);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all var(--transition);
}

.cta-cart:hover:not(:disabled) {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--charcoal);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(212,175,55,0.3);
}

.cta-cart:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none;
}

.cta-cart-added {
  background: var(--green) !important;
  border-color: var(--green) !important;
  color: var(--white) !important;
}

.cta-whatsapp {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 16px 12px;
  background: var(--wa-green);
  color: var(--white);
  border: 2px solid var(--wa-green);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all var(--transition);
}

.cta-whatsapp:hover {
  background: var(--wa-dark);
  border-color: var(--wa-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(37,211,102,0.3);
}

.cta-icon { width: 16px; height: 16px; flex-shrink: 0; }

/* CTA icon transition */
.cta-icon-enter-active, .cta-icon-leave-active { transition: all 0.2s ease; }
.cta-icon-enter-from { opacity: 0; transform: rotate(-90deg) scale(0.7); }
.cta-icon-leave-to   { opacity: 0; transform: rotate(90deg) scale(0.7); }

/* Wishlist */
.wishlist-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  color: var(--gray-500);
  cursor: pointer;
  transition: color var(--transition);
  width: fit-content;
}
.wishlist-btn:hover { color: var(--charcoal); }

.wish-icon { width: 15px; height: 15px; transition: all var(--transition); }
.wish-active { color: #E74C3C; fill: #E74C3C; }

.hidden-mobile { display: none; }
@media (min-width: 768px) { .hidden-mobile { display: flex; } }
.cta-wrap.hidden-mobile { display: none; }
@media (min-width: 768px) { .cta-wrap.hidden-mobile { display: grid; } }

/* ═══════════════════════════════
   TABS SECTION
═══════════════════════════════ */
.tabs-section {
  max-width: 1400px;
  margin: 56px auto 0;
  padding: 0 16px;
}

@media (min-width: 768px)  { .tabs-section { padding: 0 32px; } }
@media (min-width: 1024px) { .tabs-section { padding: 0 56px; } }

.tabs-header {
  display: flex;
  gap: 0;
  border-bottom: 2px solid rgba(26,26,26,0.08);
  overflow-x: auto;
  scrollbar-width: none;
}
.tabs-header::-webkit-scrollbar { display: none; }

.tab-btn {
  padding: 14px 24px;
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gray-500);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  cursor: pointer;
  transition: all var(--transition);
  white-space: nowrap;
}

.tab-btn:hover { color: var(--charcoal); }

.tab-active {
  color: var(--charcoal) !important;
  border-bottom-color: var(--gold) !important;
}

.tab-content {
  padding: 36px 0;
}

.tab-fade-enter-active, .tab-fade-leave-active { transition: all 0.3s ease; }
.tab-fade-enter-from { opacity: 0; transform: translateY(10px); }
.tab-fade-leave-to   { opacity: 0; transform: translateY(-6px); }

/* ─── Description ─── */
.desc-text {
  font-family: var(--font-body);
  font-size: 13px;
  line-height: 1.9;
  color: #555;
  margin-bottom: 32px;
  max-width: 680px;
}

.specs-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  border: 1px solid rgba(26,26,26,0.08);
  border-radius: var(--radius-md);
  overflow: hidden;
}

@media (min-width: 768px) { .specs-grid { grid-template-columns: 1fr 1fr; } }

.spec-row {
  display: flex;
  justify-content: space-between;
  padding: 13px 18px;
  border-bottom: 1px solid rgba(26,26,26,0.06);
  gap: 16px;
}
.spec-row:last-child { border-bottom: none; }
.spec-row:nth-child(even) { background: var(--gray-100); }

.spec-label {
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 700;
  color: var(--gray-500);
  flex-shrink: 0;
}

.spec-value {
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  color: var(--charcoal);
  text-align: right;
}

/* ─── Care ─── */
.care-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (min-width: 768px) { .care-grid { grid-template-columns: repeat(4, 1fr); } }

.care-item {
  background: var(--white);
  border: 1px solid rgba(26,26,26,0.07);
  border-radius: var(--radius-md);
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all var(--transition);
}
.care-item:hover {
  border-color: rgba(212,175,55,0.25);
  box-shadow: 0 8px 24px rgba(212,175,55,0.08);
  transform: translateY(-2px);
}

.care-icon { width: 22px; height: 22px; color: var(--gold); }
.care-title {
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--charcoal);
}
.care-text {
  font-family: var(--font-body);
  font-size: 11px;
  line-height: 1.7;
  color: #777;
}

/* ─── Shipping ─── */
.shipping-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (min-width: 768px) { .shipping-grid { grid-template-columns: repeat(4, 1fr); } }

.ship-card {
  background: var(--white);
  border: 1px solid rgba(26,26,26,0.07);
  border-radius: var(--radius-md);
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all var(--transition);
}
.ship-card:hover {
  border-color: rgba(212,175,55,0.25);
  box-shadow: 0 8px 24px rgba(212,175,55,0.08);
  transform: translateY(-2px);
}

.ship-icon { width: 24px; height: 24px; color: var(--gold); }
.ship-name {
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--charcoal);
}
.ship-detail {
  font-family: var(--font-body);
  font-size: 11px;
  color: #777;
}
.ship-price {
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 800;
  color: var(--green);
}

/* ═══════════════════════════════
   STICKY MOBILE BAR
═══════════════════════════════ */
.mobile-sticky {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255,255,255,0.97);
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(26,26,26,0.08);
  padding: 12px 16px;
  z-index: 80;
  box-shadow: 0 -8px 32px rgba(0,0,0,0.1);
}

@media (min-width: 768px) { .mobile-sticky { display: none; } }

.sticky-price {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.sticky-name {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 13px;
  font-weight: 600;
  color: var(--charcoal);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sticky-pkr {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 800;
  color: var(--charcoal);
}

.sticky-actions {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.sticky-cart {
  width: 46px;
  height: 46px;
  background: var(--charcoal);
  border: none;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition);
}
.sticky-cart:hover { background: var(--gold); }
.sticky-cart-added { background: var(--green) !important; }
.sticky-cart:disabled { opacity: 0.4; cursor: not-allowed; }

.sticky-wa {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 0 16px;
  height: 46px;
  background: var(--wa-green);
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--white);
  cursor: pointer;
  transition: all var(--transition);
}
.sticky-wa:hover { background: var(--wa-dark); }

.sticky-icon { width: 18px; height: 18px; color: var(--white); }
</style>