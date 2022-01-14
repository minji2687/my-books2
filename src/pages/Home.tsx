// import React from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../types";
// import { Redirect } from "react-router";
// import ListContainer from "../containers/ListContainer";

// export default function Home() {
//   const token = useSelector<RootState, string | null>(
//     (state) => state.auth.token
//   );

//   if (token === null) {
//     return <Redirect to="/signin" />;
//   }

//   return <ListContainer />;
// }

export default function Home() {
  return <div>Home</div>;
}
