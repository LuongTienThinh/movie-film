import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { pages } from './pages';
import { ILazyComponent } from 'interfaces';

const LazyPage = ({ title, component: Component, ...props }: ILazyComponent) => {
  document.title = title || '';

  return <Component {...props} />;
};

const RouterPages = () => {
  return (
    <Router>
      <Routes>
        {pages.map(({ path, component, title }, index) => (
          <Route key={index} path={path} element={<LazyPage title={title} component={component} />} />
        ))}
      </Routes>
    </Router>
  );
};

export default RouterPages;
