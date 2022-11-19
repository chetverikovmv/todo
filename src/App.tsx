import { Route, Routes } from "react-router-dom"
import { AboutPage } from "./pages/AboutPage";
import { MainPage } from "./pages/MainPage";
import { Navigation } from "./components/Navigation"

function App() {
  return (
    <>
      <Navigation />    

      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/about' element={<AboutPage />} />
      </Routes>
    </>
  )
}

export default App;
