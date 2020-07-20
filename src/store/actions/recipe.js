import database from '../../firebase/firebase'


export const recipeAdd = (newAddedRecipe) => ({
    type: "ADD_RECIPE",
    newAddedRecipe
})

export const startAddRecipe = (newAddedRecipe) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid

        return database.ref(`users/${uid}/recipes`).push(newAddedRecipe).then((ref) => {
            dispatch(recipeAdd({
                id: ref.key,
                ...newAddedRecipe
            }))
        })
    }
}


export const editRecipe = (id, updates) => ({
    type: 'EDIT_RECIPE',
    id,
    updates
})

export const starteditRecipe = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/recipes/${id}`).update(updates).then(() => {
            dispatch(editRecipe(id, updates))
        })

    }
}






export const removeRecipe = (id) => ({

    type: 'REMOVE_RECIPE',
    id

})


export const startremoveRecipe = (id) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/recipes/${id}`).remove().then(() => {
            dispatch(removeRecipe(id))
        })
    }

}


// export const removeAstep = (index) => ({
//     type: 'REMOVE_A_STEP',
//     index
// })







export const setRecipes = (setrecipes) => {

    return {
        type: 'SET_RECIPES',
        setrecipes
    };



}

export const startsetRecipes = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/recipes`).once('value').then((snapshot) => {
            const recipes = []
            snapshot.forEach(childSnapshot => {
                recipes.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            });

            dispatch(setRecipes(recipes))

        })
    }
};

