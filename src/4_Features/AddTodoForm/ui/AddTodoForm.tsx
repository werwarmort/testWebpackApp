import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { Button, ThemeButton } from '6_Shared/ui/Button/Button';
import { CustomInput } from '6_Shared/ui/Input/CustomInput';
import { useTodoStore } from '5_Entities/Todo/model/store/todoStore';
import { TodoPriority, TodoType, Todo, Subtask } from '5_Entities/Todo/model/types/todo';
import cls from './AddTodoForm.module.scss';

interface AddTodoFormProps {
    className?: string;
    onSuccess?: () => void;
    initialData?: Todo;
}

export const AddTodoForm: FC<AddTodoFormProps> = ({ className, onSuccess, initialData }) => {
    const { t } = useTranslation('todo');
    const addTodo = useTodoStore((state) => state.addTodo);
    const updateTodo = useTodoStore((state) => state.updateTodo);

    const [desc, setDesc] = useState(initialData?.description || '');
    const [details, setDetails] = useState(initialData?.details || '');
    const [points, setPoints] = useState(initialData?.points.toString() || '');
    const [priority, setPriority] = useState<TodoPriority>(initialData?.priority || 'medium');
    const [type, setType] = useState<TodoType>(initialData?.type || 'task');
    
    // Используем Subtask[] вместо string[]
    const [subtasks, setSubtasks] = useState<Subtask[]>(initialData?.subtasks || []);
    const [expandedDetails, setExpandedDetails] = useState<Record<number, boolean>>({});

    const onSave = async () => {
        const pointsNum = Number(points);
        if (!desc || !pointsNum) return;

        const formattedSubtasks = subtasks.filter((task) => task.description.trim() !== '');

        if (initialData) {
            await updateTodo({
                ...initialData,
                description: desc,
                details,
                points: pointsNum,
                priority,
                type,
                subtasks: formattedSubtasks,
            });
        } else {
            await addTodo({
                description: desc,
                details,
                points: pointsNum,
                priority,
                type,
                subtasks: formattedSubtasks,
            });
        }

        if (!initialData) {
            setDesc('');
            setDetails('');
            setPoints('');
            setPriority('medium');
            setType('task');
            setSubtasks([]);
        }
        
        onSuccess?.();
    };

    const handleAddSubtask = () => {
        setSubtasks([...subtasks, {
            id: Date.now().toString() + Math.random(),
            description: '',
            details: '',
            isCompleted: false
        }]);
    };

    const handleSubtaskChange = (index: number, field: 'description' | 'details', value: string) => {
        const newSubtasks = [...subtasks];
        newSubtasks[index] = { ...newSubtasks[index], [field]: value };
        setSubtasks(newSubtasks);
    };

    const handleDeleteSubtask = (index: number) => {
        setSubtasks(subtasks.filter((_, i) => i !== index));
    };

    const toggleDetails = (index: number) => {
        setExpandedDetails(prev => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <div className={classNames(cls.AddTodoForm, {}, [className])}>
            <CustomInput
                className={cls.input}
                value={desc}
                onChange={setDesc}
                placeholder={t('task_description')}
                autoFocus={!initialData}
            />
            
            <textarea
                className={cls.textarea}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={t('task_details_placeholder') || 'Подробное описание'}
            />

            <CustomInput
                className={cls.input}
                value={points}
                onChange={setPoints}
                placeholder={t('points')}
                type="number"
            />
            
            <div className={cls.subtasks}>
                <div className={cls.subtasksHeader}>
                    <span>{t('subtasks')}</span>
                    <Button onClick={handleAddSubtask} theme={ThemeButton.CLEAR} className={cls.addSubtaskBtn}>
                        +
                    </Button>
                </div>
                {subtasks.map((subtask, index) => (
                    <div key={subtask.id} className={cls.subtaskContainer}>
                        <div className={cls.subtaskRow}>
                            <CustomInput
                                className={cls.subtaskInput}
                                value={subtask.description}
                                onChange={(val) => handleSubtaskChange(index, 'description', val)}
                                placeholder={t('subtask_description')}
                            />
                            <Button
                                theme={ThemeButton.CLEAR}
                                className={cls.detailsBtn}
                                onClick={() => toggleDetails(index)}
                            >
                                📝
                            </Button>
                            <Button
                                theme={ThemeButton.CLEAR}
                                className={cls.deleteSubtaskBtn}
                                onClick={() => handleDeleteSubtask(index)}
                            >
                                ✖
                            </Button>
                        </div>
                        {(expandedDetails[index] || subtask.details) && (
                            <input
                                className={cls.detailsInput}
                                value={subtask.details || ''}
                                onChange={(e) => handleSubtaskChange(index, 'details', e.target.value)}
                                placeholder={t('subtask_details_placeholder') || 'Детали подзадачи'}
                            />
                        )}
                    </div>
                ))}
            </div>

            <select
                className={cls.select}
                value={type}
                onChange={(e) => setType(e.target.value as TodoType)}
            >
                <option value="task">{t('type_task')}</option>
                <option value="daily_challenge">{t('type_daily')}</option>
                <option value="weekly_challenge">{t('type_weekly')}</option>
            </select>

            <select
                className={cls.select}
                value={priority}
                onChange={(e) => setPriority(e.target.value as TodoPriority)}
            >
                <option value="low">{t('priority_low')}</option>
                <option value="medium">{t('priority_medium')}</option>
                <option value="high">{t('priority_high')}</option>
            </select>
            <Button
                onClick={onSave}
                className={cls.saveBtn}
                theme={ThemeButton.DEFAULT}
            >
                {initialData ? t('save') : t('add')}
            </Button>
        </div>
    );
};
