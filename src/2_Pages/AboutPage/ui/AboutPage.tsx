import React from 'react';
import styles from './AboutPage.module.scss';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
    const { t } = useTranslation('about');

    return (
        <div className={styles.AboutPageRoot}>
            {t('О сайте')}
        </div>
    );
};

export default AboutPage;
