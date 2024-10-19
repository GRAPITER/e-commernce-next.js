import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type TextArea = {
  name: string;
  label?: string;
  defaultValue?: string;
};

export default function TextAreaInput({ name, label, defaultValue }: TextArea) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        rows={5}
        defaultValue={defaultValue}
        required
      />
    </div>
  );
}
