import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
      logOut()
          .then(() => {
              Swal.fire({
                  title: 'Success!',
                  text: 'LogOut successfully',
                  icon: 'success',
                  confirmButtonText: 'Cool'
              })
          })
          .catch(error => {
              console.log(error);
          })
  }
    return (
        <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <img src="logo.png" className="mr-10 h-20 sm:h-9 rounded-lg" alt="Logo" />
      </Navbar.Brand>
     
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
      </Navbar.Collapse>

      {
        user? 
        <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={user.photoURL} rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{user.displayName}</span>
            <span className="block truncate text-sm font-medium">{user.email}</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogOut}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      :
      <Button>
                <NavLink to="/login">Login</NavLink>
      </Button>

      }
    </Navbar>
    );
};

export default Nav;