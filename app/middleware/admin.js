export default defineNuxtRouteMiddleware(() => {
  const token = localStorage.getItem('admin_token')
  if (!token) {
    return navigateTo('/admin/login')
  }
})