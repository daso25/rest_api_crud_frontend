import { Link, Form, useActionData, type ActionFunctionArgs, redirect } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";

export async function action({ request }:ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = "";

  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }

  if (error.length) {
    return error;
  }

  await addProduct(data)

  return redirect("/");
  // Redirect to the home page after successful product addition;
}

export default function NewProduct() {
  const error = useActionData() as string; // Use useActionData to get the error message returned from the action
 

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

{error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}

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
          />
        </div>
        <input
          type="submit"
          className="mt-5 cursor-pointer w-full rounded-md bg-slate-500 text-white px-4 py-2 font-bold capitalize text-center shadow-md hover:bg-slate-600 transition-colors"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
}
