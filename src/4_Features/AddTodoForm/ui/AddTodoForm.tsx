import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { Button, ThemeButton } from '6_Shared/ui/Button/Button';
import { CustomInput } from '6_Shared/ui/Input/CustomInput';
import { useTodoStore } from '5_Entities/Todo/model/store/todoStore';
import { TodoPriority, TodoType } from '5_Entities/Todo/model/types/todo';
import cls from './AddTodoForm.module.scss';

interface AddTodoFormProps {
    className?: string;
    onSuccess?: () => void;
}

export const AddTodoForm: FC<AddTodoFormProps> = ({ className, onSuccess }) => {
    const { t } = useTranslation();
    const addTodo = useTodoStore((state) => state.addTodo);
    const [desc, setDesc] = useState('');
    const [points, setPoints] = useState('');
    const [priority, setPriority] = useState<TodoPriority>('medium');
    const [type, setType] = useState<TodoType>('task');
    const [subtasks, setSubtasks] = useState<string[]>([]);

    const onSave = () => {
        const pointsNum = Number(points);
        if (!desc || !pointsNum) return;

        const formattedSubtasks = subtasks
            .filter((task) => task.trim() !== '')
            .map((task) => ({
                id: Date.now().toString() + Math.random(),
                description: task,
                isCompleted: false,
            }));

        addTodo({
            description: desc,
            points: pointsNum,
            priority,
            subtasks: formattedSubtasks,
            type,
        });

        setDesc('');
        setPoints('');
        setPriority('medium');
        setType('task');
        setSubtasks([]);
        onSuccess?.();
    };

    const handleAddSubtask = () => {
        setSubtasks([...subtasks, '']);
    };

    const handleSubtaskChange = (index: number, value: string) => {
        const newSubtasks = [...subtasks];
        newSubtasks[index] = value;
        setSubtasks(newSubtasks);
    };

    return (
        <div className={classNames(cls.AddTodoForm, {}, [className])}>
            <CustomInput
                className={cls.input}
                value={desc}
                onChange={setDesc}
                placeholder={t('Описание задачи')}
                autoFocus
            />
            <CustomInput
                className={cls.input}
                value={points}
                onChange={setPoints}
                placeholder={t('Баллы')}
                type="number"
            />
            
            <div className={cls.subtasks}>
                <div className={cls.subtasksHeader}>
                    <span>{t('Подзадачи')}</span>
                    <Button onClick={handleAddSubtask} theme={ThemeButton.CLEAR} className={cls.addSubtaskBtn}>
                        +
                    </Button>
                </div>
                {subtasks.map((subtask, index) => (
                    <CustomInput
                        key={index}
                        className={cls.subtaskInput}
                        value={subtask}
                        onChange={(val) => handleSubtaskChange(index, val)}
                        placeholder={t('Описание подзадачи')}
                    />
                ))}
            </div>

            <select
                className={cls.select}
                value={type}
                onChange={(e) => setType(e.target.value as TodoType)}
            >
                <option value="task">{t('Задача')}</option>
                <option value="daily_challenge">{t('Челендж дня')}</option>
                <option value="weekly_challenge">{t('Челендж недели')}</option>
            </select>

            <select
                className={cls.select}
                value={priority}
                onChange={(e) => setPriority(e.target.value as TodoPriority)}
            >
                <option value="low">{t('Низкий')}</option>
                <option value="medium">{t('Средний')}</option>
                <option value="high">{t('Высокий')}</option>
            </select>
            <Button
                onClick={onSave}
                className={cls.saveBtn}
                theme={ThemeButton.DEFAULT}
            >
                {t('Добавить')}
            </Button>
        </div>
    );
};
