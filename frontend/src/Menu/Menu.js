import React from 'react';
import './Menu.css'

export default function Menu({header, items, active, setActive}){
    return(
        <div className={active ? 'menu active' : 'menu'} onClick={() => setActive(false)}>
            <div className='blur'/>
            <div className='menu__content'>
                <div className='menu__header'>{header}</div>
                <ul>
                {/* У каждого child должен быть key (если map) */}
                    {items.map(item =>
                         <li key={item.id}> 
                            <a href={item.href}>{item.value}</a>
                            <span className='material-icons'>{item.icon}</span>
                        </li>
                        )}
                </ul>

            </div>
        </div>
    )
}