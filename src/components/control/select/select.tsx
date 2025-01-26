import { FC } from 'react';
import clsx from 'clsx';

type Props = {
  options: { value: string; label: string }[];
  value: string;
  setValue: (value: string) => void;
  className?: string;
};

export const Select: FC<Props> = ({ options, value, setValue, className }) => {
  return (
    <select
      className={clsx(
        'h-min-button-size rounded border border-line bg-white px-16px py-8px text-2xl focus:outline-none',
        className,
      )}
      onChange={(e) => setValue(e.target.value)}
      value={value}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
