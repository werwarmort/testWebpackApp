import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TodoState, Todo } from '../types/todo';

export const useTodoStore = create<TodoState>()(
    persist(
        (set) => ({
            todos: [] as Todo[],
            addTodo: (todoParams) => set((state) => ({
                todos: [
                    {
                        ...todoParams,
                        id: Date.now().toString(),
                        isCompleted: false,
                        createdAt: Date.now(),
                    },
                    ...state.todos,
                ],
            })),
            updateTodo: (updatedTodo) => set((state) => ({
                todos: state.todos.map((todo) =>
                    todo.id === updatedTodo.id ? updatedTodo : todo
                ),
            })),
            toggleTodo: (id, actionId) => set((state) => ({
                todos: state.todos.map((todo) =>
                    todo.id === id ? {
                        ...todo,
                        isCompleted: !todo.isCompleted,
                        completedActionId: !todo.isCompleted ? actionId : undefined,
                        completedAt: !todo.isCompleted ? Date.now() : undefined,
                    } : todo
                ),
            })),
            toggleSubtask: (todoId, subtaskId) => set((state) => ({
                todos: state.todos.map((todo) => {
                    if (todo.id !== todoId) return todo;
                    return {
                        ...todo,
                        subtasks: todo.subtasks?.map((sub) =>
                            sub.id === subtaskId ? { ...sub, isCompleted: !sub.isCompleted } : sub
                        ),
                    };
                }),
            })),
            deleteTodo: (id) => set((state) => ({
                todos: state.todos.filter((todo) => todo.id !== id),
            })),
        }),
        {
            name: 'todo-storage',
        },
    ),
);
