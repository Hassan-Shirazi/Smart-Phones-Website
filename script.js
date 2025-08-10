  document.addEventListener('DOMContentLoaded', function() {

            // Register GSAP plugins
            gsap.registerPlugin(ScrollTrigger);

            // --- 1. HERO SECTION ANIMATIONS ---

            // 1a. 3D Phone Rotation
            const phoneTl = gsap.timeline({
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
            phoneTl.to(".phone-3d", {
                rotationY: -25,
                rotationX: 10,
                duration: 4
            }).to(".phone-3d", {
                rotationY: 25,
                rotationX: -10,
                duration: 4
            });

            // 1b. Hero Parallax Scroll Effect
            gsap.to(".hero-text", {
                y: -100,
                opacity: 0.5,
                scrollTrigger: {
                    trigger: "#hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5
                }
            });
            gsap.to(".phone-visual-container", {
                y: 100,
                scrollTrigger: {
                    trigger: "#hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            });

            // --- 1c. PHONE SCREEN ANIMATIONS (NEW) ---

            // Function to update time and date on the phone screen
            function updateTime() {
                const now = new Date();
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const dateString = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

                document.querySelector('.phone-time').textContent = `${hours}:${minutes}`;
                document.querySelector('.phone-date').textContent = dateString;
            }

            // Update the time immediately and then every second
            updateTime();
            setInterval(updateTime, 1000);

            // GSAP timeline for the phone screen UI elements
            const screenTl = gsap.timeline({
                repeat: -1,
                repeatDelay: 2
            });

            screenTl.fromTo(".phone-lockscreen", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
                .from(".phone-app-icon", {
                    opacity: 0,
                    y: 20,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: 'power2.out'
                }, "-=0.5")
                .from(".phone-swipe-hint", { opacity: 0, y: 10 }, "<")
                .to(".phone-bg-animated", {
                    rotation: 360,
                    x: '10%',
                    y: '10%',
                    duration: 20,
                    ease: 'none'
                }, 0)
                .to(".phone-lockscreen, .phone-app-icon, .phone-swipe-hint", {
                    opacity: 0,
                    duration: 1,
                    delay: 4 // Hold the visible state for 4 seconds before fading
                });


            // --- 2. GENERAL SCROLL-TRIGGERED REVEAL ANIMATIONS ---

            const createRevealAnimation = (triggerSelector, elementSelector, fromProps, stagger = 0.2) => {
                gsap.from(elementSelector, {
                    ...fromProps,
                    stagger: stagger,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: triggerSelector,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
            };

            createRevealAnimation("#models", ".model-card", { y: 100, opacity: 0 });
            createRevealAnimation("#features", ".feature-item", { y: 50, opacity: 0 });
            createRevealAnimation("#comparison", ".comparison-table tbody tr", { x: -50, opacity: 0 });
            createRevealAnimation("#reviews", ".review-card", { y: 50, opacity: 0, scale: 0.9 });
            
            gsap.from("#cta .container > *", {
                opacity: 0,
                y: 50,
                stagger: 0.3,
                duration: 1,
                scrollTrigger: {
                    trigger: "#cta",
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
            
            // --- 3. FADE IN HEADER ON SCROLL ---
            gsap.from("header", {
                y: '-100%',
                duration: 1,
                ease: 'power2.out',
                delay: 0.5
            });

        });