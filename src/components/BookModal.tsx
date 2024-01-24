/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Modal, Form, Input, DatePicker } from "antd";

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
}

const BookModal: React.FC<BookModalProps> = ({
  open,
  onClose,
  onOk,
  form,
  editingBook,
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
          name="Title"
          rules={[{ required: true, message: "Please input the title!" }]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="Description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Image URL"
          name="ImageUrl"
          rules={[{ required: true, message: "Please input the image URL!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Release Year"
          name="ReleaseYear"
          rules={[
            { required: true, message: "Please input the release year!" },
          ]}
        >
          <DatePicker picker="year" format="YYYY" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="Price"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Total Pages"
          name="TotalPage"
          rules={[{ required: true, message: "Please input the total pages!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Category ID"
          name="CategoryID"
          rules={[{ required: true, message: "Please input the category ID!" }]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BookModal;
