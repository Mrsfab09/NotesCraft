import styles from "./Folder.module.css";

import { FaArchive } from "react-icons/fa";
import { FaFolder } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

import { useState } from "react";
import { Form } from "react-router-dom";

const Folder = ({ children, active, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openEditForm = () => {
    console.log("Open ");
    setIsOpen(true);
  };
  const closeEditForm = () => {
    setIsOpen(false);
  };
  return (
    <div
      className={[styles.folder, active ? styles.active : ""].join(" ")}
      role="listitem"
    >
      <span>
        {icon === "archive" ? <FaArchive /> : <FaFolder color="#ffda76c7" />}
      </span>
      {children}
      <div className={[styles.edit]}>
        <FaRegEdit
          className={[styles["edit"], active ? styles.active : ""].join(" ")}
          onClick={openEditForm}
        />
      </div>
      {isOpen && (
        <div className={[styles.blackScreen]}>
          <div className={[styles.container]}>
            <div className={[styles.topBar]}>
              <p>Rename folder</p>
            </div>
            <div className={[styles.body]}>
              <Form
                method="PATCH"
                onChange={(event) => {
                  submit(event.currentTarget);
                }}
              >
                <input type="text" placeholder="Enter new name folder" />
                <button
                  className={[styles.buttonCancel]}
                  onClick={closeEditForm}
                >
                  Cancel
                </button>
                <button className={[styles.buttonRename]}>Rename</button>
              </Form>
            </div>
            <div className={[styles.footer]}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export { Folder };
