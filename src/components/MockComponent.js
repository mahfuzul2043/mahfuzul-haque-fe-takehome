import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { store } from "../redux/store"

export default function MockComponent({ component }) {
    return (
        <BrowserRouter>
            <Provider store={store}>
                {component}
            </Provider>
        </BrowserRouter>
    )
}