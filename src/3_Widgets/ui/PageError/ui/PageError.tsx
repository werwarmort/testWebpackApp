import cls from './PageError.module.scss';
import { classNames } from "6_Shared/lib/classNames/classNames";
import {useTheme} from "1_App/providers/ThemeProvider";
import {useTranslation} from "react-i18next";
import {Button} from "6_Shared/ui/Button/Button";

interface PageErrorProps {
    className?: string;
}

export const PageError = ({ className }: PageErrorProps) => {
  const { t } = useTranslation();

  const reloadPage = () => {
    location.reload();
  }

    return (
        <div className={classNames (cls.PageError, {}, [className])}>
          {t('Произошла не предвиденная ошибка')}
          <Button onClick={reloadPage}>{t('Обновить страницу')}</Button>
        </div>
    );
};
