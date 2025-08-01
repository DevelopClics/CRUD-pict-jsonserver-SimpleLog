import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { createProduct as createProductService } from "../../../services/productService";

export default function CreateProduct() {
  const { currentUser } = useAuth();
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;
  console.log("API_URL =", API_URL); // Pour tester si elle est bien lue
  // Soumission du formulaire
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const product = Object.fromEntries(formData.entries());

    // validation
    if (
      !product.name ||
      !product.brand ||
      !product.category ||
      !product.price ||
      !product.description ||
      !product.image.name
    ) {
      alert("Merci de remplir tous les champs du formulaire");
      return;
    }

    try {
      await createProductService(formData);
      navigate("/products");
    } catch (err) {
      if (err && typeof err === "object") {
        setValidationErrors(err);
      } else {
        alert("Impossible de créer le produit !");
      }
    }
  }
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Créer un produit</h2>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Nom</label>
              <div className="col-sm-8">
                <input className="form-control" name="name" />
                <span className="text-danger">{validationErrors.name}</span>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Marque</label>
              <div className="col-sm-8">
                <input className="form-control" name="brand" />
                <span className="text-danger">{validationErrors.brand}</span>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Catégorie</label>
              <div className="col-sm-8">
                <select className="form-select" name="category">
                  <option value="Other">Autre</option>
                  <option value="Animation">Animation</option>
                  <option value="Conciergerie">Conciergerie</option>
                  <option value="Location de vaisselle">
                    Location de vaisselle
                  </option>
                  <option value="Logistique évènementielle">
                    Logistique évènementielle
                  </option>
                  <option value="Guinguette Mobile">Guinguette Mobile</option>
                </select>
                <span className="text-danger">{validationErrors.category}</span>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Prix</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="price"
                  type="number"
                  step="0.01"
                  min="1"
                />
                <span className="text-danger">{validationErrors.price}</span>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Description</label>
              <div className="col-sm-8">
                <textarea
                  className="form-control"
                  name="description"
                  rows="4"
                />
                <span className="text-danger">
                  {validationErrors.description}
                </span>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Image</label>
              <div className="col-sm-8">
                <input className="form-control" type="file" name="image" />
                <span className="text-danger">{validationErrors.image}</span>
              </div>
            </div>
            <div className="row">
              <div className="offset-sm-4 col-sm-4 d-grid">
                <button type="submit" className="btn btn-primary">
                  Soumettre
                </button>
              </div>
              <div className="col-sm-4 d-grid">
                <Link
                  className="btn btn-secondary"
                  to="/products"
                  role="button"
                >
                  Annuler
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
