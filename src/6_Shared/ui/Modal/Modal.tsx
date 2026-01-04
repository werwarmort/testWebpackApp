import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { Portal } from '6_Shared/ui/Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
    } = props;

    const [isClosing, setIsClosing] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const mods: Record<string, boolean> = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (!isOpen && !isClosing) {
        return null;
    }

    // Если закрывается, мы все еще рендерим, чтобы показать анимацию, но isOpen уже false (снаружи).
    // Логика выше if (!isOpen) верна только без анимации закрытия.
    // С анимацией: если (!isOpen && !isClosing) return null.
    // Но isClosing ставится true внутри closeHandler.
    // Внешний isOpen становится false, когда родитель реагирует на onClose.
    // Тут нужна синхронизация или просто рендерить всегда, но управлять классами (mount/unmount logic сложнее).
    // Для простоты: если isOpen стал false, мы должны дать время анимации.
    // В текущей реализации: внешний компонент делает isOpen=false.
    // Если мы хотим анимацию закрытия, Modal должен сам управлять своим 'visible' состоянием или родитель должен ждать.
    // Упрощу: без сложной анимации закрытия для прототипа, или использую простой вариант.

    // Вариант с простой анимацией появления:
    if (!isOpen) return null;

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className])}>
                <div className={cls.overlay} onClick={closeHandler}>
                    <div className={cls.content} onClick={onContentClick}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
