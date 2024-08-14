
import Nav from '../components/Navbar/Nav';
import { Outlet } from 'react-router-dom';
import Footers from '../components/Footer/Footers';

const Layout = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
            <Footers></Footers>
        </div>
    );
};

export default Layout;