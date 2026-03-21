// ========================================================================
// ===== F1 INTRO SEQUENCE - CINEMATIC START LIGHTS =====
// ========================================================================

(function () {
    'use strict';

    const INTRO_KEY = 'f1_intro_played';
    const introPlayed = sessionStorage.getItem(INTRO_KEY);

    if (introPlayed) {
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

            showBgVideo();
        });
        return;
    }

    document.addEventListener('DOMContentLoaded', () => {
        const overlay      = document.getElementById('intro-overlay');
        const semaphore    = document.querySelector('.semaphore');
        const lights       = document.querySelectorAll('.semaphore-light');
        const flagContainer= document.querySelector('.flag-container');
        const redGlow      = document.querySelector('.intro-red-glow');
        const audio        = document.getElementById('intro-audio');
        const menuContainer= document.querySelector('.menu-container');
        const skipBtn      = document.querySelector('.skip-intro-btn');
        const particlesContainer = document.querySelector('.intro-particles');
        let audioFadeInterval = null;
        let introAborted = false;

        if (!overlay || !semaphore || lights.length === 0) return;

        if (menuContainer) menuContainer.classList.add('hidden-during-intro');

        // ─────────────────────────────────────────────────────────────────
        // PASO 1: Pantalla "TAP TO START"
        // Necesaria porque Chrome/Safari bloquean audio sin interacción real.
        // El tap en esta pantalla ES la interacción que desbloquea el audio.
        // ─────────────────────────────────────────────────────────────────
        const tapScreen = document.createElement('div');
        tapScreen.id = 'tap-to-start';
        tapScreen.innerHTML = `
            <div class="tap-content">
                <div class="tap-logo">
                    <img src="images/bandera.svg" alt="F1">
                </div>
                <div class="tap-pulse-ring"></div>
                <p class="tap-label">TOCA PARA COMENZAR</p>
            </div>
        `;
        overlay.appendChild(tapScreen);

        // Precargar audio apenas existe el DOM (sin reproducir aún)
        if (audio) {
            audio.load();
            audio.volume = 0.7;
        }

        // Al tocar: desbloquear audio y arrancar intro
        tapScreen.addEventListener('click', () => {
            tapScreen.classList.add('fade-out');
            setTimeout(() => {
                tapScreen.remove();
                startIntroSequence();
            }, 400);
        }, { once: true });

        // ─────────────────────────────────────────────────────────────────
        // SKIP BUTTON
        // ─────────────────────────────────────────────────────────────────
        if (skipBtn) {
            skipBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                introAborted = true;
                finishIntro();
            });
        }

        // ─────────────────────────────────────────────────────────────────
        // PASO 2: Secuencia (se ejecuta DESPUÉS del tap garantizado)
        // ─────────────────────────────────────────────────────────────────
        const LIGHT_INTERVAL      = 700;
        const FIRST_LIGHT_DELAY   = 500;
        const FLAG_DELAY          = 800;
        const AUDIO_FADE_DURATION = 5;   // segundos de fade-out al final
        const AUDIO_MAX_VOL       = 0.7;

        function startIntroSequence() {

            // Mostrar semáforo
            setTimeout(() => {
                if (introAborted) return;
                semaphore.classList.add('visible');
            }, 300);

            // ── Audio ─────────────────────────────────────────────────────
            if (audio) {
                audio.currentTime = 0;
                audio.volume = AUDIO_MAX_VOL;

                audio.play().catch((err) => {
                    console.warn('Audio play failed:', err);
                });

                // ── Fade-out suave con requestAnimationFrame ──────────────
                // No depende de loadedmetadata: monitorea continuamente.
                // Cuando faltan AUDIO_FADE_DURATION segundos, baja el volumen
                // de forma proporcional hasta 0, luego llama a finishIntro.
                let fadingOut = false;

                function audioTick() {
                    if (introAborted || audio.paused) return;

                    // Esperar a tener duración válida
                    if (!audio.duration || isNaN(audio.duration)) {
                        audioFadeInterval = requestAnimationFrame(audioTick);
                        return;
                    }

                    const remaining = audio.duration - audio.currentTime;

                    if (remaining <= AUDIO_FADE_DURATION && !fadingOut) {
                        fadingOut = true;
                    }

                    if (fadingOut) {
                        // Volumen cae linealmente de AUDIO_MAX_VOL a 0
                        const ratio = Math.max(0, remaining / AUDIO_FADE_DURATION);
                        audio.volume = ratio * AUDIO_MAX_VOL;

                        if (remaining <= 0.05) {
                            // Audio terminó: parar y lanzar finishIntro
                            audio.pause();
                            if (!introAborted) finishIntro();
                            return;
                        }
                    }

                    audioFadeInterval = requestAnimationFrame(audioTick);
                }

                audioFadeInterval = requestAnimationFrame(audioTick);

                // Fallback: si 'ended' dispara antes que el rAF lo detecte
                audio.addEventListener('ended', () => {
                    cancelAnimationFrame(audioFadeInterval);
                    if (!introAborted) finishIntro();
                }, { once: true });

                // Fallback por duración (por si el navegador no dispara 'ended')
                const waitForMeta = () => {
                    if (!audio.duration || isNaN(audio.duration)) {
                        setTimeout(waitForMeta, 200);
                        return;
                    }
                    const duration = audio.duration * 1000;
                    setTimeout(() => {
                        if (!introAborted && overlay && !overlay.classList.contains('fade-out')) {
                            finishIntro();
                        }
                    }, duration + 800);
                };
                waitForMeta();
            }

            // ── Luces ─────────────────────────────────────────────────────
            lights.forEach((light, index) => {
                setTimeout(() => {
                    if (introAborted) return;
                    light.classList.add('on');
                    if (redGlow) redGlow.classList.add('active');
                }, FIRST_LIGHT_DELAY + (index * LIGHT_INTERVAL));
            });

            const allLightsOnTime = FIRST_LIGHT_DELAY + (lights.length * LIGHT_INTERVAL);

            // ── Luces apagadas + bandera ──────────────────────────────────
            setTimeout(() => {
                if (introAborted) return;

                semaphore.classList.add('lights-out');
                if (redGlow) redGlow.classList.remove('active');
                if (particlesContainer) particlesContainer.classList.add('launched');

                setTimeout(() => {
                    if (introAborted) return;
                    semaphore.style.opacity = '0';
                    semaphore.style.transform = 'scale(0.8)';
                    if (flagContainer) flagContainer.classList.add('visible');
                }, 300);

            }, allLightsOnTime + FLAG_DELAY);

            // Fallback sin audio
            if (!audio) {
                setTimeout(() => {
                    if (!introAborted) finishIntro();
                }, allLightsOnTime + FLAG_DELAY + 2500);
            }
        }

        // ─────────────────────────────────────────────────────────────────
        // FINALIZAR INTRO
        // ─────────────────────────────────────────────────────────────────
        function finishIntro() {
            if (overlay.classList.contains('fade-out')) return;

            // Cancelar el rAF del fade de audio
            if (audioFadeInterval) cancelAnimationFrame(audioFadeInterval);

            // Si el audio aún suena (ej: se presionó SKIP), fade rápido de 600ms
            if (audio && !audio.paused) {
                const startVol = audio.volume;
                const startTime = performance.now();
                const SKIP_FADE = 600;

                function skipFadeTick(now) {
                    const elapsed = now - startTime;
                    const ratio = Math.max(0, 1 - elapsed / SKIP_FADE);
                    audio.volume = startVol * ratio;
                    if (ratio > 0) {
                        requestAnimationFrame(skipFadeTick);
                    } else {
                        audio.volume = 0;
                        audio.pause();
                    }
                }
                requestAnimationFrame(skipFadeTick);
            }

            sessionStorage.setItem(INTRO_KEY, 'true');
            overlay.classList.add('fade-out');

            if (menuContainer) {
                menuContainer.classList.remove('hidden-during-intro');
                menuContainer.classList.add('visible-after-intro');
            }

            const mainWrapper = document.querySelector('.main-content-wrapper');
            if (mainWrapper) {
                setTimeout(() => mainWrapper.classList.add('visible'), 400);
            }

            setTimeout(() => showBgVideo(), 600);
            setTimeout(() => overlay.remove(), 1500);
        }
    });

    function showBgVideo() {
        const bgContainer = document.getElementById('bg-video-container');
        const bgVideo     = document.getElementById('bg-video');
        if (bgContainer && bgVideo) {
            bgContainer.classList.add('visible');
            bgVideo.play().catch(() => {
                bgVideo.muted = true;
                bgVideo.play().catch(() => {});
            });
        }
    }

})();