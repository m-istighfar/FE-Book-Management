/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Modal, Form, Input, InputNumber, Select } from "antd";

export interface Book {
  BookID: number;
  Title: string;
  Description: string;
  ImageUrl: string;
  ReleaseYear: number;
  Price: string;
  TotalPage: number;
  CategoryID: number;
  Thickness?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
}

interface BookModalProps {
  open: boolean;
  onClose: () => void;
  onOk: () => void;
  form: any;
  editingBook: Book | null;
  categories: any[];
}

const BookModal: React.FC<BookModalProps> = ({
  open,
  onClose,
  onOk,
  form,
  editingBook,
  categories,
}) => {
  return (
    <Modal
      title={editingBook ? "Edit Book" : "New Book"}
      open={open}
      onOk={onOk}
      onCancel={onClose}
      centered
      okButtonProps={{
        className: "modal-ok-button",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={editingBook ? editingBook : {}}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Image URL"
          name="imageUrl"
          rules={[{ required: true, message: "Please input the image URL!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Release Year"
          name="releaseYear"
          rules={[
            { required: true, message: "Please input the release year!" },
            {
              type: "number",
              min: 0,
              message: "Release year must be a positive number!",
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Total Pages"
          name="totalPage"
          rules={[{ required: true, message: "Please input the total pages!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="categoryID"
          rules={[{ required: true, message: "Please select the category!" }]}
        >
          <Select>
            {categories.map((cat) => (
              <Select.Option key={cat.CategoryID} value={cat.CategoryID}>
                {cat.Name} {/* Display the category name */}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BookModal;
