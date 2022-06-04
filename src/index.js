import { render } from "react-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Container from "./Pages/Container";
import store from "./Store/store";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<DndProvider backend={HTML5Backend}>
					<Container />
				</DndProvider>
			</div>
		</Provider>
	);
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement)
root.render(<App />);
