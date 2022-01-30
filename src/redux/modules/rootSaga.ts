import { all } from "redux-saga/effects";
import { authSaga } from "./auth";
import { booksSaga } from "./books";

export default function* rootSaga() {
  // 이곳에 배열로 하위 사가들을 가지고 와야함
  yield all([authSaga(), booksSaga()]);
}
