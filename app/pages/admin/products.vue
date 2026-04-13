<template>
  <div class="min-h-screen bg-[#0A0A0A] text-white">
    <aside class="fixed left-0 top-0 h-full w-64 bg-[#0F0F0F] border-r border-white/[0.06] z-20 flex flex-col">
      <div class="p-4 border-b border-white/[0.06]">
        <div class="flex items-center -ml-2">
          <img src="@/assets/images/logo.png" alt="Logo" class="w-28 h-20 object-contain" />
          <div class="-ml-2">
            <p class="font-montserrat text-[10px] font-black tracking-[0.3em] uppercase text-[#D4AF37]">Zilber</p>
            <p class="font-montserrat text-[7px] tracking-[0.2em] uppercase text-white/30">Management</p>
          </div>
        </div>
      </div>

      <nav class="flex-1 p-4 flex flex-col gap-1.5">
        <p class="font-montserrat text-[8px] font-bold tracking-[0.3em] uppercase text-white/20 mb-2 px-3">Workspace</p>
        
        <button @click="activeTab = 'products'" :class="[activeTab === 'products' ? 'bg-[#D4AF37]/10 border-[#D4AF37]/20 text-[#D4AF37]' : 'text-white/40 border-transparent hover:bg-white/[0.03] hover:text-white', 'flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 group']">
          <Icon name="lucide:layers" class="w-4 h-4" />
          <span class="font-montserrat text-[9px] font-bold tracking-widest uppercase">Inventory</span>
          <span class="ml-auto bg-white/5 text-[8px] px-1.5 py-0.5 rounded group-hover:bg-[#D4AF37]/20">{{ products.length }}</span>
        </button>

        <button @click="activeTab = 'add'; editMode = false; resetForm()" :class="[activeTab === 'add' ? 'bg-[#D4AF37]/10 border-[#D4AF37]/20 text-[#D4AF37]' : 'text-white/40 border-transparent hover:bg-white/[0.03] hover:text-white', 'flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300']">
          <Icon name="lucide:plus-circle" class="w-4 h-4" />
          <span class="font-montserrat text-[9px] font-bold tracking-widest uppercase">New Product</span>
        </button>

        <button @click="activeTab = 'orders'" :class="[activeTab === 'orders' ? 'bg-[#D4AF37]/10 border-[#D4AF37]/20 text-[#D4AF37]' : 'text-white/40 border-transparent hover:bg-white/[0.03] hover:text-white', 'flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 group']">
          <Icon name="lucide:shopping-bag" class="w-4 h-4" />
          <span class="font-montserrat text-[9px] font-bold tracking-widest uppercase">Orders</span>
          <span class="ml-auto bg-red-500/20 text-red-400 text-[8px] px-1.5 py-0.5 rounded-full">{{ orders.length }}</span>
        </button>
      </nav>

      <div class="p-4 border-t border-white/[0.06] bg-white/[0.01]">
        <div class="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F5E6AD] p-[1px]">
            <div class="w-full h-full rounded-full bg-[#0F0F0F] flex items-center justify-center font-bold text-[#D4AF37] text-[10px]">A</div>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-montserrat text-[9px] font-bold text-white truncate">Uzair Admin</p>
            <p class="font-montserrat text-[7px] text-white/30 truncate uppercase">Verified Master</p>
          </div>
          <button @click="logout" class="hover:text-red-400 transition-colors text-white/20">
            <Icon name="lucide:log-out" class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>

    <main class="ml-64 min-h-screen">
      <header class="sticky top-0 z-10 bg-[#0A0A0A]/90 backdrop-blur-2xl border-b border-white/[0.06] px-10 py-6 flex items-center justify-between">
        <div>
          <h1 class="font-cormorant italic text-2xl font-semibold tracking-tight">
            {{ activeTab === 'products' ? 'Catalog Overview' : activeTab === 'orders' ? 'Order Management' : editMode ? 'Modify Piece' : 'Create Masterpiece' }}
          </h1>
          <div class="flex items-center gap-2 mt-0.5">
             <span class="w-1 h-1 rounded-full bg-[#D4AF37]"></span>
             <p class="font-montserrat text-[8px] tracking-[0.2em] uppercase text-white/40">Zilber Premium System</p>
          </div>
        </div>
      </header>

      <div class="px-10 py-8">
        <div class="grid grid-cols-3 gap-5 mb-10">
          <div v-for="(stat, i) in stats" :key="i" class="bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] rounded-2xl p-5 hover:border-[#D4AF37]/30 transition-all duration-500">
            <p class="font-montserrat text-[8px] font-bold tracking-[0.2em] uppercase text-white/20 mb-3">{{ stat.label }}</p>
            <div class="flex items-baseline gap-2">
              <p class="font-cormorant italic text-3xl font-semibold">{{ stat.value }}</p>
              <span v-if="stat.suffix" class="font-montserrat text-[8px] text-[#D4AF37] font-bold">{{ stat.suffix }}</span>
            </div>
          </div>
        </div>

        <transition name="slide-up">
          <div v-if="activeTab === 'add'" class="max-w-4xl bg-[#111] border border-white/[0.08] rounded-[24px] p-8 mb-10 shadow-2xl">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="flex flex-col gap-4">
                <label class="font-montserrat text-[8px] font-bold tracking-[0.3em] uppercase text-white/30">Visual Identity</label>
                <div @click="$refs.fileInput.click()" class="relative aspect-square rounded-[20px] border border-dashed border-white/[0.08] hover:border-[#D4AF37]/40 bg-white/[0.02] flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden group">
                   <img v-if="previewImage" :src="previewImage" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div v-else class="flex flex-col items-center gap-3">
                      <Icon name="lucide:image-plus" class="w-6 h-6 text-white/10 group-hover:text-[#D4AF37] transition-colors" />
                      <span class="font-montserrat text-[8px] font-bold tracking-widest uppercase text-white/20">Upload Photo</span>
                   </div>
                   <input ref="fileInput" type="file" @change="handleFileUpload" class="hidden" accept="image/*" />
                </div>
              </div>

              <div class="flex flex-col gap-5">
                <div class="space-y-4">
                  <div>
                    <label class="font-montserrat text-[8px] font-bold tracking-[0.2em] uppercase text-white/40 block mb-2">Product Title</label>
                    <input v-model="form.name" class="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 font-montserrat text-[11px] focus:border-[#D4AF37]/50 transition-all outline-none" placeholder="e.g. Peshawari Zalmi Gold" />
                  </div>
                  <div>
                    <label class="font-montserrat text-[8px] font-bold tracking-[0.2em] uppercase text-white/40 block mb-2">Valuation (PKR)</label>
                    <input v-model="form.price" type="number" class="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 font-montserrat text-[11px] focus:border-[#D4AF37]/50 transition-all outline-none" placeholder="Price Amount" />
                  </div>
                  <div>
                    <label class="font-montserrat text-[8px] font-bold tracking-[0.2em] uppercase text-white/40 block mb-2">Story / Description</label>
                    <textarea v-model="form.description" rows="3" class="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 font-montserrat text-[11px] focus:border-[#D4AF37]/50 transition-all outline-none resize-none" placeholder="Craftsmanship details..."></textarea>
                  </div>
                </div>

                <div class="flex gap-3 mt-2">
                  <button @click="saveProduct" :disabled="saving" class="flex-1 bg-[#D4AF37] text-black py-3.5 rounded-xl font-montserrat text-[9px] font-bold tracking-[0.3em] uppercase hover:bg-[#F5E6AD] transition-all disabled:opacity-50">
                    {{ saving ? 'Processing...' : editMode ? 'Commit Changes' : 'Confirm Product' }}
                  </button>
                  <button v-if="editMode" @click="cancelEdit" class="px-6 border border-white/10 rounded-xl font-montserrat text-[9px] font-bold tracking-[0.3em] uppercase hover:bg-red-500/10 hover:text-red-400 transition-all">Cancel</button>
                </div>
              </div>
            </div>
            
            <transition name="fade">
              <div v-if="formMsg.text" :class="[formMsg.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20', 'mt-6 p-3 rounded-xl border text-center font-montserrat text-[9px] font-bold uppercase tracking-widest']">
                {{ formMsg.text }}
              </div>
            </transition>
          </div>
        </transition>

        <transition name="fade">
          <div v-if="activeTab === 'products'" class="bg-[#111] border border-white/[0.08] rounded-[24px] overflow-hidden shadow-2xl">
            <div class="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.01]">
               <p class="font-montserrat text-[9px] font-bold tracking-[0.3em] uppercase text-white/40">Vault Inventory</p>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="text-white/20 border-b border-white/[0.04]">
                    <th class="px-6 py-4 font-montserrat text-[8px] font-bold uppercase tracking-widest">Masterpiece</th>
                    <th class="px-6 py-4 font-montserrat text-[8px] font-bold uppercase tracking-widest">Market Value</th>
                    <th class="px-6 py-4 font-montserrat text-[8px] font-bold uppercase tracking-widest text-right">Operations</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/[0.04]">
                  <tr v-for="product in products" :key="product.id" class="group hover:bg-white/[0.01] transition-all">
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl overflow-hidden border border-white/10">
                          <img :src="getImageUrl(product.image)" class="w-full h-full object-cover transition-transform group-hover:scale-110" />
                        </div>
                        <div>
                          <p class="font-cormorant text-lg font-bold group-hover:text-[#D4AF37] transition-colors leading-none">{{ product.name }}</p>
                          <p class="font-montserrat text-[8px] text-white/20 mt-1">ID: 00{{ product.id }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span class="font-montserrat text-xs font-bold text-white">PKR {{ Number(product.price).toLocaleString() }}</span>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex justify-end gap-2">
                        <button @click="editProduct(product)" class="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 hover:text-[#D4AF37] transition-all">
                          <Icon name="lucide:edit-3" class="w-3.5 h-3.5" />
                        </button>
                        <button @click="deleteProduct(product.id)" class="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 hover:text-red-500 transition-all">
                          <Icon name="lucide:trash-2" class="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="products.length === 0" class="py-24 text-center opacity-20">
                 <Icon name="lucide:box-select" class="w-12 h-12 mb-3 mx-auto" />
                 <p class="font-cormorant italic text-xl">The collection is vacant</p>
              </div>
            </div>
          </div>
        </transition>

        <transition name="slide-up">
          <div v-if="activeTab === 'orders'" class="bg-[#111] border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl">
            <div class="px-6 py-4 border-b border-white/[0.06] flex items-center gap-3">
              <div class="w-0.5 h-4 bg-[#D4AF37]"></div>
              <p class="font-montserrat text-[9px] font-bold tracking-[0.3em] uppercase text-white/40">All Orders</p>
            </div>
            <div class="divide-y divide-white/[0.04]">
              <div v-for="order in orders" :key="order.id" class="p-6 hover:bg-white/[0.01] transition-colors">
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <div class="flex items-center gap-3 mb-1.5">
                      <span class="font-montserrat text-[9px] font-bold text-white/20">#{{ order.id }}</span>
                      <span :class="[
                        'px-2.5 py-0.5 rounded-full font-montserrat text-[7px] font-bold uppercase tracking-widest',
                        order.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        order.status === 'confirmed' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        order.status === 'shipped' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                        order.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        'bg-red-500/10 text-red-400 border border-red-500/20'
                      ]">{{ order.status }}</span>
                    </div>
                    <h3 class="font-cormorant italic text-xl text-white">{{ order.customer_name }}</h3>
                    <p class="font-montserrat text-[8px] text-white/30 mt-0.5">
                      {{ order.customer_phone }} · {{ order.customer_city }}
                    </p>
                    <p class="font-montserrat text-[8px] text-white/20 mt-0.5">{{ order.customer_address }}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-montserrat text-lg font-black text-[#D4AF37]">Rs. {{ Number(order.total_price).toLocaleString() }}</p>
                    <p class="font-montserrat text-[7px] text-white/20 mt-1 uppercase">
                      {{ new Date(order.created_at).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' }) }}
                    </p>
                  </div>
                </div>

                <div class="flex flex-wrap gap-2 mb-4">
                  <div v-for="item in order.items" :key="item.id" class="flex items-center gap-2 bg-white/[0.02] border border-white/[0.05] rounded-lg px-3 py-2">
                    <img v-if="item.image" :src="item.image" class="w-7 h-7 rounded object-cover" />
                    <div>
                      <p class="font-montserrat text-[8px] font-bold text-white/50">{{ item.name }}</p>
                      <p class="font-montserrat text-[7px] text-white/25">UK {{ item.size }} · Qty {{ item.quantity }}</p>
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <select :value="order.status" @change="updateStatus(order.id, $event.target.value)" class="bg-white/[0.04] border border-white/[0.08] text-white/60 rounded-lg px-3 py-2 font-montserrat text-[8px] uppercase tracking-widest outline-none">
                    <option v-for="s in statusOptions" :key="s" :value="s" class="bg-[#111]">{{ s }}</option>
                  </select>
                  <button @click="deleteOrder(order.id)" class="flex items-center gap-1.5 px-3.5 py-2 bg-red-500/5 border border-red-500/10 text-red-400/50 rounded-lg font-montserrat text-[7px] font-bold tracking-widest uppercase hover:bg-red-500/10 hover:text-red-400 transition-all">
                    Delete Order
                  </button>
                </div>
              </div>
            </div>
            <div v-if="orders.length === 0" class="py-20 text-center opacity-20">
              <p class="font-cormorant italic text-xl text-white">No orders yet</p>
            </div>
          </div>
        </transition>
      </div>
    </main>

    <transition name="modal">
      <div v-if="deleteConfirm.show" class="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div class="absolute inset-0 bg-black/80 backdrop-blur-md" @click="deleteConfirm.show = false"></div>
        <div class="relative bg-[#0F0F0F] border border-white/10 rounded-[24px] p-8 w-full max-w-xs text-center shadow-3xl">
          <Icon name="lucide:alert-triangle" class="w-10 h-10 text-red-500 mx-auto mb-4" />
          <h3 class="font-cormorant text-xl font-bold mb-2">Expunge Item?</h3>
          <p class="font-montserrat text-[8px] text-white/40 mb-6 uppercase tracking-widest">This action is irreversible.</p>
          <div class="flex gap-3">
            <button @click="confirmDelete" class="flex-1 bg-red-500 text-white py-3 rounded-xl font-montserrat text-[8px] font-bold uppercase tracking-widest">Delete</button>
            <button @click="deleteConfirm.show = false" class="flex-1 border border-white/10 py-3 rounded-xl font-montserrat text-[8px] font-bold uppercase tracking-widest">Retain</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

definePageMeta({ middleware: 'admin', layout: 'blank' })

// ✅ Live API URL
const config = useRuntimeConfig()
const API_URL = config.public.apiUrl ?? 'http://72.61.124.30/api2'

// STATE
const products = ref([])
const orders = ref([])
const activeTab = ref('products')
const editMode = ref(false)
const editId = ref(null)
const saving = ref(false)
const formMsg = ref({ text: '', type: '' })
const deleteConfirm = ref({ show: false, id: null })
const statusOptions = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']
const selectedFile = ref(null)
const previewImage = ref(null)
const form = ref({ name: '', price: '', image: '', description: '' })

// HELPERS
const token = () => localStorage.getItem('admin_token')


const getImageUrl = (path) => {
  if (!path) return '/placeholder.png'
  if (path.startsWith('http')) return path
  const baseUrl = config.public.apiUrl.replace(/\/$/, '')
  const cleanPath = path.replace(/^\/+/, '')
  if (!cleanPath.startsWith('uploads/')) {
    return `${baseUrl}uploads/${cleanPath}`
  }

  return `${baseUrl}/${cleanPath}`
}

//  Products live se fetch karo
const fetchProducts = async () => {
  try { products.value = await $fetch(API_URL + 'api/products') }
  catch (err) { console.error('Product fetch failed', err) }
}

//  Orders live se fetch karo
const fetchOrders = async () => {
  try {
    orders.value = await $fetch(API_URL + 'api/orders', {
      headers: { Authorization: 'Bearer ' + token() }
    })
  } catch (err) { console.error('Order fetch failed', err) }
}

// LOGOUT
const logout = () => {
  localStorage.removeItem('admin_token')
  window.location.href = '/admin/login'
}

//  Product save — live server pe
const saveProduct = async () => {
  if (!form.value.name || !form.value.price) {
    formMsg.value = { text: 'Identity and Valuation are required.', type: 'error' }
    return
  }
  saving.value = true
  const formData = new FormData()
  formData.append('name', form.value.name)
  formData.append('price', form.value.price)
  formData.append('description', form.value.description)
  if (selectedFile.value) formData.append('image', selectedFile.value)
  else if (editMode.value) formData.append('image', form.value.image)

  try {
    const url = editMode.value
      ? API_URL + 'api/products/' + editId.value
      : API_URL + 'api/products'
    await $fetch(url, {
      method: editMode.value ? 'PUT' : 'POST',
      headers: { Authorization: 'Bearer ' + token() },
      body: formData
    })
    formMsg.value = { text: 'Item ' + (editMode.value ? 'Updated' : 'Created') + ' Successfully!', type: 'success' }
    setTimeout(() => {
      fetchProducts()
      activeTab.value = 'products'
      resetForm()
    }, 1200)
  } catch (err) {
    formMsg.value = { text: 'Backend Sync Failed.', type: 'error' }
  } finally {
    saving.value = false
  }
}

//  Order status update — live
const updateStatus = async (orderId, status) => {
  await $fetch(API_URL + 'api/orders/' + orderId + '/status', {
    method: 'PUT',
    headers: { Authorization: 'Bearer ' + token() },
    body: { status }
  })
  fetchOrders()
}

//  Order delete — live
const deleteOrder = async (id) => {
  if (confirm('Delete this order?')) {
    await $fetch(API_URL + 'api/orders/' + id, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + token() }
    })
    fetchOrders()
  }
}

// FILE HANDLING
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    previewImage.value = URL.createObjectURL(file)
  }
}

const resetForm = () => {
  form.value = { name: '', price: '', image: '', description: '' }
  selectedFile.value = null
  previewImage.value = null
  formMsg.value = { text: '', type: '' }
  editMode.value = false
}

const editProduct = (product) => {
  editMode.value = true
  editId.value = product.id
  form.value = { ...product }
  previewImage.value = getImageUrl(product.image)
  activeTab.value = 'add'
}

const cancelEdit = () => {
  editMode.value = false
  resetForm()
  activeTab.value = 'products'
}

const deleteProduct = (id) => { deleteConfirm.value = { show: true, id } }

// ✅ Product delete — live
const confirmDelete = async () => {
  try {
    // Sahi URL format: /api/products/5
    await $fetch(`/api/products/${deleteConfirm.value.id}`, {
      method: 'DELETE',
      baseURL: config.public.apiUrl, // config.public.apiUrl use karein jo .env se aa raha hai
      headers: { 
        Authorization: 'Bearer ' + token() 
      }
    })

    deleteConfirm.value.show = false
    fetchProducts()
  } catch (err) { 
    console.error('Delete failed:', err) 
  }
}
// STATS
const stats = computed(() => [
  { label: 'Total Pieces', value: products.value.length, suffix: 'Items' },
  { label: 'Active Orders', value: orders.value.length, suffix: 'Orders' },
  { label: 'Avg Valuation', value: products.value.length ? Math.round(products.value.reduce((a, b) => a + Number(b.price), 0) / products.value.length).toLocaleString() : '0', suffix: 'PKR' }
])

onMounted(() => {
  fetchProducts()
  fetchOrders()
})
</script>

<style scoped>
.font-cormorant { font-family: 'Cormorant Garamond', serif; }
.font-montserrat { font-family: 'Montserrat', sans-serif; }
.slide-up-enter-active { transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-up-enter-from { opacity: 0; transform: translateY(30px); }
.fade-enter-active { transition: opacity 0.3s ease; }
.fade-enter-from { opacity: 0; }
.modal-enter-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.modal-enter-from { opacity: 0; transform: scale(0.9); }
</style>