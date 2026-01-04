import { create } from 'zustand';
import { ScoreState } from '../types/score';

export const useScoreStore = create<ScoreState>()((set) => ({
    points: 0,
    actions: [],
    addPoints: (amount) => set((state) => ({ points: state.points + amount })),
    addAction: (actionParams) => set((state) => {
        const newAction = {
            ...actionParams,
            id: Date.now().toString(),
            createdAt: Date.now(),
        };

        const pointsChange = newAction.isPenalty ? -newAction.points : newAction.points;

        return {
            actions: [newAction, ...state.actions],
            points: state.points + pointsChange,
        };
    }),
    resetPoints: () => set({ points: 0, actions: [] }),
}));
