import React, { Component } from 'react';
import OneCard from "./OneCard"
import Carousel from 'react-bootstrap/Carousel';
import "../css/Flashcard.css"


class Flashcard extends Component {
    state = {
        iconsFalse: false,
        iconsTrue: true,
    }



    render (){
        const {obj, arr, learn} = this.props;
        const {iconsFalse, iconsTrue} = this.state;
        const cardsFromArr = arr.map(card =>  <OneCard  key={card.id} card={card} icons={iconsTrue}/>);
        const slider = arr.map(card =>  <Carousel.Item key={card.id}><OneCard icons={iconsFalse} card={card}/></Carousel.Item>);
        const card =  <OneCard  key={obj.id} card={obj} icons={iconsTrue}/>;
        const learnArr = arr.length <= 1 ? cardsFromArr : <Carousel>{slider}</Carousel>;
        const searchArr = arr.length === 0 ? card : cardsFromArr;
        return <div>
            {learn ? learnArr : searchArr}
        </div>
    }
}

export default Flashcard;

