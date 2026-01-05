import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { AddGoalForm } from '4_Features/AddGoalForm';
import { GoalList } from '3_Widgets/GoalList';
import cls from './GoalsPage.module.scss';

const GoalsPage: FC = () => {
    const { t } = useTranslation('goals');

    return (
        <div className={classNames(cls.GoalsPage, {}, [])}>
            <div className={cls.header}>
                <h1>{t('page_title')}</h1>
                <AddGoalForm />
            </div>
            <GoalList />
        </div>
    );
};

export default GoalsPage;
