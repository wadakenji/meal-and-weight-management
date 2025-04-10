import { FC } from 'react';
import clsx from 'clsx';
import {
  dateToMonthDateString,
  getDateDiff,
  getEachDates,
  isToday,
} from '@/utils/date';
import { roundSecondDecimal } from '@/utils/number';

export const DATE_WIDTH = 40;
const GRID_RANGE_HEIGHT = 300;

const MARGIN_TOP = 30;
const MARGIN_BOTTOM = 30;
const MARGIN_LEFT = 20;
const MARGIN_RIGHT = 50;

const X_GRID_LABEL_DY = 22;
const Y_GRID_LABEL_DX = 15;
const Y_GRID_LABEL_DY = 5;
const DOT_LABEL_DY = -10;

const MORE_BUTTON_WIDTH = 100;

type Color = 'primary' | 'red';

const colorClassNameMap: Record<Color, string> = {
  primary: 'stroke-primary fill-primary',
  red: 'stroke-line-chart-red fill-line-chart-red',
};

const valuesToYGrid = (values: number[]) => {
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const diffMaxMin = maxValue - minValue;

  if (diffMaxMin === 0) {
    // データの値 - 0.5, データの値, データの値 + 0.5 の3本のグリッドを描画する
    const yGridLowest = roundSecondDecimal(maxValue - 0.5);
    const yGridHighest = roundSecondDecimal(maxValue + 0.5);
    return {
      yGridLowest,
      yGridHighest,
      yGridValues: [yGridLowest, roundSecondDecimal(maxValue), yGridHighest],
    };
  }

  const yGridInterval =
    diffMaxMin <= 0.4
      ? 0.1
      : diffMaxMin <= 1
        ? 0.2
        : diffMaxMin <= 2
          ? 0.5
          : // キリがよく、充分データが収まる間隔とするために切り上げる
            Math.ceil(diffMaxMin / 4);

  // 最小値を超えない最大の、yGridIntervalで割り切れる数
  const yGridLowest = roundSecondDecimal(
    Math.floor(minValue / yGridInterval) * yGridInterval,
  );
  // 最大値を超える最小の、yGridIntervalで割り切れる数
  const yGridHighest = roundSecondDecimal(
    Math.ceil(maxValue / yGridInterval) * yGridInterval,
  );

  const yGridValues = [
    // グリッド間隔の数 + 1で上下端にもグリッドを描画する
    ...Array(Math.round((yGridHighest - yGridLowest) / yGridInterval) + 1),
  ].map((_, i) => roundSecondDecimal(yGridLowest + yGridInterval * i));

  return { yGridHighest, yGridLowest, yGridValues };
};

type Props = {
  data: { date: Date; value: number }[];
  startDate: Date;
  endDate: Date;
  color?: Color;
  marginRight?: number;
  timezone?: string;
  dateWidth?: number;
  showsDot?: boolean;
  onClickMoreButton?: () => Promise<void>;
  isLoadingMore?: boolean;
};

export const DateLineChart: FC<Props> = ({
  data,
  startDate,
  endDate,
  marginRight,
  timezone,
  onClickMoreButton,
  isLoadingMore,
  color = 'primary',
  dateWidth = DATE_WIDTH,
  showsDot = true,
}) => {
  if (data.length < 1) return <p>データがありません。</p>;

  const colorClassName = colorClassNameMap[color];

  const chartMargin = {
    top: MARGIN_TOP,
    right: marginRight ?? MARGIN_RIGHT,
    bottom: MARGIN_BOTTOM,
    left: MARGIN_LEFT,
  };

  const dates = getEachDates(startDate, endDate, { timezone });

  const gridRangeWidth = (dates.length - 1) * dateWidth;
  const gridRangeHeight = GRID_RANGE_HEIGHT;

  const gridRangeStart = { x: chartMargin.left, y: chartMargin.top };
  const gridRangeEnd = {
    x: chartMargin.left + gridRangeWidth,
    y: chartMargin.top + gridRangeHeight,
  };

  if (onClickMoreButton) {
    gridRangeStart.x += MORE_BUTTON_WIDTH;
    gridRangeEnd.x += MORE_BUTTON_WIDTH;
  }

  let svgWidth = chartMargin.left + gridRangeWidth + chartMargin.right;
  const svgHeight = chartMargin.top + gridRangeHeight + chartMargin.bottom;

  if (onClickMoreButton) {
    svgWidth += MORE_BUTTON_WIDTH;
  }

  const values = data.map(({ value }) => value);
  const { yGridValues, yGridLowest, yGridHighest } = valuesToYGrid(values);

  const heightByValue = GRID_RANGE_HEIGHT / (yGridHighest - yGridLowest);

  const xGridInterval = Math.ceil(120 / dateWidth); // 1日分の横幅の値によってグリッド線を表示する日付を決める

  const valueToY = (value: number) =>
    gridRangeEnd.y - (value - yGridLowest) * heightByValue;
  const dateToX = (date: Date) =>
    gridRangeStart.x + dateWidth * getDateDiff(startDate, date, { timezone });

  const circleXYs = data
    .map(({ date, value }) => ({
      x: dateToX(date),
      y: valueToY(value),
      label: roundSecondDecimal(value).toLocaleString(),
    }))
    .sort((a, b) => a.x - b.x);

  return (
    <div className="dir-rtl w-full overflow-x-scroll">
      <svg
        width={svgWidth}
        height={svgHeight}
        xmlns="http://www.w3.org/2000/svg"
        className={clsx('dir-ltr text-primary-light', colorClassName)}
      >
        {onClickMoreButton && (
          <g id="moreButton" role="button" onClick={onClickMoreButton}>
            <rect
              x={chartMargin.left}
              y={gridRangeStart.y}
              width={MORE_BUTTON_WIDTH - 4}
              height={gridRangeHeight}
              className={
                isLoadingMore
                  ? 'fill-white stroke-white'
                  : 'fill-primary-light stroke-primary-light'
              }
            />
            {isLoadingMore ? (
              <>
                <circle
                  cx={chartMargin.left + MORE_BUTTON_WIDTH / 2}
                  cy={gridRangeStart.y + gridRangeHeight / 2}
                  r={3}
                  className="fill-primary"
                />
                <circle
                  cx={chartMargin.left + MORE_BUTTON_WIDTH / 2 - 15}
                  cy={gridRangeStart.y + gridRangeHeight / 2}
                  r={3}
                  className="fill-primary"
                />
                <circle
                  cx={chartMargin.left + MORE_BUTTON_WIDTH / 2 + 15}
                  cy={gridRangeStart.y + gridRangeHeight / 2}
                  r={3}
                  className="fill-primary"
                />
              </>
            ) : (
              <>
                <polygon
                  points={`
              ${chartMargin.left + 30}, ${gridRangeStart.y + gridRangeHeight / 2 + 2} 
              ${chartMargin.left + MORE_BUTTON_WIDTH - 40}, ${gridRangeStart.y + gridRangeHeight / 2 - 20 + 2} 
              ${chartMargin.left + MORE_BUTTON_WIDTH - 40}, ${gridRangeStart.y + gridRangeHeight / 2 + 20 + 2}
              `}
                  className="fill-white stroke-0 shadow"
                />
                <polygon
                  points={`
              ${chartMargin.left + 30}, ${gridRangeStart.y + gridRangeHeight / 2} 
              ${chartMargin.left + MORE_BUTTON_WIDTH - 40}, ${gridRangeStart.y + gridRangeHeight / 2 - 20} 
              ${chartMargin.left + MORE_BUTTON_WIDTH - 40}, ${gridRangeStart.y + gridRangeHeight / 2 + 20}
              `}
                  className="fill-primary stroke-0 shadow"
                />
              </>
            )}
            <text
              x={chartMargin.left + MORE_BUTTON_WIDTH / 2}
              y={chartMargin.top + gridRangeHeight / 2 + 45}
              className={clsx(
                'transform-box-content -translate-x-1/2 fill-primary stroke-0 text-sm',
                !isLoadingMore && 'hidden',
              )}
            >
              読込中
            </text>
            <text
              x={chartMargin.left + MORE_BUTTON_WIDTH / 2}
              y={chartMargin.top + gridRangeHeight / 2 + 45}
              className={clsx(
                'transform-box-content -translate-x-1/2 fill-primary stroke-0 text-sm',
                isLoadingMore && 'hidden',
              )}
            >
              もっと見る
            </text>
          </g>
        )}
        <g
          id="xAxis"
          className="fill-line-chart-x-axis stroke-line-chart-x-axis"
        >
          <line
            x1={gridRangeStart.x}
            y1={gridRangeEnd.y}
            x2={gridRangeEnd.x}
            y2={gridRangeEnd.y}
          />
        </g>
        <g
          id="xGrid"
          className="fill-line-chart-x-grid stroke-line-chart-x-grid"
        >
          {dates.map((date) => {
            if (
              !isToday(date, { timezone }) &&
              getDateDiff(date, endDate, { timezone }) % xGridInterval === 0
            ) {
              const x = dateToX(date);
              return (
                <line
                  key={x}
                  x1={x}
                  y1={gridRangeStart.y}
                  x2={x}
                  y2={gridRangeEnd.y}
                />
              );
            }
          })}
        </g>
        <g
          id="xGridLabel"
          className="fill-line-chart-x-grid-label stroke-0 text-sm"
        >
          {dates.map((date) => {
            if (
              getDateDiff(date, endDate, { timezone }) % xGridInterval ===
              0
            ) {
              const x = dateToX(date);
              return (
                <text
                  key={x}
                  className="transform-box-content -translate-x-1/2"
                  x={x}
                  y={gridRangeEnd.y}
                  dy={X_GRID_LABEL_DY}
                >
                  {isToday(date, { timezone })
                    ? '今日'
                    : dateToMonthDateString(date, { timezone })}
                </text>
              );
            }
          })}
        </g>
        <g
          id="yGrid"
          className="fill-line-chart-y-grid stroke-line-chart-y-grid"
        >
          {yGridValues.map((value) => {
            const y = valueToY(value);
            return (
              <line
                key={y}
                x1={gridRangeStart.x}
                y1={y}
                x2={gridRangeEnd.x}
                y2={y}
              />
            );
          })}
        </g>
        <g id="yGridLabel" className="fill-line-chart-y-grid-label stroke-0">
          {yGridValues.map((value) => {
            const y = valueToY(value);
            return (
              <text
                key={y}
                x={gridRangeEnd.x}
                dx={Y_GRID_LABEL_DX}
                y={y}
                dy={Y_GRID_LABEL_DY}
              >
                {value.toLocaleString()}
              </text>
            );
          })}
        </g>
        {showsDot && (
          <>
            <g id="dots">
              {circleXYs.map(({ x, y }) => (
                <circle key={x} cx={x} cy={y} r={3} />
              ))}
            </g>
            <g id="dot-labels" className="stroke-0 text-sm font-bold">
              {circleXYs.map(({ x, y, label }) => (
                <text
                  key={x}
                  x={x}
                  y={y}
                  dy={DOT_LABEL_DY}
                  className="transform-box-content -translate-x-1/2"
                >
                  {label}
                </text>
              ))}
            </g>
          </>
        )}
        <g id="line">
          <polyline
            points={circleXYs.map(({ x, y }) => `${x}, ${y}`).join(' ')}
            fill="none"
            strokeWidth={showsDot ? 1 : 2}
          />
        </g>
      </svg>
    </div>
  );
};
