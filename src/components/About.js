import React from 'react';
import "../css/About.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faBookReader } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faPlusSquare, faSearch, faBookReader);

const About = () => {
    return (
    <div className="about">
        <h6><span>Flashcards</span></h6>
            <p>
                Program został stworzony po to, aby ułatwić użytkownikowi naukę języka obcego.
                Posiada 3 podstawowe funkcje:
            </p>
            <ul>
                <li>dodawanie fiszki,</li>
                <li>szukanie wcześniej zapisanych fiszek,</li>
                <li>uczenie się.</li>
            </ul>
        <h6><span className="orangeText">Dodaj</span><FontAwesomeIcon icon="plus-square"/></h6>
        <p>
            Dodając fiszkę do bazy danych należy podać: nazwę po polsku, wybrać język, w tym momencie system
            sprawdza czy fiszka z tą nazwą znajduje się już w bazie danych, jeżeli tak to pojawi się stosowana
            informacja oraz przycisk szukaj, jeżeli nie to system nie wyświetli żadnego komunikatu i użytkownik
            będzie mógł wypełniać formularz dalej. Kolejne informacje do wpisania to tłumaczenie, przykładowe zdanie
            w języku obcym, tłumaczenie po polsku oraz wybór kategorii. Po kliknięciu przycisku <strong>Dodaj do bazy </strong>
            wyświetli się komunikat informujący o poprawnie zakończonym działaniu i po 2 sekundach ponownie pojawi się formularz
            dodawania fiszki do bazy.
        </p>
        <h6><span className="orangeText">Szukaj</span><FontAwesomeIcon icon="search"/></h6>
        <p>Wyszukiwanie fiszek odbywa się na dwa sposoby:</p>
        <ol>
            <li>Poprzez wpisanie słowa po polsku, wybierając odpowiedni język,</li>
            <li>Nie wpisując żadnego słowa, wybierając odpowiedni język</li>
        </ol>
        <p>
            Każda fiszka podzielona jest na dwie części. Pierwsza część pokazuje kategorię, szukane słowo i wybrany język. Po kliknięciu przycisku
            <strong> Zobacz tłumaczenie</strong> pojawia się druga część fiszki zawierająca tłumaczenie oraz przykładowe zdanie.
            Każdą fiszkę można edytować, usunąć lub zamknąć.
        </p>
        <h6><span className="orangeText">Ucz się</span><FontAwesomeIcon icon="book-reader"/></h6>
        <p>
            Moduł związany z uczeniem polega na wyborze odpowiedniego języka, po kliknięciu przycisku Szukaj pojawią się fiszki zapisane wcześniej
            przez użytkowanika w bazie danych. Będą one wyświetlane w formie slidów zmieniających się co 5 sekund. Użytkownik ma też możliwość samodzielnie przejść
            do następnej fiszki przed upływem 5 sekund.
        </p>
    </div> )
};

export default About;