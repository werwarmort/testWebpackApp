import { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { useScoreStore } from '5_Entities/Score/model/store/scoreStore';
import { ActionItem } from '5_Entities/Action/ui/ActionItem/ActionItem';
import { DateSeparator } from './DateSeparator/DateSeparator';
import cls from './ActionList.module.scss';

interface ActionListProps {
    className?: string;
}

export const ActionList: FC<ActionListProps> = ({ className }) => {
    const { t } = useTranslation();
    const actions = useScoreStore((state) => state.actions);

    if (actions.length === 0) {
        return <div className={classNames(cls.ActionList, {}, [className, cls.empty])}>{t('Список действий пуст')}</div>;
    }

    let lastDateString = '';

    return (
        <div className={classNames(cls.ActionList, {}, [className])}>
            {actions.map((action) => {
                const date = new Date(action.createdAt);
                const dateString = date.toLocaleDateString();
                const showSeparator = dateString !== lastDateString;

                if (showSeparator) {
                    lastDateString = dateString;
                }

                return (
                    <Fragment key={action.id}>
                        {showSeparator && <DateSeparator date={date} />}
                        <ActionItem action={action} className={cls.item} />
                    </Fragment>
                );
            })}
        </div>
    );
};
