import { useContext } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext'; // Import theme context
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
    const { token, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext); // Use theme state
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Navbar bg={theme === 'dark' ? 'dark' : 'primary'} variant="dark" expand="lg" className="mb-4 shadow-sm">
            <Container>
                <Navbar.Brand href="#">Bidyut JWT Authentication Task</Navbar.Brand>
                
                <Navbar.Collapse className="justify-content-end gap-2">
                    {/* Theme Toggle Button */}
                    <Button 
                        variant={theme === 'dark' ? 'outline-light' : 'light'} 
                        onClick={toggleTheme}
                        title="Toggle Theme"
                    >
                        {theme === 'dark' ? 'Light' : 'Dark'}
                    </Button>

                    {/* Logout Button */}
                    {token && (
                        <Button variant={theme === 'dark' ? 'outline-danger' : 'danger'} onClick={handleLogout}>
                            Logout
                        </Button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;