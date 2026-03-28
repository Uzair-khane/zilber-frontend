<template>
  <section class="w-full bg-[#F7F4EF] py-16 px-4 md:px-10">

    <!-- Header -->
    <div class="max-w-6xl mx-auto mb-12 text-center">
      
      <p class="text-xs uppercase tracking-[0.3em] text-[#B8960E] mb-3 font-semibold">
        ZILBER EXCLUSIVE
      </p>

    

    </div>

    <!-- Why Choose Us -->
    <div class="max-w-6xl mx-auto">

      <div class="text-center mb-10">
        <h3 class="text-2xl md:text-3xl font-semibold text-[#1A1A1A]">
          Why Choose <span class="text-[#D4AF37]">Zilber</span>?
        </h3>

        <p class="text-gray-600 mt-3 max-w-xl mx-auto">
          Crafted with precision, powered by tradition — Zilber delivers timeless footwear that blends luxury with everyday comfort.
        </p>
      </div>

      <!-- Table Card -->
      <div class="overflow-hidden rounded-2xl shadow-xl border border-gray-200 bg-white/80 backdrop-blur">

        <table class="w-full">

          <!-- Head -->
          <thead class="bg-[#1A1A1A] text-white">
            <tr class="text-sm uppercase tracking-wider">
              <th class="p-5 text-left">Feature</th>
              <th class="p-5 text-center text-[#D4AF37]">Zilber</th>
              <th class="p-5 text-center text-gray-300">Others</th>
            </tr>
          </thead>

          <!-- Body -->
          <tbody>
            <tr
              v-for="(item, i) in features"
              :key="i"
              class="border-t hover:bg-[#F9F7F2] transition duration-300 group"
            >
              <td class="p-5 font-medium text-gray-800 group-hover:translate-x-1 transition">
                {{ item.label }}
              </td>

              <!-- Zilber -->
              <td class="p-5 text-center">
                <span
                  v-if="item.brand"
                  class="flex items-center justify-center w-8 h-8 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-lg shadow-sm"
                >
                  ✓
                </span>
                <span
                  v-else
                  class="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-500 text-lg"
                >
                  ✕
                </span>
              </td>

              <!-- Others -->
              <td class="p-5 text-center">
                <span
                  v-if="item.others"
                  class="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 text-lg"
                >
                  ✓
                </span>
                <span
                  v-else
                  class="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-500 text-lg"
                >
                  ✕
                </span>
              </td>

            </tr>
          </tbody>

        </table>
      </div>

      <!-- Bottom Branding -->
      <div class="text-center mt-10">
        <p class="text-sm text-gray-500 italic">
          Experience craftsmanship that speaks for itself.
        </p>
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