import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App";
import NotesList, { createNote } from "./components/notes-list/NotesList";
import { Note, updateNote } from "./components/note/Note";
import { createFolder } from "./components/folders-list/FoldersList";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    action: createFolder,
    loader: () => {
      return fetch("http://localhost:3000/folders");
    },
    children: [
      {
        element: <NotesList />,
        path: "/notes/:folderId",
        action: createNote,
        loader: ({ params }) => {
          return fetch(
            `http://localhost:3000/notes?folderId=${params.folderId}`
          );
        },
        children: [
          {
            element: <Note />,
            path: "note/:noteId",
            action: updateNote,
            loader: ({ params }) => {
              return fetch(`http://localhost:3000/notes/${params.noteId}`);
            },
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
