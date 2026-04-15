<template>
  <section class="w-full bg-[#F7F4EF] py-12 md:py-20 px-4 md:px-10">
    <div class="max-w-6xl mx-auto">

      <div class="text-center mb-10 md:mb-16">
        <div class="inline-block bg-gray-100 text-slate-700 rounded-md px-3 py-1 font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
          The Difference
        </div>
        <h2 class="text-3xl md:text-5xl font-semibold text-[#1A1A1A] tracking-tight">
          The <span class="text-[#202020]">Zilber</span> Standard
        </h2>
        <div class="h-px w-20 bg-[#D4AF37]/40 mx-auto mt-6 mb-6"></div>
        <p class="text-[#7A6E64] text-sm md:text-base max-w-xl mx-auto italic leading-relaxed px-4">
          "We don't just make footwear; we preserve a 40-year-old legacy with modern comfort."
        </p>
      </div>

      <div class="overflow-hidden rounded-xl border border-[#E8E2D9] bg-white shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[600px] md:min-w-full table-fixed">
            <thead>
              <tr class="border-b border-[#E8E2D9]">
                <th class="p-4 md:p-6 text-left text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#9A8C7A] font-semibold w-[30%]">
                  Feature
                </th>
                <th class="p-4 md:p-6 text-center text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#9A8C7A] font-semibold w-[35%] border-x border-[#F0EBE3]">
                  Local Market
                </th>
                <th class="p-4 md:p-6 text-center text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#111111] font-semibold w-[35%] bg-[#FDFAF6]">
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
                <td class="p-4 md:p-6 text-[14px] md:text-[16px] font-medium text-[#2C2420]">
                  {{ row.feature }}
                </td>

                <td class="p-4 md:p-6 text-center text-xs md:text-sm text-[#9A8C7A] border-x border-[#F0EBE3]">
                  {{ row.local }}
                </td>

                <td class="p-4 md:p-6 text-center bg-[#FDFAF6]">
                  <span class="inline-flex items-center justify-center gap-1.5 text-xs md:text-sm font-medium text-[#2C2420]">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0"></span>
                    {{ row.zilber }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="px-5 py-5 bg-[#FDFAF6] border-t border-[#F0EBE3] flex items-center gap-3">
          <div class="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
          <p class="text-[10px] md:text-xs text-[#9A8C7A] tracking-wide italic">
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

<style scoped>
/* Custom scrollbar for better UX on mobile */
.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}
.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #E8E2D9;
  border-radius: 10px;
}
</style>