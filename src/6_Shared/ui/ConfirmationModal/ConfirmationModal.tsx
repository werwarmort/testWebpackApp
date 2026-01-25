import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { Modal } from '6_Shared/ui/Modal/Modal';
import { Button, ThemeButton } from '6_Shared/ui/Button/Button';
import cls from './ConfirmationModal.module.scss';

interface ConfirmationModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
}

export const ConfirmationModal: FC<ConfirmationModalProps> = (props) => {
    const {
        className,
        isOpen,
        onClose,
        onConfirm,
        title,
        message,
        confirmText,
        cancelText,
    } = props;
    const { t } = useTranslation();

    return (
        <Modal
            className={classNames('', {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className={cls.ConfirmationModal}>
                <div className={cls.header}>
                    {title || t('Вы уверены?')}
                </div>
                <div className={cls.message}>
                    {message || t('Это действие нельзя отменить.')}
                </div>
                <div className={cls.buttons}>
                    <Button
                        theme={ThemeButton.CLEAR}
                        className={cls.cancelBtn}
                        onClick={onClose}
                    >
                        {cancelText || t('Отмена')}
                    </Button>
                    <Button
                        theme={ThemeButton.CLEAR}
                        className={cls.confirmBtn}
                        onClick={onConfirm}
                    >
                        {confirmText || t('Удалить')}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
