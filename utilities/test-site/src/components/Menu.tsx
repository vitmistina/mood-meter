import * as React from "react"

import { Link } from "gatsby"

const menuStyles = {
    display: "flex",
    listStyle: "none",
    padding:0
  }
  const itemStyles = {
    marginRight: "20px"
  }

  const menuItems = [
    {text: "Home", link: "/"},
    {text: "About", link: "/about"},
    {text: "Product 1", link: "/product-1"},
    {text: "Product 2", link: "/product-2"},
    {text: "Contact", link: "/contact"},
  ]

const Menu: React.FC = () => {
    return (
        <ul style={menuStyles}>
            {menuItems.map(item => (
                <li key={item.text} style={itemStyles}>
                  <Link to={item.link}>{item.text}</Link>
                </li>
            ))}
        </ul>
    )
}

export default Menu;