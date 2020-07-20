import React, { useState, useEffect } from 'react'
import { useDispatch, connect } from 'react-redux'
import moment from 'moment'
import { produce } from 'immer'
import SweetAlert from 'react-bootstrap-sweetalert';
import { starteditRecipe, startremoveRecipe, setError } from '../../store/actions'
import BodyBackgroundColor from 'react-body-backgroundcolor';
import classNames from 'classnames/bind';
import styles from './EditRecipePage.module.scss'
import TextTransition, { presets } from "react-text-transition";
import TextField from '@material-ui/core/TextField';


const EditRecipePage = ({ match, history, recipes, error }) => {

    let cx = classNames.bind(styles)

    const dispatch = useDispatch()
    const recipe = recipes.find((recipe) => recipe.id === match.params.id)


    const recipeTitleData = recipe.recipeData.recipeTitle
    const recipeSteps = recipe.recipeData.recipeSteps
    const recipeIngredients = recipe.recipeData.recipeIngredients
    const recipeMinutes = recipe.recipeData.recipeMinutes
    const recipeCalories = recipe.recipeData.recipeCalories
    const recipePeople = recipe.recipeData.recipePeople


    const [editedRecipeTitle, seteditRecipe] = useState(recipeTitleData)
    const [editedminutes, seteditedminutes] = useState(recipeMinutes)
    const [editedpeople, seteditedpeople] = useState(recipePeople)
    const [editedcalories, seteditedcalories] = useState(recipeCalories)
    const [buttonDisabled, setbuttonDisabled] = useState(false)
    const [addAStepText, setaddAStepText] = useState(false)
    const [addAStepTextValue, setaddAStepTextValue] = useState('')
    const [editedRecipeSteps, seteditedRecipeSteps] = useState(recipeSteps)
    const [editedRecipeIngredients, seteditedRecipeIngredients] = useState(recipeIngredients)
    const [addAIngredientTextValue, setaddAIngredientTextValue] = useState('')
    const [addAIngredientText, setaaddAIngredientText] = useState(false)
    const [deleteAlert, setDeleteAlert] = useState()
    const [saveChangesAlert, setsaveChangesAlert] = useState()

    //SWEET ALERT
    const showDeleteAlert = () => {
        setDeleteAlert(
            (
                <SweetAlert
                    danger
                    showCancel
                    title="Are you sure?"
                    onConfirm={() => deleteHandler()}
                    onCancel={hideAlert}
                    style={{ backgroundColor: '#ffe277' }}
                    customButtons={
                        <React.Fragment>
                            <button className={cx(styles.buttonOFDilog, styles.buttonCancel)} onClick={hideAlert}>Cancel</button>
                            <button className={cx(styles.buttonOFDilog, styles.buttonConfirm)} onClick={() => deleteHandler()}>Yes, Delete it</button>
                        </React.Fragment>
                    }
                >
                    You will not be able to recover!
                </SweetAlert>
            ))
    }

    const showConfirmAlert = () => {
        setsaveChangesAlert(
            (
                <SweetAlert
                    warning
                    showCancel
                    title="Save Your Changes?"
                    onConfirm={() => editHandler()}
                    onCancel={hideAlert}
                    style={{ backgroundColor: '#f7f7f7' }}
                    customButtons={
                        <React.Fragment>
                            <button className={cx(styles.buttonOFDilog, styles.buttonCancel)} onClick={hideAlert}>Cancel</button>
                            <button className={cx(styles.buttonOFDilog, styles.buttonConfirm, styles.saveChangesButton)} onClick={() => editHandler()}>Save Changes</button>
                        </React.Fragment>
                    }
                >
                    You will not be able to recover your recipe!
                </SweetAlert>
            ))
    }



    const hideAlert = () => {
        setDeleteAlert(null)
        setsaveChangesAlert(null)
    }



    //EDIT ALL
    const editHandler = () => {
        dispatch(starteditRecipe(match.params.id, {
            recipeData: {
                ...recipe.recipeData,
                recipeTitle: editedRecipeTitle,
                recipeSteps: editedRecipeSteps,
                recipeIngredients: editedRecipeIngredients,
                recipeMinutes: editedminutes,
                recipeCalories: editedcalories,
                recipePeople: editedpeople
            }, editedAt: moment().valueOf()
        }))

        history.push('/home')
    }

    //DELETE ALL    
    const deleteHandler = () => {
        dispatch(startremoveRecipe(match.params.id))

        history.push('/home')
    }


    const onRecipeTitleChange = (e) => {
        seteditRecipe(e.target.value)

    }

    const onRecipeStepChange = (e, i) => {
        const recipeStep = e.target.value

        seteditedRecipeSteps(currentRecipe =>
            produce(currentRecipe, v => {
                v[i] = recipeStep
            })
        )
    }


    const onDeleteStep = (i) => {

        const newEditedArray = [...editedRecipeSteps]

        const ToBeremovedStep = newEditedArray.splice(i, 1)

        seteditedRecipeSteps(
            newEditedArray.filter((recipe) => recipe !== ToBeremovedStep)
        )
    }


    const onAddAstep = () => {
        seteditedRecipeSteps(
            editedRecipeSteps.concat(addAStepTextValue)
        )
        setaddAStepTextValue('')
        setaddAStepText(false)

    }



    //INGREDIENTS
    const onIngredientChange = (e, i) => {
        const ingredient = e.target.value

        seteditedRecipeIngredients(currentIngredient =>
            produce(currentIngredient, v => {
                v[i] = ingredient
            })
        )
    }


    const onDeleteIngredient = (i) => {

        const newEditedArray = [...editedRecipeIngredients]

        const ToBeremovedIngredient = newEditedArray.splice(i, 1)

        seteditedRecipeIngredients(
            newEditedArray.filter((ingredient) => ingredient !== ToBeremovedIngredient)
        )
    }

    const onAddAIngredient = () => {
        seteditedRecipeIngredients(
            editedRecipeIngredients.concat(addAIngredientTextValue)
        )
        setaddAIngredientTextValue('')
        setaaddAIngredientText(false)

    }


    //CHECKS IF AN ARRAY HAVE ANY EMPTY STRING
    const checkIfArrayContainsEmptyString = (my_arr) => {
        for (var i = 0; i < my_arr.length; i++) {
            if (my_arr[i].trim() === "")
                return true;
        }
        return false;
    }

    //CHECKS BOTH ARRAY ARE EQUAL
    const arrayEquals = (a, b) => {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }


    useEffect(() => {

        if (editedRecipeTitle === recipeTitleData &&
            arrayEquals(recipeSteps, editedRecipeSteps) &&
            arrayEquals(recipeIngredients, editedRecipeIngredients) &&
            editedminutes === recipeMinutes && editedcalories === recipeCalories && editedpeople === recipePeople

        ) {
            dispatch(setError(''))
        } else {
            dispatch(setError('Some Changes detected.'))
        }


        if (checkIfArrayContainsEmptyString(editedRecipeSteps) || editedRecipeSteps.length === 0 ||
            checkIfArrayContainsEmptyString(editedRecipeIngredients) || editedRecipeIngredients.length === 0 ||
            editedRecipeTitle.trim() === '' ||
            editedminutes === "" || editedcalories === '' || editedpeople === ''
        ) {
            dispatch(setError(''))
            setbuttonDisabled(true)
        } else {
            setbuttonDisabled(false)
        }



    }, [editedRecipeTitle, recipeMinutes,
        editedminutes, recipeCalories, recipePeople, editedcalories,
        editedpeople, recipeIngredients, editedRecipeIngredients,
        recipeTitleData, editedRecipeSteps, recipeSteps, dispatch])



    return (
        <BodyBackgroundColor backgroundColor='white'>
            <div>
                <div className={cx("pageHeader", styles.editPageHeader)}>
                    <h1 className={"pageHeaderTitle"}>Edit Your Recipe</h1>
                    <button className={cx(styles.DeleteAll, 'Deletebutton')} onClick={showDeleteAlert}>
                        Delete All</button>
                    {deleteAlert}
                </div>
                <div className={cx(styles.mainSection, 'content-container')}>
                    {error &&


                        <span className={styles.changesMessage}>
                            <TextTransition
                                text={`▶ ${error}`}
                                springConfig={presets.wobbly}
                            />
                        </span>

                    }

                    <div>

                        <TextField
                            id="standard-basic"
                            label="Title"
                            fullWidth
                            name="title"
                            error={
                                (!editedRecipeTitle || editedRecipeTitle.trim() === '')
                            }
                            value={editedRecipeTitle}
                            onChange={onRecipeTitleChange}
                            helperText={
                                (!editedRecipeTitle || editedRecipeTitle.trim() === '') && `Donot leave title to your recipe empty.`}
                            autoFocus
                        />

                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h4 className={"head"} style={{ width: '15rem' }}>Ingredients</h4>
                        {buttonDisabled && (checkIfArrayContainsEmptyString(editedRecipeIngredients) || editedRecipeIngredients.length === 0) &&
                            <span className={styles.errorMessage} style={{ margin: '3.2rem 0 1.2rem' }}>
                                <TextTransition
                                    text={`⚠ Donot leave any ingredient empty.`}
                                    springConfig={presets.wobbly}
                                />
                            </span>
                        }
                    </div>

                    {
                        editedRecipeIngredients && editedRecipeIngredients.map((ingredient, i) =>
                            <div key={i + 1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                <TextField
                                    label="Ingredient"
                                    id="filled-size-small"
                                    className={'inputFields'}
                                    value={ingredient.trimStart()}
                                    name="ingredients"
                                    variant="filled"
                                    size="small"
                                    onChange={(e) => onIngredientChange(e, i)}
                                />


                                <button onClick={() => onDeleteIngredient(i)}
                                    className={"Deletebutton"} style={{ marginLeft: '2rem' }}>Delete</button>

                                <div>

                                </div>
                            </div>
                        )
                    }

                    {
                        addAIngredientText &&
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                            <TextField
                                label={editedRecipeIngredients.length === 0 ? `Type Your Ingredient` : `Type Your Next Ingredient`}
                                id="filled-size-small"
                                value={addAIngredientTextValue}
                                name="ingredient"
                                className={'inputFields'}
                                size="small"
                                onChange={(e) => setaddAIngredientTextValue(e.target.value)}
                                helperText={addAIngredientTextValue.trim() ? "Now Press Add Ingredient to add." :
                                    'Type ingredient name below to add ingredient your ingredients list.'}

                            />

                            <button className={cx("Deletebutton", "buttonAdd")} style={{ marginLeft: '2rem' }}
                                onClick={onAddAIngredient}>Add</button>
                        </div>
                    }

                    <button className={cx("Deletebutton", "buttonAdd")}
                        onClick={() => setaaddAIngredientText(!addAIngredientText)}

                    > {!addAIngredientText ? 'Add an ingredient' : 'Hide'} </button>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h4 className={"head"} style={{ width: '15rem' }}>Steps</h4>
                        {buttonDisabled && (checkIfArrayContainsEmptyString(editedRecipeSteps) || editedRecipeSteps.length === 0) &&
                            <span className={styles.errorMessage} style={{ margin: '3.2rem 0 1.2rem' }}>
                                <TextTransition
                                    text={`⚠ Donot leave any step empty.`}
                                    springConfig={presets.wobbly}
                                />
                            </span>
                        }
                    </div>


                    {
                        editedRecipeSteps && editedRecipeSteps.map((recipeStep, i) =>
                            <div key={i + 1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <TextField
                                    label={`Step ${i + 1}`}
                                    id="filled-size-small"
                                    className={'inputFields'}
                                    value={recipeStep.trimStart()}
                                    name="ingredients"
                                    variant="filled"
                                    size="small"
                                    onChange={(e) => onRecipeStepChange(e, i)}
                                />

                                <button className={"Deletebutton"} style={{ marginLeft: '2rem' }} onClick={() => onDeleteStep(i)}>Delete</button>
                                <div>

                                </div>
                            </div>
                        )
                    }

                    {
                        addAStepText &&
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                            <TextField
                                label={editedRecipeSteps.length === 0 ? `Type Your Step` : `Type Your Next Step`}
                                id="filled-size-small"
                                value={addAStepTextValue}
                                name="step"
                                className={'inputFields'}
                                size="small"
                                onChange={(e) => setaddAStepTextValue(e.target.value)}
                                helperText={addAStepTextValue.trim() ? "Now Press Add step to add." : 'Type the step below to add step your recipe.'}

                            />

                            <button className={cx("Deletebutton", "buttonAdd")} onClick={onAddAstep} style={{ marginLeft: '2rem' }}>Add</button>
                        </div>
                    }

                    <button className={cx("Deletebutton", "buttonAdd")}

                        onClick={() => setaddAStepText(!addAStepText)}> {!addAStepText ? 'Add a step' : 'Hide'} </button>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h4 className={cx("head", "additionalInfo")} >Additional Information</h4>
                        {buttonDisabled &&
                            (editedminutes === "" || editedcalories === '' || editedpeople === '')
                            &&
                            <span className={styles.errorMessage} style={{ margin: '3.2rem 0 1.2rem' }}>
                                <TextTransition
                                    text={`⚠ Donot leave any additinal information empty.`}
                                    springConfig={presets.wobbly}
                                />
                            </span>
                        }
                    </div>


                    <div className={styles.additonalSection}>
                        <p style={{ margin: '1rem 0', fontWeight: 'bold' }}>Minutes</p>
                        <TextField
                            label={'Set Minutes to your recipe'}
                            id="filled-size-small"
                            value={editedminutes}
                            name="step"
                            type="number"
                            style={{ marginBottom: '1.4rem' }}
                            className={'inputFields'}
                            size="small"
                            onChange={(e) => seteditedminutes(e.target.value)}
                            helperText={'Just Type the number below to edit minutes your recipe.'}
                        />
                        <p style={{ margin: '1rem 0', fontWeight: 'bold' }}>People</p>
                        <TextField
                            label={'Set People to your recipe'}
                            id="filled-size-small"
                            value={editedpeople}
                            name="step"
                            type="number"
                            style={{ marginBottom: '1.4rem' }}
                            className={'inputFields'}
                            size="small"
                            onChange={(e) => seteditedpeople(e.target.value)}
                            helperText={'Just Type the number below to edit number of people your recipe.'}
                        />
                        <p style={{ margin: '1rem 0', fontWeight: 'bold' }}>Calories</p>
                        <TextField
                            label={'Set Calories to your recipe'}
                            id="filled-size-small"
                            value={editedcalories}
                            name="step"
                            type="number"

                            className={'inputFields'}
                            size="small"
                            onChange={(e) => seteditedcalories(e.target.value)}
                            helperText={'Just Type the number below to edit calories your recipe.'}
                        />
                    </div>

                    <div style={{ marginTop: '3rem' }}>

                        <button onClick={showConfirmAlert} className={cx("Deletebutton", "saveChanges")} disabled={buttonDisabled}>
                            <span role="img" aria-labelledby="floppy disk for save">▼</span> Save Changes</button>
                        {saveChangesAlert}
                        <div style={{ marginBottom: '2rem' }}>
                            <h1 className={styles.DangerZone}>DANGER ZONE</h1>
                            <button className={cx('Deletebutton', styles.deleteAllMobileOnly)}
                                onClick={showDeleteAlert}><span role="img" aria-labelledby="trash for delete">&#128465;</span> Delete All</button>
                        </div>

                    </div>
                </div>
            </div>
        </BodyBackgroundColor>
    )
}


const mapStateToProps = (state) => ({
    recipes: state.recipe.recipes,
    error: state.filters.error
});


export default connect(mapStateToProps)(EditRecipePage)


