import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/NewDish.css";
import { StyledButtonDish } from "./ButtonSaveDish";
import { faUpload, faLessThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import axios from "axios";
import categoriesData from "../pages/AdminHome/categories.json";

const AddDishForm = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const formatPrice = (value) => {
    if (!value) return "";
    const cleanValue = value.replace(/[^\d]/g, "");

    const formattedValue = Number(cleanValue / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return formattedValue;
  };

  const handlePriceChange = (event) => {
    const inputValue = event.target.value;
    const formattedPrice = formatPrice(inputValue);
    setPrice(formattedPrice);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (
      !name ||
      !category ||
      !ingredients.length ||
      !price ||
      !description ||
      !image
    ) {
      setAlertMessage("Por favor, preencha todos os campos!");
      return;
    }

    setAlertMessage("");
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("name", name);
      formData.append("category", category);
      formData.append("ingredients", JSON.stringify(ingredients));
      formData.append("price", price);
      formData.append("description", description);

      const response = await axios.post(
        "http://localhost:3000/addDish",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setAlertMessage("Prato cadastrado com sucesso!");
        setImage(null);
        setName("");
        setCategory("");
        setIngredients([]);
        setPrice("");
        setDescription("");
      } else {
        console.error("Erro ao adicionar o prato");
      }
    } catch (error) {
      console.error("Erro ao adicionar o prato:", error);
    }
  };

  return (
    <div className="container">
      <div className="row mb-3 voltar">
        <Link to="/">
          {" "}
          <FontAwesomeIcon icon={faLessThan} /> Voltar
        </Link>
      </div>

      <h2>Adicionar Prato</h2>

      <form className="formNewDish" onSubmit={handleSave}>
        <div className="row">
          <div className="col-12 col-md-4 mt-3">
            <label htmlFor="file-upload" className="form-label">
              Imagem do Prato:
            </label>
            <label
              htmlFor="file-upload"
              className="custom-file-upload search-input"
            >
              <input
                id="file-upload"
                type="file"
                className="form-control"
                onChange={handleImageUpload}
              />
              <span className="upload">
                <FontAwesomeIcon icon={faUpload} /> Selecionar Imagem
              </span>
            </label>
          </div>
          <div className="col-12 col-md-4 mt-3">
            <label htmlFor="name" className="form-label">
              Nome do Prato:
            </label>
            <input
              id="name"
              type="text"
              className="form-control search-input"
              placeholder="Ex: Salada Ceaser"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-4 mt-3">
            <label htmlFor="category" className="form-label">
              Categoria:
            </label>
            <select
              id="category"
              className="form-select select-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categoriesData.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-8 mt-3">
            <label htmlFor="ingredients" className="form-label">
              Ingredientes:
            </label>
            <ReactTagInput
              placeholder="Adicionar +"
              tags={[...ingredients]}
              onChange={(newTags) => setIngredients(newTags)}
            />
          </div>

          <div className="col-12 col-md-4 mt-3">
            <label htmlFor="price" className="form-label">
              Preço:
            </label>
            <input
              id="priceDish"
              type="text"
              className="form-control search-input"
              placeholder="R$ 00,00"
              value={price}
              onChange={handlePriceChange}
            />
          </div>
          <div className="col-12 mt-3">
            <label htmlFor="description" className="form-label">
              Descrição:
            </label>
            <textarea
              className="form-control search-input"
              placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="col-12 text-end mt-3">
            <StyledButtonDish type="submit" className="btn btn-primary">
              Salvar Alterações
            </StyledButtonDish>
          </div>
          {alertMessage && (
            <div
              className={`alert ${
                alertMessage === "Por favor, preencha todos os campos!"
                  ? "alert-danger"
                  : "alert-success"
              }`}
              role="alert"
            >
              <p id="alert">{alertMessage}</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddDishForm;
