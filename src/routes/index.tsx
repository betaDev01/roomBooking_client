import { Container } from 'react-bootstrap';
import { BrowserRouter } from 'react-router';
import { HeaderComponent } from '../components';
import { AppRoutes } from './app-routes';
import "../assets/index.css"
 
// import { store } from './app/store'
import { Provider } from 'react-redux'
import { store } from '../reducer/store';

function App() {
  return (
    <Container className='p-0 vh-100' fluid>
      <BrowserRouter>
        <div className='parent'>
          <Provider store={store}>
          <HeaderComponent />
          <AppRoutes />
          </Provider>
        </div>
      </BrowserRouter>
    </Container>
  );
}

export default App;
