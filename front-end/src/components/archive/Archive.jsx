import { TopBar } from "../top-bar/TopBar";
import styles from "./Archive.module.css";
import { FaArchive } from "react-icons/fa";

export function Archive() {
  return (
    <div className={[styles.wrapper]}>
      <span>
        <FaArchive />
      </span>
      <p>Archives</p>
    </div>
  );
}
