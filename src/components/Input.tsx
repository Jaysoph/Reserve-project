import { TextField } from "@mui/material";
import React from "react";

interface IProp {
  label: string;
  type: React.HTMLInputTypeAttribute;
  name: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  bgInputColor?: string;
}

const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  className,
  bgInputColor,
}: IProp) => {
  return (
    <label
      style={{
        display: className ? "block" : "flex",
        alignItems: "center",
        columnGap: "2px",
      }}
    >
      {label}
      <div className={className}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          size="small"
          sx={{
            borderRadius: "8px",
            backgroundColor: "transparent",
            "& .MuiInputBase-input": {
              // if else shorthand from bgInputColor ? bgInputColor : "#e8f0fe"
              background: bgInputColor || "#e8f0fe",
              borderRadius: "8px",
              padding: "4px",
            },
          }}
        />
      </div>
    </label>
  );
};

export default Input;
