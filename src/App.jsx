import './App.css'
import LoginSignUp from './components/LoginSignUp'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from './components/Navbar'


const DashBoard = ({title}) => {
  return (
    <div className='outer-div'>
      <div className='inner-div'>{title}</div>
    </div>
  );
}

function App() {
  
  return (
    <>
      {" "}
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<LoginSignUp />}></Route>
          <Route path="/account" element={<DashBoard title={"Logged In Successfully !"}/>}></Route>
          <Route path="/new" element={<DashBoard title={"New User Created Successfully"} />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App
