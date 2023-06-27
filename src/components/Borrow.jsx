import React from 'react';
import '../App';
import { useAppContext } from './context/appContext';
import Navbar from './Navbar';
import '../components/Favorites.css'

const Borrow = () => {
  const { favorites, removeFromFavorites } = useAppContext();



  return (
    <div>
      <Navbar />
      <div className="favorites">
        {favorites.length > 0 ? (
          favorites.map((book) => (
            <div key={book.id} className="card" style={{ width: '22rem' }}>
              <div className="images">
                <img src={book.image_url} className="card-img-top" alt={book.title} />
              </div>
              <div className="card-body">
              <div className="titlestyles">
              <h3 className="card-title booktitle">Title: {book.title}</h3>
              </div>
              <div className="genrestyles">
              <h5 className="card-title bookgenre">Genre: {book.genres.split(", ")[0]}</h5>
              </div>
              <h5 className="card-title bookauthor">Author: {book.authors}</h5>
                <div className="buttons">
                  <button
                    href="#"
                    className="btn btn-primary"
                    onClick={() => removeFromFavorites(book.id)}
                  >
                    Return Book
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="msg">
            <h1>You don't have any Borrowed books</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Borrow;
