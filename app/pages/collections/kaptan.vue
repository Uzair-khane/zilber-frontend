<template>
  <div class="page-wrap">
    <div class="container">
      <div class="section-header">
        <h1 class="page-title">Kaptan Edition</h1>
        <p class="page-subtitle">Explore our exclusive Kaptan collection.</p>
        <div class="divider"></div>
        <p class="placeholder-text">Products for this collection will appear here soon.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400;1,600&display=swap');
.page-wrap {
  background: #F7F4EF;
  min-height: 100vh;
  padding: 140px 0 96px;
}
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px;
  text-align: center;
}
.page-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(44px, 7vw, 72px);
  color: #1A1A1A;
  margin-bottom: 12px;
}
.page-subtitle {
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: #666;
  margin-bottom: 40px;
}
.divider {
  width: 60px;
  height: 2px;
  background: #D4AF37;
  margin: 0 auto 40px;
}
.placeholder-text {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  color: #888;
}
</style>
