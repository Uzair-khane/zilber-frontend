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
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image || null,
          description: product.description || '',
          size,
          quantity: qty
        })
      }
      this.saveToStorage()
    },

    removeFromCart(productId, size = null) {
      this.items = this.items.filter(item => !(item.id === productId && item.size === size))
      this.saveToStorage()
    },

    saveToStorage() {
      if (import.meta.client) {
        localStorage.setItem('zilber_cart', JSON.stringify(this.items))
      }
    },

    loadFromStorage() {
      if (import.meta.client) {
        const saved = localStorage.getItem('zilber_cart')
        if (saved) this.items = JSON.parse(saved)
      }
    }
  }
})