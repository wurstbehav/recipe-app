const recipeState = {
    recipes: []
}

export default (state = recipeState, { type, setrecipes, newAddedRecipe, id, updates, index }) => {


    switch (type) {

        case "ADD_RECIPE":
            return {
                ...state,
                recipes: [...state.recipes, newAddedRecipe]
            }
        case 'EDIT_RECIPE':
            return {
                ...state,
                recipes: state.recipes.map((recipe) => {
                    if (recipe.id === id) {
                        return {
                            ...recipe,
                            ...updates,
                            recipeData: {
                                ...recipe.recipeData,
                                ...updates.recipeData
                            }
                        }
                    } else {
                        return recipe
                    }
                })

            }

        case 'REMOVE_RECIPE':
            return {
                ...state,
                recipes: state.recipes.filter((recipe) => recipe.id !== id)
            }

        // case 'REMOVE_A_STEP':
        //     const ToBeremovedStep = state.recipes.recipeData.recipeSteps.splice(index, 1)
        //     return {
        //         ...state,
        //         recipes: state.recipes.map((recipe) => {
        //             if (recipe.id === id) {
        //                 return {
        //                     ...recipe,
        //                     ...updates,
        //                     recipeData: {
        //                         ...recipe.recipeData,
        //                         recipeSteps: state.recipes.recipeData.recipeSteps.filter((recipe) => recipe !== ToBeremovedStep)
        //                     }
        //                 }
        //             } else {
        //                 return recipe
        //             }
        //         })

        //     }

        case 'SET_RECIPES':
            return {
                ...state,
                recipes: setrecipes
            }


        default:
            return state
    }
}
