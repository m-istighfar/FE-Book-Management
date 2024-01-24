import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Modal, Form } from "antd";

import {
  Book,
  fetchBooks,
  createNewBook,
  updateBook,
  deleteBook,
} from "../api/booksApi";

import BookDetailsModal from "../components/BookDetailModal";
import ContentHeader from "../components/ContentHeader";
import BookCard from "../components/BookCard";
import BookModal from "../components/BookModal";

import "./ContentArea.css";

interface ContentAreaProps {
  isBlurred: boolean;
  selectedMenuItem: string;
}

const ContentArea: React.FC<ContentAreaProps> = ({
  isBlurred,
  selectedMenuItem,
}) => {
  const [books, setBooks] = useState<Book[] | undefined>(undefined);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isBookDetailsModalVisible, setIsBookDetailsModalVisible] =
    useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  const loadBooks = () => {
    setLoading(true);
    fetchBooks()
      .then((response) => {
        if (response && response.data && response.data.books) {
          setBooks(response.data.books);
        } else {
          throw new Error("Invalid response structure");
        }
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        Modal.error({
          title: "Error",
          content: "An error occurred while fetching books.",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadBooks();
  }, [selectedMenuItem]);

  const showModal = (bookToEdit?: Book) => {
    if (bookToEdit) {
      form.setFieldsValue({
        title: bookToEdit.Title,
        description: bookToEdit.Description,
        imageUrl: bookToEdit.ImageUrl,
        releaseYear: bookToEdit.ReleaseYear,
        price: bookToEdit.Price,
        totalPage: bookToEdit.TotalPage,
        categoryID: bookToEdit.CategoryID,
      });
      setEditingBook(bookToEdit);
    } else {
      form.resetFields();
      setEditingBook(null);
    }
    setIsModalVisible(true);
  };

  const handleCreateOrUpdateBook = async () => {
    try {
      const values = await form.validateFields();
      let responseMessage = "";

      if (editingBook) {
        const response = await updateBook(
          editingBook.BookID.toString(),
          values
        );
        responseMessage = response.message || "Book updated successfully";
        const updatedBookData = response.data;

        setBooks((prevBooks) =>
          prevBooks?.map((book) =>
            book.BookID === editingBook.BookID ? updatedBookData : book
          )
        );
        setEditingBook(null);
      } else {
        const response = await createNewBook(values);
        responseMessage = response.message;
        const newBookData = response.data;
        setBooks((prevBooks) => [...(prevBooks || []), newBookData]);
      }
      loadBooks();
      Modal.success({
        title: "Success",
        content: responseMessage,
      });
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Failed to submit:", error);
      Modal.error({
        title: "Error",
        content: "An error occurred while creating or updating the book.",
      });
    }
  };

  const showDeleteConfirm = (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this book?",
      content: "This action cannot be undone",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(id);
      },
    });
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id.toString());
      setBooks((prevBooks) => prevBooks?.filter((book) => book.BookID !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
      Modal.error({
        title: "Error",
        content: "An error occurred while deleting the book.",
      });
    }
  };

  return (
    <Layout.Content
      style={{ padding: "50px", position: "relative" }}
      className={isBlurred ? "blur-content" : ""}
    >
      <ContentHeader count={books?.length} onShowModal={() => showModal()} />
      <hr style={{ margin: "20px 0" }} />
      {loading ? (
        <p>Loading...</p>
      ) : books && books.length > 0 ? (
        <Row gutter={[16, 16]}>
          {books.map((book, index) => (
            <Col key={index} xs={24} sm={24} md={8} lg={8}>
              <BookCard
                book={book}
                onEdit={() => showModal(book)}
                onDelete={() => showDeleteConfirm(book.BookID)}
                onClick={() => {
                  setSelectedBook(book);
                  setIsBookDetailsModalVisible(true);
                }}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <p>You don't have any books</p>
      )}

      <BookModal
        open={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setEditingBook(null);
          form.resetFields();
        }}
        onOk={handleCreateOrUpdateBook}
        form={form}
        editingBook={editingBook}
      />

      {selectedBook && (
        <BookDetailsModal
          book={selectedBook}
          visible={isBookDetailsModalVisible}
          onClose={() => {
            setIsBookDetailsModalVisible(false);
            setSelectedBook(null);
          }}
        />
      )}
    </Layout.Content>
  );
};

export default ContentArea;
