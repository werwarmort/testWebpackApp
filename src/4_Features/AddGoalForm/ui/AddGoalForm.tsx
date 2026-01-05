import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { Button, ThemeButton } from '6_Shared/ui/Button/Button';
import { CustomInput } from '6_Shared/ui/Input/CustomInput';
import { useGoalStore } from '5_Entities/Goal';
import { Subgoal, Goal } from '5_Entities/Goal/model/types/goal';
import cls from './AddGoalForm.module.scss';

interface AddGoalFormProps {
    className?: string;
    onSuccess?: () => void;
    initialData?: Goal;
}

export const AddGoalForm: FC<AddGoalFormProps> = ({ className, onSuccess, initialData }) => {
    const { t } = useTranslation('goals');
    const addGoal = useGoalStore((state) => state.addGoal);
    const updateGoal = useGoalStore((state) => state.updateGoal);

    const [title, setTitle] = useState(initialData?.title || '');
    const [subgoals, setSubgoals] = useState<Subgoal[]>(initialData?.subgoals || []);

    const onSave = () => {
        if (!title.trim()) return;

        const formattedSubgoals = subgoals.filter((sub) => sub.description.trim() !== '');

        if (initialData) {
            updateGoal({
                ...initialData,
                title,
                subgoals: formattedSubgoals,
            });
        } else {
            addGoal({
                title,
                subgoals: formattedSubgoals,
            });
        }

        if (!initialData) {
            setTitle('');
            setSubgoals([]);
        }
        onSuccess?.();
    };

    const handleAddSubgoal = () => {
        setSubgoals([...subgoals, {
            id: Date.now().toString() + Math.random(),
            description: '',
            isCompleted: false
        }]);
    };

    const handleSubgoalChange = (index: number, value: string) => {
        const newSubgoals = [...subgoals];
        newSubgoals[index] = { ...newSubgoals[index], description: value };
        setSubgoals(newSubgoals);
    };

    return (
        <div className={classNames(cls.AddGoalForm, {}, [className])}>
            <CustomInput
                className={cls.input}
                value={title}
                onChange={setTitle}
                placeholder={t('Название цели')}
                autoFocus={!initialData}
            />
            
            <div className={cls.subgoals}>
                <div className={cls.subtasksHeader}>
                    <span>{t('Подцели')}</span>
                    <Button onClick={handleAddSubgoal} theme={ThemeButton.CLEAR} className={cls.addSubgoalBtn}>
                        +
                    </Button>
                </div>
                {subgoals.map((sub, index) => (
                    <CustomInput
                        key={sub.id}
                        className={cls.subgoalInput}
                        value={sub.description}
                        onChange={(val) => handleSubgoalChange(index, val)}
                        placeholder={t('Описание подцели')}
                    />
                ))}
            </div>

            <Button
                onClick={onSave}
                className={cls.saveBtn}
                theme={ThemeButton.DEFAULT}
            >
                {initialData ? t('Сохранить') : t('Добавить')}
            </Button>
        </div>
    );
};
