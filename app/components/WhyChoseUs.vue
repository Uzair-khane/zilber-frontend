<template>
  <section class="w-full bg-[#F7F4EF] py-16 px-4 md:px-10">

    <div class="max-w-6xl mx-auto mb-12 text-center">
      <p class="bg-gray-100 text-slate-700 rounded-md px-2 py-1 font-montserrat text-[9px] font-bold uppercase tracking-[0.2em]">
        ZILBER EXCLUSIVE
      </p>
    </div>

    <div class="max-w-6xl mx-auto">

      <div class="text-center mb-10">
        <h3 class="text-2xl font-montserrat md:text-3xl font-semibold text-[#1A1A1A]">
          Why Choose <span class="text-[#414040]">Zilber</span>?
        </h3>
        <p class="text-gray-600 mt-3 max-w-xl mx-auto">
          Crafted with precision, powered by tradition — Zilber delivers timeless footwear that blends luxury with everyday comfort.
        </p>
      </div>

      <!-- Table Card -->
      <div class="overflow-hidden rounded-2xl border border-[#E8E2D9] bg-white">
        <table class="w-full">

          <thead>
            <tr class="border-b border-[#E8E2D9]">
              <th class="p-5 text-left text-xs uppercase tracking-[0.2em] text-[#9A8C7A] font-semibold">
                Feature
              </th>
              <th class="p-5 text-center text-xs uppercase tracking-[0.2em] text-[#9A8C7A] font-semibold">
                Zilber
              </th>
              <th class="p-5 text-center text-xs uppercase tracking-[0.2em] text-[#9A8C7A] font-semibold">
                Others
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(item, i) in features"
              :key="i"
              class="border-t border-[#F0EBE3] hover:bg-[#FDFAF6] transition-colors duration-200"
            >
              <td class="p-5 text-[15px] text-[#2C2420] font-medium">
                {{ item.label }}
              </td>

              <!-- Zilber -->
              <td class="p-5">
                <div class="flex justify-center">
                  <span
                    v-if="item.brand"
                    class="w-7 h-7 rounded-full flex items-center justify-center text-[#000000] border border-[#999897] bg-[#D4AF37]/8 text-sm"
                  >✓</span>
                  <span
                    v-else
                    class="w-7 h-7 rounded-full flex items-center justify-center text-[#C4B5A5] border border-[#E8E2D9] text-sm"
                  >✕</span>
                </div>
              </td>

              <!-- Others -->
              <td class="p-5">
                <div class="flex justify-center">
                  <span
                    v-if="item.others"
                    class="w-7 h-7 rounded-full flex items-center justify-center text-[#000000] border border-[#999897] bg-[#D4AF37]/8 text-sm"
                  >✓</span>
                  <span
                    v-else
                    class="w-7 h-7 rounded-full flex items-center justify-center text-[#000000] border border-[#999897] bg-[#D4AF37]/8 text-sm"
                  >✕</span>
                </div>
              </td>
            </tr>
          </tbody>

        </table>

        <!-- Footer strip -->
        <div class="px-5 py-4 bg-[#FDFAF6] border-t border-[#F0EBE3] flex items-center gap-3">
          <div class="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
          <p class="text-xs text-[#9A8C7A] tracking-wide italic">
            Experience craftsmanship that speaks for itself.
          </p>
        </div>

      </div>

    </div>

  </section>
</template>

<script setup>
const features = [
  { label: 'Premium Quality Material', brand: true, others: false },
  { label: 'Authentic Craftsmanship', brand: true, others: false },
  { label: 'Fast & Secure Delivery', brand: true, others: false },
  { label: 'Customer Support', brand: true, others: true },
  { label: 'Easy Returns', brand: true, others: true },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&display=swap');
.font-serif {
  font-family: 'Cormorant Garamond', serif;
}
</style>