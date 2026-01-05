export interface Action {
    id: string;
    text: string;
    points: number;
    isPenalty: boolean;
    createdAt: number; // timestamp
}

export interface ScoreState {
    dayPoints: number;
    weekPoints: number;
    actions: Action[];
    lastUpdatedDate: string; // YYYY-MM-DD
    addPoints: (amount: number) => void;
    addAction: (action: Omit<Action, 'id' | 'createdAt'> & { id?: string }) => void;
    removeAction: (id: string) => void;
    resetPoints: () => void;
    checkDate: () => void;
}
