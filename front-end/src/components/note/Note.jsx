import { FaTrash } from "react-icons/fa";
import styles from "./Note.module.css";
import { TopBar } from "../top-bar/TopBar";
import { Form, useLoaderData } from "react-router-dom";

const NoteEditor = ({ children }) => (
  <div className={styles["note-editor"]}>{children}</div>
);

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

      <NoteEditor key={note.id}>
        <input type="text" defaultValue={note.title} />
        <textarea defaultValue={note.body} />
      </NoteEditor>
    </div>
  );
};

export { Note };
