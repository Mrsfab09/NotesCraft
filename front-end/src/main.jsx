import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App";

import NotesList, { createNote } from "./components/notes-list/NotesList";
import { Note, updateNote, deleteNote } from "./components/note/Note";

import { createFolder } from "./components/folders-list/FoldersList";
import { NotFound } from "./components/not-found/NotFound";
import { ArchiveList } from "./components/archive-list/ArchiveList";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    action: createFolder,
    loader: () => {
      return fetch("http://localhost:3000/folders");
    },
    shouldRevalidate: ({ formAction }) => {
      if (formAction === "/") return true;
      else return false;
    },
    errorElement: <NotFound />,
    children: [
      {
        path: "archive",
        element: <ArchiveList />,
        loader: () => {
          return fetch("http://localhost:3000/archive");
        },
      },
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
            errorElement: <NotFound />,
            shouldRevalidate: ({ formAction }) => {
              if (formAction) return false;
              else return true;
            },
            action: updateNote,
            loader: async ({ params }) => {
              const result = await fetch(
                `http://localhost:3000/notes/${params.noteId}`
              );
              if (result.status === 404) {
                throw new Error();
              } else {
                return result.json();
              }
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
