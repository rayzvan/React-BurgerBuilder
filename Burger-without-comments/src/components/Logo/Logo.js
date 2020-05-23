import React from 'react'
import classes from './Logo.css'

//we make web-pack aware that we are using the image and webpack will then handle this image with a special plug-in or a special module that was added to webpack, to its config
//  and will handle the image, it will basically copy it over to the destination directory it creates
// (only in memory during development) and will even optimize the image
import burgerLogo from '../../assets/images/burger-logo.png'

const logo = () => (
    //we apply dib because we want to adda background for the image because the image is transparent and we want to se a white one
    
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyBurger"/>
    </div>
);

export default logo;