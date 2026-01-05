export type TodoPriority = 'low' | 'medium' | 'high';

export interface Subtask {
    id: string;
    description: string;
    isCompleted: boolean;
}

export interface Todo {
    id: string;
    description: string;
    points: number;
    priority: TodoPriority;
    isCompleted: boolean;
    createdAt: number;
    subtasks?: Subtask[];
    completedActionId?: string;
}

export interface TodoState {
    todos: Todo[];
    addTodo: (todo: Omit<Todo, 'id' | 'isCompleted' | 'createdAt'>) => void;
    toggleTodo: (id: string, actionId?: string) => void;
    toggleSubtask: (todoId: string, subtaskId: string) => void;
    deleteTodo: (id: string) => void;
}
