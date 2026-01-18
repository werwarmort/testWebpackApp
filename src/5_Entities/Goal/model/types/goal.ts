export interface Subgoal {
    id: string;
    description: string;
    details?: string;
    isCompleted: boolean;
    isSentToTasks?: boolean;
    points: number;
    completedActionId?: string;
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
    setGoals: (goals: Goal[]) => void;
    addGoal: (goal: Omit<Goal, 'id' | 'isCompleted' | 'createdAt'>) => Promise<void>;
    updateGoal: (goal: Goal) => Promise<void>;
    deleteGoal: (id: string) => Promise<void>;
    toggleGoal: (id: string) => Promise<void>;
    toggleSubgoal: (goalId: string, subgoalId: string, actionId?: string) => Promise<void>;
    markSubgoalAsSent: (goalId: string, subgoalId: string) => Promise<void>;
}
