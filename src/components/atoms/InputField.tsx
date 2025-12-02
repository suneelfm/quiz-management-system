import React, { ChangeEventHandler, FocusEventHandler } from "react";
import styles from "../../styles/Atoms.module.css";

type InputFieldProps = {
  label: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};
export default function InputField(props: InputFieldProps) {
  const { label, value, onChange, onBlur } = props;
  return (
    <input
      className={styles.field}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={label}
    />
  );
}
