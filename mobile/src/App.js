import React from 'react';
import { useSelector } from 'react-redux';
import createRoutes from './routes';

export default function App() {
    const isSigned = useSelector(state => state.auth.signed);
    const Routes = createRoutes(isSigned);

    return <Routes />;
}
