
        document.addEventListener('DOMContentLoaded', function () {
            const scalableText = document.querySelector('.hv-break-txt');
            const scrollSection = document.querySelector('.scroll-section');

            // Configuration - adjust these values
            const startScaleAt = 0.8; // 80% from top (start scaling when bottom is at 80% viewport)
            const endScaleAt = 0.2;   // 20% from top (finish scaling when top is at 20% viewport)
            const minScale = 1;       // Minimum scale (normal size)
            const maxScale = 2;       // Maximum scale (2x size)

            function handleScroll() {
                const scrollPosition = window.scrollY;
                const viewportHeight = window.innerHeight;
                const elementTop = scrollSection.offsetTop;
                const elementHeight = scrollSection.offsetHeight;

                // Calculate when element reaches 80% from top (start point)
                const startPoint = elementTop - (viewportHeight * startScaleAt);

                // Calculate when element reaches 20% from top (end point)
                const endPoint = elementTop - (viewportHeight * endScaleAt);

                // Current position relative to animation range
                const currentPosition = scrollPosition;

                if (currentPosition >= startPoint && currentPosition <= endPoint) {
                    // Calculate progress (0 to 1)
                    const progress = (currentPosition - startPoint) / (endPoint - startPoint);

                    // Calculate scale (linear interpolation)
                    const scale = minScale + (progress * (maxScale - minScale));

                    scalableText.style.transform = `scale(${scale})`;
                }
                else if (currentPosition < startPoint) {
                    // Before start point - normal size
                    scalableText.style.transform = `scale(${minScale})`;
                }
                else {
                    // After end point - max size
                    scalableText.style.transform = `scale(${maxScale})`;
                }
            }

            window.addEventListener('scroll', handleScroll);
            window.addEventListener('resize', handleScroll);
            handleScroll(); // Initial check
        });
   
