import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '../features/auth/authStore.jsx';
import { router } from './router.jsx';

function App() {
  return <AuthProvider><RouterProvider router={router} /></AuthProvider>;
}

export default App;
