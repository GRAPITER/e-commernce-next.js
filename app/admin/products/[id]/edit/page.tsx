import Buttons from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheakBoxInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInputContainer from "@/components/form/ImageInputContainer";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import {
  FetchAdminProduct,
  ProductUpdated,
  updateImageAction,
} from "@/utils/actions";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const product = await FetchAdminProduct(id);
  if (!product) throw new Error("no id found");
  const { name, company, price, description, featured } = product;

  return (
    <div>
      <h1 className="capitalize text-2xl font-bold mb-8">update product</h1>
      <div className="border p-8 rounded-md">
        {/* Image Input Container */}
        <ImageInputContainer name={name} image={product.image}>
          <input type="hidden" name="pId" value={id} />
          <input type="hidden" name="url" value={product.image} />
        </ImageInputContainer>

        <FormContainer action={ProductUpdated}>
          <input type="hidden" name="ids" value={product.id} />
          <div className="grid md:grid-cols-2 my-4 gap-4">
            <FormInput label="product name" name="name" defaultValue={name} />
            <FormInput label="company" name="company" defaultValue={company} />
            <PriceInput label="price($)" defaultValue={price} />
          </div>
          <div className="mb-5">
            <TextAreaInput
              name="description"
              label="product description"
              defaultValue={description}
            />
          </div>
          <CheckboxInput
            label="feature"
            name="feature"
            defaultChecked={featured}
          />
          <div className="mt-7">
            <Buttons text="product update" size="lg" />
          </div>
        </FormContainer>
      </div>
    </div>
  );
}
