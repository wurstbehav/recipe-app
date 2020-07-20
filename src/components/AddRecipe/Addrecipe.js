import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import BodyBackgroundColor from 'react-body-backgroundcolor';
import { startAddRecipe } from '../../store/actions'
import { produce } from 'immer'
import styles from './Addrecipe.module.scss'
import classNames from 'classnames/bind';
import TextField from '@material-ui/core/TextField';
import TextTransition, { presets } from "react-text-transition";


const Addrecipe = ({ history }) => {

    let cx = classNames.bind(styles);

    const [recipeTitle, setrecipeTitle] = useState('')
    const [steps, setSteps] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [step, setStep] = useState('')
    const [ingredient, setIngredient] = useState('')
    const [error, setError] = useState('')
    const [minutes, setminutes] = useState(0)
    const [people, setPeople] = useState(0)
    const [calories, setcalories] = useState(0)
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [addIngredientButtonDisable, setaddIngredientButtonDisable] = useState(false)
    const [addStepButtonDisable, setaddStepButtonDisable] = useState(false)
    const [touchedTitle, setTouchedTitle] = useState(false)
    const dispatch = useDispatch()

    if (steps.length !== 0) {
        window.scrollTo(0, document.body.scrollHeight)
    }


    const addRecipe = (e) => {
        e.preventDefault()
        dispatch(startAddRecipe({
            recipeData: {
                recipeTitle: recipeTitle.trim(),
                recipeSteps: steps,
                recipeIngredients: ingredients,
                recipeMinutes: minutes,
                recipeCalories: calories,
                recipePeople: people
            },
            createdAt: moment().valueOf(), editedAt: 0
        })).then(() => {
            history.push('/home')
        })
    }

    const onAddRecipeTitleChange = (e) => {
        setrecipeTitle(e.target.value)
        setTouchedTitle(true)
    }



    const onAddRecipeStepChange = (e) => {
        e.preventDefault()
        setStep('')
        setSteps([...steps, step])

    }

    const deleteStep = (i) => {
        const newEditedArray = [...steps]

        const ToBeremovedStep = newEditedArray.splice(i, 1)

        setSteps(
            newEditedArray.filter((recipe) => recipe !== ToBeremovedStep)
        )

    }

    const onRecipeStepChange = (e, i) => {
        const recipeStep = e.target.value

        setSteps(currentRecipe =>
            produce(currentRecipe, v => {
                v[i] = recipeStep
            })
        )
    }


    const onAddRecipeIngredientChange = (e) => {
        e.preventDefault()
        setIngredient('')
        setIngredients([...ingredients, ingredient])

    }

    const deleteIngredient = (i) => {
        const newEditedArray = [...ingredients]

        const ToBeremovedIngredient = newEditedArray.splice(i, 1)

        setIngredients(
            newEditedArray.filter((recipeig) => recipeig !== ToBeremovedIngredient)
        )

    }

    const onRecipeIngredientChange = (e, i) => {
        const recipeIngredient = e.target.value

        setIngredients(currentIngredient =>
            produce(currentIngredient, v => {
                v[i] = recipeIngredient
            })
        )
    }

    const checkIfArrayContainsEmptyString = (my_arr) => {
        for (var i = 0; i < my_arr.length; i++) {
            if (my_arr[i] === "")
                return true;
        }
        return false;
    }


    useEffect(() => {
        if (
            (recipeTitle.trim() !== '' && steps.length !== 0 && ingredients.length !== 0)

            && !checkIfArrayContainsEmptyString(ingredients) && !checkIfArrayContainsEmptyString(steps)

            && minutes !== "" && calories !== '' && people !== ''

        ) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }


        if (!recipeTitle || recipeTitle.trim() === '') {
            setError('Donot leave title to your recipe empty.')
        }
        else if (ingredients.length === 0) {
            setError('Donot forget to add a ingredient to your recipe.')
        }
        else if (steps.length === 0) {
            setError('Add atleast a step to your recipe.')
        } else {
            setError('')
        }

        if (ingredient.trim() === '') {
            setaddIngredientButtonDisable(true)
        } else {
            setaddIngredientButtonDisable(false)
        }

        if (step.trim() === '') {
            setaddStepButtonDisable(true)
        } else {
            setaddStepButtonDisable(false)
        }

    }, [recipeTitle, steps, minutes, calories, people, step, ingredients, ingredient])



    return (

        <BodyBackgroundColor backgroundColor='#f7f7f7'>

            <div>
                <div className={cx("pageHeader", styles.addRecipeHeader)}>
                    <h1 className={"pageHeaderTitle"}>Add Your Recipe</h1>
                </div>


                <div className={cx(styles.mainSection, 'content-container')} >
                    <TextField
                        id="standard-basic"
                        label="Title to your recipe"
                        fullWidth
                        name="title"
                        error={touchedTitle &&
                            (!recipeTitle || recipeTitle.trim() === '')
                        }
                        value={recipeTitle}
                        onChange={onAddRecipeTitleChange}
                        helperText={touchedTitle &&
                            (!recipeTitle || recipeTitle.trim() === '') && `Donot leave title to your recipe empty.`}
                        autoFocus
                    />


                    <h4 className={"head"}>Ingredients</h4>
                    {

                        ingredients && ingredients.map((ingredient, i) =>

                            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <TextField
                                    label="Ingredient"
                                    id="filled-size-small"
                                    className={'inputFields'}
                                    value={ingredient.trimStart()}
                                    name="ingredients"
                                    variant="filled"
                                    size="small"
                                    onChange={(e) => onRecipeIngredientChange(e, i)}
                                />

                                <button className={"Deletebutton"} onClick={() => deleteIngredient(i)} style={{ marginLeft: '2rem' }}>
                                    Delete</button>
                            </div>

                        )

                    }

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TextField
                            label={ingredients.length === 0 ? `Type Your Ingredient` : `Type Your Next Ingredient`}
                            id="filled-size-small"
                            value={ingredient}
                            name="ingredient"
                            className={'inputFields'}
                            size="small"
                            onChange={(e) => setIngredient(e.target.value)}
                            helperText={ingredient.trim() ? "Now Press Ingredient to add." :
                                'Type ingredient name below to add ingredient your ingredients list.'}
                        />
                        <button className={cx("Deletebutton", "buttonAdd")} style={{ marginLeft: '2rem' }}
                            onClick={onAddRecipeIngredientChange} disabled={addIngredientButtonDisable}>Add</button>


                    </div>


                    <h4 className={"head"}>Steps</h4>
                    {
                        steps && steps.map((step, i) =>
                            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>


                                <TextField
                                    label={`Step ${i + 1}`}
                                    id="filled-size-small"
                                    className={'inputFields'}
                                    value={step.trimStart()}
                                    name="steps"
                                    variant="filled"
                                    size="small"
                                    onChange={(e) => onRecipeStepChange(e, i)}

                                />

                                <button onClick={() => deleteStep(i)} className={"Deletebutton"} style={{ marginLeft: '2rem' }}>Delete</button>
                            </div>
                        )
                    }
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TextField
                            label={steps.length === 0 ? `Type Your Step` : `Type Your Next Step`}
                            id="filled-size-small"
                            value={step}
                            name="step"
                            className={'inputFields'}
                            size="small"
                            onChange={(e) => setStep(e.target.value)}
                            helperText={step.trim() ? "Now Press Add to add." : 'Type the step below to add step your recipe.'}

                        />

                        <button className={cx("Deletebutton", "buttonAdd")}
                            style={{ marginLeft: '2rem' }} onClick={onAddRecipeStepChange} disabled={addStepButtonDisable}>Add</button>
                    </div>

                    <h4 className={cx("head", "additionalInfo")}>Additional Information</h4>
                    <div style={{ marginLeft: '2.5rem' }}>
                        <p style={{ fontWeight: 'bold' }}>Minutes</p>
                        <TextField
                            label={'Set Minutes to your recipe'}
                            id="filled-size-small"
                            value={minutes}
                            name="step"
                            type="number"
                            style={{ marginBottom: '1.4rem' }}
                            className={'inputFields'}
                            size="small"
                            onChange={(e) => setminutes(e.target.value)}
                            helperText={'Just Type the number below to add minutes your recipe.'}
                        />
                        <p style={{ fontWeight: 'bold' }}>People</p>
                        <TextField
                            label={'Set People to your recipe'}
                            id="filled-size-small"
                            value={people}
                            name="step"
                            type="number"
                            style={{ marginBottom: '1.4rem' }}
                            className={'inputFields'}
                            size="small"
                            onChange={(e) => setPeople(e.target.value)}
                            helperText={'Just Type the number below to add number of people your recipe.'}
                        />
                        <p style={{ fontWeight: 'bold' }}>Calories</p>
                        <TextField
                            label={'Set Calories to your recipe'}
                            id="filled-size-small"
                            value={calories}
                            name="step"
                            type="number"

                            className={'inputFields'}
                            size="small"
                            onChange={(e) => setcalories(e.target.value)}
                            helperText={'Just Type the number below to add calories your recipe.'}
                        />

                    </div>
                    <div style={{ marginBottom: '1.7rem' }}>
                        <button className={styles.addRecipeButton} disabled={buttonDisabled} onClick={addRecipe}>Add Recipe</button>


                        {

                            error ?

                                <span className={styles.errorMessagebottom} >
                                    <TextTransition
                                        text={`⚠ ${error}`}
                                        springConfig={presets.wobbly}
                                    />
                                </span>
                                :
                                (
                                    buttonDisabled ? (
                                        <span className={styles.errorMessagebottom} >
                                            <TextTransition
                                                text={`⚠ Make sure u donot leave steps, ingredients or any additional information empty.`}
                                                springConfig={presets.wobbly}
                                            />
                                        </span>
                                    )
                                        :

                                        <span className={cx(styles.errorMessagebottom, styles.successMessage)} >
                                            <TextTransition
                                                text={`Recipe is ready to be added.`}
                                                springConfig={presets.wobbly}
                                            />
                                        </span>
                                )

                        }
                    </div>



                </div>

            </div>

        </BodyBackgroundColor>

    )
}





export default Addrecipe  
