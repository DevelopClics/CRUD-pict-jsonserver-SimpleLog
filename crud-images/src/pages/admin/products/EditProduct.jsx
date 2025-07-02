import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export default function EditProduct() {
  const { currentUser } = useAuth();
  const params = useParams();
  const [initialData, setInitialData] = useState();
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  console.log("API_URL =", API_URL); // Pour tester si elle est bien lue

  function getProduct() {
    fetch(`${API_URL}/products/` + params.id)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .then((data) => {
        setInitialData(data);
      })
      .catch((error) => {
        alert("Impossible de lire les details du produit");
      });
  }

  useEffect(getProduct, []);

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
      !product.description
    ) {
      alert("Merci de remplir tous les champs du formulaire");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/admin/products/${params.id}`, {
        method: "PATCH",
        headers: {
          "X-User-Id": currentUser?.id || "",
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // Produit modifié avec succès
        navigate("/products");
      } else if (response.status === 400) {
        // Erreurs de validation (ex : champs invalides)
        setValidationErrors(data);
      } else {
        alert("Impossible de modifier le produit !");
      }
    } catch (error) {
      alert("Impossible de se connecter au serveur !");
    }
  }
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Modifier un produit</h2>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">ID</label>
            <div className="col-sm-8">
              <input
                readOnly
                className="form-control-plaintext"
                defaultValue={params.id}
              />
            </div>
          </div>
          {initialData && (
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Nom</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    name="name"
                    defaultValue={initialData.name}
                  />
                  <span className="text-danger">{validationErrors.name}</span>
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Marque</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    name="brand"
                    defaultValue={initialData.brand}
                  />
                  <span className="text-danger">{validationErrors.brand}</span>
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Catégorie</label>
                <div className="col-sm-8">
                  <select
                    className="form-select"
                    name="category"
                    defaultValue={initialData.category}
                  >
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

                  <span className="text-danger">
                    {validationErrors.category}
                  </span>
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
                    defaultValue={initialData.price}
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
                    defaultValue={initialData.description}
                  />
                  <span className="text-danger">
                    {validationErrors.description}
                  </span>
                </div>
              </div>

              <div className="row mb-3">
                <div className="offset-sm-4  col-sm-8">
                  <img
                    src={`${API_URL}/images/` + initialData.imageFilename}
                    width="150"
                    alt="…"
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Créé le</label>
                <div className="col-sm-8">
                  <input
                    readOnly
                    className="form-control-plaintext"
                    defaultValue={initialData.createdAt.slice(0, 10)}
                  />
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
          )}
        </div>
      </div>
    </div>
  );
}
