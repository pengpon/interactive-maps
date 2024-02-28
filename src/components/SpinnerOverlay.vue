<template>
  <div class="spinner-overlay">
    <div class="spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style scoped>
.spinner-overlay {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0, 0.8);
}

.spinner {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  transform: scale(2);
}

.spinner div {
  transform-origin: 10px 10px;
  animation: spinner 0.8s linear infinite;
}

.spinner div::after {
  position: absolute;
  top: 0;
  left: 9px;
  display: block;
  width: 2px;
  height: 4px;
  content: " ";
  background: var(--gray-light);
  border-radius: 20px;
}

.spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -0.7s;
}

.spinner div:nth-child(2) {
  transform: rotate(45deg);
  animation-delay: -0.6s;
}

.spinner div:nth-child(3) {
  transform: rotate(90deg);
  animation-delay: -0.5s;
}

.spinner div:nth-child(4) {
  transform: rotate(135deg);
  animation-delay: -0.4s;
}

.spinner div:nth-child(5) {
  transform: rotate(180deg);
  animation-delay: -0.3s;
}

.spinner div:nth-child(6) {
  transform: rotate(225deg);
  animation-delay: -0.2s;
}

.spinner div:nth-child(7) {
  transform: rotate(270deg);
  animation-delay: -0.1s;
}

.spinner div:nth-child(8) {
  transform: rotate(315deg);
  animation-delay: 0s;
}

@keyframes spinner {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

</style>
