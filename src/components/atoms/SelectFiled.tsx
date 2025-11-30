import React from "react";
import styles from "../../styles/Atoms.module.css";

type SelectFiledProps = {
  label: string;
  options: any[];
};
export default function SelectFiled(props: SelectFiledProps) {
  const { label, options } = props;
  return (
    <select
      defaultValue={label}
      className={styles.field}
      style={{ width: "100%" }}
    >
      <option disabled value={label}>
        {label}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
