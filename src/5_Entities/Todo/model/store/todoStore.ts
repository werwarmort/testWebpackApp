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
            toggleTodo: (id) => set((state) => ({
                todos: state.todos.map((todo) =>
                    todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
                ),
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
