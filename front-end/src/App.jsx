import { Outlet, useLocation, useNavigation } from "react-router-dom";
import FoldersList from "./components/folders-list/FoldersList";
import Layout from "./components/layout/Layout";
import { Loader } from "./components/loader/Loader";

export function App() {
  const { state } = useNavigation();
  const location = useLocation();

  return (
    <Layout>
      {/* TODO:Loader */}
      {/* {(state === "loading" || state == "submitting") && <Loader />} */}
      {location.pathname !== "/archive" && <FoldersList />}
      <Outlet />
    </Layout>
  );
}
