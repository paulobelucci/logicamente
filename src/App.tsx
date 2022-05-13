import { Route, Routes } from "react-router-dom"
import Game from "./pages/Game"
import Cadastro from "./pages/Cadastro"
import Login from "./pages/Login"
import { Provider } from "react-redux"
import store from "./store"
import GlobalCSS from './globalStyle'


function App() {

  return (
    <div className="App">
      <GlobalCSS/>
      <Provider store={store}>
        <Routes>
          <Route path="/game" element={<Game></Game>} ></Route>
          <Route path="/cadastro" element={<Cadastro></Cadastro>} ></Route>
          <Route path="/" element={<Login></Login>} ></Route>
          <Route path="/login" element={<Login></Login>} ></Route>
          <Route></Route>
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There"s nothing here!</p>
              </main>
            }
          />
        </Routes>
      </Provider>
    </div>
  )
}

export default App