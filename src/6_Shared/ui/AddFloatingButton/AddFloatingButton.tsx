import React from 'react';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { CircleButton } from '6_Shared/ui/CircleButton/CircleButton';
import { Portal } from '6_Shared/ui/Portal/Portal';
import { useTheme } from '1_App/providers/ThemeProvider';
import cls from './AddFloatingButton.module.scss';

interface AddFloatingButtonProps {
    onClick: () => void;
    className?: string;
}

export const AddFloatingButton = ({ onClick, className }: AddFloatingButtonProps) => {
    const { theme } = useTheme();

    return (
        <>
            <div className={classNames(cls.desktopContainer, {}, [className])}>
                <CircleButton onClick={onClick}>+</CircleButton>
            </div>

            <Portal>
                <div className={classNames(cls.mobileFab, {}, [theme])}>
                    <CircleButton onClick={onClick}>+</CircleButton>
                </div>
            </Portal>
        </>
    );
};
