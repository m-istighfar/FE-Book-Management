/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Row, Col, Button } from "antd";
import formattedDate from "../helper/formatDateTD";
import TaskSortingControls from "../components/TaskSortingControls"; // Renamed
import TaskFilterControls from "../components/TaskFilterControls"; // Renamed

interface FilterOptions {
  title?: string;
  minYear?: number;
  maxYear?: number;
  minPage?: number;
  maxPage?: number;
  sortByTitle?: "asc" | "desc";
  page?: number;
  limit?: number;
}

interface ContentHeaderProps {
  count: number | undefined;
  onShowModal: () => void;
  onSortChange?: (newSortOrder: "asc" | "desc") => void;
  onFilterChange?: (newFilters: any) => void;
}

const ContentHeader: React.FC<ContentHeaderProps> = ({
  count,
  onShowModal,
  onSortChange,
  onFilterChange,
}) => (
  <Row justify="space-between" align="middle" className="content-header">
    <Col>
      <h2>Books</h2> {/* Updated */}
      <p>{formattedDate}</p>
      <p>{count ? `You have ${count} book(s)` : "No books available"}</p>{" "}
      {/* Updated */}
    </Col>
    <Col>
      <Row>
        <TaskSortingControls onSortChange={onSortChange} /> {/* Renamed */}
        <TaskFilterControls onFilterChange={onFilterChange} /> {/* Renamed */}
      </Row>
    </Col>
    <Col>
      <Button
        type="primary"
        className="new-book-button" // Updated
        onClick={() => onShowModal()}
      >
        New Book {/* Updated */}
      </Button>
    </Col>
  </Row>
);

export default ContentHeader;
