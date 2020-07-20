
const getVisibleRecipe = (recipes, text) => {

    return recipes.filter((recipe) => {

        const textMatch = recipe.recipeData.recipeTitle.toLowerCase().includes(text.toLowerCase())

        return textMatch
    })

}

export default getVisibleRecipe