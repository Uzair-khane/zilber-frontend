<template>
  <section class="w-full bg-[#F7F4EF] py-16 px-4 md:px-10">
    <div class="max-w-6xl mx-auto">

      <!-- Header -->
      <div class="text-center mb-12">
        <p class="bg-gray-100 text-slate-700 rounded-md px-2 py-1 font-montserrat text-[9px] font-bold uppercase tracking-[0.2em]">
          The Difference
        </p>
        <h2 class="text-2xl md:text-3xl font-semibold text-[#1A1A1A]">
          The <span class="text-[#202020]">Zilber</span> Standard
        </h2>
        <div class="h-px w-16 bg-[#D4AF37]/40 mx-auto mt-4 mb-5"></div>
        <p class="text-[#7A6E64] text-sm max-w-xl mx-auto italic leading-relaxed">
          "We don't just make footwear; we preserve a 40-year-old legacy with modern comfort."
        </p>
      </div>

      <!-- Table -->
      <div class="overflow-hidden rounded-xl border border-[#E8E2D9] bg-white">
        <table class="w-full">

          <thead>
            <tr class="border-b border-[#E8E2D9]">
              <th class="p-5 text-left text-xs uppercase tracking-[0.2em] text-[#9A8C7A] font-semibold w-1/3">
                Feature
              </th>
              <th class="p-5 text-center text-xs uppercase tracking-[0.2em] text-[#9A8C7A] font-semibold w-1/3 border-x border-[#F0EBE3]">
                Local Market
              </th>
              <th class="p-5 text-center text-xs uppercase tracking-[0.2em] text-[#111111] font-semibold w-1/3 bg-[#FDFAF6]">
                The Zilber Way
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(row, i) in rows"
              :key="i"
              class="border-t border-[#F0EBE3] hover:bg-[#FDFAF6] transition-colors duration-200"
            >
              <!-- Feature -->
              <td class="p-5 text-[15px] font-medium text-[#2C2420]">
                {{ row.feature }}
              </td>

              <!-- Local Market -->
              <td class="p-5 text-center text-sm text-[#9A8C7A] border-x border-[#F0EBE3]">
                {{ row.local }}
              </td>

              <!-- Zilber -->
              <td class="p-5 text-center bg-[#FDFAF6]">
                <span class="inline-flex items-center gap-1.5 text-sm font-medium text-[#2C2420]">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0"></span>
                  {{ row.zilber }}
                </span>
              </td>
            </tr>
          </tbody>

        </table>

        <!-- Footer -->
        <div class="px-5 py-4 bg-[#FDFAF6] border-t border-[#F0EBE3] flex items-center gap-3">
          <div class="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
          <p class="text-xs text-[#9A8C7A] tracking-wide italic">
            Crafted by hand. Built to last a lifetime.
          </p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
const rows = [
  {
    feature: 'Leather Material',
    local: 'Faux / Rexine',
    zilber: 'A-Grade Full Grain Cowhide'
  },
  {
    feature: 'Insole Tech',
    local: 'Hard Cardboard',
    zilber: 'Ortho-Memory Foam Layer'
  },
  {
    feature: 'Sole Durability',
    local: 'Recycled Rubber',
    zilber: 'Military-Grade Tyre Sole'
  },
  {
    feature: 'Craftsmanship',
    local: 'Mass Produced',
    zilber: '100% Hand-Stitched Artisan Work'
  },
]
</script>