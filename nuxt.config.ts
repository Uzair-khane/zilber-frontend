// nuxt.config.ts
export default defineNuxtConfig({
  // 1. Modules Configuration
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "nuxt-icon",
    "@nuxt/image",
    "@nuxtjs/sitemap",
  ],

  // 2. Site Metadata (Sitemap module isi ko use karega)
  site: {
    url: "https://zilber.store",
    name: "Zilber | Premium Handcrafted Leather Shoes",
  },

  // 3. Global App Head (SEO & Meta Tags)
  app: {
    head: {
      title: "Zilber Crafted for Those Who Refuse Ordinary",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "google-site-verification",
          content: "RkkiUP1rFLcGNKwakTOPDS1NOtejRVTgi7o5b4jf4T0",
        },
        {
          name: "description",
          content:
            "Zilber offers the finest handcrafted leather shoes and authentic Peshawari chappals. Discover premium quality footwear at zilber.store.",
        },
        // Social Media (Open Graph) Tags
        {
          property: "og:title",
          content: "Zilber | Premium Handcrafted Leather Shoes",
        },
        {
          property: "og:description",
          content:
            "Shop premium handcrafted leather shoes and traditional Peshawari chappals at Zilber.store",
        },
        {
          name: "keywords",
          content:
            "leather shoes, Peshawari chappal, handmade footwear Pakistan, Zilber store, traditional chappal",
        },
        { property: "og:url", content: "https://zilber.store" },
        { property: "og:image", content: "https://zilber.store/og-image.jpg" },
        { property: "og:type", content: "website" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "canonical", href: "https://zilber.store" },
      ],
      // 4. Schema Markup (Structured Data for Google)
      script: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Zilber",
            url: "https://zilber.store",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://zilber.store/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        },
      ],
    },
  },

  // 5. Backend API Connection
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
    },
  },

  // 6. Performance & Build Settings
  nitro: {
    compressPublicAssets: true,
  },

  compatibilityDate: "2024-11-01",

  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },

  css: ["~/assets/css/main.css"],
});
