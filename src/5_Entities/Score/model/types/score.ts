export interface Action {
    id: string;
    text: string;
    points: number;
    isPenalty: boolean;
    createdAt: number; // timestamp
}

export interface ScoreState {
    points: number;
    actions: Action[];
    addPoints: (amount: number) => void;
    addAction: (action: Omit<Action, 'id' | 'createdAt'>) => void;
    resetPoints: () => void;
}
