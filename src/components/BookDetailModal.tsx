import React from "react";
import { Modal, Button } from "antd";
// import { Book } from "../api";

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

interface BookDetailsModalProps {
  book: Book;
  visible: boolean;
  onClose: () => void;
}

const BookDetailsModal: React.FC<BookDetailsModalProps> = ({
  book,
  visible,
  onClose,
}) => {
  return (
    <Modal
      title="Book Details"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <h3>Title: {book.Title}</h3>
      <p>Description: {book.Description}</p>
      <p>Release Year: {book.ReleaseYear}</p>
      <p>Price: {book.Price}</p>
      <p>Total Pages: {book.TotalPage}</p>
      <p>Thickness: {book.Thickness}</p>
      <p>Category ID: {book.CategoryID}</p>
    </Modal>
  );
};

export default BookDetailsModal;
