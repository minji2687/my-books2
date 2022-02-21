import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import ListContainer from "../containers/ListContainer";
import useToken from "../hooks/useToken";
import { RootState } from "../types";

export default function Home() {
  const token = useToken();

  if (token === null) {
    return <Redirect to="/signin" />;
  }

  return <ListContainer />;
}
