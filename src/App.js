import logo from "./logo.svg";
import "./App.css";
import NavBar from "./Components/NavBar";
import Banner from "./Components/Banner";
import List from "./Components/List";
import Favourites from "./Components/Favourites";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={
            <div>
              <Banner />
              <List />
            </div>
          }
        ></Route>
        <Route path="/fav" element={<Favourites />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
