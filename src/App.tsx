import { Route, Routes } from "react-router-dom"
import { AboutPage } from "./pages/AboutPage";
import { ListPage } from "./pages/ListPage";
import { Navigation } from "./components/Navigation"

function App() {
  return (
    <>
      <Navigation />    

      <Routes>
        <Route path='/' element={<ListPage />} />
        <Route path='/about' element={<AboutPage />} />
      </Routes>
    </>
  )
}

export default App;
