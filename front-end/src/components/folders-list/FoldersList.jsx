import styles from "./FoldersList.module.css";

import { GoSun, GoMoon } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { LuSettings } from "react-icons/lu";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { FaTrash, FaFolder } from "react-icons/fa";

import { Folder } from "../folder/Folder";
import { Title } from "../title/Title";
import { TopBar } from "../top-bar/TopBar";
import { AddNewButton } from "../add-new-button/AddNewButton";
import { NavLink, useLoaderData, Form, redirect } from "react-router-dom";
import { useState } from "react";
import { Archive } from "../archive/Archive";

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
  let folderName = data.get("folder-name");

  // Ustaw domyślną nazwę, jeśli nie została podana
  if (!folderName) {
    folderName = "Untitled";
  }

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
  const [isOpen, setIsOpen] = useState(false);

  const openSettings = () => {
    setIsOpen(true);
  };

  const closeSettings = () => {
    setIsOpen(false);
  };
  return (
    <Folders>
      <TopBar>
        <Title>
          <div className={styles["folders"]}>
            <FaFolder size={"20px"} />
            Folders
          </div>
        </Title>
        <div className={styles["folders"]}>
          <Form method="POST" action="/">
            <AddNewButton></AddNewButton>
          </Form>
          <LuSettings
            onClick={openSettings}
            size={"20px"}
            color="rgba(255, 255, 255, 0.603)"
            cursor={"pointer"}
          />
          <TbLayoutSidebarLeftCollapseFilled
            size={"23px"}
            color="rgba(247, 237, 237, 0.603)"
            cursor={"pointer"}
          />
        </div>
        {/* Settings */}
        {isOpen && (
          <div className={styles["settings"]}>
            <div className={styles["settings-icon"]}>
              <GoSun
                size={"23px"}
                color="rgba(247, 237, 237, 0.603)"
                cursor={"pointer"}
              />
              <GoMoon
                size={"23px"}
                color="rgba(247, 237, 237, 0.603)"
                cursor={"pointer"}
              />
              <IoMdClose
                onClick={closeSettings}
                size={"23px"}
                color="rgba(247, 237, 237, 0.603)"
                cursor={"pointer"}
              />
            </div>
          </div>
        )}
        {/* <Form method="DELETE" action="delete">
          <div className={styles["wrapper"]}>
            <button className={styles.button}>
              <FaTrash size={"13px"} color="rgba(255, 255, 255, 0.452)" />
            </button>
          </div>
        </Form> */}
      </TopBar>

      <UserCreatedFolders>
        {folders.map((folder) => (
          <NavLink key={folder.id} to={`/notes/${folder.id}`}>
            {({ isActive }) => {
              return <Folder active={isActive}>{folder.name}</Folder>;
            }}
          </NavLink>
        ))}
      </UserCreatedFolders>
      <div className={styles["archive"]}>
        <NavLink to={`/archive`}>
          <Archive />
        </NavLink>
      </div>
    </Folders>
  );
};

export default FoldersList;
