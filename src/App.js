import './assets/styles/index.scss';
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';
import { AllRoutes } from './routes/index';
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
