import { Input } from "../ui/input";
import { Label } from "../ui/label";

type FormInput = {
  name: string;
  label: string;
  defaultValue?: string;
  placeholder?: string;
};

export default function FormInput({
  name,
  label,
  defaultValue,
  placeholder,
}: FormInput) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Input
        type="text"
        name={name}
        id={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
