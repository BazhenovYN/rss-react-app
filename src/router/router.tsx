import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import ErrorPage from '@/pages/ErrorPage';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound/NotFound';
import DetailCard from '@/components/features/DetailCard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route path="/" element={<Home />}>
        <Route path="characters/:id" element={<DetailCard />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
