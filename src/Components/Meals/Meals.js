import React from 'react';
import MealsSummary from '../Layout/MealsSummary';
import AvailableMeals from './AvailableMeals';

const Meals = () => {
	return (
		<>
			<MealsSummary />
			<AvailableMeals />
		</>
	);
};

export default Meals;
