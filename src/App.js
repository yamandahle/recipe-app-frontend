import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/home";
import RecipePage from "./pages/recipePage";
import Navbar from "./components/navbar";
import AddRecipe from "./pages/addRecipe";
import Profile from "./pages/Profile";
import Favorites from './pages/Favorite'




function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/" element={<Home />} />
        <Route path="/recipes/:id" element={<RecipePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
