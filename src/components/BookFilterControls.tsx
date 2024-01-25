import React, { useState } from "react";
import { Input, InputNumber } from "antd";

interface BookFilterOptions {
  title?: string;
  minYear?: number | null;
  maxYear?: number | null;
  minPage?: number | null;
  maxPage?: number | null;
}

interface BookFilterControlsProps {
  onFilterChange: (filter: BookFilterOptions) => void;
}

const BookFilterControls: React.FC<BookFilterControlsProps> = ({
  onFilterChange,
}) => {
  const [title, setTitle] = useState("");
  const [minYear, setMinYear] = useState<number>();
  const [maxYear, setMaxYear] = useState<number>();
  const [minPage, setMinPage] = useState<number>();
  const [maxPage, setMaxPage] = useState<number>();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    onFilterChange({
      title: e.target.value,
      minYear,
      maxYear,
      minPage,
      maxPage,
    });
  };

  const handleMinYearChange = (value: number | null) => {
    const val = value ?? undefined;
    setMinYear(val);
    onFilterChange({ title, minYear: value, maxYear, minPage, maxPage });
  };

  const handleMaxYearChange = (value: number | null) => {
    const val = value ?? undefined;
    setMaxYear(val);
    onFilterChange({ title, minYear, maxYear: value, minPage, maxPage });
  };

  const handleMinPageChange = (value: number | null) => {
    const val = value ?? undefined;
    setMinPage(val);
    onFilterChange({ title, minYear, maxYear, minPage: value, maxPage });
  };

  const handleMaxPageChange = (value: number | null) => {
    const val = value ?? undefined;
    setMaxPage(val);
    onFilterChange({ title, minYear, maxYear, minPage, maxPage: value });
  };

  return (
    <div>
      <Input
        placeholder="Filter by Title"
        value={title}
        onChange={handleTitleChange}
        allowClear
      />
      <InputNumber
        placeholder="Min Year"
        value={minYear}
        onChange={handleMinYearChange}
      />
      <InputNumber
        placeholder="Max Year"
        value={maxYear}
        onChange={handleMaxYearChange}
      />
      <InputNumber
        placeholder="Min Page Count"
        value={minPage}
        onChange={handleMinPageChange}
      />
      <InputNumber
        placeholder="Max Page Count"
        value={maxPage}
        onChange={handleMaxPageChange}
      />
    </div>
  );
};

export default BookFilterControls;
