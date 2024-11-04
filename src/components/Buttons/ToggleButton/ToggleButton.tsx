import styles from "./toggleButton.module.css";

type ToggleProps = {
  isChecked: boolean;
  handleClick: () => void;
};

export default function ToggleButton({ isChecked, handleClick }: ToggleProps) {
  return (
    <label className={`${styles.button} ${isChecked ? styles.checked : ""}`}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleClick}
        className={styles.input}
      />
    </label>
  );
}
