import React from "react";
import { Card, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import "./BookCard.css";
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

interface BookCardProps {
  book: Book;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onClick: () => void;
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  onEdit,
  onDelete,
  onClick,
}) => {
  return (
    <Card className="task-card" onClick={onClick}>
      <div className="task-card-header">
        <h3>{book.Title}</h3>
      </div>
      <div className="task-card-details">
        <p>{book.Description}</p>
        <p>Release Year: {book.ReleaseYear}</p>
        <p>Price: {book.Price}</p>
        <p>Total Pages: {book.TotalPage}</p>
        <p>Thickness: {book.Thickness}</p>
      </div>
      <div className="task-card-actions">
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(book.BookID);
            }}
            className="edit-icon"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(book.BookID);
            }}
            className="delete-icon"
          />
        </div>
      </div>
    </Card>
  );
};

export default BookCard;
