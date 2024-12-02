import Hero from './components/Hero';

const App = () => {
	return (
		<main>
			<Hero className='relative min-h-screen w-screen overflow-x-hidden' />
			<section className='z-0 min-h-screen bg-blue-500' />
		</main>
	);
};

export default App;
