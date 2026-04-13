<template>
  <div class="min-h-screen relative overflow-hidden flex items-center justify-center bg-[#0D0D0D]">
    
    <!-- Animated background particles -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="particle particle-1"></div>
      <div class="particle particle-2"></div>
      <div class="particle particle-3"></div>
      <div class="particle particle-4"></div>
      <div class="particle particle-5"></div>
      <div class="particle particle-6"></div>
    </div>

    <!-- Gold radial glow -->
    <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 70%)"></div>

    <!-- Grid lines -->
    <div class="absolute inset-0 pointer-events-none opacity-[0.04]" style="background-image: linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px); background-size: 60px 60px;"></div>

    <!-- Card -->
    <div class="login-card relative z-10 w-full max-w-md mx-4">
      
      <!-- Top accent line -->
      <div class="h-[2px] w-full rounded-t-2xl overflow-hidden">
        <div class="h-full gold-line-anim"></div>
      </div>

      <div class="bg-[#111111] border border-white/[0.06] rounded-b-2xl p-10 shadow-2xl">
        
        <!-- Logo area -->
        <div class="flex items-center gap-3 mb-10 fade-in-up" style="animation-delay: 0.1s">
          <div class="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
            <div class="w-3 h-3 rounded-sm bg-[#D4AF37]"></div>
          </div>
          <div>
            <p class="font-montserrat text-[8px] font-bold tracking-[0.4em] uppercase text-[#D4AF37]">Zilber Premium</p>
            <p class="font-montserrat text-[8px] tracking-widest uppercase text-white/20">Footwear</p>
          </div>
        </div>

        <!-- Heading -->
        <div class="mb-10 fade-in-up" style="animation-delay: 0.2s">
          <h1 class="font-cormorant italic text-5xl font-semibold text-white leading-none mb-2">
            Admin <span class="text-[#D4AF37]">Portal</span>
          </h1>
          <p class="font-montserrat text-[10px] tracking-widest uppercase text-white/30">
            Secure access — authorized personnel only
          </p>
        </div>

        <!-- Form -->
        <div class="flex flex-col gap-5">

          <!-- Email field -->
          <div class="field-wrap fade-in-up" style="animation-delay: 0.3s">
            <label class="font-montserrat text-[9px] font-bold tracking-[0.3em] uppercase text-white/40 mb-2 block">
              Email Address
            </label>
            <div class="relative">
              <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 " fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/>
              </svg>
              <input
                v-model="email"
                type="email"
                placeholder="admin@zilber.com"
                :class="['w-full bg-white/[0.03] border rounded-xl pl-11 pr-4 py-3.5 font-montserrat text-xs text-white placeholder-white/20 outline-none transition-all duration-300',
                  emailFocused ? 'border-[#D4AF37]/60 bg-[#D4AF37]/[0.04] shadow-[0_0_20px_rgba(212,175,55,0.08)]' : 'border-white/[0.08] hover:border-white/[0.15]'
                ]"
                @focus="emailFocused = true"
                @blur="emailFocused = false"
              />
            </div>
          </div>

          <!-- Password field -->
          <div class="field-wrap fade-in-up" style="animation-delay: 0.4s">
            <label class="font-montserrat text-[9px] font-bold tracking-[0.3em] uppercase text-white/40 mb-2 block">
              Password
            </label>
            <div class="relative">
              <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 " fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                :class="['w-full bg-white/[0.03] border rounded-xl pl-11 pr-12 py-3.5 font-montserrat text-xs text-white placeholder-white/20 outline-none transition-all duration-300',
                  passFocused ? 'border-[#D4AF37]/60 bg-[#D4AF37]/[0.04] shadow-[0_0_20px_rgba(212,175,55,0.08)]' : 'border-white/[0.08] hover:border-white/[0.15]'
                ]"
                @focus="passFocused = true"
                @blur="passFocused = false"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
              >
                <svg v-if="!showPassword" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
                <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Error message -->
          <transition name="shake">
            <div v-if="error" class="flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <svg class="w-3.5 h-3.5 text-red-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p class="font-montserrat text-[10px] text-red-400">{{ error }}</p>
            </div>
          </transition>

          <!-- Login button -->
          <div class="fade-in-up" style="animation-delay: 0.5s">
            <button
              @click="login"
              :disabled="loading"
              class="relative w-full overflow-hidden rounded-xl py-4 font-montserrat text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-300 mt-1"
              :class="loading ? 'bg-[#D4AF37]/50 cursor-not-allowed text-black/50' : 'bg-[#D4AF37] hover:bg-[#E8C547] text-black shadow-[0_8px_32px_rgba(212,175,55,0.25)] hover:shadow-[0_8px_40px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 active:translate-y-0'"
            >
              <span v-if="!loading" class="flex items-center justify-center gap-2">
                Access Dashboard
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg class="w-3.5 h-3.5 animate-spin" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
                Authenticating...
              </span>
            </button>
          </div>

        </div>

        <!-- Footer -->
        <div class="mt-10 pt-6 border-t border-white/[0.06] flex items-center justify-between fade-in-up" style="animation-delay: 0.6s">
          <p class="font-montserrat text-[8px] tracking-widest uppercase text-white/15">
            © 2026 Zilber Premium
          </p>
          <div class="flex items-center gap-1.5">
            <div class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
            <p class="font-montserrat text-[8px] tracking-widest uppercase text-white/20">
              Secured
            </p>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
definePageMeta({
  layout: 'blank'
})
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const showPassword = ref(false)
const emailFocused = ref(false)
const passFocused = ref(false)
const config = useRuntimeConfig()
const API_URL = config.public.apiUrl
// login function ke andar is tarah likhein:
const login = async () => {
  if (!email.value || !password.value) {
    error.value = 'Please fill in all fields.'
    return
  }
  error.value = ''
  loading.value = true

  try {
    // API_URL variable ko use karne ke bajaye directly config use karein
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      baseURL: config.public.apiUrl, // <--- Yeh sab se important hai
      body: { 
        email: email.value, 
        password: password.value 
      }
    })

    localStorage.setItem('admin_token', res.token)
    await navigateTo('/admin/products')
  } catch (err) {
    console.error("Fetch Error:", err)
    error.value = 'Invalid email or password. Please try again.'
  } finally {
    loading.value = false
  }
}
console.log('ENV:', process.env.NUXT_PUBLIC_API_URL)
console.log('CONFIG:', config.public.apiUrl)
</script>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes goldLine {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
  50%       { transform: translateY(-30px) rotate(180deg); opacity: 0.8; }
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-6px); }
  40%       { transform: translateX(6px); }
  60%       { transform: translateX(-4px); }
  80%       { transform: translateX(4px); }
}

.fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
}
.login-card {
  animation: fadeInUp 0.5s ease forwards;
}
.gold-line-anim {
  background: linear-gradient(90deg, transparent, #D4AF37, #F5D87A, #D4AF37, transparent);
  animation: goldLine 2.5s ease-in-out infinite;
}

/* Particles */
.particle {
  position: absolute;
  border-radius: 50%;
  background: #D4AF37;
  opacity: 0.15;
  animation: float linear infinite;
}
.particle-1 { width: 4px; height: 4px; top: 15%; left: 10%; animation-duration: 8s; animation-delay: 0s; }
.particle-2 { width: 3px; height: 3px; top: 70%; left: 20%; animation-duration: 10s; animation-delay: 2s; }
.particle-3 { width: 5px; height: 5px; top: 30%; left: 80%; animation-duration: 7s; animation-delay: 1s; }
.particle-4 { width: 3px; height: 3px; top: 80%; left: 70%; animation-duration: 9s; animation-delay: 3s; }
.particle-5 { width: 4px; height: 4px; top: 50%; left: 90%; animation-duration: 11s; animation-delay: 0.5s; }
.particle-6 { width: 3px; height: 3px; top: 10%; left: 60%; animation-duration: 6s; animation-delay: 1.5s; }

/* Shake transition */
.shake-enter-active { animation: shake 0.4s ease; }
</style>