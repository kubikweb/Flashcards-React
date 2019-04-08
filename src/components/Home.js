import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import "../css/Home.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons';
import { faBookReader } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faRoad} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faGlobeEurope, faBookReader, faThumbsUp, faRoad);


const Home = () => {
        return <Carousel>
                <Carousel.Item>
                    <div className="img img1">
                    <FontAwesomeIcon icon="globe-europe"/>
                    </div>
                    <Carousel.Caption>
                        <h3>Witaj we Flashcards!</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="img img2">
                    <FontAwesomeIcon icon="book-reader"/>
                    </div>
                    <Carousel.Caption>
                        <h3 className="withoutMargin">Szybko i skutecznie naucz się języka obcego!</h3>
                        <p>Dodawaj własne fiszki, szukaj, ucz się!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="img img1">
                        <FontAwesomeIcon icon="road"/>
                    </div>
                    <Carousel.Caption>
                        <h3>Poszerzaj horyzonty!</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            <Carousel.Item>
                <div className="img img2">
                    <FontAwesomeIcon icon="thumbs-up"/>
                </div>
                <Carousel.Caption>
                    <h3>Powodzenia!</h3>
                </Carousel.Caption>
            </Carousel.Item>
            </Carousel>
}

export default Home;