export default defineNuxtRouteMiddleware(() => {
  if (import.meta.client) {          // ← yeh wrap zaroori hai
    const token = localStorage.getItem('admin_token')
    if (!token) {
      return navigateTo('/admin/login')
    }
  }
})