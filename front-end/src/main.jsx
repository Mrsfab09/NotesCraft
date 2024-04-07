import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App";
import NotesList, { createNote } from "./components/notes-list/NotesList";
import { deleteNote, Note, updateNote } from "./components/note/Note";
import { createFolder } from "./components/folders-list/FoldersList";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    shouldRevalidate: ({ formAction }) => {
      if (formAction === "/") return true;
      else return false;
    },
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
            shouldRevalidate: ({ formAction }) => {
              if (formAction) return false;
              else return true;
            },
            action: updateNote,
            loader: ({ params }) => {
              return fetch(`http://localhost:3000/notes/${params.noteId}`);
            },
            children: [
              {
                path: "delete",
                action: deleteNote,
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
