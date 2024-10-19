import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import CheakBoxInput from "@/components/form/CheakBoxInput";
import { faker } from "@faker-js/faker";
import Buttons from "@/components/form/Buttons";
import { createProduct } from "@/utils/actions";

export default function CreateProductPage() {
  const name = faker.commerce.productName();
  const company = faker.company.name();
  const description = faker.lorem.paragraph({ min: 10, max: 12 });

  return (
    <div>
      <h2 className="capitalize text-2xl font-semibold mb-8">Create product</h2>
      <div className=" border p-8 rounded-md">
        <FormContainer action={createProduct}>
          <div className="grid md:grid-cols-2 gap-4">
            <FormInput label="product price" defaultValue={name} name="name" />
            <FormInput label="company" defaultValue={company} name="company" />
            <PriceInput label="price ($)" />
            <ImageInput />
          </div>
          <TextAreaInput
            name="description"
            defaultValue={description}
            label="description"
          />
          <div className="mt-6">
            <CheakBoxInput label="feature" name="feature" />
          </div>

          <Buttons size="lg" text="create product " classname="mt-6" />
        </FormContainer>
      </div>
    </div>
  );
}
