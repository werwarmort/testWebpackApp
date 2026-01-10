import { FC, useMemo, useId } from 'react';
import { classNames } from '6_Shared/lib/classNames/classNames';
import cls from './LineChart.module.scss';

interface DataPoint {
    label: string;
    value: number;
    penaltyValue?: number;
}

interface LineChartProps {
    className?: string;
    data: DataPoint[];
    height?: number;
    color?: string;
    penaltyColor?: string;
    title?: string;
}

export const LineChart: FC<LineChartProps> = ({
    className,
    data,
    height = 200,
    color = '#ffc906',
    penaltyColor = '#cc1e4a',
    title
}) => {
    const chartId = useId();
    const penaltyChartId = useId();
    const width = 800;
    const padding = 40;

    const maxVal = useMemo(() => {
        const vals = data.map(d => Math.max(d.value, d.penaltyValue || 0));
        return Math.max(...vals, 10);
    }, [data]);

    const getPoints = (isPenalty: boolean) => {
        if (data.length === 0) return '';
        const xStep = (width - padding * 2) / (data.length > 1 ? data.length - 1 : 1);
        
        return data.map((d, i) => {
            const x = padding + i * xStep;
            const val = isPenalty ? (d.penaltyValue || 0) : d.value;
            const y = height - padding - (val / maxVal) * (height - padding * 2);
            return `${x},${y}`;
        }).join(' ');
    };

    const points = useMemo(() => getPoints(false), [data, height, maxVal]);
    const penaltyPoints = useMemo(() => getPoints(true), [data, height, maxVal]);

    const getAreaPoints = (pts: string) => {
        if (!pts) return '';
        const xLast = padding + (data.length - 1) * ((width - padding * 2) / (data.length > 1 ? data.length - 1 : 1));
        return `${padding},${height - padding} ${pts} ${xLast},${height - padding}`;
    };

    return (
        <div className={classNames(cls.LineChartWrapper, {}, [className])}>
            {title && <h3 className={cls.title}>{title}</h3>}
            <svg viewBox={`0 0 ${width} ${height}`} className={cls.svg}>
                <defs>
                    <linearGradient id={chartId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id={penaltyChartId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={penaltyColor} stopOpacity="0.2" />
                        <stop offset="100%" stopColor={penaltyColor} stopOpacity="0" />
                    </linearGradient>
                </defs>

                <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.1)" />
                
                {/* Области под графиками */}
                <polyline points={getAreaPoints(points)} fill={`url(#${chartId})`} stroke="none" />
                <polyline points={getAreaPoints(penaltyPoints)} fill={`url(#${penaltyChartId})`} stroke="none" />

                {/* Линия штрафов (снизу) */}
                <polyline points={penaltyPoints} fill="none" stroke={penaltyColor} strokeWidth="2" strokeDasharray="5,5" opacity="0.6" />

                {/* Основная линия */}
                <polyline points={points} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                {/* Точки и подписи */}
                {data.map((d, i) => {
                    const xStep = (width - padding * 2) / (data.length > 1 ? data.length - 1 : 1);
                    const x = padding + i * xStep;
                    const y = height - padding - (d.value / maxVal) * (height - padding * 2);
                    const py = height - padding - ((d.penaltyValue || 0) / maxVal) * (height - padding * 2);
                    return (
                        <g key={i} className={cls.pointGroup}>
                            <circle cx={x} cy={y} r="4" fill={color} />
                            {d.penaltyValue! > 0 && <circle cx={x} cy={py} r="3" fill={penaltyColor} />}
                            
                            <text x={x} y={y - 10} textAnchor="middle" fontSize="12" fill={color} fontWeight="bold">
                                {d.value}
                            </text>
                            {d.penaltyValue! > 0 && (
                                <text x={x} y={py + 15} textAnchor="middle" fontSize="10" fill={penaltyColor}>
                                    -{d.penaltyValue}
                                </text>
                            )}
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
