// ContentArea.tsx
import React from "react";
import BooksContent from "./BooksContent";
import CategoriesContent from "./CategoriesContent";

interface ContentAreaProps {
  isBlurred: boolean;
  selectedMenuItem: string;
}

const ContentArea: React.FC<ContentAreaProps> = ({
  isBlurred,
  selectedMenuItem,
}) => {
  return (
    <>
      {selectedMenuItem === "1" && <BooksContent isBlurred={isBlurred} />}
      {selectedMenuItem === "2" && <CategoriesContent isBlurred={isBlurred} />}
    </>
  );
};

export default ContentArea;
