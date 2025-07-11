import { safeParse } from "valibot";
import axios from "axios";
import {
  DraftProductSchema,
  ProductListSchema,
  type Product,
  ProductSchema,
} from "../types/index";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

function toBoolean(stringValue: string): boolean {
  return stringValue.toLowerCase() === "true";
}

export async function addProduct(product: ProductData) {
  try {
    const parsedProduct = safeParse(DraftProductSchema, {
      name: product.name,
      price: Number(product.price),
    });
    if (parsedProduct.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      const { data } = await axios.post(url, {
        name: parsedProduct.output.name,
        price: parsedProduct.output.price,
      });

      console.log("Product added successfully:", data);
    } else {
      throw new Error("Invalid product data");
    }
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Failed to add product");
  }
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data } = await axios.get(url);
    const parsedData = safeParse(ProductListSchema, data.data);
    //console.log("Products fetched successfully:", parsedData);
    if (parsedData.success) {
      return parsedData.output;
    } else {
      throw new Error("Invalid product data format");
    }
  } catch (error) {
    console.log("Error fetching products:", error);
  }
}

export async function getProductById(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios.get(url);
    const parsedData = safeParse(ProductSchema, data.data);
    //console.log("Products fetched successfully:", parsedData);
    if (parsedData.success) {
      return parsedData.output;
    } else {
      throw new Error("Invalid product data format");
    }
  } catch (error) {
    console.log("Error fetching products:", error);
  }
}

export async function editProduct(product: ProductData, id: Product["id"]) {
  try {
    const parsedProduct = safeParse(ProductSchema, {
      id: id,
      name: product.name,
      price: Number(product.price),
      availability: toBoolean(product.availability.toString()),
    });
    if (parsedProduct.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
      const { data } = await axios.put(url, {
        id: parsedProduct.output.id,
        name: parsedProduct.output.name,
        price: parsedProduct.output.price,
        availability: parsedProduct.output.availability,
      });

      console.log("Product edited successfully:", data);
    } else {
      throw new Error("Invalid product data");
    }
    
  } catch (error) {
    console.error("Error editing product:", error);
    throw new Error("Failed to edit product");
  }
}

export async function deleteProduct(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios.delete(url);
    console.log("Product deleted successfully:", data);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product");
  }
}

export async function updateAvailability(id: Product["id"], availability: boolean) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios.patch(url, { availability });
    console.log("Product availability updated successfully:", data);
  } catch (error) {
    console.error("Error updating product availability:", error);
    throw new Error("Failed to update product availability");
  }
}
