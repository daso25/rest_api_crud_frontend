import {
  Link,
  Form,
  useActionData,
  useLoaderData,
  type ActionFunctionArgs,
  redirect,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { editProduct, getProductById } from "../services/ProductService";
import type { Product } from "../types";

export async function loader({ params }: ActionFunctionArgs) {
  //console.log("EditProduct loader called with params:", params);
  if (params.id !== undefined) {
    const currentProduct = await getProductById(Number(params.id));
    //console.log("Current product loaded in EditProduct loader:", currentProduct);
    if (!currentProduct) {
      return redirect("/");
    }
    return currentProduct;
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = "";

  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }

  if (error.length) {
    return error;
  }

  if (params.id !== undefined) {
    await editProduct(data, Number(params.id));
    return redirect("/");
  } else {
    error = "El ID del producto no es válido";
    return error;
  }

  // Redirect to the home page after successful product addition;
}

const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

export default function EditProduct() {
  const error = useActionData() as string; // Use useActionData to get the error message returned from the action
  const currentProduct = useLoaderData() as Product;
  //console.log("EditProduct loader data:", currentProduct);

  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl md:text-4xl text-slate-500 font-bold">
          Agregar producto
        </h2>
        <Link
          to="/"
          className="rounded-md bg-slate-500 text-white px-4 py-2 font-bold capitalize text-center shadow-md hover:bg-slate-600 transition-colors"
        >
          Ver Productos
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form className="mt-10" method="POST">
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="name">
            Nombre Producto:
          </label>
          <input
            id="name"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Nombre del Producto"
            name="name"
            defaultValue={currentProduct.name} // Set the default value to the current product's name
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="price">
            Precio:
          </label>
          <input
            id="price"
            type="number"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Precio Producto. ej. 200, 300"
            name="price"
            defaultValue={currentProduct.price} // Set the default value to the current product's price
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Disponibilidad:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={currentProduct?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          className="mt-5 cursor-pointer w-full rounded-md bg-slate-500 text-white px-4 py-2 font-bold capitalize text-center shadow-md hover:bg-slate-600 transition-colors"
          value="Guardar Producto"
        />
      </Form>
    </>
  );
}
