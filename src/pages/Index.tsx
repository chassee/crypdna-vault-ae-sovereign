import { Navigate } from 'react-router-dom';

export default function Index() {
  // always start at /auth (login/signup)
  return <Navigate to="/auth" replace />;
}
