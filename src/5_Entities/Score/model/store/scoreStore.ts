import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ScoreState, Action } from '../types/score';

const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const useScoreStore = create<ScoreState>()(
    persist(
        (set, get) => ({
            dayPoints: 0,
            weekPoints: 0,
            actions: [] as Action[],
            lastUpdatedDate: getCurrentDate(),

            addPoints: (amount) => set((state) => ({ dayPoints: state.dayPoints + amount })),

            addAction: (actionParams) => {
                // Проверяем актуальность даты перед добавлением действия
                get().checkDate();

                set((state) => {
                    const newAction = {
                        ...actionParams,
                        id: actionParams.id || Date.now().toString(),
                        createdAt: Date.now(),
                    };

                    const pointsChange = newAction.isPenalty ? -newAction.points : newAction.points;

                    return {
                        actions: [newAction, ...state.actions],
                        dayPoints: state.dayPoints + pointsChange,
                    };
                });
            },

            removeAction: (id) => set((state) => {
                const actionToRemove = state.actions.find((a) => a.id === id);
                if (!actionToRemove) return {};

                const pointsChange = actionToRemove.isPenalty ? -actionToRemove.points : actionToRemove.points;

                return {
                    actions: state.actions.filter((a) => a.id !== id),
                    dayPoints: state.dayPoints - pointsChange,
                };
            }),

            resetPoints: () => set({ dayPoints: 0, weekPoints: 0, actions: [] as Action[] }),

            checkDate: () => set((state) => {
                const today = getCurrentDate();
                if (state.lastUpdatedDate !== today) {
                    return {
                        lastUpdatedDate: today,
                        weekPoints: state.weekPoints + state.dayPoints,
                        dayPoints: 0,
                        // actions не очищаем, чтобы сохранить историю
                    };
                }
                return {};
            }),
        }),
        {
            name: 'score-storage',
            onRehydrateStorage: () => (state) => {
                state?.checkDate();
            },
        },
    ),
);
