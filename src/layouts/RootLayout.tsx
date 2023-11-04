import Footer from '@/components/features/Footer';
import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
export default RootLayout;
