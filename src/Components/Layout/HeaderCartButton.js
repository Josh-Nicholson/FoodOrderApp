import React, { useContext, useEffect, useState } from 'react';
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
	const context = useContext(CartContext);
	const [buttonIsHighlighted, setButtonIsHighLighted] = useState(false);

	const { items } = context;

	const numberOfItems = items.reduce((currentNumber, item) => {
		return currentNumber + item.amount;
	}, 0);

	const btnClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ''}`;

	useEffect(() => {
		if (context.items.length === 0) return;

		setButtonIsHighLighted(true);

		const timer = setTimeout(() => {
			setButtonIsHighLighted(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<>
			<button className={btnClasses} onClick={props.onClick}>
				<div className={classes.icon}>
					<CartIcon />
				</div>
				Your Cart
				<div className={classes.badge}>{numberOfItems}</div>
			</button>
		</>
	);
};

export default HeaderCartButton;
