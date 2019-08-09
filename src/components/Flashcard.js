import React, { Component } from 'react';
import OneCard from "./OneCard"
import Carousel from 'react-bootstrap/Carousel';
import "../css/Flashcard.css"

const time = 10000;
class Flashcard extends Component {

    state = {
        iconsFalse: false,
        iconsTrue: true,
        interval: time,
        initialValue: time + 1000,


    }

    child = React.createRef();

    resetTimerParent = () => {
        console.log("parent");
        this.child.current.resetTimer();
    }


    render (){
        const {obj, arr, learn} = this.props;
        const {iconsFalse, iconsTrue, interval, initialValue} = this.state;
        const cardsFromArr = arr.map((card, index) =>  <OneCard  key={card.id} card={card} icons={learn ? iconsFalse : iconsTrue} number={index+1} lenghtArr={arr.length} />);
        const slider = arr.map((card, index) =>
            <Carousel.Item key={card.id}>
                <OneCard
                    ref={this.child}
                initialValue={initialValue/1000}
                interval={interval/1000}
                learn={learn}
                icons={iconsFalse}
                card={card}
                number={index+1}
                lenghtArr={arr.length}/>
            </Carousel.Item>);
        const card =  <OneCard  key={obj.id} card={obj} icons={iconsTrue}/>;
        const learnArr = arr.length <= 1 ? cardsFromArr : <Carousel onClick={this.resetTimerParent}  interval={interval}>{slider}</Carousel>;
        const searchArr = arr.length === 0 ? card : cardsFromArr;
        return <div>
            {learn ? learnArr : searchArr}
        </div>
    }
}

export default Flashcard;

