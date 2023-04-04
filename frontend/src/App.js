import "./css/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
  
import MainPage from "./pages/MainPage";
import About from "./pages/About";
import LoginPage from "./pages/LoginPage";
import SourcePage from "./pages/SourcePage";
  
//В данной функции/файле у нас будут только ссылки на страницы и рендеры все, остальное делаем в специально отведенных папках
function App() {
  return (
    //ДАННАЯ ВЕЩЬ ТЕПЕРЬ РАБОТАЕТ (чтобы попасть на нужную вам страницу добавляете к ссылке /path)
    //Например localhost:3000/main чтобы попасть на MainPage
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/main" element={<MainPage/>} />
          <Route path="/sources" element={<SourcePage/>} />
        </Routes>
        {/* <Navigate to="/" />  */} 
      </Router>
    </>
  );
}

export default App;