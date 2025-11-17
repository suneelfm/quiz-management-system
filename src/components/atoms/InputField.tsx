import React, { ChangeEventHandler } from "react";
import styles from "../../styles/Atoms.module.css";

type InputFieldProps = {
  label: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};
export default function InputField(props: InputFieldProps) {
  const { label, value, onChange } = props;
  return (
    <input
      className={styles.field}
      value={value}
      onChange={onChange}
      placeholder={label}
    />
  );
}
