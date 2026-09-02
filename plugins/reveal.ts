// Scroll-reveal directive — funciona en SSR + cliente
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("reveal", {
    getSSRProps() {
      return {};
    },
    mounted(el: HTMLElement, binding) {
      if (typeof IntersectionObserver === "undefined") return;
      const delay: number = typeof binding.value === "number" ? binding.value : 0;
      el.classList.add("sr-hidden");
      el.style.transitionDelay = `${delay}ms`;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              el.classList.remove("sr-hidden");
              el.classList.add("sr-visible");
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.12 }
      );
      observer.observe(el);
    },
  });
});
