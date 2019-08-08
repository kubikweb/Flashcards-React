import React, { Component } from 'react';
import Languages from "./Languages";
import Flashcard from "./Flashcard";
import "../css/Search.css";
import "../css/AddNewFlashcard.css";
import {db} from "../firebase/firebase";
import { Link } from "react-router-dom";

class Search extends Component {
    state = {
        word: "",
        find: false,
        languages: "",
        isEmptyOne: null,
        isEmptyAll: null,
        obj: "",
        objId: "",
        arr: [],
        arrId: [],
        closeAll: false,
        info: null,
        showSpan: false,
        loading: false

    };


    handleSearch = (e)=>{
        this.setState({
            word: e.target.value,
        })
    };

    handleSubmit = (e) => {

        const {word, languages} = this.state;
        const emptyAll = word.length === 0 && languages.length === 0;
        const emptyLang =  word.length !== 0 && languages.length === 0;
        e.preventDefault();
        if (emptyAll||emptyLang){
            this.setState({
                info: true,
                isEmptyOne: null,
                isEmptyAll: null,


            })
        } else {
            this.setState ({
                loading: true
            })
            if (word.length === 0){
                db.collection(languages)
                    .get()
                    .then(querySnapshot => {
                        if (querySnapshot.empty === true) {
                            this.setState({
                                isEmptyAll: true,
                                isEmptyOne: null,
                                find: false,
                                // arr: [],
                                // word: "",
                                info: null,
                                loading: false,
                            })
                        } else {
                            querySnapshot.forEach(doc => {
                                let data = doc.data();
                                data.id = doc.id;
                                this.setState({
                                    find: true,
                                    arr: this.state.arr.concat(data),
                                    isEmptyAll: null,
                                    isEmptyOne: null,
                                    // word: "",
                                    info: null,
                                    loading: false
                                })

                            });
                        }
                    });
            } else {
                if (languages === ""){
                } else {
                    db.collection(languages).where("plLower", "==", word.toLowerCase())
                        .get()
                        .then(querySnapshot => {
                            if (querySnapshot.empty === true){
                                db.collection(languages).where("transLower", "==", word.toLowerCase())
                                    .get()
                                    .then(querySnapshot => {
                                        if (querySnapshot.empty === true) {
                                            this.setState({
                                                isEmptyOne: true,
                                                find: false,
                                                isEmptyAll: null,
                                                // arr: [],
                                                // word: "",
                                                info: null,
                                                loading: false
                                            })
                                        } else {
                                            querySnapshot.forEach(doc => {
                                                let data = doc.data();
                                                data.id = doc.id;
                                                this.setState({
                                                    find: true,
                                                    obj: data,
                                                    isEmptyOne: null,
                                                    isEmptyAll: null,
                                                    // arr: [],
                                                    // word: "",
                                                    info: null,
                                                    loading: false
                                                })
                                            });
                                        }
                                    })
                            } else {
                                querySnapshot.forEach(doc => {
                                    let data = doc.data();
                                    data.id = doc.id;
                                    this.setState({
                                        find: true,
                                        obj: data,
                                        isEmptyOne: null,
                                        isEmptyAll: null,
                                        // arr: [],
                                        // word: "",
                                        info: null,
                                        loading: false
                                    })
                                });
                            }
                        })
                        .catch(function(error) {
                            console.log("Error getting documents: ", error);
                        });
                }

            }
        }



        this.setState({
            closeAll: false,
            languages: "",
            word: "",
            arr: [],
            find: false,

        })


    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        })

    }


    render(){
        const {word, find, languages, isEmptyOne, isEmptyAll, obj, arr,  info, showSpan, loading} = this.state;
        const {learn} = this.props;
        const flashcard = <Flashcard   obj={obj}  arr={arr}  learn={learn}/>;
        if (loading) {
            return <div className="loading">
                <div className="loadingIcon"/>
            </div>
        }
        return (
            <div className="searchArea">
                <form onSubmit={this.handleSubmit} className="form">
                    {!learn && <div>
                        <label htmlFor="">Wpisz szukane słowo</label>
                        <input type="text" value={word} onChange={this.handleSearch}/>
                    </div>
                    }
                    <Languages value={languages} lang={languages} change={this.handleChange} showSpan={showSpan} />
                    <button className="button">Szukaj</button>
                    {info && <div className="error">Pole "Wybierz język" nie może być puste</div>}
                </form>
                {isEmptyAll ? <div className="empty">
                    <p>Baza z wybranym przez Ciebie językiem jest pusta.</p>
                    <button className="button"><Link to="/add_flashcard">Dodaj fiszkę</Link></button>
                </div> : null}
                {isEmptyOne ? <div className="empty">
                    <p>Nie ma takiego słowa w wybranym przez Ciebie języku.</p>
                    <Link to="/add_flashcard"><button className="button">Dodaj fiszkę</button></Link>
                </div> : null}
                {find && flashcard }

            </div>
        )
    }
}

export default  Search;