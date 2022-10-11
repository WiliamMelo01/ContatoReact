import './App.css';
import Home from '../src/pages/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <Home />
      <ToastContainer theme='dark' />
    </>
  );
}

export default App;
