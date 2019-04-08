import React from 'react';
import categories from "../data/categories"

const Categories = (props) => {
    return ( <>
            <label htmlFor="props.value">Kategoria</label>
            <select id="props.value" value={props.value} onChange={props.change} name="categories">
                {categories.categories.map(cat => <option value={cat.name} key={cat.id}>{cat.name}</option>)}
            </select>
            <span>Wybierz kategorię</span>
    </>
    )
}

export default Categories;