import React from 'react';
import useInput from '../../Hooks/use-input';

import classes from './CartForm.module.css';

const CartCheckoutForm = (props) => {
	const {
		value: firstNameInputValue,
		isValid: firstNameInputIsValid,
		hasError: firstNameInputHasError,
		valueChangeHandler: firstNameInputChangeHandler,
		inputBlurHandler: firstNameInputBlurHandler,
		reset: resetFirstNameInput
	} = useInput((value) => value.trim() !== '');

	const {
		value: lastNameInputValue,
		isValid: lastNameInputIsValid,
		hasError: lastNameInputHasError,
		valueChangeHandler: lastNameInputChangeHandler,
		inputBlurHandler: lastNameInputBlurHandler,
		reset: resetLastNameInput
	} = useInput((value) => value.trim() !== '');

	const {
		value: emailInputValue,
		isValid: emailInputIsValid,
		hasError: emailInputHasError,
		valueChangeHandler: emailInputChangeHandler,
		inputBlurHandler: emailInputBlurHandler,
		reset: resetEmailInput
	} = useInput((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));

	const {
		value: addressInputValue,
		isValid: addressInputIsValid,
		hasError: addressInputHasError,
		valueChangeHandler: addressInputChangeHandler,
		inputBlurHandler: addressInputBlurHandler,
		reset: resetAddressInput
	} = useInput((value) => value.trim() !== '');

	const {
		value: postcodeInputValue,
		isValid: postcodeInputIsValid,
		hasError: postcodeInputHasError,
		valueChangeHandler: postcodeInputChangeHandler,
		inputBlurHandler: postcodeInputBlurHandler,
		reset: resetPostcodeInput
	} = useInput((value) => /^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i.test(value));

	const {
		value: nameOnCardInputValue,
		isValid: nameOnCardInputIsValid,
		hasError: nameOnCardInputHasError,
		valueChangeHandler: nameOnCardInputChangeHandler,
		inputBlurHandler: nameOnCardInputBlurHandler,
		reset: resetNameOnCardInput
	} = useInput((value) => value.trim() !== '');

	const {
		value: cardNumberInputValue,
		isValid: cardNumberInputIsValid,
		hasError: cardNumberInputHasError,
		valueChangeHandler: cardNumberInputChangeHandler,
		inputBlurHandler: cardNumberInputBlurHandler,
		reset: resetCardNumberInput
	} = useInput((value) => /^4[0-9]{12}(?:[0-9]{3})?$/.test(value.replaceAll(/\s/g, '')));

	const {
		value: expiryDateInputValue,
		isValid: expiryDateInputIsValid,
		hasError: expiryDateInputHasError,
		valueChangeHandler: expiryDateInputChangeHandler,
		inputBlurHandler: expiryDateInputBlurHandler,
		reset: resetExpiryDateInput
	} = useInput((value) => /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(value));

	const {
		value: cvvInputValue,
		isValid: cvvInputIsValid,
		hasError: cvvInputHasError,
		valueChangeHandler: cvvInputChangeHandler,
		inputBlurHandler: cvvInputBlurHandler,
		reset: resetCvvInput
	} = useInput((value) => /^[0-9]{3}$/.test(value));

	const formIsValid =
		firstNameInputIsValid &&
		lastNameInputIsValid &&
		emailInputIsValid &&
		addressInputIsValid &&
		postcodeInputIsValid &&
		nameOnCardInputIsValid &&
		cardNumberInputIsValid &&
		expiryDateInputIsValid &&
		cvvInputIsValid;

	const onSubmitHandler = (event) => {
		event.preventDefault();

		if (!formIsValid) {
			console.log('Form invalid so cant submit');
			return;
		}

		console.log('Submit event');

		const orderDetails = {
			firstName: firstNameInputValue,
			lastName: lastNameInputValue,
			email: emailInputValue,
			address: addressInputValue,
			postcode: postcodeInputValue,
			nameOnCard: nameOnCardInputValue,
			cardNumber: cardNumberInputValue,
			expiryDate: expiryDateInputValue,
			cvv: cvvInputValue
		};

		props.onOrderSubmit(orderDetails);

		resetFirstNameInput();
		resetLastNameInput();
		resetEmailInput();
		resetAddressInput();
		resetPostcodeInput();
		resetNameOnCardInput();
		resetCardNumberInput();
		resetExpiryDateInput();
		resetCvvInput();
	};

	const firstNameInputClasses = firstNameInputHasError ? `${classes['form-control']} ${classes.invalid}` : classes['form-control'];
	const lastNameInputClasses = lastNameInputHasError ? `${classes['form-control']} ${classes.invalid}` : classes['form-control'];
	const emailInputClasses = emailInputHasError ? `${classes['form-control']} ${classes.invalid}` : classes['form-control'];
	const addressInputClasses = addressInputHasError ? `${classes['form-control']} ${classes.invalid}` : classes['form-control'];
	const postcodeInputClasses = postcodeInputHasError ? `${classes['form-control']} ${classes.invalid}` : classes['form-control'];

	const nameOnCardInputClasses = nameOnCardInputHasError ? `${classes['form-control']} ${classes.invalid}` : classes['form-control'];
	const cardNumberInputClasses = cardNumberInputHasError ? `${classes['form-control']} ${classes.invalid}` : classes['form-control'];
	const expiryDateInputClasses = expiryDateInputHasError ? `${classes['form-control']} ${classes.invalid}` : classes['form-control'];
	const cvvInputClasses = cvvInputHasError ? `${classes['form-control']} ${classes.invalid}` : classes['form-control'];

	return (
		<form onSubmit={onSubmitHandler}>
			<h1>Checkout Details</h1>
			<div className={classes['control-group']}>
				<div className={firstNameInputClasses}>
					<label htmlFor="firstName">First name</label>
					<input type="text" id="firstName" onChange={firstNameInputChangeHandler} onBlur={firstNameInputBlurHandler} value={firstNameInputValue} />
					{firstNameInputHasError && <p className={classes['error-text']}>First Name needs a value!</p>}
				</div>
				<div className={lastNameInputClasses}>
					<label htmlFor="lastName">Last name</label>
					<input type="text" id="lastName" onChange={lastNameInputChangeHandler} onBlur={lastNameInputBlurHandler} value={lastNameInputValue} />
					{lastNameInputHasError && <p className={classes['error-text']}>Last Name needs a value!</p>}
				</div>
			</div>
			<div className={emailInputClasses}>
				<label htmlFor="email">Email</label>
				<input type="email" id="email" onChange={emailInputChangeHandler} onBlur={emailInputBlurHandler} value={emailInputValue} />
				{emailInputHasError && <p className={classes['error-text']}>Must contain a valid Email address!</p>}
			</div>
			<div className={classes['control-group']}>
				<div className={addressInputClasses}>
					<label htmlFor="address">Address</label>
					<input type="text" id="address" onChange={addressInputChangeHandler} onBlur={addressInputBlurHandler} value={addressInputValue} />
					{addressInputHasError && <p className={classes['error-text']}>Address needs a value!</p>}
				</div>
				<div className={postcodeInputClasses}>
					<label htmlFor="postcode">Postcode</label>
					<input type="text" id="postcode" onChange={postcodeInputChangeHandler} onBlur={postcodeInputBlurHandler} value={postcodeInputValue} />
					{postcodeInputHasError && <p className={classes['error-text']}>Must contain a valid Postcode!</p>}
				</div>
			</div>
			<hr />
			<div className={classes['control-group']}>
				<div className={nameOnCardInputClasses}>
					<label htmlFor="nameOnCard">Name on card</label>
					<input
						type="text"
						id="nameOnCard"
						onChange={nameOnCardInputChangeHandler}
						onBlur={nameOnCardInputBlurHandler}
						value={nameOnCardInputValue}
					/>
					{nameOnCardInputHasError && <p className={classes['error-text']}>Name on card needs a value!</p>}
				</div>
				<div className={cardNumberInputClasses}>
					<label htmlFor="cardNumber">Card Number</label>
					<input
						type="text"
						id="cardNumber"
						onChange={cardNumberInputChangeHandler}
						onBlur={cardNumberInputBlurHandler}
						value={cardNumberInputValue}
					/>
					{cardNumberInputHasError && <p className={classes['error-text']}>Card number must be valid!</p>}
				</div>
				<div className={expiryDateInputClasses}>
					<label htmlFor="expiryDate">Expiry Date</label>
					<input
						type="text"
						id="expiryDate"
						onChange={expiryDateInputChangeHandler}
						onBlur={expiryDateInputBlurHandler}
						value={expiryDateInputValue}
					/>
					{expiryDateInputHasError && <p className={classes['error-text']}>Expiry date must be valid!</p>}
				</div>
				<div className={cvvInputClasses}>
					<label htmlFor="cvv">CVV</label>
					<input type="text" id="cvv" onChange={cvvInputChangeHandler} onBlur={cvvInputBlurHandler} value={cvvInputValue} />
					{cvvInputHasError && <p className={classes['error-text']}>CVV must be valid!</p>}
				</div>
			</div>

			<div className={classes.actions}>
				<button className={classes['button--alt']} onClick={props.onBackButtonClick}>
					Back
				</button>
				<button className={classes.button} type="submit" disabled={!formIsValid}>
					Order
				</button>
			</div>
		</form>
	);
};

export default CartCheckoutForm;
