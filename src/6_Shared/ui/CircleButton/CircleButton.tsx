import { ButtonHTMLAttributes, FC } from 'react';
import { classNames } from '6_Shared/lib/classNames/classNames';
import cls from './CircleButton.module.scss';

interface CircleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

export const CircleButton: FC<CircleButtonProps> = (props) => {
    const { className, children, ...otherProps } = props;

    return (
        <button
            type="button"
            className={classNames(cls.CircleButton, {}, [className])}
            {...otherProps}
        >
            {children}
        </button>
    );
};
