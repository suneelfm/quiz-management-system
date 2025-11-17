import React from "react";
import styles from "../../styles/Atoms.module.css";

type SelectFiledProps = {
  label: string;
  options: any[];
};
export default function SelectFiled(props: SelectFiledProps) {
  const { label, options } = props;
  return (
    <select className={styles.field}>
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
