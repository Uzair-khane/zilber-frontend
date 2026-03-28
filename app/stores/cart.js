import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  },
  actions: {
    addToCart(product, size = null, qty = 1) {
      const existingItem = this.items.find(item => item.id === product.id && item.size === size)
      if (existingItem) {
        existingItem.quantity += qty
      } else {
        this.items.push({ ...product, size, quantity: qty })
      }
    },
    removeFromCart(productId, size = null) {
      this.items = this.items.filter(item => !(item.id === productId && item.size === size))
    }
  }
})
