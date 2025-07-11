import { Link, useLoaderData } from "react-router-dom";
import { getProducts } from "../services/ProductService";
import type { Product } from "../types/index";
import ProductDetails from "../components/ProductDetails";

export async function loader() {
  const products = await getProducts();
  return products;
}

export default function Products() {
  const products = useLoaderData() as Product[];
  //console.log("Products loaded:", products);

  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl md:text-4xl text-slate-500 font-bold">
          Productos
        </h2>
        <Link
          to="/products/new"
          className="rounded-md bg-slate-500 text-white px-4 py-2 font-bold capitalize text-center shadow-md hover:bg-slate-600 transition-colors"
        >
          Agregar Producto
        </Link>
      </div>
      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-500 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => (
              <ProductDetails
              key={product.id}
              product={product}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
