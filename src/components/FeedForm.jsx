import { useState, useRef } from "react";
import { db } from "../db/db.js";
import "../styles/FeedForm.css";

export default function FeedForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");

  const  focusInput = useRef(null);
  const fileInputRef = useRef(null);

  function inFocus(){
    if(focusInput.current){

      focusInput.current.classList.add("div__input-container-focus");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let imageData = null;
    if (file) {
      imageData = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    if (!title || !desc || !file) {
      return alert("llena todos los campos");
    }

    await db.feed.add({
      title,
      desc,
      image: imageData,
      category,
      link,
      createdAt: new Date(),
    });

    setTitle("");
    setDesc("");
    setFile(null);
    setPreview(null);
    setCategory("");
    setLink("");

    if (onAdd) onAdd();
  }

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
      if (fileInputRef.current) {
        fileInputRef.current.files = e.dataTransfer.files; // sincroniza con input
      }
    }
  }

  return (
    <>
      <div className="form__container-max-width">
        <form onSubmit={handleSubmit} className="pin__form">
          <div className="subheader">
            <button type="submit">Guardar</button>
          </div>

          <div className="form__wrapper-pin">
            <div className="pin__image-preview">
              <div
                className="upload__image-box"
                onClick={() => fileInputRef.current.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    style={{
                      maxWidth: "100%",
                      borderRadius: "12px",
                      marginBottom: "10px",
                    }}
                  />
                ) : (
                  <p className="p__desc-throwImage">Haz click o arrastra una imagen aquí</p>
                )}
                <input
                  onFocus={()=>inFocus()}
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className="form__content">
              <div className="div__input-container">
                  <small className="inputs__title-small">Titulo</small>
                <input
                  type="text"
                  value={title}
                  placeholder="titulo"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="div__input-container">
                <small className="inputs__title-small">Descripción</small>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  type="text"
                  placeholder="desc"
                />
              </div>
              <div className="div__input-container">
                <small className="inputs__title-small">Categoria</small>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="una">Una</option>
                  <option value="dos">Dos</option>
                  <option value="tres">Tres</option>
                </select>
              </div>
              <div className="div__input-container">
                <input
                  value={link}
                  type="text"
                  placeholder="link"
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
