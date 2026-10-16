import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell.jsx';
import { useAuth } from '../features/auth/authStore.jsx';
import { SignInPage } from '../features/auth/pages/SignInPage.jsx';
import { DashboardPage } from '../features/dashboard/pages/DashboardPage.jsx';
import { EmployeeProfilePage } from '../features/employees/pages/EmployeeProfilePage.jsx';
import { EmployeesPage } from '../features/employees/pages/EmployeesPage.jsx';
import { HelpPage } from '../features/help/pages/HelpPage.jsx';
import { OrganizationPage } from '../features/organization/pages/OrganizationPage.jsx';
import { PlaceholderPage } from '../features/shared/pages/PlaceholderPage.jsx';
import { SettingsPage } from '../features/settings/pages/SettingsPage.jsx';
import { ROUTES } from './routes.js';

function ProtectedRoute() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to={ROUTES.signIn} replace />;
}

function PublicRoute() {
  const { user } = useAuth();
  return user ? <Navigate to={ROUTES.dashboard} replace /> : <Outlet />;
}

export const router = createBrowserRouter([
  { element: <PublicRoute />, children: [{ path: ROUTES.signIn, element: <SignInPage /> }] },
  {
    element: <ProtectedRoute />,
    children: [{
      element: <AppShell />,
      children: [
        { index: true, element: <Navigate to={ROUTES.dashboard} replace /> },
        { path: ROUTES.dashboard, element: <DashboardPage /> },
        { path: ROUTES.posts, element: <PlaceholderPage title="Posts" description="The posts workspace is being prepared." /> },
        { path: ROUTES.employees, element: <EmployeesPage /> },
        { path: '/employees/:memberId', element: <EmployeeProfilePage /> },
        { path: ROUTES.organization, element: <OrganizationPage /> },
        { path: ROUTES.settings, element: <SettingsPage /> },
        { path: ROUTES.help, element: <HelpPage /> },
        { path: ROUTES.assistant, element: <PlaceholderPage title="179 Assist" description="Use the assistant panel to get help from 179 Assist." /> },
        { path: '*', element: <Navigate to={ROUTES.dashboard} replace /> },
      ],
    }],
  },
  { path: '*', element: <Navigate to={ROUTES.signIn} replace /> },
]);
