<template>
  <section class="py-12 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>
      <p class="text-gray-600 text-center mb-10">
        Everything you need to know about shopping at <span class="font-semibold text-gray-900">Zilber</span>
      </p>

      <div class="max-w-3xl mx-auto space-y-4">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="bg-white border border-gray-200 rounded-lg shadow-sm"
        >
          <button
            class="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
            @click="toggle(index)"
          >
            <span class="font-medium text-gray-800">{{ faq.question }}</span>
            <svg
              class="w-5 h-5 text-gray-500 transition-transform duration-300"
              :class="{ 'rotate-180': openIndex === index }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div
            v-show="openIndex === index"
            class="px-6 pb-4 text-gray-600 border-t border-gray-200 transition-all duration-300"
          >
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const faqs = ref([
  {
    question: "What is Zilber’s mission?",
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
]);

const openIndex = ref(null);

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index;
}
</script>

<style scoped>
/* Optional smooth expand/collapse transition */
[v-cloak] > * { display:none }
[v-cloak]::before { content: "loading…"; }
</style>