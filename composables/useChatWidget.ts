// Tiny shared state so the CTA button in the page can open the floating
// chat widget without prop-drilling. Module-level state is fine here
// because it only needs to live for the current browser tab.
const isOpen = ref(false);

export function useChatWidget() {
  function open() {
    isOpen.value = true;
  }
  function close() {
    isOpen.value = false;
  }
  function toggle() {
    isOpen.value = !isOpen.value;
  }
  return { isOpen, open, close, toggle };
}
