export type TodoPriority = 'low' | 'medium' | 'high';
export type TodoType = 'task' | 'daily_challenge' | 'weekly_challenge';

export interface Subtask {
    id: string;
    description: string;
    details?: string;
    isCompleted: boolean;
    completedActionId?: string;
}

export interface Todo {
    id: string;
    description: string;
    details?: string;
    points: number;
    priority: TodoPriority;
    isCompleted: boolean;
    createdAt: number;
    subtasks?: Subtask[];
    completedActionId?: string;
    type: TodoType;
    completedAt?: number;
    subgoalId?: string;
}

export interface TodoState {
    todos: Todo[];
    setTodos: (todos: Todo[]) => void;
    fetchTodos: () => Promise<void>;
    addTodo: (todo: Omit<Todo, 'id' | 'isCompleted' | 'createdAt'>) => Promise<void>;
    updateTodo: (todo: Todo) => Promise<void>;
    toggleTodo: (id: string, actionId?: string) => Promise<void>;
    toggleSubtask: (todoId: string, subtaskId: string, actionId?: string) => Promise<void>;
    deleteTodo: (id: string) => Promise<void>;
}
