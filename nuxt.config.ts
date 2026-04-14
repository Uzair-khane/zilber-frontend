// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      // 1. Browser Tab Title
      title: 'Zilber | Premium Handcrafted Leather Shoes',

      meta: [
        // 2. Google Search Console Verification (Jo code aapne diya tha)
        { name: 'google-site-verification', content: 'RkkiUP1rFLcGNKwakTOPDS1NOtejRVTgi7o5b4jf4T0' },

        // 3. SEO Description (Google Search mein ye line nazar aayegi)
        {
          name: 'description',
          content: 'Zilber offers the finest handcrafted leather footwear. Experience luxury and comfort with our premium collection at zilber.store.'
        },

        // 4. Mobile Responsiveness
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],

      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL
    }
  },

  compatibilityDate: '2024-04-03',

  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-icon',
    '@nuxt/image'
  ],

  css: ['~/assets/css/main.css']
})