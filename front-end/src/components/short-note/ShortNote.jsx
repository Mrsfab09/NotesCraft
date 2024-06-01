import { Form, useNavigate } from "react-router-dom";
import styles from "./ShortNote.module.css";
import { FaTrash } from "react-icons/fa";
import { deleteNote } from "../note/Note";

const ShortNote = ({ note, active }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:3000/notes/${note.id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      navigate(0); // This will refresh the page
    } else {
      console.error("Failed to delete the note.");
    }
  };

  return (
    <div
      className={[styles["short-note"], active ? styles.active : ""].join(" ")}
    >
      <div className={styles.title}>{note.title}</div>
      <div className={styles.body}>{note.body}</div>
      <FaTrash
        onClick={handleDelete}
        className={[styles["icon"], active ? styles.active : ""].join(" ")}
        size={"16px"}
        color="rgba(255, 255, 255, 0.452)"
      />
    </div>
  );
};

export { ShortNote };
