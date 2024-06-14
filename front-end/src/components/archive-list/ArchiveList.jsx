import { NavLink, useLoaderData } from "react-router-dom";
import { TopBar } from "../top-bar/TopBar";
import styles from "./ArchiveList.module.css";

import { FaArchive } from "react-icons/fa";
import { IoChevronBackSharp } from "react-icons/io5";

export function ArchiveList() {
  const archive = useLoaderData();

  return (
    <div className={[styles.container]}>
      <TopBar>
        <div className={[styles.icon]}>
          <NavLink to="/">
            <IoChevronBackSharp
              color="rgba(255, 255, 255, 0.452)"
              cursor={"pointer"}
            />
          </NavLink>
          <FaArchive color="rgba(255, 255, 255, 0.452)" />
          <p>Archive</p>
        </div>
      </TopBar>
      {archive.map((archive) => (
        <NavLink key={archive.id} to={`/archive/${archive.id}`}></NavLink>
      ))}
    </div>
  );
}
