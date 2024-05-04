import { FaTrash } from "react-icons/fa";
import styles from "./Note.module.css";
import { TopBar } from "../top-bar/TopBar";
import { Form, useLoaderData, useSubmit, redirect } from "react-router-dom";
import { Toaster, toast } from "sonner";

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

let deletedNotes = [];

export function deleteNote({ params }) {
  // Downloading note data before deleting
  return fetch(`http://localhost:3000/notes/${params.noteId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch note data.");
      }
      return response.json();
    })
    .then((noteData) => {
      // Deleted note object
      const deletedNote = {
        title: noteData.title,
        body: noteData.body,
        id: params.noteId,
        folderId: params.folderId,
      };
      deletedNotes.push(deletedNote);
      // Deleting a note from the server
      return fetch(`http://localhost:3000/notes/${params.noteId}`, {
        method: "DELETE",
      });
    })
    .then(() => {
      return (
        redirect(`/notes/${params.folderId}`),
        toast.success("Note has been deleted ", {
          action: {
            label: "Undo",
            onClick: undoDeleteNote,
          },
        })
      );
    })
    .catch((error) => {
      console.error("Error deleting note:", error);
    });
}

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

const Note = () => {
  const note = useLoaderData();
  const submit = useSubmit();

  return (
    <div className={styles.container}>
      <Toaster />
      <TopBar>
        <Form method="DELETE" action="delete">
          <button className={styles.button}>
            <span className={styles.image}>
              <FaTrash size={"13px"} color="rgba(255, 255, 255, 0.452)" />
            </span>
          </button>
        </Form>
      </TopBar>

      <Form
        method="PATCH"
        onChange={(event) => {
          submit(event.currentTarget);
        }}
      >
        <NoteEditor key={note.id}>
          <input type="text" name="title" defaultValue={note.title} />
          <textarea name="body" defaultValue={note.body} rows="20" cols="33" />
        </NoteEditor>
      </Form>
    </div>
  );
};

export { Note };
