import { Form } from "react-router-dom";
import styles from "./ShortNote.module.css";
import { FaTrash } from "react-icons/fa";

const ShortNote = ({ note, active }) => {
  const form = (
    <Form method="DELETE" action="delete">
      <button className={styles.button}></button>
    </Form>
  );

  return (
    <div
      className={[styles["short-note"], active ? styles.active : ""].join(" ")}
    >
      <div className={styles.title}>{note.title}</div>
      <div className={styles.body}>{note.body}</div>
      <FaTrash
        onClick={form}
        className={[styles["icon"], active ? styles.active : ""].join(" ")}
        size={"16px"}
        color="rgba(255, 255, 255, 0.452)"
      />
    </div>
  );
};

export { ShortNote };
