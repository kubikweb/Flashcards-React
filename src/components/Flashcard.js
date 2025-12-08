import React, { Component } from 'react';
import OneCard from "./OneCard"
import Carousel from 'react-bootstrap/Carousel';
import "../css/Flashcard.css"

class Flashcard extends Component {

    state = {
        iconsFalse: false,
        iconsTrue: true,
        activeIndex: 0,
        timeLeft: 10,
        isSliding: false,
    }

    componentDidMount() {
        if (this.props.learn && this.props.arr.length > 1) {
            this.setState({ timeLeft: 10 }, () => {
                this.startTimer();
            });
        }
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    startTimer = () => {
        this.stopTimer();
        this.timerInterval = setInterval(() => {
            this.setState(prevState => {
                if (prevState.isSliding) return null;

                if (prevState.timeLeft <= 0) {
                    const nextIndex = (prevState.activeIndex + 1) % this.props.arr.length;
                    return {
                        activeIndex: nextIndex,
                    };
                }

                return { timeLeft: prevState.timeLeft - 1 };
            });
        }, 1000);
    }

    stopTimer = () => {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    handleSelect = (selectedIndex) => {
        this.setState({ activeIndex: selectedIndex });
    }

    handleSlide = () => {
        // animacja się zaczyna -> zatrzymaj timer
        this.setState({ isSliding: true });
        this.stopTimer();
    }

    handleSlid = () => {
        this.setState({
            isSliding: false,
            timeLeft: 10
        });

        if (this.props.learn && this.props.arr.length > 1) {
            setTimeout(() => {
                if (!this.state.isSliding) {
                    this.startTimer();
                }
            }, 100);
        }
    }

    render () {
        const { obj, arr, learn } = this.props;
        const { iconsFalse, iconsTrue, activeIndex, timeLeft } = this.state;

        const cardsFromArr = arr.map((card, index) =>
            <OneCard  
                key={card.id} 
                card={card} 
                icons={learn ? iconsFalse : iconsTrue} 
                number={index+1} 
                lenghtArr={arr.length} 
            />
        );

        const slider = arr.map((card, index) =>
            <Carousel.Item key={card.id}>
                <OneCard
                    learn={learn}
                    icons={iconsFalse}
                    card={card}
                    number={index+1}
                    lenghtArr={arr.length}
                    timeLeft={timeLeft}
                />
            </Carousel.Item>
        );

        const card = <OneCard key={obj.id} card={obj} icons={iconsTrue}/>;
        const learnArr = arr.length <= 1 
            ? cardsFromArr 
            : (
                <Carousel 
                    activeIndex={activeIndex}
                    onSelect={this.handleSelect}
                    onSlide={this.handleSlide}
                    onSlid={this.handleSlid}
                    interval={null}
                    slide={true}
                    prevLabel="" 
                    nextLabel=""
                    controls={true}
                    wrap={true}
                >
                    {slider}
                </Carousel>
            );

        const searchArr = arr.length === 0 ? card : cardsFromArr;
        return <div>
            {learn ? learnArr : searchArr}
        </div>
    }
}

export default Flashcard;

