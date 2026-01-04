import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { Button, ThemeButton } from '6_Shared/ui/Button/Button';
import { CustomInput } from '6_Shared/ui/Input/CustomInput';
import { Checkbox } from '6_Shared/ui/Checkbox/Checkbox';
import { useScoreStore } from '5_Entities/Score/model/store/scoreStore';
import cls from './AddActionForm.module.scss';

interface AddActionFormProps {
    className?: string;
    onSuccess?: () => void;
}

export const AddActionForm: FC<AddActionFormProps> = ({ className, onSuccess }) => {
    const { t } = useTranslation();
    const addAction = useScoreStore(state => state.addAction);
    const [text, setText] = useState('');
    const [points, setPoints] = useState('');
    const [isPenalty, setIsPenalty] = useState(false);

    const onSave = () => {
        const pointsNum = Number(points);
        if (!text || !pointsNum) return;

        addAction({
            text,
            points: pointsNum,
            isPenalty,
        });

        setText('');
        setPoints('');
        setIsPenalty(false);
        onSuccess?.();
    };

    return (
        <div className={classNames(cls.AddActionForm, {}, [className])}>
            <CustomInput
                className={cls.input}
                value={text}
                onChange={setText}
                placeholder={t('Описание действия')}
                autoFocus
            />
            <CustomInput
                // className={cls.input}
                value={points}
                onChange={setPoints}
                placeholder={t('Баллы')}
                type="number"
            />
            <Checkbox
                label={t('Штраф')}
                checked={isPenalty}
                onChange={setIsPenalty}
                className={cls.checkbox}
            />
            <Button onClick={onSave} className={cls.saveBtn} theme={ThemeButton.DEFAULT}>
                {t('Добавить')}
            </Button>
        </div>
    );
};
