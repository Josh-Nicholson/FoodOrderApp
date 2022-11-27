import React from 'react';

import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';
import MealsImage from './meals.jpg';

const Header = (props) => {
	return (
		<>
			<div className={classes.header}>
				<h2>FoodOrderApp</h2>
				<HeaderCartButton onClick={props.onClick} />
			</div>
			<div className={classes['main-image']}>
				<img src={MealsImage} alt="meals.jpg" />
			</div>
		</>
	);
};

export default Header;
