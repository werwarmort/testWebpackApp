import { create } from 'zustand';
import { ScoreState, Action } from '../types/score';
import { $api } from '6_Shared/api/api';

const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const useScoreStore = create<ScoreState>((set, get) => ({
    dayPoints: 0,
    weekPoints: 0,
    actions: [] as Action[],
    lastUpdatedDate: getCurrentDate(),

    setActions: (actions: Action[]) => set({ actions }),

    addPoints: (amount) => set((state) => ({ dayPoints: state.dayPoints + amount })),

    addAction: async (actionParams) => {
        try {
            await $api('/actions', {
                method: 'POST',
                body: JSON.stringify(actionParams),
            });
        } catch (e) {
            console.error('Failed to add action', e);
        }
    },

    updateAction: async (id, updatedFields) => {
        try {
            await $api(`/actions/${id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedFields),
            });
        } catch (e) {
            console.error('Failed to update action', e);
        }
    },

    removeAction: async (id) => {
        try {
            await $api(`/actions/${id}`, {
                method: 'DELETE',
            });
        } catch (e) {
            console.error('Failed to remove action', e);
        }
    },

    resetPoints: () => set({ dayPoints: 0, weekPoints: 0, actions: [] as Action[] }),

    checkDate: () => set((state) => {
        const today = getCurrentDate();
        if (state.lastUpdatedDate !== today) {
            return {
                lastUpdatedDate: today,
                weekPoints: state.weekPoints + state.dayPoints,
                dayPoints: 0,
            };
        }
        return {};
    }),
}));
