import './App.css';
import Menu from './Menu/Menu';
import React, {useState} from 'react';

export default function App() {
  const [menuActive, setMenuActive] = useState(false)
  const items = [{value: "Главная", href: "/main", icon: "anchor"},
  {value: "Сетка", href: "/grid", icon: "anchor"},
  {value: "Источники", href: "/source", icon: "anchor"}]

  return (
    <div className='app'>
      <Menu active={menuActive} setActive={setMenuActive} header={"Menu"} items={items}/>
      <nav>
        <div className='burger-btn' onClick={() => setMenuActive(!menuActive)}>
          <span/>
        </div>        
      </nav>
      <main>
        Stable Version
      </main>

    </div>
  );
}
