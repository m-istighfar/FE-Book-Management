import React from "react";
import { Row, Col, Button } from "antd";
import formattedDate from "../helper/formatDateTD";
import BookSortingControls from "./BookSortingControls";
import BookFilterControls from "./BookFilterControls";

interface BookFilterOptions {
  title?: string;
  minYear?: number | null;
  maxYear?: number | null;
  minPage?: number | null;
  maxPage?: number | null;
}

interface ContentHeaderProps {
  title: string;
  count: number | undefined;
  onShowModal: () => void;
  onSortChange?: (newSortOrder: "asc" | "desc") => void;
  onFilterChange?: (newFilters: BookFilterOptions) => void;
}

const ContentHeader: React.FC<ContentHeaderProps> = ({
  title,
  count,
  onShowModal,
  onSortChange,
  onFilterChange,
}) => (
  <Row justify="space-between" align="middle" className="content-header">
    <Col>
      <h2>{title}</h2>
      <p>{formattedDate}</p>
      <p>{count ? `You have ${count} ${title}` : `No ${title} available`}</p>
    </Col>
    <Col>
      <Row gutter={16}>
        {onSortChange && (
          <Col>
            <BookSortingControls onSortChange={onSortChange} />
          </Col>
        )}
        {onFilterChange && (
          <Col>
            <BookFilterControls onFilterChange={onFilterChange} />
          </Col>
        )}
      </Row>
    </Col>
    <Col>
      <Button type="primary" className="new-book-button" onClick={onShowModal}>
        New Item
      </Button>
    </Col>
  </Row>
);

export default ContentHeader;
