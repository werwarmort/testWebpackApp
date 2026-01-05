import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GoalState, Goal } from '../types/goal';

export const useGoalStore = create<GoalState>()(
    persist(
        (set) => ({
            goals: [] as Goal[],
            addGoal: (goalParams) => set((state) => ({
                goals: [
                    {
                        ...goalParams,
                        id: Date.now().toString(),
                        isCompleted: false,
                        createdAt: Date.now(),
                    },
                    ...state.goals,
                ],
            })),
            updateGoal: (updatedGoal) => set((state) => ({
                goals: state.goals.map((goal) =>
                    goal.id === updatedGoal.id ? updatedGoal : goal
                ),
            })),
            deleteGoal: (id) => set((state) => ({
                goals: state.goals.filter((goal) => goal.id !== id),
            })),
            toggleGoal: (id) => set((state) => ({
                goals: state.goals.map((goal) =>
                    goal.id === id ? { ...goal, isCompleted: !goal.isCompleted } : goal
                ),
            })),
            toggleSubgoal: (goalId, subgoalId, actionId) => set((state) => ({
                goals: state.goals.map((goal) => {
                    if (goal.id !== goalId) return goal;
                    return {
                        ...goal,
                        subgoals: goal.subgoals.map((sub) =>
                            sub.id === subgoalId ? {
                                ...sub,
                                isCompleted: !sub.isCompleted,
                                completedActionId: !sub.isCompleted ? actionId : undefined
                            } : sub
                        ),
                    };
                }),
            })),
            markSubgoalAsSent: (goalId, subgoalId) => set((state) => ({
                goals: state.goals.map((goal) => {
                    if (goal.id !== goalId) return goal;
                    return {
                        ...goal,
                        subgoals: goal.subgoals.map((sub) =>
                            sub.id === subgoalId ? { ...sub, isSentToTasks: true } : sub
                        ),
                    };
                }),
            })),
        }),
        {
            name: 'goal-storage',
        },
    ),
);
