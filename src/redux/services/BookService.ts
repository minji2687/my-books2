import axios from "axios";
import { BookType } from "../../types";
import { getBooks } from "../modules/books";

const BOOK_API_URL = "https://api.marktube.tv/v1/book";

export default class BookService {
  public static async getBooks(token: string): Promise<BookType[]> {
    const response = await axios.get(BOOK_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
}
