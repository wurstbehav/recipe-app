import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import capitallizeFirstLetter from '../../selector/capitallizeFirstLetter';
import styles from './RecipePage.module.scss';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PeopleIcon from '@material-ui/icons/People';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import Card from '@material-ui/core/Card';
import ingredients from '../../assets/ingredients.png'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';
import EditIcon from '@material-ui/icons/Edit';

const RecipePage = ({ match, history }) => {
    const { recipes } = useSelector(state => state.recipe)
    const recipe = recipes.find((recipe) => recipe.id === match.params.id)



    return (
        <>
            <div className={styles.titleText}>
                <div className={styles.titleSection}>
                    <div>
                        <h1 className={styles.RecipeTitle} style={{ wordBreak: "break-all" }}>{capitallizeFirstLetter(recipe.recipeData.recipeTitle)}
                        </h1>
                        <div className={styles.titleSecondary}>
                            <div style={{ display: 'flex' }}>

                                <AccessTimeIcon style={{ marginRight: '1.5rem', color: '#295c77' }} />
                                <p className={styles.subText}><span className={styles.subNumber}>
                                    {recipe.recipeData.recipeMinutes ? recipe.recipeData.recipeMinutes : ''}</span>&nbsp;&nbsp;mins</p>
                            </div>
                            <div style={{ display: 'flex' }}>

                                <PeopleIcon style={{ marginRight: '1.5rem', color: '#295c77' }} />
                                <p className={styles.subText}><span className={styles.subNumber}>
                                    {recipe.recipeData.recipePeople ? recipe.recipeData.recipePeople : ''}
                                </span>&nbsp;&nbsp;people</p>
                            </div>
                            <div style={{ display: 'flex' }}>

                                <WhatshotIcon style={{ marginRight: '1.5rem', color: '#295c77' }} />
                                <p className={styles.subText}><span className={styles.subNumber}>
                                    {recipe.recipeData.recipeCalories ? recipe.recipeData.recipeCalories : ''}
                                </span>&nbsp;&nbsp;calories</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Link to={`/edit/${match.params.id}`} style={{ textDecoration: 'none', fontSize: '1.5rem' }}>
                            <div className={styles.editPage} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <EditIcon style={{ fontSize: '2rem' }} />
                                <p style={{ marginLeft: '1.2rem' }} >Edit Recipe</p>
                            </div>

                        </Link>
                    </div>
                </div>

            </div>
            <div className='content-container'>





                <Card style={{ backgroundColor: '#f1f1f1', margin: '2rem 0' }} className={styles.card}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={ingredients} alt="ingredient" style={{ marginLeft: '1.2rem', width: '3rem' }} />
                        <h1 style={{ margin: '1rem', fontWeight: '300', borderBottom: '1px solid #295c77' }}>Ingredients</h1>
                    </div>
                    {
                        recipe.recipeData.recipeIngredients && recipe.recipeData.recipeIngredients.map((recipeIngredient, i) =>
                            <div key={i + 1} style={{ display: 'flex', alignItems: 'center' }} >
                                <ArrowRightIcon style={{ color: '#295c77', marginLeft: '1.2rem' }} />
                                <p style={{ margin: '1.2rem', color: '#393e46' }}>
                                    {recipeIngredient}
                                </p>
                            </div>

                        )
                    }

                </Card>

                <Card style={{ backgroundColor: '#f1f1f1', margin: '2rem 0' }}>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <SwapHorizontalCircleIcon style={{ marginLeft: '1.2rem', fontSize: '4rem', color: '#000' }} />
                        <h1 style={{ margin: '1rem', fontWeight: '300', borderBottom: '1px solid #295c77' }}>Directions</h1>
                    </div>

                    {
                        recipe.recipeData.recipeSteps && recipe.recipeData.recipeSteps.map((step, i) =>
                            <div key={i + 1} style={{ display: 'flex', alignItems: 'center' }}>
                                <FiberManualRecordIcon style={{ color: '#295c77', marginLeft: '1.9rem', fontSize: '1rem' }} />
                                <p className={styles.steps}>
                                    {step}
                                </p>
                            </div>

                        )
                    }
                </Card>


            </div>
        </>
    )
}

export default RecipePage
