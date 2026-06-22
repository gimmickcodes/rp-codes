// Reusable tabs

const setupTabs = ({
   outerwrap = '.tabbedsection',
   button = '.tab',
   contentwrap = '.tabcontentwrap',
   content = '.tabcontent'
} = {}) => {

   const outerwraps = document.querySelectorAll(outerwrap);

   outerwraps.forEach((outer) => {
      const buttons = Array.from(outer.querySelectorAll(button));
      const contents = Array.from(outer.querySelectorAll(content));
      const wrap = outer.querySelector(contentwrap);

      if (!wrap || buttons.length === 0 || contents.length === 0) return;

      // --- NEW: Default to the first tab if no active tab is preset ---
      const hasActiveButton = buttons.some(b => b.classList.contains('active'));
      const hasActiveContent = contents.some(c => c.classList.contains('active'));

      if (!hasActiveButton || !hasActiveContent) {
         // Clear any partial mismatched active states
         buttons.forEach(b => b.classList.remove('active'));
         contents.forEach(c => c.classList.remove('active'));

         // Force the first pair to be active
         buttons[0].classList.add('active');
         contents[0].classList.add('active');
      }
      // ---------------------------------------------------------------

      const updateHeight = () => {
         const activeContent = outer.querySelector(`${content}.active`);
         if (activeContent) wrap.style.height = `${activeContent.offsetHeight}px`;
      };

      const resizeObserver = new ResizeObserver(() => updateHeight());
      contents.forEach(c => resizeObserver.observe(c));

      buttons.forEach((btn, index) => {
         btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            contents.forEach((c, cIndex) => {
               c.classList.toggle("active", cIndex === index);
            });

            updateHeight();
         });
      });

      updateHeight();
   });
};