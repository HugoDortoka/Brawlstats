import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminHome({ onAdminLogout }) {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Admin Home</h1>
            <p>Estás en el admin home</p>
            <button onClick={() => {
                onAdminLogout(); // Llama a la función onLogout
                navigate('/adminLogin');
            }}>Cerrar sesión</button>
        </div>
    );
}

export default AdminHome;
