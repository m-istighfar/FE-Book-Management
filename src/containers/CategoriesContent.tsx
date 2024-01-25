/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Layout, Modal, Form, Input, Pagination } from "antd";
import {
  Category,
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/categoryApi";
import CategoryTable from "../components/CategoryTable";
import ContentHeader from "../components/ContentHeader";

import "./ContentArea.css";

interface CategoriesContentProps {
  isBlurred: boolean;
}

const CategoriesContent: React.FC<CategoriesContentProps> = ({ isBlurred }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const [form] = Form.useForm();
  const pageSize = 10;

  const loadCategories = async () => {
    try {
      const response = await fetchCategories(currentPage, pageSize);
      setCategories(response.data.categories);
      setTotalRecords(response.data.totalRecords);
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "An error occurred while fetching categories.",
      });
    }
  };

  useEffect(() => {
    loadCategories();
  }, [currentPage]);

  const showModal = (category?: Category) => {
    if (category) {
      form.setFieldsValue({
        name: category.Name,
      });
      setEditingCategory(category);
    } else {
      form.resetFields();
      setEditingCategory(null);
    }
    setIsModalVisible(true);
  };

  const handleCreateOrUpdateCategory = async () => {
    const values = await form.validateFields();
    try {
      let response;
      if (editingCategory) {
        response = await updateCategory(editingCategory.CategoryID, values);
      } else {
        response = await createCategory(values);
      }
      loadCategories();
      Modal.success({
        title: "Success",
        content: response.message || "Category processed successfully",
      });
      setIsModalVisible(false);
      form.resetFields();
    } catch (error: any) {
      Modal.error({
        title: "Error",
        content:
          error.message || "An error occurred while processing the category.",
      });
    }
  };

  const showDeleteConfirm = (categoryId: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this category?",
      content: "This action cannot be undone",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeleteCategory(categoryId);
      },
    });
  };

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      const response = await deleteCategory(categoryId);
      setCategories(
        categories.filter((category) => category.CategoryID !== categoryId)
      );
      Modal.success({
        title: "Success",
        content: response.message || "Category deleted successfully",
      });
    } catch (error: any) {
      Modal.error({
        title: "Error",
        content:
          error.message || "An error occurred while deleting the category.",
      });
    }
  };

  return (
    <Layout.Content
      style={{ padding: "50px", position: "relative" }}
      className={isBlurred ? "blur-content" : ""}
    >
      <ContentHeader
        title="Categories"
        addButtonTitle="Add Category"
        onShowModal={() => showModal()}
      />

      <CategoryTable
        categories={categories}
        onEdit={showModal}
        onDelete={showDeleteConfirm}
        currentPage={currentPage}
      />

      <Pagination
        className="custom-paginationzz"
        style={{ marginTop: "24px", textAlign: "center" }}
        current={currentPage}
        onChange={(page) => setCurrentPage(page)}
        total={totalRecords}
        pageSize={pageSize}
        showSizeChanger={false}
      />

      <Modal
        title={editingCategory ? "Edit Category" : "Add Category"}
        open={isModalVisible}
        onOk={handleCreateOrUpdateCategory}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Category Name"
            rules={[
              { required: true, message: "Please input the category name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout.Content>
  );
};

export default CategoriesContent;
