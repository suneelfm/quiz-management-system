import React, { InputHTMLAttributes } from "react";
import styles from "../../styles/Atoms.module.css";

type InputFieldProps = {
  label: string;
};
export default function InputField(
  props: InputFieldProps & InputHTMLAttributes<HTMLInputElement>
) {
  const { label, value, onChange, onBlur, ...rest } = props;
  return (
    <input
      className={styles.field}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={label}
      {...rest}
    />
  );
}
