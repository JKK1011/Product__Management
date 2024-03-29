import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productService from "../service/product.service";

const EditProduct = () => {
  const [product, setProduct] = useState({
    id: "",
    productName: "",
    description: "",
    price: "",
    status: "",
    category: "", 
    brandName: "", 
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const [msg, setMsg] = useState("");

  useEffect(() => {
    productService
      .getProductById(id)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const ProductUpdate = (e) => {
    e.preventDefault();

    productService
      .editProduct(product)
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header fs-3 text-center">Edit Product</div>
              {msg && <p className="fs-4 text-center text-success">{msg}</p>}

              <div className="card-body">
                <form onSubmit={ProductUpdate}>
                  <div className="mb-3">
                    <label>Enter Brand Name</label>
                    <input
                      type="text"
                      name="brandName"
                      className="form-control"
                      onChange={handleChange}
                      value={product.brandName}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Enter Product Name</label>
                    <input
                      type="text"
                      name="productName"
                      className="form-control"
                      onChange={handleChange}
                      value={product.productName}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Enter Description</label>
                    <input
                      type="text"
                      name="description"
                      className="form-control"
                      onChange={handleChange}
                      value={product.description}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Enter Price</label>
                    <input
                      type="text"
                      name="price"
                      className="form-control"
                      onChange={handleChange}
                      value={product.price}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Enter Status</label>
                    <input
                      type="text"
                      name="status"
                      className="form-control"
                      onChange={handleChange}
                      value={product.status}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Select Category</label>
                    <select
                      name="category"
                      className="form-control"
                      onChange={handleChange}
                      value={product.category}
                    >
                        <option value="">Select category</option>
                      <option value="Smart Phone">Smart Phone</option>
                      <option value="Audio">Audio</option>
                      <option value="Home Appliances">Home Appliances</option>
                      <option value="Stationary">Stationary</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Watch">Watch</option>
                      <option value="Laptop">Laptop</option>
                    </select>
                  </div>

                  <button className="btn btn-primary col-md-12">Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
