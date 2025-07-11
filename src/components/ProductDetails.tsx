import type { Product } from "../types";
import { useNavigate } from "react-router-dom";
import {deleteProduct, updateAvailability} from "../services/ProductService";

type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const navigate = useNavigate();
  const isAvailable = product.availability;
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100 transition-colors text-center">
      <td className="p-3 text-lg text-gray-500">{product.name}</td>
      <td className="p-3 text-lg text-gray-500">${product.price}</td>
      <td className="p-3 text-lg text-gray-500">
        <button
        className={isAvailable ? "cursor-pointer text-green-600 bg-green-100 hover:bg-green-200 p-2 rounded-md font-bold transition-all" : "cursor-pointer text-red-600 bg-red-100 hover:bg-red-200 p-2 rounded-md font-bold transition-all"}

        onClick={async () => {
          try {
            await updateAvailability(product.id, !isAvailable);
            navigate("/");
          } catch (error) {
            console.error("Error updating availability:", error);
            alert("Error al actualizar la disponibilidad del producto. Por favor, inténtalo de nuevo.");
          }
        }}
        >
          {isAvailable ? "Disponible" : "Agotado"}
        </button>
      </td>
      <td className="p-3 text-lg text-gray-500 flex justify-center align-center flex-wrap gap-5">
        <button
          onClick={() =>
            navigate(`/products/${product.id}/edit`)
          }
          className="rounded-md bg-slate-500 text-white px-4 py-2 font-bold capitalize text-center shadow-md hover:bg-slate-600 transition-colors cursor-pointer"
        >
          Editar
        </button>
        <button className="rounded-md bg-red-400 text-white px-4 py-2 font-bold capitalize text-center shadow-md hover:bg-red-600 transition-colors cursor-pointer"
        onClick={async () => {
          if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            try {
              await deleteProduct(product.id);
              navigate("/");
            } catch (error) {
              console.error("Error al eliminar el producto:", error);
              alert("Error al eliminar el producto. Por favor, inténtalo de nuevo.");
            }
          }
        }}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}
