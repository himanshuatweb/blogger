import { useRoutes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Router from '@/routes/Router'

function App() {
  const routing = useRoutes(Router());
  return (
    <>
      {routing}
      <Toaster />
    </>
  )
}

export default App
