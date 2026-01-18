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
    const [description, setDescription] = useState(initialData?.description || '');
    const [subgoals, setSubgoals] = useState<Subgoal[]>(initialData?.subgoals || []);
    const [expandedDetails, setExpandedDetails] = useState<Record<number, boolean>>({});

    const onSave = async () => {
        if (!title.trim()) return;

        const formattedSubgoals = subgoals.filter((sub) => sub.description.trim() !== '');

        if (initialData) {
            await updateGoal({
                ...initialData,
                title,
                description,
                subgoals: formattedSubgoals,
            });
        } else {
            await addGoal({
                title,
                description,
                subgoals: formattedSubgoals,
            });
        }

        if (!initialData) {
            setTitle('');
            setDescription('');
            setSubgoals([]);
        }
        onSuccess?.();
    };

    const handleAddSubgoal = () => {
        setSubgoals([...subgoals, {
            id: Date.now().toString() + Math.random(),
            description: '',
            details: '',
            isCompleted: false,
            points: 0
        }]);
    };

    const handleSubgoalChange = (index: number, field: 'description' | 'points' | 'details', value: string | number) => {
        const newSubgoals = [...subgoals];
        if (field === 'points') {
            newSubgoals[index] = { ...newSubgoals[index], points: Number(value) };
        } else if (field === 'description') {
            newSubgoals[index] = { ...newSubgoals[index], description: String(value) };
        } else {
            newSubgoals[index] = { ...newSubgoals[index], details: String(value) };
        }
        setSubgoals(newSubgoals);
    };

    const handleDeleteSubgoal = (index: number) => {
        setSubgoals(subgoals.filter((_, i) => i !== index));
    };

    const toggleDetails = (index: number) => {
        setExpandedDetails(prev => ({ ...prev, [index]: !prev[index] }));
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
            
            <textarea
                className={cls.textarea}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('goal_description_placeholder') || 'Описание цели'}
            />
            
            <div className={cls.subgoals}>
                <div className={cls.subgoalsHeader}>
                    <span>{t('Подцели')}</span>
                    <Button onClick={handleAddSubgoal} theme={ThemeButton.CLEAR} className={cls.addSubgoalBtn}>
                        +
                    </Button>
                </div>
                {subgoals.map((sub, index) => (
                    <div key={sub.id} className={cls.subgoalContainer}>
                        <div className={cls.subgoalRow}>
                            <CustomInput
                                className={cls.subgoalInput}
                                value={sub.description}
                                onChange={(val) => handleSubgoalChange(index, 'description', val)}
                                placeholder={t('Описание подцели')}
                            />
                            <CustomInput
                                className={cls.subgoalPoints}
                                value={sub.points.toString()}
                                onChange={(val) => handleSubgoalChange(index, 'points', val)}
                                placeholder={t('Баллы')}
                                type="number"
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
                                className={cls.deleteSubgoalBtn}
                                onClick={() => handleDeleteSubgoal(index)}
                            >
                                ✖
                            </Button>
                        </div>
                        {(expandedDetails[index] || sub.details) && (
                            <input
                                className={cls.detailsInput}
                                value={sub.details || ''}
                                onChange={(e) => handleSubgoalChange(index, 'details', e.target.value)}
                                placeholder={t('subgoal_details_placeholder') || 'Детали подцели'}
                            />
                        )}
                    </div>
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
