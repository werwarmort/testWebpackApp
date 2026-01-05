export type TodoPriority = 'low' | 'medium' | 'high';

export interface Todo {
    id: string;
    description: string;
    points: number;
    priority: TodoPriority;
    isCompleted: boolean;
    createdAt: number;
}

export interface TodoState {
    todos: Todo[];
    addTodo: (todo: Omit<Todo, 'id' | 'isCompleted' | 'createdAt'>) => void;
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
}
