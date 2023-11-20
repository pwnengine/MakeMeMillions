import dashboard from '../assets/dashboard.png'
import dashboard_selected from '../assets/dashboard_selected.png'
import sales from '../assets/sales.png'
import sales_selected from '../assets/sales_selected.png'

import {useState} from 'react'

const Nav = () => {

  const [selected, set_selected] = useState<number>(0);

  return (
    <nav className="nav-container">
      <ul className="nav-list">

        <li onClick={() => set_selected(0)} className="nav-list-item">
        <img width={30} height={30} src={selected === 0 ? dashboard_selected : dashboard} />
        </li>

        <li onClick={() => set_selected(1)} className="nav-list-item">
        <img width={30} height={30} src={selected === 1 ? sales_selected : sales} />
        </li>

      </ul>
    </nav>
  )
}

export default Nav