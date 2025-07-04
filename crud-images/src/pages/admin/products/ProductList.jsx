import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { deleteProduct as deleteProductService } from "../../../services/productService";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const { currentUser } = useAuth(); // ← Ici

  console.log("API_URL =", API_URL); // Pour tester si elle est bien lue
  function getProducts() {
    fetch(`${API_URL}/products?_sort=id&_order=desc`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        alert("Impossible de récupérer les données");
      });
  }

  useEffect(getProducts, []);
  function deleteProduct(id) {
    console.log(
      "Suppression produit id:",
      id,
      "currentUser id:",
      currentUser?.id
    );

    deleteProductService(id)
      .then(() => getProducts())
      .catch(() => alert("Impossible de supprimer le produit !"));
  }

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Products</h2>
      <div className="row mb-3">
        <div className="col">
          <Link
            className="btn btn-primary me-1"
            to="/products/create"
            role="button"
          >
            Créer le produit
          </Link>
        </div>
        <div className="col"></div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Marque</th>
              <th>Description</th>
              <th>Catégorie</th>
              <th>Prix</th>
              <th>Visuel</th>
              <th>Créé le</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                  <td>{product.price}€</td>

                  <td>
                    {product.imageFilename ? (
                      <img
                        src={`${API_URL}/images/${product.imageFilename}`}
                        width="100"
                        alt={product.name}
                      />
                    ) : (
                      <span>No image</span>
                    )}
                  </td>
                  <td>
                    {product.createdAt ? product.createdAt.slice(0, 10) : "-"}
                  </td>
                  {/* <td>{product.createdAt}</td> */}

                  <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                    <Link
                      className="btn btn-primary btn-sm me-1"
                      to={"/products/edit/" + product.id}
                    >
                      Editer
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteProduct(product.id)}
                    >
                      {" "}
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
