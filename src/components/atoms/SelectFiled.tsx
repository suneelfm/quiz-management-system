import React, { ChangeEventHandler } from "react";
import styles from "../../styles/Atoms.module.css";

type SelectFiledProps = {
  label: string;
  options: any[];
  value?: string | number | readonly string[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
};
export default function SelectFiled(props: SelectFiledProps) {
  const { label, options, value, onChange } = props;
  return (
    <select
      defaultValue={label}
      className={styles.field}
      value={value}
      style={{ width: "100%" }}
      onChange={onChange}>
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
