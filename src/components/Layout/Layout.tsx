import { Route, Routes } from 'react-router';
import Header from '../Header/Header';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const PsychologistsPage = lazy(
    () => import('../../pages/PsychologistsPage/PsychologistsPage'),
);
const FavouritesPage = lazy(
    () => import('../../pages/FavouritesPage/FavouritesPage'),
);
const PrivateRoute = lazy(() => import('../PrivateRoute'));
const NotFoundPage = lazy(
    () => import('../../pages/NotFoundPage/NotFoundPage'),
);

export default function Layout() {
    return (
        <>
            <Header />
            <main>
                <Suspense fallback={<p>Loading...</p>}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route
                            path="/psychologists"
                            element={<PsychologistsPage />}
                        />
                        <Route
                            path="/favourites"
                            element={
                                <PrivateRoute
                                    component={<FavouritesPage />}
                                    redirectTo="/"
                                />
                            }
                        />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Suspense>
            </main>
        </>
    );
}
