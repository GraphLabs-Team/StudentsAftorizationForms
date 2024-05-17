import React from 'react';
import "./Header.css"

function Header (){
    return (
        <header>
            <a href={"/personal_page"} className={"head"}>
                Личный кабинет
            </a>
        </header>
    )
}

export default Header;