import { Routes, Route } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import Homepage from "./pages/Homepage/Homepage.tsx";
import { Register } from "./pages/Register/Register.tsx";

function App() {
  return (
    <div className="App">
      <Toaster 
       position="bottom-right"
       reverseOrder={false}
       gutter={8}
       containerClassName=""
       containerStyle={{}}
       toastOptions={{
         // Define default options
         className: '',
         duration: 5000,
         style: {
           background: '#363636',
           color: '#fff',
         },
     
         // Default options for specific types
         success: {
           duration: 3000,
           theme: {
             primary: 'green',
             secondary: 'black',
           },
         },
       }} />
      <Routes>
        <Route path="/" element={ <Homepage />} />
        <Route path="/register" element={ <Register />} />
      </Routes>
    </div>
  );
}

export default App;
