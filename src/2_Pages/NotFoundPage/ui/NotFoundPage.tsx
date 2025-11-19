import cls from './NotFoundPage.module.scss';
import { classNames } from "6_Shared/lib/classNames/classNames";
import {useTranslation} from "react-i18next";

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames (cls.NotFoundPage, {}, [className])}>
          {t("Страница не найдена")}
        </div>
    );
};