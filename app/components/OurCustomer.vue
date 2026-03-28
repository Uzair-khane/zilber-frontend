<template>
  <section class="bg-[#F7F4EF] py-16 px-4">

    <!-- Heading -->
    <div class="max-w-6xl mx-auto text-center mb-12">
      <p class="text-xs tracking-[0.3em] text-gray-500 uppercase mb-2">
        Testimonials
      </p>

      <h2 class="text-3xl md:text-5xl font-serif italic text-gray-900">
        What Our Customers Say
      </h2>

      <p class="text-gray-600 mt-3">
        Hear from our valued customers about their experience with Zilber
      </p>
    </div>

    <!-- Cards -->
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">

      <div
        v-for="(review, i) in reviews"
        :key="i"
        class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 group flex flex-col justify-between"
      >

        <!-- TOP: Profile -->
        <div class="flex items-center gap-3 mb-4">
          <div class="w-11 h-11 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-bold">
            {{ review.name.charAt(0) }}
          </div>

          <div>
            <p class="text-sm font-semibold text-gray-900">
              {{ review.name }}
            </p>
            <p class="text-xs text-gray-400">
              {{ review.date }}
            </p>
          </div>
        </div>

        <!-- MIDDLE: Review -->
        <p class="text-sm text-gray-600 leading-relaxed mb-6 group-hover:text-gray-800 transition">
          "{{ review.text }}"
        </p>

        <!-- BOTTOM: Rating -->
        <div class="flex mt-auto text-[#D4AF37]">
          <Icon v-for="n in review.rating" :key="n" name="mdi:star" class="w-4 h-4" />
        </div>

      </div>

    </div>

  </section>
</template>

<script setup>
const reviews = [
  {
    name: "Zeeshan Malik",
    date: "January 15, 2025",
    text: "Absolutely stunning craftsmanship! Leather quality is next level.",
    rating: 5
  },
  {
    name: "Bilal Ahmad",
    date: "February 10, 2025",
    text: "Zilber exceeded my expectations. Premium feel and perfect fit.",
    rating: 5
  },
  {
    name: "Saad Khan",
    date: "March 5, 2025",
    text: "Customer service was outstanding and delivery was super fast.",
    rating: 5
  },
  {
    name: "Hamid Ullah",
    date: "April 2, 2025",
    text: "Highly recommended! Quality, comfort and style all in one.",
    rating: 5
  }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&display=swap');

.font-serif {
  font-family: 'Cormorant Garamond', serif;
}
</style>