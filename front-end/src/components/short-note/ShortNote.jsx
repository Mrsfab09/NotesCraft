import { Form, redirect } from "react-router-dom";
import styles from "./ShortNote.module.css";
import { FaTrash } from "react-icons/fa";

export function deleteNote({ params }) {
  return fetch(`http://localhost:3000/notes/${params.noteId}`, {
    method: "DELETE",
  }).then(() => {
    return redirect(`/notes/${params.folderId}`);
  });
}

let deletedNotes = [];

export function undoDeleteNote() {
  if (deletedNotes.length > 0) {
    const lastDeletedNote = deletedNotes.pop();
    fetch(`http://localhost:3000/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: lastDeletedNote.title,
        body: lastDeletedNote.body,
        folderId: lastDeletedNote.folderId,
        id: lastDeletedNote.id,
      }),
    });
  }
  window.location.reload();
}

const ShortNote = ({ note, active }) => {
  return (
    <div
      className={[styles["short-note"], active ? styles.active : ""].join(" ")}
    >
      <div className={styles.title}>{note.title}</div>
      <div className={styles.body}>{note.body}</div>
      <Form method="DELETE" action="delete">
        <FaTrash
          className={[styles["icon"], active ? styles.active : ""].join(" ")}
          size={"16px"}
          color="rgba(255, 255, 255, 0.452)"
        />
      </Form>
    </div>
  );
};

export { ShortNote };
