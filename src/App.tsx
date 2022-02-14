import { Route, Routes } from "react-router-dom"
import Game from "./pages/Game"
import Cadastro from "./pages/Cadastro"
import Login from "./pages/Login"
import Ranking from "./pages/Ranking"
import Fases from "./pages/Fases"

function App() {

  return (
    <div className="App">
      <>
        <Routes>
          <Route path='/game' element={<Game></Game>} ></Route>
          <Route path='/cadastro' element={<Cadastro></Cadastro>} ></Route>
          <Route path='/' element={<Login></Login>} ></Route>
          <Route path='/login' element={<Login></Login>} ></Route>
          <Route path='/ranking' element={<Ranking></Ranking>} ></Route>
          <Route path='/fases' element={<Fases></Fases>} ></Route>
          <Route></Route>
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
       
      </>
    </div>
  )
}

export default App