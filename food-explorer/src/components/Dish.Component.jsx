import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../Styles/NewDish.css";
import { StyledButtonDish } from "./ButtonSaveDish";
import {
  faUpload,
  faLessThan,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import axios from "axios";
import categoriesData from "../pages/AdminHome/categories.json";

const DishForm = ({ isEditing }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (isEditing) {
      const fetchDish = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/getDishById/${id}`
          );
          const dishData = response.data;
          var ingredientes = dishData.ingredients
            .replace(/[\[\]"]/g, "")
            .split(",");
  
          const imageUrl = `http://localhost:3000/uploads/${dishData.image}`;
  
          const formattedPrice = Number(dishData.price).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          });
  
          setImage(imageUrl);
          setName(dishData.name);
          setCategory(dishData.category);
          setIngredients(ingredientes);
          setPrice(formattedPrice);
          setDescription(dishData.description);
        } catch (error) {
          console.error("Error fetching dish data:", error);
        }
      };
  
      fetchDish();
    }
  }, [id, isEditing]);
  

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

    if (!name || !category || !ingredients.length || !price || !description) {
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

      let response;
      
      if (isEditing) {
        response = await axios.put(
          `http://localhost:3000/editDish/${id}`,
          {
            name,
            category,
            ingredients,
            price,
            description,
            image
          }
        );
      } else {
        response = await axios.post("http://localhost:3000/addDish", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (response.status === 200) {
        setAlertMessage(
          isEditing
            ? "Prato atualizado com sucesso!"
            : "Prato cadastrado com sucesso!"
        );
        if (!isEditing) {
          setImage(null);
          setName("");
          setCategory("");
          setIngredients([]);
          setPrice("");
          setDescription("");
        }
      } else {
        console.error("Erro ao salvar o prato");
      }
    } catch (error) {
      console.error("Erro ao salvar o prato:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir este prato?")) {
      try {
        const response = await axios.delete(`http://localhost:3000/deleteDish/${id}`);
        if (response.status === 200) {
          setAlertMessage("Prato excluído com sucesso!");
          navigate("/home/admin");
        } else {
          console.error("Erro ao excluir o prato");
        }
      } catch (error) {
        console.error("Erro ao excluir o prato:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="row mb-3 voltar">
        <Link to="/home/admin">
          {" "}
          <FontAwesomeIcon icon={faLessThan} /> Voltar
        </Link>
      </div>

      <h2>{isEditing ? "Editar Prato" : "Adicionar Prato"}</h2>

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
          <div className="col-12 mt-3">
            {isEditing && (
              <StyledButtonDish
                type="button"
                className="btn btn-delete"
                id="deleteButton"
                onClick={handleDelete}
              >
                Excluir Prato
              </StyledButtonDish>
            )}
            <StyledButtonDish type="submit" className="btn btn-primary me-2">
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

export default DishForm;
