// ========================================================================
// ===== F1 INTRO SEQUENCE - CINEMATIC START LIGHTS =====
// ========================================================================

(function () {
    'use strict';

    // --- Check if intro should play (only first visit per session) ---
    const INTRO_KEY = 'f1_intro_played';
    const introPlayed = sessionStorage.getItem(INTRO_KEY);

    if (introPlayed) {
        // Skip intro: show main content immediately
        document.addEventListener('DOMContentLoaded', () => {
            const overlay = document.getElementById('intro-overlay');
            if (overlay) overlay.remove();

            const mainWrapper = document.querySelector('.main-content-wrapper');
            if (mainWrapper) mainWrapper.classList.add('visible');

            const menuContainer = document.querySelector('.menu-container');
            if (menuContainer) {
                menuContainer.classList.remove('hidden-during-intro');
                menuContainer.classList.add('visible-after-intro');
            }

            // Show background video immediately
            showBgVideo();
        });
        return;
    }

    document.addEventListener('DOMContentLoaded', () => {
        const overlay = document.getElementById('intro-overlay');
        const semaphore = document.querySelector('.semaphore');
        const lights = document.querySelectorAll('.semaphore-light');
        const flagContainer = document.querySelector('.flag-container');
        const redGlow = document.querySelector('.intro-red-glow');
        const audio = document.getElementById('intro-audio');
        const menuContainer = document.querySelector('.menu-container');
        const skipBtn = document.querySelector('.skip-intro-btn');
        const particlesContainer = document.querySelector('.intro-particles');
        let audioFadeInterval = null;

        if (!overlay || !semaphore || lights.length === 0) return;

        // Hide menu during intro
        if (menuContainer) {
            menuContainer.classList.add('hidden-during-intro');
        }

        // --- SKIP BUTTON ---
        let introAborted = false;

        if (skipBtn) {
            skipBtn.addEventListener('click', () => {
                introAborted = true;
                finishIntro();
            });
        }

        // --- TIMING CONFIG ---
        // The audio is ~6 seconds (242KB mp3).
        // Lights sequence: 4 lights at ~0.7s intervals starting at ~0.5s => ~3.3s total
        // Flag appears at ~3.8s
        // Audio ends at ~6s -> transition to main app

        const LIGHT_INTERVAL = 700; // ms between each light
        const FIRST_LIGHT_DELAY = 500; // ms before first light
        const FLAG_DELAY = 800; // ms after last light before flag shows
        const TRANSITION_DELAY = 1200; // ms after audio ends before showing main

        // --- START THE SEQUENCE ---
        startIntroSequence();

        function startIntroSequence() {
            // Show semaphore
            setTimeout(() => {
                if (introAborted) return;
                semaphore.classList.add('visible');
            }, 300);

            // Play audio
            if (audio) {
                audio.volume = 0.7;
                const AUDIO_FADE_DURATION = 4; // seconds

                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        const clickHandler = () => {
                            audio.play().catch(() => {});
                            document.removeEventListener('click', clickHandler);
                        };
                        document.addEventListener('click', clickHandler);
                    });
                }

                // Start monitoring for fade-out in the last 2 seconds
                audio.addEventListener('loadedmetadata', () => {
                    const duration = audio.duration;
                    const fadeStartTime = Math.max(0, duration - AUDIO_FADE_DURATION);
                    const startVolume = 0.7;

                    audioFadeInterval = setInterval(() => {
                        if (audio.paused || audio.ended) {
                            clearInterval(audioFadeInterval);
                            return;
                        }
                        if (audio.currentTime >= fadeStartTime) {
                            const remaining = duration - audio.currentTime;
                            audio.volume = Math.max(0, (remaining / AUDIO_FADE_DURATION) * startVolume);
                        }
                    }, 50);
                });
            }

            // Light up each light sequentially
            lights.forEach((light, index) => {
                setTimeout(() => {
                    if (introAborted) return;
                    light.classList.add('on');
                    // Intensify red glow with each light
                    if (redGlow) redGlow.classList.add('active');
                }, FIRST_LIGHT_DELAY + (index * LIGHT_INTERVAL));
            });

            // After all lights are on, wait then do "lights out" + flag
            const allLightsOnTime = FIRST_LIGHT_DELAY + (lights.length * LIGHT_INTERVAL);

            setTimeout(() => {
                if (introAborted) return;

                // Lights out effect 
                semaphore.classList.add('lights-out');
                if (redGlow) redGlow.classList.remove('active');

                // Launch particles at lights-out — simulates cars dispersing
                if (particlesContainer) {
                    particlesContainer.classList.add('launched');
                }

                // Fade semaphore and show flag
                setTimeout(() => {
                    if (introAborted) return;
                    semaphore.style.opacity = '0';
                    semaphore.style.transform = 'scale(0.8)';

                    if (flagContainer) {
                        flagContainer.classList.add('visible');
                    }
                }, 300);

            }, allLightsOnTime + FLAG_DELAY);

            // Listen for audio end OR fallback timer
            if (audio) {
                audio.addEventListener('ended', () => {
                    if (!introAborted) {
                        setTimeout(() => finishIntro(), 400);
                    }
                });

                // Fallback: if audio doesn't fire 'ended' (some browsers), use duration
                audio.addEventListener('loadedmetadata', () => {
                    const duration = audio.duration * 1000;
                    setTimeout(() => {
                        if (!introAborted && overlay && !overlay.classList.contains('fade-out')) {
                            finishIntro();
                        }
                    }, duration + 500);
                });
            } else {
                // No audio - use fallback timer
                setTimeout(() => {
                    if (!introAborted) finishIntro();
                }, allLightsOnTime + FLAG_DELAY + 2500);
            }
        }

        function finishIntro() {
            if (overlay.classList.contains('fade-out')) return; // Already finishing

            // Clean up audio fade interval
            if (audioFadeInterval) clearInterval(audioFadeInterval);

            // Fade out audio quickly if still playing (for skip button)
            if (audio && !audio.paused) {
                let vol = audio.volume;
                const quickFade = setInterval(() => {
                    vol -= 0.05;
                    if (vol <= 0) {
                        audio.volume = 0;
                        audio.pause();
                        clearInterval(quickFade);
                    } else {
                        audio.volume = vol;
                    }
                }, 30);
            }

            // Mark intro as played
            sessionStorage.setItem(INTRO_KEY, 'true');

            // Fade out overlay
            overlay.classList.add('fade-out');

            // Show menu
            if (menuContainer) {
                menuContainer.classList.remove('hidden-during-intro');
                menuContainer.classList.add('visible-after-intro');
            }

            // Show main content
            const mainWrapper = document.querySelector('.main-content-wrapper');
            if (mainWrapper) {
                setTimeout(() => {
                    mainWrapper.classList.add('visible');
                }, 400);
            }

            // Show background video
            setTimeout(() => {
                showBgVideo();
            }, 600);

            // Remove overlay from DOM after transition
            setTimeout(() => {
                overlay.remove();
            }, 1500);
        }
    });

    function showBgVideo() {
        const bgContainer = document.getElementById('bg-video-container');
        const bgVideo = document.getElementById('bg-video');

        if (bgContainer && bgVideo) {
            bgContainer.classList.add('visible');
            bgVideo.play().catch(() => {
                // Autoplay might be blocked, try muted
                bgVideo.muted = true;
                bgVideo.play().catch(() => {});
            });
        }
    }
})();
