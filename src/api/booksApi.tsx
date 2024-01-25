// const BASE_URL = "https://expensive-boa-pajamas.cyclic.app/user";
// const AUTH_URL = "https://expensive-boa-pajamas.cyclic.app/auth";

const BOOKS_URL = `http://localhost:3000/books`;

const checkResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error || "Network response was notz ok " + response.statusText
    );
  }
  return response.json();
};

interface Category {
  CategoryID: number;
  Name: string;
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
  Category: Category;
}

interface BookResponse {
  message: string;
  data: Book;
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
  categoryID?: number;
}

export interface DeleteResponse {
  message: string;
}

export const fetchBooks = async (
  filters: BookFilters = {}
): Promise<BooksResponse> => {
  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString());
    }
  });

  try {
    const response = await fetch(`${BOOKS_URL}?${queryParams.toString()}`, {
      headers: {
        "Content-Type": "application/json", //
      },
    });
    return await checkResponse(response);
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const createNewBook = async (book: Book): Promise<BookResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Access token not found in local storage.");
  }

  try {
    const response = await fetch(`${BOOKS_URL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    return await checkResponse(response);
  } catch (error) {
    console.error("Error creating new book:", error);
    throw error;
  }
};

export const updateBook = async (
  id: string,
  book: Book
): Promise<BookResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Access token not found in local storage.");
  }

  try {
    const response = await fetch(`${BOOKS_URL}/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    return await checkResponse(response);
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

export const deleteBook = async (id: string): Promise<DeleteResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Access token not found in local storage.");
  }

  try {
    const response = await fetch(`${BOOKS_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return await checkResponse(response);
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};

export const fetchBookById = async (id: string): Promise<Book> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Access token not found in local storage.");
  }

  try {
    const response = await fetch(`${BOOKS_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    return await checkResponse(response);
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    throw error;
  }
};
