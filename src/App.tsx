import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import PhotoBooth from "./pages/photoBooth"
import Preview from "./pages/Preview"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photo-booth" element={<PhotoBooth />} />
        <Route path="/preview" element={<Preview />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  )
}

export default App
