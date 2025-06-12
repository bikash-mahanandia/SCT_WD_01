
        // ======================================
        // CONFIGURATION - CHANGE THESE VALUES!
        // ======================================
        const config = {
            // FIRST IMAGE - Cursor image (appears on hover)
            cursorImage:'choco-arrow-Photoroom.png',
            
            // SECOND IMAGE - Particle image (appears on movement and click)
            particleImage: 'pices-Photoroom.png',
            
            // Particle settings
            trailParticleCount: 2, // Particles per movement
            clickParticleCount: 10, // Particles on click
            particleSize: 10,
            trailPower: 0.8, // How fast trail particles move
            explosionPower: 2, // How fast click particles move
            gravity: 0.1, // Higher = stronger gravity
            friction: 0.96, // Lower = more friction (0.9-0.99 works well)
            trailLife: 20, // How long trail particles last
            explosionLife: 100 // How long explosion particles last
        };
        // ======================================
        
        // Create custom cursor
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.backgroundImage = `url('${config.cursorImage}')`;
        document.body.appendChild(cursor);
        
        // Track mouse position
        let mouseX = 0;
        let mouseY = 0;
        let isHovering = false;
        let lastParticleTime = 0;
        const particleDelay = 50; // ms between trail particles
        
        // All active particles
        const allParticles = [];
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;
            
            // Create trail particles when moving inside box
            if (isHovering) {
                const now = Date.now();
                if (now - lastParticleTime > particleDelay) {
                    createParticles(mouseX, mouseY, false);
                    lastParticleTime = now;
                }
            }
        });
        
        // Interactive box hover effect
        const box = document.querySelector('.interactive-box');
        
        box.addEventListener('mouseenter', () => {
            isHovering = true;
            cursor.style.display = 'block';
            document.body.style.cursor = 'none';
        });
        
        box.addEventListener('mouseleave', () => {
            isHovering = false;
            cursor.style.display = 'none';
            document.body.style.cursor = 'default';
        });
        
        // Function to create particles
        function createParticles(x, y, isClick) {
            const count = isClick ? config.clickParticleCount : config.trailParticleCount;
            const power = isClick ? config.explosionPower : config.trailPower;
            const life = isClick ? config.explosionLife : config.trailLife;
            
            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.backgroundImage = `url('${config.particleImage}')`;
               
                particle.style.width = `${config.particleSize}px`;
                particle.style.height = `${config.particleSize}px`;
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;
                
                // Random velocity
                const angle = Math.random() * Math.PI * 2;
                const velocity = Math.random() * power + (isClick ? 1 : 0);
                
                const particleData = {
                    element: particle,
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * velocity,
                    vy: Math.sin(angle) * velocity - (isClick ? 3 : 0), // Initial upward boost for click
                    life: life + Math.random() * 30, // Random lifespan
                    isClick: isClick
                };
                
                allParticles.push(particleData);
                document.body.appendChild(particle);
            }
        }
        
        // Click effect - particle explosion with gravity
        box.addEventListener('click', (e) => {
            // console.log("box");
            if (!isHovering) return;
            createParticles(mouseX, mouseY, true);
        });
        
        // Animation loop for all particles
        function animateParticles() {
            allParticles.forEach((p, index) => {
                // Apply gravity (stronger for click particles)
                if (p.isClick) {
                    p.vy += config.gravity;
                }
                
                // Apply friction
                p.vx *= config.friction;
                p.vy *= config.friction;
                
                // Update position
                p.x += p.vx;
                p.y += p.vy;
                
                // Update element position
                p.element.style.left = `${p.x}px`;
                p.element.style.top = `${p.y}px`;
                
                // Fade out as life decreases
                p.life--;
                p.element.style.opacity = p.life / (p.isClick ? config.explosionLife : config.trailLife);
                
                // Remove dead particles
                if (p.life <= 0) {
                    p.element.remove();
                    allParticles.splice(index, 1);
                }
            });
            
            requestAnimationFrame(animateParticles);
        }
        
        // Start animation loop
        animateParticles();
  