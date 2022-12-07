import React, { useCallback, useEffect, useState } from 'react';
import MealItem from './MealItem/MealItem';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchAvailableMeals = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		console.log('Loading meals from api');
		try {
			const response = await fetch('https://react-http-a82d2-default-rtdb.europe-west1.firebasedatabase.app/meals.json');
			if (!response.ok) {
				throw new Error('Something went wrong!');
			}
			const data = await response.json();
			console.log('Got success response from api');

			const loadedMeals = [];

			for (const key in data) {
				loadedMeals.push({
					id: key,
					name: data[key].name,
					description: data[key].description,
					price: data[key].price
				});
			}
			setMeals(loadedMeals);
			console.log('Successfully populated meals list from api response');
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchAvailableMeals();
		return () => {};
	}, [fetchAvailableMeals]);

	let content = <h1>No meals available!</h1>;
	if (meals.length > 0)
		content = meals.map((meal) => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />);
	if (error) content = <h1>{error}</h1>;
	if (isLoading) content = <h1>Loading...</h1>;

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{content}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
