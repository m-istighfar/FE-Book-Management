const CATEGORIES_URL = `http://localhost:3000/categories`;

const checkResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error || "Network response was notz ok " + response.statusText
    );
  }
  return response.json();
};

export interface Category {
  CategoryID: number;
  Name: string;
}

interface CategoryResponse {
  message: string;
  data: Category;
}

export interface CategoriesResponse {
  message: string;
  data: {
    categories: Category[];
    totalRecords: number;
    currentPage: number;
    totalPages: number;
  };
}

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
}

export interface BooksResponse {
  message: string;
  data: {
    books: Book[];
    totalRecords: number;
    currentPage: number;
    totalPages: number;
  };
}

export interface BookFilters {
  title?: string;
  minYear?: number;
  maxYear?: number;
  minPage?: number;
  maxPage?: number;
  sortByTitle?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export const fetchCategories = async (
  page?: number,
  limit?: number
): Promise<CategoriesResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Access token not found in local storage.");
  }

  const queryParams = new URLSearchParams();
  if (page !== undefined) queryParams.append("page", page.toString());
  if (limit !== undefined) queryParams.append("limit", limit.toString());

  try {
    const response = await fetch(
      `${CATEGORIES_URL}?${queryParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return await checkResponse(response);
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const createCategory = async (
  category: Category
): Promise<CategoryResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Access token not found in local storage.");
  }

  try {
    const response = await fetch(`${CATEGORIES_URL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });

    return await checkResponse(response);
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const updateCategory = async (
  id: number,
  category: Category
): Promise<CategoryResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Access token not found in local storage.");
  }

  try {
    const response = await fetch(`${CATEGORIES_URL}/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });

    return await checkResponse(response);
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const deleteCategory = async (id: number): Promise<CategoryResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Access token not found in local storage.");
  }

  try {
    const response = await fetch(`${CATEGORIES_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return await checkResponse(response);
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

export const fetchBooksByCategoryId = async (
  categoryId: number,
  filters: BookFilters = {}
): Promise<BooksResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Access token not found in local storage.");
  }

  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString());
    }
  });

  try {
    const response = await fetch(
      `${CATEGORIES_URL}/${categoryId}/books?${queryParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return await checkResponse(response);
  } catch (error) {
    console.error("Error fetching books by category:", error);
    throw error;
  }
};
