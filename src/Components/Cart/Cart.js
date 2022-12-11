import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartCheckoutForm from './CartCheckoutForm';
import CartItem from './CartItem';

const Cart = (props) => {
	const context = useContext(CartContext);

	const [isCheckedOut, setIsCheckOut] = useState(false);
	const [isOrderComplete, setIsOrderComplete] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const totalAmount = `$${context.totalAmount.toFixed(2)}`;
	const hasItems = context.items.length > 0;

	const cartItemAddHandler = (item) => {
		context.addItem({ ...item, amount: 1 });
	};
	const cartItemRemoveHandler = (id) => {
		context.removeItem(id);
	};

	const checkoutButtonClickHandler = () => {
		setIsCheckOut(true);
	};

	const backButtonClickHandler = () => {
		setIsCheckOut(false);
	};

	async function orderSubmitHandler(orderDetails) {
		setIsLoading(true);
		setError(null);

		const jsonToSave = {
			customerDetails: { ...orderDetails },
			cartItems: { ...context.items }
		};
		console.log('Submitting order to api');
		try {
			const response = await fetch('https://react-http-a82d2-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
				method: 'POST',
				body: JSON.stringify(jsonToSave),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (!response.ok) {
				throw new Error('Something went wrong!');
			}
			console.log('Successfully saved new order to api');
			setError(null);
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
		setIsCheckOut(false);
		setIsOrderComplete(true);
		context.clearCart();
	}

	const cartItems = (
		<ul className={classes['cart-items']}>
			{context.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onAdd={cartItemAddHandler.bind(null, item)}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
				/>
			))}
		</ul>
	);

	const cartOverview = (
		<>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<button className={classes['button--alt']} onClick={props.onClose}>
					Close
				</button>
				{hasItems && (
					<button className={classes.button} onClick={checkoutButtonClickHandler}>
						Checkout
					</button>
				)}
			</div>
		</>
	);

	const checkoutComplete = (
		<>
			<h1>Order successful!</h1>
			<div className={classes.actions}>
				<button className={classes['button--alt']} onClick={props.onClose}>
					Close
				</button>
			</div>
		</>
	);

	return (
		<Modal onClose={props.onClose}>
			{error && <h1>{error}</h1>}
			{isLoading && <h1>Submitting Order...</h1>}
			{!isLoading && !isCheckedOut && !isOrderComplete && cartOverview}
			{!isLoading && isCheckedOut && <CartCheckoutForm onBackButtonClick={backButtonClickHandler} onOrderSubmit={orderSubmitHandler} />}
			{!isLoading && isOrderComplete && checkoutComplete}
		</Modal>
	);
};

export default Cart;
