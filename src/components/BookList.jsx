import React, { useState, useEffect } from "react";
import { API_URL } from "../API";
import axios from "axios";
import { useAppContext } from "./context/appContext";
import { TextField } from "@mui/material";
import Navbar from "./Navbar";
import "../components/BookList.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const { favorites, addToFavorites } = useAppContext();
  const [newBook, setNewBook] = useState({
    title: "",
    authors: "",
    imageUrl: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        console.log(res.data);
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddBook = () => {
    axios
      .post(API_URL, newBook)
      .then((res) => {
        console.log(res.data);
        setBooks([...books, res.data]);
        setNewBook({
          title: "",
          authors: "",
          imageUrl: "",
        });
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter books based on search term
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="booklistbox">
      <div style={{ zIndex: "-10" }}>
        <Navbar />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          zIndex: "0",
        }}
      >
        <div className="search-bar">
          <h3
            style={{ width: "100%", display: "flex", justifyContent: "center"}}
          >
            Search a Book
          </h3>
          <TextField
            type="text"
            label="Search Book..."
            value={searchTerm}
            onChange={handleSearch}
            style={{ backgroundColor: "white", width: "300px" }}
          />
        </div>
      </div>
      <div className="book-list">
        {filteredBooks.map((book) => (
          <div key={book.id} className="card" style={{ width: "22rem"}}>
            <div className="images">
              <img
                src={book.image_url}
                className="card-img-top"
                alt={book.title}
              />
            </div>
            <div className="card-body">
              <div className="titlestyles">
              <h4 className="card-title booktitle">Title: {book.title}</h4>
              </div>
              <div className="genrestyles">
              <h5 className="card-title bookgenre">Genre: {book.genres.split(", ")[0]}</h5>
              </div>
              <h5 className="card-title bookauthor">Author: {book.authors}</h5>
              <div className="buttons">
                <button
                  href="#"
                  className="btn btn-primary"
                  onClick={() => addToFavorites(book)}
                >
                  Borrow Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="newbook">
        <div className="add-book-form">
          <h2>Add a New Book</h2>
          <TextField
            type="text"
            label="Title"
            name="title"
            placeholder="Title"
            value={newBook.title}
            onChange={handleInputChange}
            variant="filled"
            style={{ marginTop: "20px" }}
            InputLabelProps={{
              style: { color: "black" },
            }}
            inputProps={{
              style: { color: "black", outline: "1px solid black" },
            }}
            InputProps={{
              style: { borderBottomColor: "black" },
            }}
          />
          <TextField
            type="text"
            label="authors"
            name="authors"
            placeholder="Authors"
            value={newBook.authors}
            onChange={handleInputChange}
            variant="filled"
            style={{ marginTop: "20px" }}
            InputLabelProps={{
              style: { color: "black" },
            }}
            inputProps={{
              style: { color: "black", outline: "1px solid black" },
            }}
            InputProps={{
              style: { borderBottomColor: "black" },
            }}
          />
          <TextField
            type="text"
            label="imageUrl"
            name="imageUrl"
            placeholder="Image URL"
            value={newBook.imageUrl}
            onChange={handleInputChange}
            variant="filled"
            style={{ marginTop: "20px" }}
            InputLabelProps={{
              style: { color: "black" },
            }}
            inputProps={{
              style: { color: "black", outline: "1px solid black" },
            }}
            InputProps={{
              style: { borderBottomColor: "black" },
            }}
          />

          <button
            className="btn btn-primary"
            onClick={handleAddBook}
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookList;
