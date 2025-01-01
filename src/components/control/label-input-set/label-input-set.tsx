import { FC, HTMLProps } from 'react';
import { Input } from '@/components/control/input/input';
import clsx from 'clsx';

type Props = {
  labelText: string;
  className?: string;
} & Omit<HTMLProps<HTMLInputElement>, 'className'>;

export const LabelInputSet: FC<Props> = ({
  labelText,
  className,
  ...inputProps
}) => {
  return (
    <label className={clsx('block', className)}>
      {inputProps.required ? (
        <span className="mb-4px flex items-center gap-x-4px">
          <span className="font-bold">{labelText}</span>
          <span className="rounded bg-attention p-2px text-2xs text-white">
            必須
          </span>
        </span>
      ) : (
        <span className="mb-4px block font-bold">{labelText}</span>
      )}
      <Input {...inputProps} />
    </label>
  );
};
