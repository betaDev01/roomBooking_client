import ReactDOM from 'react-dom/client';
import "./assets/index.css";
import App from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);
