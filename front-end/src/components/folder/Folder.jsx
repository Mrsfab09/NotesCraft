import styles from "./Folder.module.css";
import ArchiveIcon from "../../assets/remove.svg";
import { FaFolder } from "react-icons/fa6";

const Folder = ({ children, active, icon }) => {
  return (
    <div
      className={[styles.folder, active ? styles.active : ""].join(" ")}
      role="listitem"
    >
      <span>
        {icon === "archive" ? ArchiveIcon : <FaFolder color="#ffda76c7" />}
      </span>
      {children}
    </div>
  );
};

export { Folder };
