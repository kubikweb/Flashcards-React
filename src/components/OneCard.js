import React, { Component } from 'react';
import {db} from "../firebase/firebase";
import Button from 'react-bootstrap/Button';
import "../css/Search.css";
import "../css/OneCard.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalWindow from "./ModalWindow";
library.add(faWindowClose, faTrashAlt, faEdit, faSave);




class OneCard extends Component {

    state = {
        card: this.props.card,
        showButton: "Zobacz tłumaczenie",
        active: false,
        closeOne: false,
        edit: false,
        editButton: <FontAwesomeIcon icon="edit"/>,
        newPlWord: this.props.card.pl,
        newForWord: this.props.card.translate,
        newInUse: this.props.card.inUse,
        newInUseTranslate: this.props.card.inUseTranslate,
        show: false



    }

    handleShowModal = () => {
        this.setState({ show: true });
    }

    handleCloseModal =() => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({
            active: !this.state.active,
            showButton: !this.state.active ? "Ukryj tłumaczenie" : "Zobacz tłumaczenie",

        })
    }

    handleClose = () => {
        this.setState({
            closeOne: !this.props.closeOne,
        })

    };

    handleDelete = (e) => {
        const {card} = this.state;
        this.setState({
            closeOne: !this.props.closeOne,
            show: false
        });

        db.collection(card.language).doc(card.id).delete()
            .then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

    handleEdit = (e) => {
        const {card, newPlWord, newForWord, newInUse, newInUseTranslate} = this.state;
        this.setState({
            edit: !this.state.edit,
            editButton: !this.state.edit ? <FontAwesomeIcon icon="save"/> : <FontAwesomeIcon icon="edit"/>,
        });
        db.collection(card.language).doc(card.id).update({
            pl: newPlWord,
            translate: newForWord,
            inUse: newInUse,
            inUseTranslate: newInUseTranslate,
        })
            .then(function() {
                console.log("Document successfully updated!");
            }).catch(function(error) {
            console.error("Error removing document: ", error);
        });



    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        })

    }
    render () {
        const {icons} = this.props;
        const {showButton, active, closeOne, edit, editButton, newPlWord, card,
            newForWord, newInUse, newInUseTranslate, show} = this.state;
        return (
            <>
                {closeOne ? null : <div className="form" id={card.id} style={{border: "1px solid black"}}>
                    <div className="navCard">
                        <p>{card.category}</p>
                        {icons ? <div className="icons">
                            <button className="editBtn" onClick={this.handleEdit}>{editButton}</button>
                            <Button className="deleteBtn" onClick={this.handleShowModal}><FontAwesomeIcon icon="trash-alt"/></Button>
                            <button  className="closeBtn"  onClick={this.handleClose}><FontAwesomeIcon icon="window-close"/></button>
                        </div> : null}
                    </div>
                    {edit ? <p>Słowo: <input
                        name="newPlWord"
                        value={newPlWord}
                        type="text"
                        onChange={this.handleChange}/></p>
                        : <p>Słowo: <span className="plWord">{newPlWord}</span></p>}
                    <p>Język: <span>{card.language}</span></p>
                    <button className="button showTrans" onClick={this.handleShow}>{showButton}</button>
                    {active && <div>
                        {edit ? <p>Tłumaczenie: <input
                                name="newForWord"
                                type="text"
                                value={newForWord}
                                onChange={this.handleChange}/>
                            </p>
                            : <p>Tłumaczenie: <span className="forWord">{newForWord}</span></p>}
                        {edit ? <p>Przykładowe zdanie: <input
                                name="newInUse"
                                type="text"
                                value={newInUse}
                                onChange={this.handleChange}/>
                            </p>
                            : <p>Przykładowe zdanie: <span>{newInUse}</span></p>}
                        {edit ? <p>Przykładowe zdanie po polsku: <input
                                name="newInUseTranslate"
                                type="text"
                                value={newInUseTranslate}
                                onChange={this.handleChange}/>
                            </p>
                            :<p>Przykładowe zdanie po polsku: <span>{newInUseTranslate}</span></p>}
                    </div>}
                </div>}
                <ModalWindow show={show}
                             close={this.handleCloseModal}
                             title="Usuwanie fiszki"
                             body="Czy na pewno chesz usunąć fiszkę?"
                             txtBlueBtn="Anuluj"
                             txtRedBtn="Usuń"
                             cancel={this.handleDelete}/>

            </>
        )
    }
}


export default OneCard;