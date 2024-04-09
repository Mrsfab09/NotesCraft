import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";
import ICON from "../../assets/no.png";

export function NotFound() {
  return (
    <div className={styles["error-page"]}>
      <img src={ICON} alt="icon" />
      <div className={styles["wrapper"]}>
        <h2>Page not found</h2>
        <p>You entered an invalid URL!</p>
      </div>
      <Link to="..">Back</Link>
    </div>
  );
}
