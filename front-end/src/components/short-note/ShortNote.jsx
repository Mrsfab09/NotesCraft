import styles from "./ShortNote.module.css";
import { FaTrash } from "react-icons/fa";
import { Form } from "react-router-dom";

const ShortNote = ({ note, active }) => {
  return (
    <div
      className={[styles["short-note"], active ? styles.active : ""].join(" ")}
    >
      <div className={styles.title}>{note.title}</div>
      <div className={styles.body}>{note.body}</div>
      {/* <Form method="DELETE" action="delete">
        <button className={styles.button}>
          <span className={styles.image}>
            <FaTrash
              className={[styles["icon"], active ? styles.active : ""].join(
                " "
              )}
              size={"16px"}
              color="rgba(255, 255, 255, 0.452)"
            />
          </span>
        </button>
      </Form> */}
    </div>
  );
};

export { ShortNote };
