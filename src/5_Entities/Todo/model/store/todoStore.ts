import { create } from 'zustand';
import { TodoState, Todo } from '../types/todo';
import { $api } from '6_Shared/api/api';

export const useTodoStore = create<TodoState>((set, get) => ({
    todos: [] as Todo[],

    setTodos: (todos: Todo[]) => set({ todos }),

    fetchTodos: async () => {
        try {
            const response = await $api('/tasks');
            if (response.ok) {
                const data = await response.json();
                set({ todos: data });
            }
        } catch (e) {
            console.error('Failed to fetch tasks', e);
        }
    },

    addTodo: async (todoParams) => {
        try {
            const response = await $api('/tasks', {
                method: 'POST',
                body: JSON.stringify(todoParams),
            });
            if (response.ok) {
                await get().fetchTodos();
            }
        } catch (e) {
            console.error('Failed to add task', e);
        }
    },

    updateTodo: async (updatedTodo) => {
        try {
            const response = await $api(`/tasks/${updatedTodo.id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedTodo),
            });
            if (response.ok) {
                await get().fetchTodos();
            }
        } catch (e) {
            console.error('Failed to update task', e);
        }
    },

    toggleTodo: async (id, actionId) => {
        const todo = get().todos.find((t) => String(t.id) === String(id));
        if (!todo) return;

        const updatedTodo = {
            ...todo,
            isCompleted: !todo.isCompleted,
            completedActionId: !todo.isCompleted ? actionId : null,
            completedAt: !todo.isCompleted ? Date.now() : null,
        };

        await get().updateTodo(updatedTodo);
    },

    toggleSubtask: async (todoId, subtaskId) => {
        const todo = get().todos.find((t) => String(t.id) === String(todoId));
        if (!todo) return;

        const updatedTodo = {
            ...todo,
            subtasks: todo.subtasks?.map((sub) =>
                String(sub.id) === String(subtaskId) ? { ...sub, isCompleted: !sub.isCompleted } : sub
            ),
        };

        await get().updateTodo(updatedTodo);
    },

    deleteTodo: async (id) => {
        try {
            const response = await $api(`/tasks/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                await get().fetchTodos();
            }
        } catch (e) {
            console.error('Failed to delete task', e);
        }
    },
}));
