import React, { useState } from 'react';
import './App.css';
import RecipeSearch from './components/RecipeSearch';
import MealPlanner from './components/MealPlanner';
import ShoppingList from './components/ShoppingList';

function App() {
    const [mealPlan, setMealPlan] = useState({});

    const addRecipeToMealPlan = (day, mealType, recipe) => {
        setMealPlan(prevMealPlan => ({
            ...prevMealPlan,
            [day]: {
                ...(prevMealPlan[day] || {}),
                [mealType]: recipe
            }
        }));
    };

    const removeRecipeFromMealPlan = (day, mealType) => {
        setMealPlan(prevMealPlan => {
            const updatedDayPlan = { ...(prevMealPlan[day] || {}) };
            delete updatedDayPlan[mealType];
            return { ...prevMealPlan, [day]: updatedDayPlan };
        });
    };

    return (
        <div className="container">
          <h1>NAV's recipe search</h1>
            <nav>
                
                <a href="#search">Search Recipes</a>
                <a href="#planner">Meal Planner</a>
                <a href="#shopping">Shopping List</a>
            </nav>
            <section id="search">
                <RecipeSearch addRecipeToMealPlan={addRecipeToMealPlan} />
            </section>
            <section id="planner">
                <MealPlanner mealPlan={mealPlan} removeRecipeFromMealPlan={removeRecipeFromMealPlan} />
            </section>
            <section id="shopping">
                <ShoppingList mealPlan={mealPlan} />
            </section>
        </div>
    );
}

export default App;
