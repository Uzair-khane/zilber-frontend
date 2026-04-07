<template>
  <section class="w-full bg-[#F7F4EF] py-16 px-4 md:px-10">

    <div class="max-w-3xl mx-auto">

      <!-- Header -->
      <div class="text-center mb-12">
        <p class="bg-gray-100 text-slate-700 rounded-md px-2 py-1 font-montserrat text-[9px] font-bold uppercase tracking-[0.2em]">
          Support
        </p>
        <h2 class="text-2xl md:text-3xl font-semibold text-[#1A1A1A]">
          Frequently Asked <span class="">Questions</span>
        </h2>
        <p class="text-[#7A6E64] mt-3 text-sm">
          Everything you need to know about shopping at
          <span class="text-[#2C2420] font-medium">Zilber</span>
        </p>
      </div>

      <!-- FAQ Items -->
      <div class="space-y-3">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="bg-white border rounded-xl overflow-hidden transition-all duration-200"
          :class="openIndex === index ? 'border-[#D4AF37]/40' : 'border-[#E8E2D9]'"
        >
          <button
            class="w-full text-left px-6 py-5 flex justify-between items-center gap-4 focus:outline-none"
            @click="toggle(index)"
          >
            <span
              class="text-[15px] font-medium transition-colors duration-200"
              :class="openIndex === index ? 'text-[#1b1b1b]' : 'text-[#2C2420]'"
            >
              {{ faq.question }}
            </span>

            <!-- Icon -->
            <span
              class="shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300"
              :class="openIndex === index
                ? 'border-[#D4AF37]/40 bg-[#D4AF37]/8 text-[#1b1b1b] rotate-180'
                : 'border-[#E8E2D9] text-[#9A8C7A]'"
            >
              <svg class="w-3.5 h-3.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>

          <div
            v-show="openIndex === index"
            class="px-6 pb-5 text-[#7A6E64] text-sm leading-relaxed border-t border-[#F0EBE3] pt-4"
          >
            {{ faq.answer }}
          </div>
        </div>
      </div>

      <!-- Bottom -->
      <div class="text-center mt-10">
        <p class="text-xs text-[#9A8C7A] italic">
          Still have questions? Reach out to our support team.
        </p>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const faqs = ref([
  {
    question: "What is Zilber's mission?",
    answer: "Our mission is to provide high-quality, stylish and versatile handmade shawls of all ages and tastes. We offer a diverse range of designs, colors, and materials to cater to every style and budget while providing an exceptional shopping experience."
  },
  {
    question: "How can I place an order?",
    answer: "Simply browse our products, select your preferred shawl, and add it to your cart. Proceed to checkout to complete your purchase safely and securely."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes! Zilber ships worldwide. Shipping fees and delivery times vary depending on the destination."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 14-day return policy on most items. Products must be unused and in their original packaging. Contact our support team to initiate a return."
  }
])

const openIndex = ref(null)

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>