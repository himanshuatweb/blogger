import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';


/* ****** Routes *****  */
import Loadable from '@/layout/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('@/layout/FullLayout')))
const BlankLayout = Loadable(lazy(() => import('@/layout/BlankLayout')))

/* ******Authentication and Others**** */
const Login = Loadable(lazy(() => import('@/views/user/Login')));
const Register = Loadable(lazy(() => import('@/views/user/Register')));
const ForgotPassword = Loadable(lazy(() => import('@/views/user/ForgotPassword')));
const Error = Loadable(lazy(() => import('@/views/Error')));
const VerifyUser = Loadable(lazy(() => import('@/views/user/Verify')))
const ResetPassword = Loadable(lazy(() => import('@/views/user/ResetPassword')))
const AuthError = Loadable(lazy(() => import('@/views/user/AuthError')));

const AllRoutes = () => {
    const user = useAppSelector((state) => state.user);
    const { userType, isVerified } = user;

    const Router = [
        {
            path: '/',
            element: <FullLayout />,
            children: [
                {
                    index: true,
                    element: (userType === "user" && isVerified) ? <Navigate to="/home" /> : <Navigate to="/dashboard" />,
                },
                {
                    path: '/dashboard',
                    exact: true,
                    element: <>Dashboard Component</>
                },
                {
                    path: '/home',
                    exact: true,
                    element: <>Home Component Here UPdated</>,
                },
                { path: '*', element: <>Coming Soon</> },
            ],
        },

        {
            path: '/',
            element: <BlankLayout />,
            children: [
                { path: '/login', exact: true, element: <Login /> },
                { path: '/register', exact: true, element: <Register /> },
                { path: '/verify', exact: true, element: <VerifyUser /> },
                { path: '/auth-error', exact: true, element: <AuthError /> },
                { path: '/forgot-password', exact: true, element: <ForgotPassword /> },
                { path: '/resetpassword/:resettoken', exact: true, element: <ResetPassword /> },
                { path: '/404', exact: true, element: <Error /> },
                { path: '*', element: <>You have lost...</> },
            ],
        },
    ];

    return Router;
};

export default AllRoutes;
