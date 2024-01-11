import React, { useEffect, useRef, useState } from 'react';
import useDebounce from '@modules/common/hooks/use-debounce';
import { Input } from '@modules/ui/components/forms/input';
import { Label } from '@modules/ui/components/forms/label';
import DeleteIcon from '@modules/ui/components/icons/delete-icon';
import { Button } from '@modules/ui/components/button/button';

type UserDashboardLinksFilteringProps = {
  onChange: (value: string) => void;
};

const UserDashboardLinksFilteringAlias = (props: UserDashboardLinksFilteringProps) => {
  const { onChange } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 250);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClearFilter = () => {
    if (inputRef && inputRef.current) inputRef.current.value = '';
    setValue('');
  };

  useEffect(() => {
    onChange(value);
  }, [debouncedValue]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>Alias</Label>
        {value !== '' ? (
          <Button
            variant="destructive"
            size="icon"
            aria-label="Clear Alias"
            className="h-6 w-6"
            onClick={handleClearFilter}
          >
            <DeleteIcon size="sm" className="stroke-current" />
          </Button>
        ) : null}
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          <svg
            className="h-5 w-5 stroke-current"
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
        <Input ref={inputRef} type="text" placeholder="Search alias..." onChange={handleChange} />
      </div>
    </div>
  );
};

export default UserDashboardLinksFilteringAlias;
