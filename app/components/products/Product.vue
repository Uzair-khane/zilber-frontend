<template>
  <div class="page-wrap">
    <div class="container">

      <!-- ─── Header ─── -->
      <div class="section-header">
        <div class="header-left">
          <p class="header-eyebrow">Zilber Premium Footwear</p>
          <h2 class="section-title">The Archive</h2>
          <p class="header-count">
            <span class="count-num">{{ filteredProducts.length }}</span>
            <span class="count-label">Handcrafted Masterpieces</span>
          </p>
        </div>

        <div class="controls-wrap">
          <!-- Search -->
          <div class="search-box">
            <Icon name="lucide:search" class="search-icon-left" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search chappals..."
              class="search-input"
              @input="onSearch"
            />
            <button
              v-if="searchQuery"
              class="search-clear"
              @click="searchQuery = ''"
              aria-label="Clear search"
            >
              <Icon name="lucide:x" class="clear-icon" />
            </button>
          </div>

          <!-- Category Pills -->
          <div class="cat-row">
            <button
              v-for="cat in categories"
              :key="cat"
              @click="activeCategory = cat"
              :class="['cat-pill', activeCategory === cat ? 'pill-active' : 'pill-inactive']"
            >
              {{ cat }}
            </button>
          </div>
        </div>
      </div>

      <!-- ─── Active Filter Banner ─── -->
      <div v-if="searchQuery || activeCategory !== 'All'" class="filter-banner">
        <Icon name="lucide:filter" class="banner-icon" />
        <span class="banner-text">
          Showing <strong>{{ filteredProducts.length }}</strong> results
          <template v-if="activeCategory !== 'All'"> in <strong>{{ activeCategory }}</strong></template>
          <template v-if="searchQuery"> for "<strong>{{ searchQuery }}</strong>"</template>
        </span>
        <button class="banner-clear" @click="clearAll">Clear All</button>
      </div>

      <!-- ─── Product Grid ─── -->
      <TransitionGroup name="product-fade" tag="div" class="product-grid">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="product-card"
        >
          <!-- Image Section -->
          <NuxtLink :to="`/product/${product.slug}`" class="card-img-wrap">
            <img
              src="@/assets/images/heroimage.png"
              :alt="product.name"
              class="card-img"
            />

            <!-- Gradient Overlay always visible at bottom -->
            <div class="card-gradient"></div>

            <!-- Hover CTA -->
            <div class="card-overlay">
              <div class="overlay-cta">
                <Icon name="lucide:eye" class="cta-icon" />
                <span>View Detail</span>
              </div>
            </div>

            <!-- Badges -->
            <div class="badges-row">
              <span v-if="product.isNew" class="badge badge-new">New</span>
              <span v-if="product.isBestseller" class="badge badge-best">Best Seller</span>
              <span v-if="product.discount" class="badge badge-sale">-{{ product.discount }}%</span>
            </div>

            <!-- Quick price on image bottom -->
            <div class="img-price">PKR {{ product.price.toLocaleString() }}</div>
          </NuxtLink>

          <!-- Card Info -->
          <div class="card-body">
            <div class="card-top">
              <span class="card-cat">{{ product.category }}</span>
              <div class="card-rating">
                <Icon name="lucide:star" class="star-icon" />
                <span class="rating-num">{{ product.rating }}</span>
              </div>
            </div>

            <h3 class="card-name">{{ product.name }}</h3>

            <div class="card-footer">
              <div class="price-block">
                <span class="price-main">PKR {{ product.price.toLocaleString() }}</span>
                <span v-if="product.originalPrice" class="price-old">
                  PKR {{ product.originalPrice.toLocaleString() }}
                </span>
              </div>

              <button
                @click.stop="handleAddToCart(product)"
                class="cart-btn"
                :class="{ 'in-cart': addedToCart.has(product.id) }"
                :aria-label="`Add ${product.name} to cart`"
              >
                <Icon
                  :name="addedToCart.has(product.id) ? 'lucide:check' : 'lucide:shopping-bag'"
                  class="cart-icon"
                />
              </button>
            </div>
          </div>
        </div>
      </TransitionGroup>

      <!-- ─── Empty State ─── -->
      <div v-if="filteredProducts.length === 0" class="empty-state">
        <div class="empty-illustration">
          <Icon name="lucide:search-x" class="empty-icon" />
        </div>
        <h3 class="empty-title">No results found</h3>
        <p class="empty-sub">
          We couldn't find anything for
          <em>"{{ searchQuery || activeCategory }}"</em>
        </p>
        <button class="empty-reset" @click="clearAll">Reset Filters</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const activeCategory = ref('All')
const addedToCart = ref(new Set())
const categories = ['All', 'Kaptan', 'Zalmi', 'Panjeedar', 'Suede', 'Exclusive']

const ratings = [4.5, 4.7, 4.8, 4.9, 5.0]
const discounts = [null, null, null, 10, 15, null, 20, null]
const bestsellers = [false, false, true, false, true, false, false, true]

const allProducts = ref(
  Array.from({ length: 45 }, (_, i) => {
    const cat = categories[(i % 5) + 1]
    const hasDiscount = discounts[i % discounts.length]
    const basePrice = 8500 + (i * 150)
    const originalPrice = hasDiscount ? Math.round(basePrice / (1 - hasDiscount / 100)) : null
    return {
      id: i + 1,
      name: `Zilber ${cat} - Edition ${String(i + 1).padStart(2, '0')}`,
      slug: `zilber-design-${i + 1}`,
      category: cat,
      price: basePrice,
      originalPrice,
      discount: hasDiscount,
      isNew: i < 8,
      isBestseller: bestsellers[i % bestsellers.length],
      rating: ratings[i % ratings.length],
      image: 'heroimage.png'
    }
  })
)

const filteredProducts = computed(() =>
  allProducts.value.filter(p => {
    const q = searchQuery.value.trim().toLowerCase()
    const matchesSearch = !q ||
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    const matchesCat = activeCategory.value === 'All' || p.category === activeCategory.value
    return matchesSearch && matchesCat
  })
)

const onSearch = () => {
  // search is reactive via v-model, this is just for future debounce
}

const clearAll = () => {
  searchQuery.value = ''
  activeCategory.value = 'All'
}

const handleAddToCart = (product) => {
  const s = new Set(addedToCart.value)
  s.add(product.id)
  addedToCart.value = s
  setTimeout(() => {
    const ns = new Set(addedToCart.value)
    ns.delete(product.id)
    addedToCart.value = ns
  }, 2000)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400;1,600&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

/* ─── PAGE ─── */
.page-wrap {
  background: #F7F4EF;
  min-height: 100vh;
  padding: 52px 0 96px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px;
}
@media (min-width: 768px) { .container { padding: 0 32px; } }
@media (min-width: 1024px) { .container { padding: 0 56px; } }

/* ─── HEADER ─── */
.section-header {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 40px;
}
@media (min-width: 1024px) {
  .section-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
}

.header-left { flex-shrink: 0; }

.header-eyebrow {
  font-family: 'Montserrat', sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #D4AF37;
  margin-bottom: 10px;
}

.section-title {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 600;
  font-size: clamp(44px, 7vw, 72px);
  color: #1A1A1A;
  letter-spacing: -0.02em;
  line-height: 1;
  margin-bottom: 12px;
}

.header-count {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.count-num {
  font-family: 'Cormorant Garamond', serif;
  font-size: 28px;
  font-weight: 600;
  color: #D4AF37;
}

.count-label {
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #888;
}

/* ─── CONTROLS ─── */
.controls-wrap {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
}
@media (min-width: 1024px) {
  .controls-wrap {
    align-items: flex-end;
    width: auto;
    min-width: 340px;
  }
}

/* Search */
.search-box {
  position: relative;
  width: 100%;
}
@media (min-width: 1024px) { .search-box { max-width: 320px; } }

.search-icon-left {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 15px;
  height: 15px;
  color: #aaa;
  pointer-events: none;
}

.search-input {
  width: 100%;
  background: #ffffff;
  border: 1.5px solid rgba(26, 26, 26, 0.1);
  border-radius: 6px;
  padding: 12px 40px 12px 40px;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #1A1A1A;
  outline: none;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.search-input::placeholder {
  color: #bbb;
  font-weight: 400;
}

.search-input:focus {
  border-color: #D4AF37;
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
}

.search-clear {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(26, 26, 26, 0.08);
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;
}

.search-clear:hover { background: rgba(26, 26, 26, 0.15); }

.clear-icon { width: 11px; height: 11px; color: #666; }

/* Category Pills */
.cat-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.cat-pill {
  padding: 8px 16px;
  border-radius: 100px;
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1.5px solid;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.pill-active {
  background: #1A1A1A;
  border-color: #1A1A1A;
  color: #FAF9F6;
  box-shadow: 0 4px 14px rgba(26, 26, 26, 0.2);
}

.pill-inactive {
  background: #fff;
  border-color: rgba(26, 26, 26, 0.12);
  color: #555;
}

.pill-inactive:hover {
  border-color: #D4AF37;
  color: #D4AF37;
  background: rgba(212, 175, 55, 0.04);
}

/* ─── FILTER BANNER ─── */
.filter-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(212, 175, 55, 0.08);
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 8px;
  padding: 10px 16px;
  margin-bottom: 28px;
}

.banner-icon {
  width: 14px;
  height: 14px;
  color: #D4AF37;
  flex-shrink: 0;
}

.banner-text {
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  color: #666;
  flex: 1;
}

.banner-text strong { color: #1A1A1A; font-weight: 700; }

.banner-clear {
  background: none;
  border: 1px solid rgba(26, 26, 26, 0.15);
  border-radius: 4px;
  padding: 4px 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #555;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.banner-clear:hover {
  border-color: #D4AF37;
  color: #D4AF37;
}

/* ─── GRID ─── */
.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  position: relative;
}

@media (min-width: 580px) {
  .product-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
}

@media (min-width: 768px) {
  .product-grid { grid-template-columns: repeat(3, 1fr); gap: 24px; }
}

@media (min-width: 1024px) {
  .product-grid { grid-template-columns: repeat(4, 1fr); gap: 28px; }
}

@media (min-width: 1280px) {
  .product-grid { grid-template-columns: repeat(5, 1fr); gap: 28px; }
}

/* ─── PRODUCT CARD ─── */
.product-card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(26, 26, 26, 0.06);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.06);
}

/* ─── CARD IMAGE ─── */
.card-img-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/5;
  display: block;
  background: #EDE9E0;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.8s ease;
}

.product-card:hover .card-img {
  transform: scale(1.07);
}

/* Gradient at bottom of image */
.card-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%);
  pointer-events: none;
}

/* Hover overlay */
.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(26, 26, 26, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.35s ease;
}

.product-card:hover .card-overlay { opacity: 1; }

.overlay-cta {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.95);
  color: #1A1A1A;
  padding: 10px 20px;
  border-radius: 100px;
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transform: translateY(12px) scale(0.95);
  transition: transform 0.35s ease;
}

.product-card:hover .overlay-cta {
  transform: translateY(0) scale(1);
}

.cta-icon { width: 13px; height: 13px; }

/* Badges */
.badges-row {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.badge {
  display: inline-block;
  padding: 3px 9px;
  font-family: 'Montserrat', sans-serif;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-radius: 4px;
}

.badge-new {
  background: #D4AF37;
  color: #1A1A1A;
}

.badge-best {
  background: #1A1A1A;
  color: #D4AF37;
}

.badge-sale {
  background: #C0392B;
  color: #fff;
}

/* Price on image */
.img-price {
  position: absolute;
  bottom: 12px;
  left: 12px;
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.02em;
  text-shadow: 0 1px 4px rgba(0,0,0,0.4);
}

/* ─── CARD BODY ─── */
.card-body {
  padding: 14px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex-grow: 1;
}

@media (min-width: 768px) { .card-body { padding: 16px; } }

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-cat {
  font-family: 'Montserrat', sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #D4AF37;
}

.card-rating {
  display: flex;
  align-items: center;
  gap: 3px;
}

.star-icon {
  width: 11px;
  height: 11px;
  color: #D4AF37;
  fill: #D4AF37;
}

.rating-num {
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  color: #888;
}

.card-name {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: clamp(15px, 1.8vw, 18px);
  font-weight: 600;
  color: #1A1A1A;
  line-height: 1.25;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  transition: color 0.25s ease;
}

.product-card:hover .card-name { color: #D4AF37; }

/* ─── CARD FOOTER ─── */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px solid rgba(26, 26, 26, 0.06);
}

.price-block {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.price-main {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(11px, 1.4vw, 13px);
  font-weight: 800;
  color: #1A1A1A;
  letter-spacing: 0.02em;
}

.price-old {
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 500;
  color: #bbb;
  text-decoration: line-through;
}

/* Cart Button */
.cart-btn {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1A1A1A;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
}

.cart-btn:hover {
  background: #D4AF37;
  transform: scale(1.08);
}

.cart-btn:active { transform: scale(0.95); }

.cart-btn.in-cart {
  background: #27AE60;
}

.cart-icon {
  width: 15px;
  height: 15px;
  color: #ffffff;
}

/* ─── EMPTY STATE ─── */
.empty-state {
  padding: 80px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.empty-illustration {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(26, 26, 26, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-icon {
  width: 32px;
  height: 32px;
  color: #bbb;
}

.empty-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 24px;
  font-weight: 600;
  color: #1A1A1A;
}

.empty-sub {
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  color: #999;
  line-height: 1.6;
}

.empty-sub em { color: #1A1A1A; font-style: normal; font-weight: 600; }

.empty-reset {
  margin-top: 8px;
  padding: 12px 28px;
  background: #1A1A1A;
  color: #FAF9F6;
  border: none;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.25s ease;
}

.empty-reset:hover { background: #D4AF37; color: #1A1A1A; }

/* ─── TRANSITIONS ─── */
.product-fade-move,
.product-fade-enter-active,
.product-fade-leave-active {
  transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-fade-enter-from,
.product-fade-leave-to {
  opacity: 0;
  transform: scale(0.94) translateY(12px);
}

.product-fade-leave-active { position: absolute; }
</style>