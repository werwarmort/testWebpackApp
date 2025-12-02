import { create } from 'zustand';
import { ScoreState } from '../types/score';

export const useScoreStore = create<ScoreState>()((set) => ({
    points: 0,
    addPoints: (amount) => set((state) => ({ points: state.points + amount })),
    resetPoints: () => set({ points: 0 }),
}));
