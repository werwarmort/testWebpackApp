import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { Button, ThemeButton } from '6_Shared/ui/Button/Button';
import { CustomInput } from '6_Shared/ui/Input/CustomInput';
import { Checkbox } from '6_Shared/ui/Checkbox/Checkbox';
import { useScoreStore } from '5_Entities/Score/model/store/scoreStore';
import { Action } from '5_Entities/Score/model/types/score';
import cls from './AddActionForm.module.scss';

interface AddActionFormProps {
    className?: string;
    onSuccess?: () => void;
    initialData?: Action;
}

export const AddActionForm: FC<AddActionFormProps> = ({ className, onSuccess, initialData }) => {
    const { t } = useTranslation();
    const addAction = useScoreStore((state) => state.addAction);
    const updateAction = useScoreStore((state) => state.updateAction);

    const [text, setText] = useState(initialData?.text || '');
    const [points, setPoints] = useState(initialData?.points.toString() || '');
    const [isPenalty, setIsPenalty] = useState(initialData?.isPenalty || false);

    const onSave = () => {
        const pointsNum = Number(points);
        if (!text || !pointsNum) return;

        if (initialData) {
            updateAction(initialData.id, {
                text,
                points: pointsNum,
                isPenalty,
            });
        } else {
            addAction({
                text,
                points: pointsNum,
                isPenalty,
            });
        }

        if (!initialData) {
            setText('');
            setPoints('');
            setIsPenalty(false);
        }
        onSuccess?.();
    };

    return (
        <div className={classNames(cls.AddActionForm, {}, [className])}>
            <CustomInput
                className={cls.input}
                value={text}
                onChange={setText}
                placeholder={t('Описание действия')}
                autoFocus={!initialData}
            />
            <div className={cls.footerContainer}>
                <div className={cls.pointsWrapper}>
                    <CustomInput
                        className={cls.points}
                        value={points}
                        onChange={setPoints}
                        placeholder={t('Баллы')}
                        type="number"
                    />
                    <Checkbox
                        label={t('Штрафные')}
                        checked={isPenalty}
                        onChange={setIsPenalty}
                        className={cls.checkbox}
                    />
                </div>
                <Button onClick={onSave} className={cls.saveBtn} theme={ThemeButton.DEFAULT}>
                    {initialData ? t('Сохранить') : t('Добавить')}
                </Button>
            </div>
        </div>
    );
};
