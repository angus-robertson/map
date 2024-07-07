import { type Component, createSignal } from "solid-js";

import solidLogo from '@/assets/solid.svg';
import viteLogo from '/vite.svg';

const Home: Component = () => {
	const [count, setCount] = createSignal(0)

	return <>
		<div>
			<a href="https://vitejs.dev" target="_blank">
				<img src={viteLogo} class="logo" alt="Vite logo" />
			</a>
			<a href="https://solidjs.com" target="_blank">
				<img src={solidLogo} class="logo solid" alt="Solid logo" />
			</a>
		</div>
		<h1>Vite + Solid</h1>
		<div class="card p-4">
			<button onClick={() => setCount((count) => count + 1)}>
				count is {count()}
			</button>
			<p>
				Edit <code>src/App.tsx</code> and save to test HMR
			</p>
			<h2>Hello world!</h2>
		</div>
		<p class="read-the-docs">
			Click on the Vite and Solid logos to learn more
		</p>
	</>;
};

export default Home;