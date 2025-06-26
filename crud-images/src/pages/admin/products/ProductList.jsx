import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  function getProducts() {
    fetch("http://localhost:3004/products?_sort=id&_order=desc")
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
    fetch("http://localhost:3004/products/" + id, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        getProducts();
      })
      .catch((error) => {
        alert("Impossible de supprimer le produit !");
      });
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
            Create Product
          </Link>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={getProducts}
          >
            Refresh
          </button>
          {/* <Link
            style={{ float: "right" }}
            className="btn btn-danger ms-1"
            to="/login"
            role="button"
          >
            Logout
          </Link> */}
        </div>
        <div className="col"></div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Image</th>
              <th>Created At</th>
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
                    <img
                      src={
                        "http://localhost:3004/images/" + product.imageFilename
                      }
                      width="100"
                      alt="..."
                    />
                  </td>
                  <td>{product.createdAt.slice(0, 10)}</td>
                  {/* <td>{product.createdAt}</td> */}

                  <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                    <Link
                      className="btn btn-primary btn-sm me-1"
                      to={"/products/edit/" + product.id}
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteProduct(product.id)}
                    >
                      {" "}
                      Delete
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
