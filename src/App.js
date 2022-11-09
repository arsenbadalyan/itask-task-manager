import './Assets/Styles/index.scss';
import Header from './Layouts/Header/Header';
import Footer from './Layouts/Footer/Footer';
import Login from './Pages/Login/Login';
import { AllRoutes } from './Routes';
function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <AllRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
