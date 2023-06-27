import React from "react";
import { db } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "../css/Dashboard.css";
import { signOut } from "firebase/auth";
export default function Dashboard() {
  const [bookList, setBookList] = useState([]);

  const [newBookTitle, setNewBookTitle] = useState("");
  const [newPublishDate, setNewPublishDate] = useState(0);
  const [newAuthor, setNewAuthor] = useState("");

  const booksCollectionRef = collection(db, "books");

  const getBookList = async () => {
    try {
      const data = await getDocs(booksCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBookList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBookList();
  }, []);

  const onAddBook = async () => {
    try {
      await addDoc(booksCollectionRef, {
        Title: newBookTitle,
        Published: newPublishDate,
        Author: newAuthor,
      });
      getBookList();
    } catch (err) {
      console.error(err);
    }
  };
  const deleteBook = async (id) => {
    const bookDoc = doc(db, "books", id);
    await deleteDoc(bookDoc);
  };
  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <div>
        <TextField
          placeholder="Book name"
          onChange={(e) => setNewBookTitle(e.target.value)}
        />

        <TextField
          placeholder="Year Published"
          type="number"
          onChange={(e) => setNewPublishDate(Number(e.target.value))}
        />

        <TextField
          placeholder="Author"
          onChange={(e) => setNewAuthor(e.target.value)}
        />
        <Button variant="contained" onClick={onAddBook}>
          Add Book
        </Button>
      </div>
      <div className="boxcontainer">
        <div className="boxes">
          {bookList.map((books) => (
            <div className="box">
              <div className="bookmark">
                <i class="fa-solid fa-bookmark"></i>
              </div>
              <div className="img">
                <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80" />
              </div>
              <div className="stars mt-3 mb-3">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h1>{books.Title}</h1>
              <p>Year Published: {books.Published}</p>
              <p>Author: {books.Author}</p>

              <div className="">
                <Button
                  variant="contained"
                  onClick={() => deleteBook(books.id)}
                >
                  Delete Book
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
