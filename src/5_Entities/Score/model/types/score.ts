export interface Action {
    id: string;
    text: string;
    points: number;
    isPenalty: boolean;
    createdAt: number; // timestamp
    todoId?: string;
}

export interface ScoreState {
    dayPoints: number;
    weekPoints: number;
    actions: Action[];
    lastUpdatedDate: string; // YYYY-MM-DD
    setActions: (actions: Action[]) => void;
    addPoints: (amount: number) => void;
    addAction: (action: Omit<Action, 'id' | 'createdAt'> & { id?: string }) => Promise<void>;
    updateAction: (id: string, action: Partial<Omit<Action, 'id' | 'createdAt'>>) => Promise<void>;
    removeAction: (id: string) => Promise<void>;
    resetPoints: () => void;
    checkDate: () => void;
}
