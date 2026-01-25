import { FC, HTMLAttributes } from 'react';
import { classNames } from '6_Shared/lib/classNames/classNames';
import cls from './CollapseButton.module.scss';

interface CollapseButtonProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    collapsed: boolean;
}

export const CollapseButton: FC<CollapseButtonProps> = ({ className, collapsed, ...otherProps }) => {
    return (
        <div
            className={classNames(cls.CollapseButton, { [cls.collapsed]: collapsed }, [className])}
            {...otherProps}
        >
            ▼
        </div>
    );
};
