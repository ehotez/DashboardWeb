import "./css/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SourcePage from "./pages/SourcePage";
import Sidebar from "./components/Sidebar";

//В данной функции/файле у нас будут только ссылки на страницы и рендеры все, остальное делаем в специально отведенных папках
function App() {
  return (
    //ДАННАЯ ВЕЩЬ ТЕПЕРЬ РАБОТАЕТ (чтобы попасть на нужную вам страницу добавляете к ссылке /path)
    //Например localhost:3000/main чтобы попасть на MainPage
    <Router>
      <Sidebar />
      <Routes>
        <Route exact path="/" element={
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
        } />
        <Route path="/sources" element={
          <PrivateRoute>
            <SourcePage />
          </PrivateRoute>
        } />
        {/* <Route exact path="/sources" element={<SourcePage />} /> */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;