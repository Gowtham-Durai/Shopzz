
import './App.css'
import Action from './Redux/actionType';
import HomePage from './Pages/Home/homePage';
import 'boxicons/css/boxicons.min.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Details from './Pages/Details/Details';
import Cart from './Pages/Cart/cart';
import Base from './Pages/Base/Base';


function App() {

 

  return (
    <>      
          <Router>  
              <Navbar />  
              
              <Routes>
                <Route path='/search' element={<HomePage/>} />
                <Route path="/detail/:id" element={<Details/>} />
                <Route path='/cart' element={<Cart/>}/>
                <Route path="*" element={<Base />} />
              </Routes>

              <Footer />  
    </Router>
    </>

  )
}

export default App
