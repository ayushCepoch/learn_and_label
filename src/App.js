import { Route, Routes } from 'react-router-dom';
import './App.css';
import CreateLabel from './componenets/CreateLabel/CreateLabel';
import EditingPanel from './componenets/EditingPanel/EditingPanel';

function App() {
  return (
   <>
   <Routes>
    <Route 
      path="/"
      element={<CreateLabel />}
    />
    <Route 
      path="/editing-panel"
      element={<EditingPanel />}
    />
   </Routes>
   </>
  );
}

export default App;
