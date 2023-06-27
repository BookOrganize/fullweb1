import './App.css';
import {Routes, Route } from 'react-router-dom'
import BookList from './components/BookList';
import Borrow from './components/Borrow';
import { AuthContextProvider } from './components/context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Pills from './components/Pills'

export default function App() {
  return (
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Pills />} />
          <Route path='/books' element={<ProtectedRoute> <BookList /> </ProtectedRoute>} />
          <Route path='/borrow' element={<ProtectedRoute> <Borrow /> </ProtectedRoute>} />
        </Routes>
      </AuthContextProvider>
  );
}
