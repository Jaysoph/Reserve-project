import { InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";

interface IProps {
  label: string;
  value: string;
  onChange: (_event: SelectChangeEvent) => void;
  data: {
    value: string;
    label: string;
  }[];
  bgColor?: string;
}

const Selectcustom = ({ label, value, onChange, data, bgColor }: IProps) => {
  return (
    <>
      <InputLabel id="label-selected">{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        size="small"
        sx={{
          background: bgColor || "#e8f0fe",
          borderRadius: "8px",
          padding: "4px",
        }}
      >
        {data.map((_data, _index) => (
          <MenuItem key={_index} value={_data.value}>
            {_data.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default Selectcustom;
