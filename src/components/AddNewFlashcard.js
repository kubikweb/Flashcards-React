import React, { Component } from 'react';
import Categories from "./Categories";
import Languages from "./Languages";
import {db} from "../firebase/firebase";
import "../css/AddNewFlashcard.css";
import ModalWindow from "./ModalWindow";

class AddNewFlashcard extends Component {
    state = {
        plWord: "",
        forWord: "",
        example: "",
        languages: "",
        categories: "",
        exampleTranslate: "",
        showInfo: "",
        wordExist: "",
        showSpan: true,
        showModal: false,

        errors:{
            plWord: false,
            forWord: false,
            example: false,
            languages: false,
            categories: false,
            exampleTranslate: false,
        }
    }

    message = {
        text: "Pole nie może być puste."
    }


    formValidation = () => {
        let plWord = false;
        let forWord = false;
        let example = false;
        let languages = false;
        let categories = false;
        let exampleTranslate = false;
        let correct = false;

        if (this.state.plWord.length > 0){
            plWord = true;
        }

        if (this.state.forWord.length > 0){
            forWord = true
        }
        if (this.state.example.length > 0){
            example = true;
        }
        if (this.state.languages.length > 0){
            languages = true;
        }
        if (this.state.categories.length > 0){
            categories = true;
        }
        if (this.state.exampleTranslate.length > 0){
            exampleTranslate = true;
        }

        if (plWord && forWord && example && languages && categories && exampleTranslate){
            correct = true;
        }

        return ({
            plWord,
            forWord,
            example,
            languages,
            categories,
            exampleTranslate,
            correct
        })


    }

    handleSubmit = (e)=> {
        const {plWord, forWord, languages, categories, example, exampleTranslate} = this.state;
        e.preventDefault();
        const validation = this.formValidation();
        if (validation.correct) {
            db.collection(languages).add({
                "language": languages,
                "pl": plWord,
                "translate": forWord,
                "category": categories,
                "inUse": example,
                "inUseTranslate": exampleTranslate,
            }).then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            }).catch(function (error) {
                console.error("Error adding document: ", error);
            });
            this.setState({
                plWord: "",
                forWord: "",
                example: "",
                languages: "",
                categories: "",
                exampleTranslate: "",
                wordExist: "",
                showInfo: `GRATULACJE! Fiszka została dodana do bazy danych.`,

                errors:{
                    plWord: false,
                    forWord: false,
                    example: false,
                    languages: false,
                    categories: false,
                    exampleTranslate: false,
                }
            });
        } else {
            this.setState({
                wordExist: false,
                errors:{
                    plWord: !validation.plWord,
                    forWord: !validation.forWord,
                    example: !validation.example,
                    languages: !validation.languages,
                    categories: !validation.categories,
                    exampleTranslate: !validation.exampleTranslate,
                }
            });

        }

    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        })

    }

    componentDidUpdate(){
        if(this.state.showInfo !== ""){
            setTimeout(()=> {
                this.setState({
                    showInfo: ""
                })
            }, 2000)
        }
    }

    handleCheck = (e) => {
        const {plWord} = this.state;
        const valueLang = e.target.value;
        if (plWord.length === 0) {
            this.setState({
                wordExist: false,
                errors: {
                    plWord: true,

                }
            })
        }
        if (valueLang.length === 0) {
            this.setState({
                errors: {
                    languages: true,
                }
            })
        }
        if (plWord.length !== 0 && valueLang.length !== 0 ) {
            this.setState({
                wordExist: false,
            })
            db.collection(valueLang).where("pl", "==", plWord)
                .get()
                .then(querySnapshot => {
                    if (querySnapshot.empty !== true){
                        this.setState({
                            wordExist: true,
                            showModal: true,
                            errors: {
                                languages: false,
                                plWord: false
                            }
                        })
                    } else {
                        this.setState({
                            errors: {
                                languages: false,
                                plWord: false
                            }
                        })
                    }
                })
        }



    }

    handleCloseModal =() => {
        this.setState({ showModal: false });
    }

    handleCancel = () => {
        this.setState({
            plWord: "",
            languages: "",
            showModal: false
        })
    }


    render(){
        const {showInfo, plWord, forWord, example, languages, categories,
            exampleTranslate, errors, wordExist, showSpan, showModal} = this.state;
        return (
            <div className="backgroundPage">
                {showInfo ? <span className="showInfo">{showInfo}</span> :
                <form onSubmit={this.handleSubmit} className="form">
                    <ul>
                        <li>
                            <label htmlFor="plWord">Polski</label>
                            <input type="text" id="plWord" name="plWord" value={plWord} onChange={this.handleChange} />
                            <span>Wpisz słowo po polsku</span>
                        </li>
                        {errors.plWord && <span className="error">{this.message.text}</span>}
                        <li>
                            <Languages value={languages} lang={languages} change={this.handleChange} blur={this.handleCheck} showSpan={showSpan}/>
                        </li>
                        {errors.languages && <span className="error">{this.message.text}</span>}
                        {wordExist && <ModalWindow show={showModal}
                                                   close={this.handleCloseModal}
                                                   title="Dodawanie fiszki"
                                                   body="Taka fiszka już istnieje w bazie danych, czy mimo to chcesz ją dodać?"
                                                   txtBlueBtn="Kontynuuj"
                                                   txtRedBtn="Anuluj dodawanie"
                                                   cancel={this.handleCancel}/>}
                        <li>
                            <label htmlFor="forWord">Tłumaczenie</label>
                            <input type="text" id="forWord" name="forWord" value={forWord} onChange={this.handleChange}/>
                            <span>Przetłumacz na język obcy</span>
                        </li>
                        {errors.forWord && <span className="error">{this.message.text}</span>}
                        <li>
                            <label htmlFor="example">Przykładowe zdanie</label>
                            <input type="text" id="example" name="example" value={example} onChange={this.handleChange}/>
                            <span>Wpisz przykładowe zdanie w jęyku obcym</span>
                        </li>
                        {errors.example && <span className="error">{this.message.text}</span>}
                        <li>
                            <label htmlFor="exampleTranslate">Przykładowe zdanie po polsku</label>
                                <input type="text" id="exampleTranslate" name="exampleTranslate" value={exampleTranslate} onChange={this.handleChange}/>
                            <span>Wpisz przykładowe zdanie po polsku</span>
                        </li>
                        {errors.exampleTranslate && <span className="error">{this.message.text}</span>}
                        <li>
                            <Categories cat={categories} change={this.handleChange}/>
                        </li>
                        {errors.categories && <span className="error">{this.message.text}</span>}
                        <li>
                            <input className="button" type="submit" value={"Dodaj do bazy"}/>
                        </li>
                    </ul>
                </form>
                }
            </div>
        )
    }
}

export default  AddNewFlashcard