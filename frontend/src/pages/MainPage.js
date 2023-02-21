import React, {useState} from "react";
import './MainPage.css'
import { Route } from "react-router-dom";
import TasksListPage from './TasksListPage.js'
import TaskPage from './TaskPage.js'
import "../components/styles/BurgerMenu.css"
import ProjectListComponent from "../components/ProjectsListComponent.js";

const MainPage = () => {

    // to change burger classes
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)
    const [mainContainer, setContainerWidth] = useState("main-container full-width dark")

    // toggle burger menu change
    const updateMenu = () => {
        if(!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("menu visible")
            setContainerWidth("main-container shrinked dark")
        }
        else {
            setBurgerClass("burger-bar unclicked")
            setMenuClass("menu hidden")
            setContainerWidth("main-container full-width dark")
        }
        setIsMenuClicked(!isMenuClicked)
    }

    return(
        <div style={{width: '100%', height: '100vh'}}>
            <nav>
                <div id="burger" className="burger-menu" onClick={updateMenu}>
                        <div className={burger_class} ></div>
                        <div className={burger_class} ></div>
                        <div className={burger_class} ></div>
                </div>
            </nav>
            <div className={mainContainer}>

            <div className="main-page">
    
                <Route path="/" exact component={TasksListPage} />
                <Route path="/task/:id" component={TaskPage} />
                <Route path="/project/:name/" component={TasksListPage}/>
            </div>
            
            </div>
            <div id="menu" className={menu_class}>
                <ProjectListComponent></ProjectListComponent>
            </div>
        </div>
    )
}

export default MainPage