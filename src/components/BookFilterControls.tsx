import React, { useEffect, useState } from "react";
import { Input, InputNumber, Select } from "antd";
import { fetchCategories } from "../api/categoryApi";

interface BookFilterOptions {
  title?: string;
  minYear?: number | null;
  maxYear?: number | null;
  minPage?: number | null;
  maxPage?: number | null;
  category?: number | null;
}

interface Category {
  CategoryID: number;
  Name: string;
}

interface BookFilterControlsProps {
  onFilterChange: (filter: BookFilterOptions) => void;
}

const BookFilterControls: React.FC<BookFilterControlsProps> = ({
  onFilterChange,
}) => {
  const [title, setTitle] = useState("");
  const [minYear, setMinYear] = useState<number | null>(null);
  const [maxYear, setMaxYear] = useState<number | null>(null);
  const [minPage, setMinPage] = useState<number | null>(null);
  const [maxPage, setMaxPage] = useState<number | null>(null);
  const [category, setCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories(1, 10000)
      .then((response) => {
        console.log(response);
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

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

  const handleCategoryChange = (value: number | null) => {
    setCategory(value);
    onFilterChange({
      title,
      minYear,
      maxYear,
      minPage,
      maxPage,
      category: value,
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
      <Select
        placeholder="Select Category"
        onChange={handleCategoryChange}
        value={category}
        allowClear
      >
        {categories.map((cat) => (
          <Select.Option key={cat.CategoryID} value={cat.CategoryID}>
            {cat.Name}
          </Select.Option>
        ))}
      </Select>
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
