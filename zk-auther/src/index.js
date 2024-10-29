import { Provider } from "./components/ui/provider"// or "@chakra-ui/system" if needed
import { createRoot } from 'react-dom/client';
import App from './App';


const root = createRoot(document.getElementById('root'));
root.render(
  <Provider>
    <App />
  </Provider>
);
