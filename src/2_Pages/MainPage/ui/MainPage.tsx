import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './MainPage.module.scss';

const MainPage = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.MainPageRoot}>
            {t('Главная страница')}
        </div>
    );
};

export default MainPage;
