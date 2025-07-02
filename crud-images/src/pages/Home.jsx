import { useEffect, useState } from "react";
import { fetchProducts, deleteProduct } from "../services/productService";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

  const loadProducts = () => {
    fetchProducts()
      .then(setProducts)
      .catch(() => alert("Impossible de récupérer les données"));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      deleteProduct(id)
        .then(() => loadProducts())
        .catch(() => alert("Impossible de supprimer le produit !"));
    }
  };

  return (
    <div className="container my-4">
      <h2>Bienvenue sur notre site internet de démonstration</h2>
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
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>{product.price}€</td>
              <td>
                <img
                  src={`${import.meta.env.VITE_API_URL}/images/${
                    product.imageFilename
                  }`}
                  width="100"
                  alt={product.name}
                />
              </td>
              <td>{product.createdAt?.slice(0, 10)}</td>
              <td>
                {user?.id === "admin" && (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
