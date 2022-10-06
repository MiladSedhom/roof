import { ThemeProvider } from "./stores/useThemeStore"
import AppPage from "./pages/app/AppPage"
let renderCount = 1

function App() {
	console.log(renderCount)
	renderCount++

	return (
		<div className="App">
			<ThemeProvider>
				<AppPage />
			</ThemeProvider>
		</div>
	)
}

export default App
