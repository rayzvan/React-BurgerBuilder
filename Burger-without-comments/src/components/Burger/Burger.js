import React from'react';
import classes from './Burger.css';
import BurgerIngridient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    //we use let instead of const because we are chengint its value from array to JSX element
    let transformedIngredients = Object.keys(props.ingredients)// This is from JS and it gives you an array of the keys (in our case string:["bacon", "salad", etc]) of the object
        .map(igKey => {//129. with Array(..) for us it metters just the length of the array because we need it if there are more ingredients of the same type
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngridient key={igKey + i} type={igKey}/>
            });
        })
        // we want to display a message if there is no ingredient (ex meat:0, cheese:0,etc) and we cannot just use.length because here is an array of arrays so it will still have a length > 0
        // for this we use .reduce() which allows to transform an array into something else
        // it takes function as input which recieves two arguments (passed in automatically by js):
        //  1.previous vlue
        //  2.current value
        // it also accepts an initial value, in our case we put it to [] (empty array)
        // so it will loop to all the elements and add them to the inital value step by step
        .reduce((arr, el) => {
            //we want to return the update value, which is stored in the first argument whichwe recieve in each loop (of the map (i think the first one?))
            return arr.concat(el);
            // i think it just adds the elements  of the array , which are arrays and add them to the first array
            // !!!! use console.log() for checking the assumption !!!!!
        }, []);

        if(transformedIngredients.length === 0){
            transformedIngredients = <p>Please start adding ingrediants!</p>
        }

    return(
        <div className={classes.Burger}>
            <BurgerIngridient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngridient type="bread-bottom"/>
        </div>
    );
}

export default burger;