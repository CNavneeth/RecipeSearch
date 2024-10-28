import React, { useState } from 'react';
import axios from 'axios';
import './RecipeSearch.css';

function RecipeSearch({ addRecipeToMealPlan }) {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [selectedDay, setSelectedDay] = useState('Monday');
    const [selectedMealType, setSelectedMealType] = useState('breakfast');

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${query}`);
            setRecipes(response.data.results);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    const handleAddRecipe = async (recipe) => {
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
            const detailedRecipe = response.data;
            addRecipeToMealPlan(selectedDay, selectedMealType, detailedRecipe);
        } catch (error) {
            console.error("Error fetching recipe details:", error);
        }
    };

    return (
        <div className="recipe-search">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search recipes..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <div className="options">
                <label>Day:</label>
                <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                        <option key={day} value={day}>{day}</option>
                    ))}
                </select>
                <label>Meal Type:</label>
                <select value={selectedMealType} onChange={(e) => setSelectedMealType(e.target.value)}>
                    {["breakfast", "lunch", "dinner"].map(meal => (
                        <option key={meal} value={meal}>{meal}</option>
                    ))}
                </select>
            </div>

            <div className="recipe-grid">
                {recipes.map(recipe => (
                    <div className="recipe-card" key={recipe.id}>
                        <h3>{recipe.title}</h3>
                        <img src={`https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg`} alt={recipe.title} />
                        <button onClick={() => handleAddRecipe(recipe)}>Add to Meal Plan</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecipeSearch;
