import type { ReactNode } from 'react';

export type SelectOption<T extends string = string> = {
  value: T;
  label: string;
};

type SelectProps<T extends string> = {
  id: string;
  label: string;
  value: T;
  options: readonly SelectOption<T>[];
  onChange: (value: T) => void;
  className?: string;
  footer?: ReactNode;
};

export function Select<T extends string>({
  id,
  label,
  value,
  options,
  onChange,
  className = 'select-field',
  footer,
}: SelectProps<T>) {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        className="select"
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {footer}
    </div>
  );
}
