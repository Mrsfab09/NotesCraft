import styles from "./NotesList.module.css";
import { Title } from "../title/Title";
import { AddNewButton } from "../add-new-button/AddNewButton";
import { TopBar } from "../top-bar/TopBar";
import { ShortNote } from "../short-note/ShortNote";
import { CgNotes } from "react-icons/cg";

import {
  useLoaderData,
  NavLink,
  Outlet,
  Form,
  redirect,
} from "react-router-dom";
import { Folder } from "../folder/Folder";
import { Archive } from "../archive/Archive";

const NotesContainer = ({ children }) => (
  <div className={styles["notes-container"]}>{children}</div>
);

const Notes = ({ children }) => (
  <div className={styles["notes-list"]} role="list">
    {children}
  </div>
);

export function createNote({ params }) {
  return fetch("http://localhost:3000/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Untitled",
      body: "Enter your note",
      folderId: Number(params.folderId),
    }),
  })
    .then((response) => response.json())
    .then((newNote) => {
      return redirect(`/notes/${newNote.folderId}/note/${newNote.id}`);
    });
}

const NotesList = () => {
  const notes = useLoaderData();

  return (
    <NotesContainer>
      <Notes>
        <TopBar>
          <div className={styles["wrapper"]}>
            <CgNotes size={"17px"} color="rgba(255, 255, 255, 0.452)" />
            <Title>Notes</Title>
          </div>
          <div className={styles["form"]}>
            <Form method="POST">
              <AddNewButton></AddNewButton>
            </Form>
          </div>
        </TopBar>
        {notes.map((note) => (
          <NavLink key={note.id} to={`/notes/${note.folderId}/note/${note.id}`}>
            {({ isActive }) => (
              <ShortNote
                active={isActive}
                role="listitem"
                note={note}
              ></ShortNote>
            )}
          </NavLink>
        ))}
        <div className={styles["archive"]}>
          <NavLink to={`/archive`}>
            <Archive />
          </NavLink>
        </div>
      </Notes>
      <Outlet />
    </NotesContainer>
  );
};

export default NotesList;
