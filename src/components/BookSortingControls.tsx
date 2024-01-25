import React from "react";
import { Select } from "antd";
// import "./BookSortingControls.css";

interface BookSortingControlsProps {
  onSortChange: (sortOrder: "asc" | "desc") => void;
}

const BookSortingControls: React.FC<BookSortingControlsProps> = ({
  onSortChange,
}) => {
  const handleSortChange = (value: string) => {
    onSortChange(value as "asc" | "desc");
  };

  return (
    <div className="sorting-container">
      <Select defaultValue="asc" onChange={handleSortChange}>
        <Select.Option value="asc">Ascending</Select.Option>
        <Select.Option value="desc">Descending</Select.Option>
      </Select>
    </div>
  );
};

export default BookSortingControls;
