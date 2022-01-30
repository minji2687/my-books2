import { createAction, createActions, handleActions } from "redux-actions";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { BooksState, BookType } from "../../types";
import BookService from "../services/BookService";

const initialState: BooksState = {
  books: null,
  loading: false,
  error: null,
};

const prefix = "my-books/books";

export const { pending, success, fail } = createActions(
  "PENDING",
  "SUCCESS",
  "FAIL",
  { prefix }
);

const reducer = handleActions<BooksState, BookType[]>(
  {
    PENDING: (state) => ({ ...state, loading: true, error: null }),
    SUCCESS: (state, action) => ({
      books: action.payload,
      loading: false,
      error: null,
    }),
    FAIL: (state, action: any) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  { prefix }
);

export default reducer;

export const { getBooks } = createActions("GET_BOOKS", {
  prefix,
});

function* getBooksSaga() {
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    const books: BookType[] = yield call(BookService.getBooks, token);
    yield put(success(books));
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data?.error || "UNKNOWN_ERROR")));
  }
}

export function* booksSaga() {
  //api호출의 reduce라고 생각하니 이해가 쉬움
  //type이 들어왔을 떄 실행할 함수를실행
  yield takeLatest(`${prefix}/GET_BOOKS`, getBooksSaga);
}
