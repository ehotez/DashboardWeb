import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
  
import MainPage from "./pages/MainPage";
import About from "./pages/About";
import LoginPage from "./pages/LoginPage";
  
//В данной функции/файле у нас будут только ссылки на страницы и рендеры все, остальное делаем в специально отведенных папках
function App() {
  return (
    //ДАННАЯ ВЕЩЬ ПОЧТИ РАБОТАЕТ НО НЕ РАБОТАЕТ, ТРЕБУЕТСЯ РАЗБИРАТЕЛЬСТВО
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Routes>
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          {/* <Route exact path="/" element={<LoginPage/>} />  Раскомментить для тестов*/}
            
          {/* This route is for about component 
          with exact path "/about", in component 
          props we passes the imported component*/}
          <Route path="/about" element={<About/>} />
            
          {/* This route is for contactus component
          with exact path "/contactus", in 
          component props we passes the imported component*/}
          <Route path="/app" element={<MainPage/>} />
            
          {/* If any route mismatches the upper 
          route endpoints then, redirect triggers 
          and redirects app to home component with to="/" */}
        </Routes>
        {/* <Navigate to="/" />  Раскомментить для тестов*/} 
      </Router>

      {/* Пока что тут пишем страницу вручную че хочется посмотреть */}
      <LoginPage/>
    </>
  );
}
  
export default App;