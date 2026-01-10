import { create } from 'zustand';
import { GoalState, Goal } from '../types/goal';
import { $api } from '6_Shared/api/api';

export const useGoalStore = create<GoalState>((set, get) => ({
    goals: [] as Goal[],

    setGoals: (goals: Goal[]) => set({ goals }),

    addGoal: async (goalParams) => {
        try {
            await $api('/goals', {
                method: 'POST',
                body: JSON.stringify(goalParams),
            });
        } catch (e) {
            console.error('Failed to add goal', e);
        }
    },

    updateGoal: async (updatedGoal) => {
        try {
            await $api(`/goals/${updatedGoal.id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedGoal),
            });
        } catch (e) {
            console.error('Failed to update goal', e);
        }
    },

    deleteGoal: async (id) => {
        try {
            await $api(`/goals/${id}`, {
                method: 'DELETE',
            });
        } catch (e) {
            console.error('Failed to delete goal', e);
        }
    },

    toggleGoal: async (id) => {
        const goal = get().goals.find((g) => String(g.id) === String(id));
        if (!goal) return;

        await get().updateGoal({
            ...goal,
            isCompleted: !goal.isCompleted,
        });
    },

    toggleSubgoal: async (goalId, subgoalId, actionId) => {
        const goal = get().goals.find((g) => String(g.id) === String(goalId));
        if (!goal) return;

        const updatedGoal = {
            ...goal,
            subgoals: goal.subgoals.map((sub) =>
                String(sub.id) === String(subgoalId) ? {
                    ...sub,
                    isCompleted: !sub.isCompleted,
                    completedActionId: !sub.isCompleted ? actionId : null
                } : sub
            ),
        };

        await get().updateGoal(updatedGoal);
    },

    markSubgoalAsSent: async (goalId, subgoalId) => {
        const goal = get().goals.find((g) => String(g.id) === String(goalId));
        if (!goal) return;

        const updatedGoal = {
            ...goal,
            subgoals: goal.subgoals.map((sub) =>
                String(sub.id) === String(subgoalId) ? { ...sub, isSentToTasks: true } : sub
            ),
        };

        await get().updateGoal(updatedGoal);
    },
}));
