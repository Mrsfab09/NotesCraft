import styles from "./FoldersList.module.css";

import { FaTrash, FaFolder } from "react-icons/fa";
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

export function deleteFolder({ params }) {
  return fetch(`http://localhost:3000/folders/${params.folderId}`, {
    method: "DELETE",
  }).then(() => {
    return (
      redirect(`/notes`),
      toast.success("Folder has been deleted ", {
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      })
    );
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
            <AddNewButton></AddNewButton>
          </div>
        </Form>
        <Form method="DELETE" action="delete">
          <div className={styles["wrapper"]}>
            <button className={styles.button}>
              <FaTrash size={"13px"} color="rgba(255, 255, 255, 0.452)" />
            </button>
          </div>
        </Form>
      </TopBar>

      <Title>
        <div className={styles["folders"]}>
          <FaFolder />
          Folders
        </div>
      </Title>
      <UserCreatedFolders>
        {folders.map((folder) => (
          <NavLink key={folder.id} to={`/notes/${folder.id}`}>
            {({ isActive }) => {
              return <Folder active={isActive}>{folder.name}</Folder>;
            }}
          </NavLink>
        ))}
      </UserCreatedFolders>
    </Folders>
  );
};

export default FoldersList;
