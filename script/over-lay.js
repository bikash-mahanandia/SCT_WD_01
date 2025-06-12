
        const box = document.getElementById('overlay-box');

        function checkScroll() {
            const boxRect = box.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const visibleHeight = Math.min(boxRect.bottom, windowHeight) - Math.max(boxRect.top, 0);
            const visiblePercent = visibleHeight / boxRect.height;

            if (visiblePercent >= 0.8) {
                box.classList.add('active');
            } else {
                box.classList.remove('active');
            }
        }

        window.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        window.addEventListener('load', checkScroll);
   