window.addEventListener('DOMContentLoaded', () => {
  // Inject the FPS uncap logic
  const script = document.createElement('script');
  script.textContent = `
    (function() {
      console.log('Survev.io Client: Injecting FPS uncap...');
      
      // Override requestAnimationFrame to uncap FPS
      const originalRAF = window.requestAnimationFrame;
      window.requestAnimationFrame = function(callback) {
        // We use setTimeout with 0 or 1ms to bypass the browser's refresh rate limit
        return setTimeout(callback, 1);
      };

      // Also handle the case where the game might use its own internal loop
      // by ensuring we provide a high-performance alternative if it checks for it.
      
      console.log('Survev.io Client: FPS uncap injected.');
    })();
  `;
  document.documentElement.appendChild(script);
});
