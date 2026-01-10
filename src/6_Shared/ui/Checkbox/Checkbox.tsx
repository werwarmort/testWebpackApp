import { FC, InputHTMLAttributes } from 'react';
import { classNames } from '6_Shared/lib/classNames/classNames';
import cls from './Checkbox.module.scss';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    className?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
    theme?: 'primary' | 'secondary';
    variant?: 'square' | 'round';
}

export const Checkbox: FC<CheckboxProps> = (props) => {
    const {
        className,
        checked,
        onChange,
        label,
        theme = 'secondary',
        variant = 'square',
        ...otherProps
    } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.checked);
    };

    return (
        <label className={classNames(cls.CheckboxWrapper, { [cls[theme]]: true, [cls[variant]]: true }, [className])}>
            <input
                type="checkbox"
                className={cls.input}
                checked={checked}
                onChange={onChangeHandler}
                {...otherProps}
            />
            <span className={cls.checkmark} />
            {label && <span className={cls.label}>{label}</span>}
        </label>
    );
};
