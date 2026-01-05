import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { Button, ThemeButton } from '6_Shared/ui/Button/Button';
import { CustomInput } from '6_Shared/ui/Input/CustomInput';
import { useTodoStore } from '5_Entities/Todo/model/store/todoStore';
import { TodoPriority } from '5_Entities/Todo/model/types/todo';
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

    const onSave = () => {
        const pointsNum = Number(points);
        if (!desc || !pointsNum) return;

        addTodo({
            description: desc,
            points: pointsNum,
            priority,
        });

        setDesc('');
        setPoints('');
        setPriority('medium');
        onSuccess?.();
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
