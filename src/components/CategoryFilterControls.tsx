import React, { useState } from "react";
import { Input, InputNumber } from "antd";

interface BookFilterOptions {
  title?: string;
  minYear?: number | null;
  maxYear?: number | null;
  minPage?: number | null;
  maxPage?: number | null;
  category?: string | null;
}

interface BookFilterControlsProps {
  onFilterChange: (filter: BookFilterOptions) => void;
}

const BookFilterControls: React.FC<BookFilterControlsProps> = ({
  onFilterChange,
}) => {
  const [title, setTitle] = useState<string>("");
  const [minYear, setMinYear] = useState<number | null>(null);
  const [maxYear, setMaxYear] = useState<number | null>(null);
  const [minPage, setMinPage] = useState<number | null>(null);
  const [maxPage, setMaxPage] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    onFilterChange({
      title: e.target.value,
      minYear,
      maxYear,
      minPage,
      maxPage,
      category,
    });
  };

  const handleMinYearChange = (value: number | null) => {
    setMinYear(value);
    onFilterChange({
      title,
      minYear: value,
      maxYear,
      minPage,
      maxPage,
      category,
    });
  };

  const handleMaxYearChange = (value: number | null) => {
    setMaxYear(value);
    onFilterChange({
      title,
      minYear,
      maxYear: value,
      minPage,
      maxPage,
      category,
    });
  };

  const handleMinPageChange = (value: number | null) => {
    setMinPage(value);
    onFilterChange({
      title,
      minYear,
      maxYear,
      minPage: value,
      maxPage,
      category,
    });
  };

  const handleMaxPageChange = (value: number | null) => {
    setMaxPage(value);
    onFilterChange({
      title,
      minYear,
      maxYear,
      minPage,
      maxPage: value,
      category,
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
    onFilterChange({
      title,
      minYear,
      maxYear,
      minPage,
      maxPage,
      category: e.target.value,
    });
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
      <Input
        placeholder="Filter by Category"
        value={category || ""}
        onChange={handleCategoryChange}
        allowClear
      />
    </div>
  );
};

export default BookFilterControls;
