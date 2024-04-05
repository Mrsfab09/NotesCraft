import { FaTrash } from "react-icons/fa";
import styles from "./Note.module.css";
import { TopBar } from "../top-bar/TopBar";
import { Form, useLoaderData } from "react-router-dom";

const NoteEditor = ({ children }) => (
  <div className={styles["note-editor"]}>{children}</div>
);

export async function updateNote({ request, params }) {
  const data = await request.formData();
  const title = data.get("title");
  const body = data.get("body");

  return fetch(`http://localhost:3000/notes/${params.noteId}`, {
    method: "PATCH",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
}

const Note = () => {
  const note = useLoaderData();
  return (
    <div className={styles.container}>
      <TopBar>
        <Form method="DELETE" action="delete">
          <button className={styles.button}>
            <span className={styles.image}>
              <FaTrash size={"13px"} color="rgba(255, 255, 255, 0.452)" />
            </span>
          </button>
        </Form>
      </TopBar>

      <Form method="PATCH">
        <NoteEditor key={note.id}>
          <input type="text" name="title" defaultValue={note.title} />
          <textarea name="body" defaultValue={note.body} />
        </NoteEditor>
      </Form>
    </div>
  );
};

export { Note };
