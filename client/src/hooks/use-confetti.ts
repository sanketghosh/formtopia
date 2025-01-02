/* import { create } from "zustand";

interface Confetti {
  confetti: boolean;
  confettiOn: () => void;
  confettiOff: () => void;
}

export const useConfetti = create<Confetti>((set) => ({
  confetti: false,
  confettiOn: () =>
    set({
      confetti: true,
    }),
  confettiOff: () => {
    set({
      confetti: false,
    });
  },
}));
 */

import { create } from "zustand";

interface Confetti {
  confetti: boolean;
  confettiOn: () => void;
  confettiOff: () => void;
}

export const useConfetti = create<Confetti>((set) => ({
  confetti: JSON.parse(localStorage.getItem("confetti") || "false"), // Initialize from localStorage
  confettiOn: () => {
    localStorage.setItem("confetti", JSON.stringify(true)); // Store in localStorage
    set({ confetti: true });
  },
  confettiOff: () => {
    localStorage.removeItem("confetti"); // Remove from localStorage
    set({ confetti: false });
  },
}));
