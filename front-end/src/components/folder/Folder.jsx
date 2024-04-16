import styles from "./Folder.module.css";
import { FaArchive } from "react-icons/fa";
import { FaFolder } from "react-icons/fa6";

const Folder = ({ children, active, icon }) => {
  return (
    <div
      className={[styles.folder, active ? styles.active : ""].join(" ")}
      role="listitem"
    >
      <span>
        {icon === "archive" ? <FaArchive /> : <FaFolder color="#ffda76c7" />}
      </span>
      {children}
    </div>
  );
};

export { Folder };
