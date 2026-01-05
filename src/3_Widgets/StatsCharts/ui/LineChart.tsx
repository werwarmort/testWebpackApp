import { FC, useMemo } from 'react';
import { classNames } from '6_Shared/lib/classNames/classNames';
import cls from './LineChart.module.scss';

interface DataPoint {
    label: string;
    value: number;
}

interface LineChartProps {
    className?: string;
    data: DataPoint[];
    height?: number;
    color?: string;
    title?: string;
}

export const LineChart: FC<LineChartProps> = ({
    className,
    data,
    height = 200,
    color = '#ffc906',
    title
}) => {
    const width = 800;
    const padding = 40;

    const maxVal = useMemo(() => {
        const vals = data.map(d => d.value);
        return Math.max(...vals, 10); // Минимум 10 для масштаба
    }, [data]);

    const points = useMemo(() => {
        if (data.length === 0) return '';
        const xStep = (width - padding * 2) / (data.length > 1 ? data.length - 1 : 1);
        
        return data.map((d, i) => {
            const x = padding + i * xStep;
            const y = height - padding - (d.value / maxVal) * (height - padding * 2);
            return `${x},${y}`;
        }).join(' ');
    }, [data, height, maxVal]);

    const areaPoints = useMemo(() => {
        if (!points) return '';
        const xLast = padding + (data.length - 1) * ((width - padding * 2) / (data.length > 1 ? data.length - 1 : 1));
        return `${padding},${height - padding} ${points} ${xLast},${height - padding}`;
    }, [points, data.length, height]);

    return (
        <div className={classNames(cls.LineChartWrapper, {}, [className])}>
            {title && <h3 className={cls.title}>{title}</h3>}
            <svg viewBox={`0 0 ${width} ${height}`} className={cls.svg}>
                <defs>
                    <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Оси */}
                <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.1)" />
                
                {/* Область под графиком */}
                <polyline
                    points={areaPoints}
                    fill={`url(#gradient-${title})`}
                    stroke="none"
                />

                {/* Линия графика */}
                <polyline
                    points={points}
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Точки */}
                {data.map((d, i) => {
                    const xStep = (width - padding * 2) / (data.length > 1 ? data.length - 1 : 1);
                    const x = padding + i * xStep;
                    const y = height - padding - (d.value / maxVal) * (height - padding * 2);
                    return (
                        <g key={i} className={cls.pointGroup}>
                            <circle cx={x} cy={y} r="4" fill={color} />
                            <text x={x} y={y - 10} textAnchor="middle" fontSize="12" fill="var(--primary-color)" opacity="0.8">
                                {d.value}
                            </text>
                            <text x={x} y={height - padding + 20} textAnchor="middle" fontSize="10" fill="var(--primary-color)" opacity="0.5">
                                {d.label}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};
