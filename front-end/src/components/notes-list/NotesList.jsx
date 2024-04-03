import styles from "./NotesList.module.css";
import { Title } from "../title/Title";
import { AddNewButton } from "../add-new-button/AddNewButton";
import { TopBar } from "../top-bar/TopBar";
import { ShortNote } from "../short-note/ShortNote";

import { useLoaderData, NavLink, Outlet } from "react-router-dom";

const NotesContainer = ({ children }) => (
  <div className={styles["notes-container"]}>{children}</div>
);

const Notes = ({ children }) => (
  <div className={styles["notes-list"]} role="list">
    {children}
  </div>
);

const NotesList = () => {
  const notes = useLoaderData();

  return (
    <NotesContainer>
      <Notes>
        <TopBar>
          <Title>Notes</Title>

          <AddNewButton></AddNewButton>
        </TopBar>
        {/* //! fix problem with display notes with folders [ep.6] */}
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
      </Notes>
      <Outlet />
    </NotesContainer>
  );
};

export default NotesList;
