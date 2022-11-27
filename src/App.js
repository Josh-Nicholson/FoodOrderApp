import { useState } from 'react';
import Cart from './Components/Cart/Cart';
import Header from './Components/Layout/Header';
import Meals from './Components/Meals/Meals';

function App() {
	const [isCartShown, setIsCartShown] = useState(false);

	const showCartHandler = () => {
		setIsCartShown(true);
	};

	const hideCartHandler = () => {
		setIsCartShown(false);
	};

	return (
		<>
			{isCartShown && <Cart onClose={hideCartHandler} />}
			<Header onClick={showCartHandler} />
			<Meals />
		</>
	);
}

export default App;
