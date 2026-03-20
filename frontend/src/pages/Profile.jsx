import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
            <h2>Protected Profile Area</h2>
            {user ? (
                <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc' }}>
                    <p><strong>Welcome!</strong></p>
                    <p>Your authenticated email is: {user.email}</p>
                    <p>Your Database ID is: {user.id}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
            <button onClick={handleLogout} style={{ marginTop: '20px' }}>Logout</button>
        </div>
    );
};

export default Profile;