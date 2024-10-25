import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Poker from './pages/Poker';

const router = createBrowserRouter([
  {
    path:"/",
    element : <Poker/>
  }
])
function App() {
  return (
    <RouterProvider router={router} />
  )}

export default App