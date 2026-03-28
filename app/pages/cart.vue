<template>
  <div class="page-wrap">
    <div class="container">
      <div class="section-header">
        <h1 class="page-title">Your Cart</h1>
        <div class="divider"></div>
        
        <div v-if="cartStore.items.length === 0" class="empty-cart">
          <Icon name="lucide:shopping-bag" class="empty-icon" />
          <p class="placeholder-text">Your cart is currently empty.</p>
          <NuxtLink to="/" class="continue-btn">Continue Shopping</NuxtLink>
        </div>
        
        <div v-else class="cart-content">
          <div class="cart-items">
            <div v-for="item in cartStore.items" :key="item.id + '-' + item.size" class="cart-item">
              <div class="item-info">
                <h3 class="item-name">{{ item.name }}</h3>
                <p class="item-meta">Size: {{ item.size || 'N/A' }} | Qty: {{ item.quantity }}</p>
              </div>
              <div class="item-actions">
                <p class="item-price">PKR {{ (item.price * item.quantity).toLocaleString() }}</p>
                <button @click="cartStore.removeFromCart(item.id, item.size)" class="remove-btn">
                  <Icon name="lucide:trash-2" class="remove-icon" /> Remove
                </button>
              </div>
            </div>
          </div>
          
          <div class="cart-summary">
            <h3 class="summary-title">Order Summary</h3>
            <div class="summary-row">
              <span>Subtotal</span>
              <span>PKR {{ cartStore.totalPrice.toLocaleString() }}</span>
            </div>
            <div class="summary-row">
              <span>Delivery</span>
              <span>Calculated at checkout</span>
            </div>
            <div class="summary-divider"></div>
            <div class="summary-row summary-total">
              <span>Total</span>
              <span>PKR {{ cartStore.totalPrice.toLocaleString() }}</span>
            </div>
            <button class="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400;1,600&display=swap');
.page-wrap {
  background: #F7F4EF;
  min-height: 100vh;
  padding: 140px 0 96px;
}
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px;
}
.section-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}
.page-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(40px, 6vw, 64px);
  color: #1A1A1A;
  margin-bottom: 24px;
}
.divider {
  width: 60px;
  height: 2px;
  background: #D4AF37;
  margin: 0 auto 40px;
}
.empty-cart {
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.empty-icon {
  width: 64px;
  height: 64px;
  color: #C8C4BC;
}
.placeholder-text {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  color: #888;
  margin-bottom: 20px;
}
.continue-btn {
  background: #1A1A1A;
  color: #fff;
  padding: 14px 32px;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 4px;
  transition: background 0.3s;
}
.continue-btn:hover {
  background: #D4AF37;
}

/* Cart contents */
.cart-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
  text-align: left;
}
@media (min-width: 768px) {
  .cart-content {
    flex-direction: row;
    align-items: flex-start;
  }
}
.cart-items {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.item-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 24px;
  color: #1A1A1A;
  margin-bottom: 8px;
}
.item-meta {
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  color: #666;
}
.item-actions {
  text-align: right;
}
.item-price {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  color: #1A1A1A;
  margin-bottom: 12px;
}
.remove-btn {
  background: none;
  border: none;
  color: #C0392B;
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
}
.remove-icon {
  width: 14px;
  height: 14px;
}

/* Summary */
.cart-summary {
  background: #fff;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  min-width: 300px;
}
.summary-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 28px;
  color: #1A1A1A;
  margin-bottom: 24px;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
}
.summary-divider {
  height: 1px;
  background: #EDE9E0;
  margin: 20px 0;
}
.summary-total {
  font-weight: 700;
  color: #1A1A1A;
  font-size: 18px;
}
.checkout-btn {
  width: 100%;
  background: #1A1A1A;
  color: #fff;
  padding: 16px;
  border: none;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 24px;
  transition: background 0.3s;
}
.checkout-btn:hover {
  background: #D4AF37;
}
</style>
