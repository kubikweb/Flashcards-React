import React from 'react';
import languages from "../data/languages"
import "../css/Search.css"


const Languages = (props) => {
    return (<>
            <label htmlFor="lang">Wybierz język</label>
            <select id="lang" value={props.value} onChange={props.change} name="languages" onBlur={props.blur}>
                {languages.languages.map(lang => <option value={lang.name}  key={lang.id}>{lang.name}</option>)}
            </select>
            {props.showSpan && <span>Wybierz język</span>}
        </>

    )
}

export default Languages;