import styles from "./FoldersList.module.css";

import { Folder } from "../folder/Folder";
import { Title } from "../title/Title";
import { TopBar } from "../top-bar/TopBar";
import { AddNewButton } from "../add-new-button/AddNewButton";
import { NavLink, useLoaderData, Form, redirect } from "react-router-dom";

const Folders = ({ children }) => (
  <div className={styles["folders-column"]}>{children}</div>
);
const UserCreatedFolders = ({ children }) => (
  <div role="list" className={styles["folders-list"]}>
    {children}
  </div>
);

export async function createFolder(args) {
  const data = await args.request.formData();
  const folderName = data.get("folder-name");
  return fetch("http://localhost:3000/folders", {
    method: "POST",
    body: JSON.stringify({
      name: folderName,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((newFolder) => {
      return redirect(`/notes/${newFolder.id}`);
    });
}

const FoldersList = () => {
  const folders = useLoaderData();

  return (
    <Folders>
      <TopBar>
        <Form method="POST" action="/">
          <div className={styles["wrapper"]}>
            <input
              className={styles["new-folder-input"]}
              type="text"
              placeholder="Name folder"
              name="folder-name"
            />
            <AddNewButton type="submit"></AddNewButton>
          </div>
        </Form>
      </TopBar>

      <Title>Folders</Title>
      <UserCreatedFolders>
        {folders.map((folder) => (
          <NavLink key={folder.id} to={`/notes/${folder.id}`}>
            {({ isActive }) => {
              return <Folder active={isActive}>{folder.name}</Folder>;
            }}
          </NavLink>
        ))}
      </UserCreatedFolders>
      {/* <Folder icon="archive">Archiwum</Folder> */}
    </Folders>
  );
};

export default FoldersList;
