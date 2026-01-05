export interface Subgoal {
    id: string;
    description: string;
    isCompleted: boolean;
    isSentToTasks?: boolean;
    points: number;
}

export interface Goal {
    id: string;
    title: string;
    description?: string;
    isCompleted: boolean;
    createdAt: number;
    subgoals: Subgoal[];
}

export interface GoalState {
    goals: Goal[];
    addGoal: (goal: Omit<Goal, 'id' | 'isCompleted' | 'createdAt'>) => void;
    updateGoal: (goal: Goal) => void;
    deleteGoal: (id: string) => void;
    toggleGoal: (id: string) => void;
    toggleSubgoal: (goalId: string, subgoalId: string) => void;
    markSubgoalAsSent: (goalId: string, subgoalId: string) => void;
}
