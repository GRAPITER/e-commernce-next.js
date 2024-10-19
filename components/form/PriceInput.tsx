import { Label } from "../ui/label";
import { Input } from "../ui/input";

type PriceInput = {
  label: string;
  defaultValue?: number;
};

export default function PriceInput({ label, defaultValue }: PriceInput) {
  const name = "price";
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label}
      </Label>
      <Input
        type="number"
        name={name}
        id={name}
        required
        min={0}
        defaultValue={defaultValue || 100}
      />
    </div>
  );
}
