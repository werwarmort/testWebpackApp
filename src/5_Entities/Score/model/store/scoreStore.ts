import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ScoreState, Action } from '../types/score';

const getCurrentDate = () => new Date().toISOString().split('T')[0];

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
                        id: Date.now().toString(),
                        createdAt: Date.now(),
                    };

                    const pointsChange = newAction.isPenalty ? -newAction.points : newAction.points;

                    return {
                        actions: [newAction, ...state.actions],
                        dayPoints: state.dayPoints + pointsChange,
                    };
                });
            },

            resetPoints: () => set({ dayPoints: 0, weekPoints: 0, actions: [] }),

            checkDate: () => set((state) => {
                const today = getCurrentDate();
                if (state.lastUpdatedDate !== today) {
                    return {
                        lastUpdatedDate: today,
                        weekPoints: state.weekPoints + state.dayPoints,
                        dayPoints: 0,
                        actions: [], // Очищаем действия за прошлый день
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
