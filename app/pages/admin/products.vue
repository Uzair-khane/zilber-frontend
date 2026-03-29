<template>
  <div class="min-h-screen bg-[#0A0A0A] text-white">
    <aside class="fixed left-0 top-0 h-full w-72 bg-[#0F0F0F] border-r border-white/[0.06] z-20 flex flex-col">
     <div class="p-2 border-b border-white/[0.06]">
  <div class="flex items-center -ml-5">
    <img 
      src="@/assets/images/logo.png" 
      alt="Zilber Logo" 
      class="w-36 h-28 object-contain"
    >
    <div>
      <p class="font-montserrat text-[11px] font-black tracking-[0.4em] uppercase text-[#D4AF37]">Zilber</p>
      <p class="font-montserrat text-[8px] tracking-[0.2em] uppercase text-white/30">Management</p>
    </div>
  </div>
</div>

      <nav class="flex-1 p-6 flex flex-col gap-2">
        <p class="font-montserrat text-[9px] font-bold tracking-[0.3em] uppercase text-white/20 mb-4 px-4">Workspace</p>
        
        <button @click="activeTab = 'products'" :class="[activeTab === 'products' ? 'bg-[#D4AF37]/10 border-[#D4AF37]/20 text-[#D4AF37]' : 'text-white/40 border-transparent hover:bg-white/[0.03] hover:text-white', 'flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-300 group']">
          <Icon name="lucide:layers" class="w-5 h-5" />
          <span class="font-montserrat text-[10px] font-bold tracking-widest uppercase">Inventory</span>
          <span class="ml-auto bg-white/5 text-[9px] px-2 py-0.5 rounded-md group-hover:bg-[#D4AF37]/20">{{ products.length }}</span>
        </button>

        <button @click="activeTab = 'add'; editMode = false; resetForm()" :class="[activeTab === 'add' ? 'bg-[#D4AF37]/10 border-[#D4AF37]/20 text-[#D4AF37]' : 'text-white/40 border-transparent hover:bg-white/[0.03] hover:text-white', 'flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-300']">
          <Icon name="lucide:plus-circle" class="w-5 h-5" />
          <span class="font-montserrat text-[10px] font-bold tracking-widest uppercase">New Product</span>
        </button>
      </nav>

      <div class="p-6 border-t border-white/[0.06] bg-white/[0.01]">
        <div class="flex items-center gap-4 px-4 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F5E6AD] p-[2px]">
            <div class="w-full h-full rounded-full bg-[#0F0F0F] flex items-center justify-center font-bold text-[#D4AF37] text-xs">A</div>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-montserrat text-[10px] font-bold text-white truncate">Uzair Admin</p>
            <p class="font-montserrat text-[8px] text-white/30 truncate">Verified Master</p>
          </div>
          <button @click="logout" class="hover:text-red-400 transition-colors text-white/20">
            <Icon name="lucide:log-out" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>

    <main class="ml-72 min-h-screen">
      <header class="sticky top-0 z-10 bg-[#0A0A0A]/90 backdrop-blur-2xl border-b border-white/[0.06] px-12 py-6 flex items-center justify-between">
        <div>
          <h1 class="font-cormorant italic text-3xl font-semibold tracking-tight">
            {{ activeTab === 'products' ? 'Catalog Overview' : editMode ? 'Modify Piece' : 'Create Masterpiece' }}
          </h1>
          <div class="flex items-center gap-2 mt-1">
             <span class="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]"></span>
             <p class="font-montserrat text-[9px] tracking-[0.2em] uppercase text-white/40">Zilber Premium System</p>
          </div>
        </div>
      </header>

      <div class="px-12 py-10">
        <div class="grid grid-cols-3 gap-6 mb-12">
          <div v-for="(stat, i) in stats" :key="i" class="bg-gradient-to-b from-white/[0.05] to-transparent border border-white/[0.06] rounded-[24px] p-6 hover:border-[#D4AF37]/30 transition-all duration-500">
            <p class="font-montserrat text-[9px] font-bold tracking-[0.2em] uppercase text-white/20 mb-4">{{ stat.label }}</p>
            <div class="flex items-baseline gap-2">
              <p class="font-cormorant italic text-4xl font-semibold">{{ stat.value }}</p>
              <span v-if="stat.suffix" class="font-montserrat text-[10px] text-[#D4AF37] font-bold">{{ stat.suffix }}</span>
            </div>
          </div>
        </div>

        <transition name="slide-up">
          <div v-if="activeTab === 'add'" class="max-w-4xl bg-[#111] border border-white/[0.08] rounded-[32px] p-10 mb-12 shadow-2xl">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="flex flex-col gap-4">
                <label class="font-montserrat text-[9px] font-bold tracking-[0.3em] uppercase text-white/30">Visual Identity</label>
                <div @click="$refs.fileInput.click()" class="relative aspect-square rounded-[24px] border-2 border-dashed border-white/[0.08] hover:border-[#D4AF37]/40 bg-white/[0.02] flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden group">
                   <img v-if="previewImage" :src="previewImage" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div v-else class="flex flex-col items-center gap-3">
                      <Icon name="lucide:image-plus" class="w-8 h-8 text-white/10 group-hover:text-[#D4AF37] transition-colors" />
                      <span class="font-montserrat text-[9px] font-bold tracking-widest uppercase text-white/20">Upload Photo</span>
                   </div>
                   <input ref="fileInput" type="file" @change="handleFileUpload" class="hidden" accept="image/*" />
                </div>
              </div>

              <div class="flex flex-col gap-6">
                <div class="space-y-4">
                  <div>
                    <label class="font-montserrat text-[9px] font-bold tracking-[0.2em] uppercase text-white/40 block mb-2 px-1">Product Title</label>
                    <input v-model="form.name" class="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 font-montserrat text-xs focus:border-[#D4AF37]/50 transition-all outline-none" placeholder="e.g. Peshawari Zalmi Gold" />
                  </div>
                  <div>
                    <label class="font-montserrat text-[9px] font-bold tracking-[0.2em] uppercase text-white/40 block mb-2 px-1">Valuation (PKR)</label>
                    <input v-model="form.price" type="number" class="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 font-montserrat text-xs focus:border-[#D4AF37]/50 transition-all outline-none" placeholder="Price Amount" />
                  </div>
                  <div>
                    <label class="font-montserrat text-[9px] font-bold tracking-[0.2em] uppercase text-white/40 block mb-2 px-1">Story / Description</label>
                    <textarea v-model="form.description" rows="4" class="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 font-montserrat text-xs focus:border-[#D4AF37]/50 transition-all outline-none resize-none" placeholder="Craftsmanship details..."></textarea>
                  </div>
                </div>

                <div class="flex gap-4 mt-4">
                  <button @click="saveProduct" :disabled="saving" class="flex-1 bg-[#D4AF37] text-black py-4 rounded-2xl font-montserrat text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-[#F5E6AD] transition-all shadow-[0_10px_30px_rgba(212,175,55,0.15)] disabled:opacity-50">
                    {{ saving ? 'Processing...' : editMode ? 'Commit Changes' : 'Confirm Product' }}
                  </button>
                  <button v-if="editMode" @click="cancelEdit" class="px-8 border border-white/10 rounded-2xl font-montserrat text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-red-500/10 hover:text-red-400 transition-all">Cancel</button>
                </div>
              </div>
            </div>
            
            <transition name="fade">
              <div v-if="formMsg.text" :class="[formMsg.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20', 'mt-8 p-4 rounded-2xl border text-center font-montserrat text-[10px] font-bold uppercase tracking-widest']">
                {{ formMsg.text }}
              </div>
            </transition>
          </div>
        </transition>

        <transition name="fade">
          <div v-if="activeTab === 'products'" class="bg-[#111] border border-white/[0.08] rounded-[32px] overflow-hidden shadow-2xl">
            <div class="px-8 py-6 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.01]">
               <p class="font-montserrat text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">Vault Inventory</p>
               <button @click="activeTab = 'add'; editMode = false; resetForm()" class="text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 hover:opacity-70 transition-opacity">
                  <Icon name="lucide:plus" class="w-4 h-4" /> Add New Item
               </button>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="text-white/20 border-b border-white/[0.04]">
                    <th class="px-8 py-5 font-montserrat text-[9px] font-bold uppercase tracking-widest">Masterpiece</th>
                    <th class="px-8 py-5 font-montserrat text-[9px] font-bold uppercase tracking-widest">Market Value</th>
                    <th class="px-8 py-5 font-montserrat text-[9px] font-bold uppercase tracking-widest text-right">Operations</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/[0.04]">
                  <tr v-for="product in products" :key="product.id" class="group hover:bg-white/[0.02] transition-all duration-500">
                    <td class="px-8 py-5">
                      <div class="flex items-center gap-5">
                        <div class="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
                          <img :src="getImageUrl(product.image)" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                        <div>
                          <p class="font-cormorant text-xl font-bold group-hover:text-[#D4AF37] transition-colors leading-none">{{ product.name }}</p>
                          <p class="font-montserrat text-[9px] text-white/20 mt-2 tracking-widest uppercase">ID: 00{{ product.id }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-8 py-5">
                      <span class="font-montserrat text-sm font-bold text-white">PKR {{ Number(product.price).toLocaleString() }}</span>
                    </td>
                    <td class="px-8 py-5">
                      <div class="flex justify-end gap-3">
                        <button @click="editProduct(product)" class="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/50 text-white/40 hover:text-[#D4AF37] transition-all">
                          <Icon name="lucide:edit-3" class="w-4 h-4" />
                        </button>
                        <button @click="deleteProduct(product.id)" class="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-red-500/10 hover:border-red-500/50 text-white/40 hover:text-red-500 transition-all">
                          <Icon name="lucide:trash-2" class="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <div v-if="products.length === 0" class="py-32 text-center flex flex-col items-center opacity-20">
                 <Icon name="lucide:box-select" class="w-16 h-16 mb-4" />
                 <p class="font-cormorant italic text-2xl">The collection is vacant</p>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </main>

    <transition name="modal">
      <div v-if="deleteConfirm.show" class="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div class="absolute inset-0 bg-black/80 backdrop-blur-md" @click="deleteConfirm.show = false"></div>
        <div class="relative bg-[#0F0F0F] border border-white/10 rounded-[32px] p-10 w-full max-w-sm shadow-3xl text-center">
          <div class="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
            <Icon name="lucide:alert-triangle" class="w-8 h-8 text-red-500" />
          </div>
          <h3 class="font-cormorant text-2xl font-bold mb-3">Expunge Item?</h3>
          <p class="font-montserrat text-[10px] text-white/40 mb-8 leading-relaxed uppercase tracking-widest">This item will be permanently removed from the royal catalog.</p>
          <div class="flex gap-4">
            <button @click="confirmDelete" class="flex-1 bg-red-500 text-white py-4 rounded-2xl font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-red-600 transition-all">Delete</button>
            <button @click="deleteConfirm.show = false" class="flex-1 border border-white/10 text-white/40 py-4 rounded-2xl font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/5 transition-all">Retain</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

definePageMeta({ middleware: 'admin', layout: 'blank' })

// State
const products = ref([])
const activeTab = ref('products')
const editMode = ref(false)
const editId = ref(null)
const saving = ref(false)
const formMsg = ref({ text: '', type: '' })
const deleteConfirm = ref({ show: false, id: null })

// Form & Image
const selectedFile = ref(null)
const previewImage = ref(null)
const form = ref({ name: '', price: '', image: '', description: '' })

// Computed Stats
const stats = computed(() => [
  { label: 'Total Pieces', value: products.value.length, suffix: 'Items' },
  { label: 'Avg Valuation', value: products.value.length ? Math.round(products.value.reduce((a, b) => a + Number(b.price), 0) / products.value.length).toLocaleString() : '0', suffix: 'PKR' },
  { label: 'Premium Tier', value: products.value.length ? Math.max(...products.value.map(p => Number(p.price))).toLocaleString() : '0', suffix: 'PKR' }
])

// Helpers
const getImageUrl = (path) => {
  if (!path) return '/placeholder.png'
  return path.startsWith('http') ? path : `http://localhost:5000/${path.replace(/^\/+/, '')}`
}

const token = () => localStorage.getItem('admin_token')

// Actions
const fetchProducts = async () => {
  try {
    products.value = await $fetch('http://localhost:5000/api/products')
  } catch (err) { console.error("Data fetch error", err) }
}

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
}

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
    const url = editMode.value ? `http://localhost:5000/api/products/${editId.value}` : 'http://localhost:5000/api/products'
    const method = editMode.value ? 'PUT' : 'POST'

    await $fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token()}` },
      body: formData
    })

    formMsg.value = { text: `Item ${editMode.value ? 'Updated' : 'Created'} Successfully!`, type: 'success' }
    setTimeout(() => {
      fetchProducts()
      activeTab.value = 'products'
      resetForm()
      editMode.value = false
    }, 1200)
  } catch (err) {
    formMsg.value = { text: 'Backend Sync Failed. Verify Multer config.', type: 'error' }
  } finally {
    saving.value = false
  }
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

const confirmDelete = async () => {
  try {
    await $fetch(`http://localhost:5000/api/products/${deleteConfirm.value.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token()}` }
    })
    deleteConfirm.value.show = false
    fetchProducts()
  } catch (err) { console.error("Delete failed") }
}

onMounted(fetchProducts)
</script>

<style scoped>
.font-cormorant { font-family: 'Cormorant Garamond', serif; }
.font-montserrat { font-family: 'Montserrat', sans-serif; }

.slide-up-enter-active, .slide-up-leave-active { transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-up-enter-from { opacity: 0; transform: translateY(30px); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.modal-enter-active, .modal-leave-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.modal-enter-from { opacity: 0; transform: scale(0.9); }
</style>