import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
