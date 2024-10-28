import React, { useState, useEffect } from 'react';
import './ShoppingList.css';

function ShoppingList({ mealPlan }) {
    const [shoppingList, setShoppingList] = useState({});

    useEffect(() => {
        const newList = {};
        Object.entries(mealPlan).forEach(([day, meals]) => {
            newList[day] = {};
            Object.entries(meals || {}).forEach(([mealType, recipe]) => {
                if (recipe && recipe.extendedIngredients) {
                    newList[day][mealType] = recipe.extendedIngredients.map(ingredient => ({
                        id: ingredient.id,
                        name: ingredient.name,
                        amount: `${ingredient.amount} ${ingredient.unit}`,
                        checked: false
                    }));
                }
            });
        });
        setShoppingList(newList);
    }, [mealPlan]);

    const toggleChecked = (day, mealType, index) => {
        setShoppingList(prevList => ({
            ...prevList,
            [day]: {
                ...prevList[day],
                [mealType]: prevList[day][mealType].map((item, i) =>
                    i === index ? { ...item, checked: !item.checked } : item
                )
            }
        }));
    };

    return (
        <div className="shopping-list">
            <h2>Shopping List</h2>
            {Object.entries(shoppingList).map(([day, meals]) => (
                <div key={day} className="day-list">
                    <h3>{day}</h3>
                    {Object.entries(meals).map(([mealType, ingredients]) => (
                        <div key={mealType} className="recipe-ingredients">
                            <h4>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h4>
                            <ul>
                                {ingredients.map((item, index) => (
                                    <li key={item.id} className="ingredient-item">
                                        <input
                                            type="checkbox"
                                            checked={item.checked}
                                            onChange={() => toggleChecked(day, mealType, index)}
                                        />
                                        <span>{item.name} - {item.amount}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default ShoppingList;
