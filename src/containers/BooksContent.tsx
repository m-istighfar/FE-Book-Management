/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Modal, Form, Pagination } from "antd";

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
import { fetchCategories } from "../api/categoryApi";
import { useNavigate } from "react-router-dom";

interface BooksContentProps {
  isBlurred: boolean;
}

interface BookFilterOptions {
  title?: string;
  minYear?: number | null;
  maxYear?: number | null;
  minPage?: number | null;
  maxPage?: number | null;
  sortByTitle?: "asc" | "desc";
  page?: number;
  limit?: number;
  category?: number | null;
}

export interface Category {
  CategoryID: number;
  Name: string;
}

const isAuthenticated = !!localStorage.getItem("accessToken");

const BooksContent: React.FC<BooksContentProps> = ({ isBlurred }) => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[] | undefined>(undefined);
  const [totalRecords, setTotalRecords] = useState(0);

  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isBookDetailsModalVisible, setIsBookDetailsModalVisible] =
    useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );

  const [filters, setFilters] = useState<BookFilterOptions>({
    title: undefined,
    minYear: undefined,
    maxYear: undefined,
    minPage: undefined,
    maxPage: undefined,
  });
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [form] = Form.useForm();

  const pageSize = 12;
  const [currentPage, setCurrentPage] = useState(1);

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

  const loadBooks = () => {
    setLoading(true);
    fetchBooks({
      title: filters.title ?? undefined,
      minYear: filters.minYear ?? undefined,
      maxYear: filters.maxYear ?? undefined,
      minPage: filters.minPage ?? undefined,
      maxPage: filters.maxPage ?? undefined,
      sortByTitle: sortOrder,
      page: currentPage,
      limit: pageSize,
      categoryID: filters.category ?? undefined,
    })
      .then((response) => {
        if (response && response.data && response.data.books) {
          setBooks(response.data.books);
          setTotalRecords(response.data.totalRecords);
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
  }, [filters, sortOrder, currentPage, filters.category]);

  const handleFilterChange = (
    newFilters: Partial<BookFilterOptions>,
    newCategoryId?: number
  ) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setSelectedCategory(newCategoryId);
    setCurrentPage(1);
  };
  const handleSortChange = (newSortOrder: "asc" | "desc") => {
    setSortOrder(newSortOrder);
  };

  const showModal = (bookToEdit?: Book) => {
    if (!isAuthenticated) {
      Modal.warning({
        title: "Login Required",
        content: "You must log in before performing this action.",
        okText: "Go to Login",
        cancelText: "Close",
        onOk: () => {
          navigate("/login");
        },
        onCancel: () => {},
      });
      return;
    }
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
    } catch (error: any) {
      console.error("Failed to submit:", error);

      const errorMessage = error.message || "An unknown error occurred.";

      Modal.error({
        title: "Error",
        content: errorMessage,
      });
    }
  };

  const showDeleteConfirm = (id: number) => {
    if (!isAuthenticated) {
      Modal.warning({
        title: "Login Required",
        content: "You must log in before performing this action.",
        okText: "Go to Login",
        cancelText: "Close",
        onOk: () => {
          navigate("/login");
        },
        onCancel: () => {},
      });
      return;
    }
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
      const response = await deleteBook(id.toString());
      setBooks((prevBooks) => prevBooks?.filter((book) => book.BookID !== id));

      Modal.success({
        title: "Success",
        content: response.message || "Book deleted successfully",
      });
      loadBooks();
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
      <ContentHeader
        title="Books"
        count={totalRecords}
        onShowModal={() => showModal()}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      <hr style={{ margin: "20px 0" }} />
      {loading ? (
        <p>Loading...</p>
      ) : books && books.length > 0 ? (
        <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
          {books.map((book, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6} xl={4}>
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

      <div className="pagination-wrapper">
        <Pagination
          className="custom-pagination"
          style={{ marginTop: "24px" }}
          current={currentPage}
          onChange={(page) => setCurrentPage(page)}
          total={totalRecords}
          pageSize={pageSize}
          showSizeChanger={false}
        />
      </div>

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
        categories={categories}
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

export default BooksContent;
