export interface ScoreState {
    points: number;
    addPoints: (amount: number) => void;
    resetPoints: () => void;
}
