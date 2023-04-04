import '../css/App.css';
import Menu from '../components/Menu';
import React, {useState} from 'react';

export default function AppBurger() {
  const [menuActive, setMenuActive] = useState(false)
  const items = [{id:0, value: "Главная", href: "/main", icon: "anchor"},
  {id:1, value: "Сетка", href: "/grid", icon: "anchor"},
  {id:2, value: "Источники", href: "/source", icon: "anchor"}]

  return (
    <div className='app-burger'>
      <Menu active={menuActive} setActive={setMenuActive} header={"Menu"} items={items}/>
      <nav>
        <div className='burger-btn' onMouseEnter={() => setMenuActive(!menuActive)}>
          <span/>
        </div>      
      </nav>
      <main>
        Stable Version
      </main>
    </div>
  );
}
