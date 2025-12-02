import React from 'react';
import { classNames } from '6_Shared/lib/classNames/classNames';
import cls from './PageLoader.module.scss';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => (
    <div className={classNames(cls.loader, {}, [className])}>
        <div className={cls['cube-container']}>
            <div className={cls.pulsator}>
                <div className={cls.cube}>
                    <div className={classNames(cls.face, {}, [cls.front])} />
                    <div className={classNames(cls.face, {}, [cls.back])} />
                    <div className={classNames(cls.face, {}, [cls.right])} />
                    <div className={classNames(cls.face, {}, [cls.left])} />
                    <div className={classNames(cls.face, {}, [cls.top])} />
                    <div className={classNames(cls.face, {}, [cls.bottom])} />
                </div>
            </div>
        </div>
    </div>
);
