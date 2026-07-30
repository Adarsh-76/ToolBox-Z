import confetti from 'canvas-confetti';

// Default fun confetti burst
export const fireConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#00FFAB', '#FFD700', '#FF00FF', '#00FFFF', '#ffffff']
  });
};

// Special side cannons for big achievements (like completing profile)
export const fireSideCannons = () => {
  const end = Date.now() + 1000; // 1 second of confetti

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#00FFAB', '#FFD700', '#FF00FF']
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#00FFAB', '#FFD700', '#FF00FF']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

// Small school pride effect (for saving settings)
export const fireSchoolPride = () => {
  const end = Date.now() + 500;

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 }
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
