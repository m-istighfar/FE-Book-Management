/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./CategoryTable.css";

interface Category {
  CategoryID: number;
  Name: string;
}

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (categoryId: number) => void;
  currentPage: number;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  onEdit,
  onDelete,
  currentPage,
}) => {
  const pageSize = 10;

  const columns = [
    {
      title: "No",
      key: "index",
      render: (_1: any, _2: Category, index: number) =>
        (currentPage - 1) * pageSize + index + 1,
      width: "20%",
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "name",
      width: "50%",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Category) => (
        <span className="table-actions">
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            style={{ marginRight: 16 }}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => onDelete(record.CategoryID)}
          >
            Delete
          </Button>
        </span>
      ),
      width: "30%",
    },
  ];

  return (
    <Table
      dataSource={categories}
      columns={columns}
      rowKey="CategoryID"
      pagination={false}
      className="category-table"
    />
  );
};

export default CategoryTable;
