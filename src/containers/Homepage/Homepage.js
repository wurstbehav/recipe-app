import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment';
import { setTextFilter } from '../../store/actions'
import { useSelector } from 'react-redux';
import getVisibleRecipe from '../../selector/recipes';
import capitallizeFirstLetter from '../../selector/capitallizeFirstLetter';
import TextField from '@material-ui/core/TextField';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import styles from './Homepage.module.scss'


const Homepage = () => {

    const dispatch = useDispatch()

    const { recipes } = useSelector(state => state.recipe)
    const { text } = useSelector(state => state.filters)
    const visibleRecipes = getVisibleRecipe(recipes, text)


    return (
        <div className='content-container' style={{ marginBottom: '2rem' }}>
            <div className={'pageHeader'} style={{ textAlign: 'right' }}>
                <Link to='/add'>
                    <button className={styles.button}>Add A Recipe</button>
                </Link>
            </div>

            <TextField
                style={{ marginTop: "1.2rem" }}
                id="outlined-full-width"
                label="Search"
                placeholder="Search"
                helperText={visibleRecipes.length !== 0 ?
                    (
                        visibleRecipes.length === recipes.length ? `Total: ${recipes.length} recipes.` :
                            `Viewing total : ${visibleRecipes.length} out of ${recipes.length} recipes.`) :

                    (`No recipe found`)}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true
                }}
                value={text}
                onChange={(e) => dispatch(setTextFilter(e.target.value))}
                variant="outlined"
            />

            {
                visibleRecipes.length !== 0 &&
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <LocalDiningIcon style={{ fontSize: '1.9rem', marginRight: '1rem', color: '#295c77' }} />
                    <h3 className={styles.recipeHeadText}>
                        {/* <span role="img" aria-labelledby="fork and spoon">&#127860;</span> */}
                        {visibleRecipes.length === 1 ? ' Recipe' : ' Recipes'}
                    </h3>
                </div>
            }


            {
                visibleRecipes && visibleRecipes.map((recipe) =>
                    <div className={styles.content} key={recipe.id} >
                        <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none' }}>
                            <div className={styles.recipeContent}>
                                <p className={styles.recipePrimaryText}>{capitallizeFirstLetter(recipe.recipeData.recipeTitle)}</p>
                                {recipe.editedAt === 0 ?
                                    <p className={styles.recipeSubText}>Created At : {moment(recipe.createdAt).fromNow()}</p>
                                    :
                                    <p className={styles.recipeSubText}>Edited At : {moment(recipe.editedAt).fromNow()}</p>
                                }
                            </div>

                        </Link>
                    </div>
                )
            }

        </div>
    )
}

export default Homepage
