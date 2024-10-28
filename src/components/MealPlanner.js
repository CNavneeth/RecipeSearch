import React from 'react';
import './MealPlanner.css';

function MealPlanner({ mealPlan, removeRecipeFromMealPlan }) {
    return (
        <div className="meal-planner">
            <h2>Meal Planner</h2>
            {Object.entries(mealPlan).map(([day, meals]) => (
                <div key={day} className="day-plan">
                    <h3 className="day-title">{day}</h3>
                    {Object.entries(meals).map(([mealType, recipe]) => (
                        <div key={mealType} className="meal-type">
                            <h4>{mealType}</h4>
                            <p>{recipe.title}</p>
                            <button className="remove-btn" onClick={() => removeRecipeFromMealPlan(day, mealType)}>
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default MealPlanner;
