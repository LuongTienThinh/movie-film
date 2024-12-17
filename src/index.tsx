import axios from 'axios';
import { Suspense, lazy, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

import RouterPages from 'routes';
import { ThemeContextProvider } from 'contexts/themeContext';
import { AuthContextProvider } from 'contexts/authContext';
import { Loading } from 'components';

// axios.defaults.baseURL = 'http://127.0.0.1:8000';
// axios.defaults.withCredentials = true;

// const accessToken = localStorage.getItem('X-CSRF-TOKEN');
// if (accessToken) {
//   axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
// }

axios.interceptors.request.use((config) => {
  config.headers['Access-Control-Allow-Origin'] = '*';
  // config.baseURL = 'https://0bca-2402-800-63a6-99a2-d435-199b-36f2-a555.ngrok-free.app';
  config.baseURL = 'https://animetop.id.vn/animetop';
  config.withCredentials = true;

  return config;
});

const Styling = lazy(() => import('./styling'));
const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  let timing = performance.now();

  useEffect(() => {
    if (!!Styling) {
      timing = performance.now() - timing;
      setTimeout(() => {
        setIsLoading(false);
      }, timing);
    }
  }, []);

  return (
    <Suspense fallback={<Loading timingData={timing} isLoading={isLoading || true}></Loading>}>
      <Styling>
        <AuthContextProvider>
          <ThemeContextProvider>
            <RouterPages />
          </ThemeContextProvider>
        </AuthContextProvider>
      </Styling>
    </Suspense>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);
