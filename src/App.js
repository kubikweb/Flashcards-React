import React, { Component } from 'react';
import AddNewFlashcard from "./components/AddNewFlashcard";
import Learn from "./components/Learn";
import Search from "./components/Search";
import Home from "./components/Home";
import About from "./components/About"
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter, Link } from "react-router-dom";
const Route = require("react-router-dom").Route;


class App extends Component {
    state = {
        expanded: false,
        selected: "1",
    }


    handleToggle = () => {
        const mobileViewport = window.matchMedia("screen and (max-width: 767px)");
        if(mobileViewport.matches) {
            this.setState({
                expanded: !this.state.expanded,
            })
        }

    }

    handleClick = (e) => {
        const id = e.target.id;
        this.setState({
            selected: id,
        })

        const mobileViewport = window.matchMedia("screen and (max-width: 767px)");
        if(mobileViewport.matches) {
            this.setState({
                expanded: !this.state.expanded,
            })
        }
    }

  render() {
        const {expanded, selected} = this.state;
    return (
        <BrowserRouter>
            <>
                <header>
                    <Navbar onToggle={this.handleToggle} collapseOnSelect expanded={expanded}
                            expand="md" fixed="top" variant="light" bg="light">
                        <Link to="/" id="6" onClick={this.handleClick}><div className="navbar-brand"/></Link>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav id="1" className={selected === "1" ? 'nav-item bgOrange' : 'nav-item'} as={Link} to="/" onClick={this.handleClick}>Home</Nav>
                                <Nav id="2" className={selected === "2" ? 'nav-item bgOrange' : 'nav-item'} as={Link} to="/add_flashcard" onClick={this.handleClick}>Dodaj</Nav>
                                <Nav id="3" className={selected === "3" ? 'nav-item bgOrange' : 'nav-item'} as={Link} to="/search" onClick={this.handleClick}>Szukaj</Nav>
                                <Nav id="4" className={selected === "4" ? 'nav-item bgOrange' : 'nav-item'} as={Link} to="/learn" onClick={this.handleClick}>Ucz się</Nav>
                                <Nav id="5" className={selected === "5" ? 'nav-item bgOrange' : 'nav-item'} as={Link} to="/about" onClick={this.handleClick}>O programie</Nav>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>;
                </header>
                <section>
                    <Route exact path="/" component={Home} />
                    <Route path="/add_flashcard" component={AddNewFlashcard} />
                    <Route path="/search" component={Search} />
                    <Route path="/learn" component={Learn}/>
                    <Route path="/about" component={About} />
                </section>
                <footer>
                    <div>&copy; 2019 by Kamila Kubik</div>
                </footer>
            </>
        </BrowserRouter>
    );
  }
}

export default App;
