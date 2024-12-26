import { Route, Routes } from 'react-router-dom';
import './App.css';
import EditingPanel from './componenets/EditingPanel/EditingPanel';

function App() {
  return (
   <>
   <Routes>
    <Route 
      path="/"
      element={<EditingPanel />}
    />
   </Routes>
   </>
  );
}

export default App;
