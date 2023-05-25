import useDebounce from '@modules/common/hooks/use-debounce';
import { Input } from '@modules/ui/components/forms/input';
import { Label } from '@modules/ui/components/forms/label';
import React, { useEffect, useState } from 'react';

type UserDashboardLinksFilteringProps = {
  onChange: (value: string) => void;
};

const UserDashboardLinksFilteringAlias = (props: UserDashboardLinksFilteringProps) => {
  const { onChange } = props;

  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 250);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    onChange(value);
  }, [debouncedValue]);

  return (
    <div className="space-y-1">
      <Label>Alias</Label>
      <div className="relative">
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          <svg
            className="h-5 w-5 stroke-neutral-700 dark:stroke-neutral-200"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="10" cy="10" r="7" />
            <line x1="21" y1="21" x2="15" y2="15" />
          </svg>
        </div>
        <Input type="text" placeholder="Search alias..." onChange={handleChange} />
      </div>
    </div>
  );
};

export default UserDashboardLinksFilteringAlias;
