import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminNewSponsor({ onAdminLogout }) {
    const navigate = useNavigate();
    const [cif, setCif] = useState('');
    const [name, setName] = useState('');
    const [logo, setLogo] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSaveSponsor = async () => {
        if (!cif || !name || !logo) {
            setErrorMessage('Todos los campos son obligatorios.');
            return;
        }

        if (!validateCIF(cif)) {
            setErrorMessage('El CIF no es válido.');
            return;
        }

        const formData = new FormData();
        formData.append('CIF', cif);
        formData.append('name', name);
        formData.append('logo', logo);

        try {
            const response = await fetch('http://localhost:3000/newSponsor', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                window.alert('Sponsor creado correctamente');
                navigate('/adminSponsor');
            } else {
                const errorText = await response.text();
                window.alert(`Error al crear el sponsor: ${errorText}`);
            }
        } catch (error) {
            console.error('Error al crear el sponsor:', error);
            window.alert('Error al crear el sponsor');
        }

        setErrorMessage(''); // Limpiar mensaje de error al guardar correctamente
    };

    const handleRedirectSponsor = () => {
        navigate('/adminSponsor');
    };

    const validateCIF = (cif) => {
        const cifPattern = /^[ABCDEFGHJKLMNPQRSUVW]\d{7}[0-9A-J]$/;
        return cifPattern.test(cif);
    };

    return (
        <div className='containerAdmin'>
            <div className='details'>
            <h1 className='titleAdminSponsors'>New Sponsor</h1>

                <form>
                    <label>
                        CIF:
                        <input
                            type="text"
                            name="CIF"
                            value={cif}
                            onChange={(e) => setCif(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Logo:
                        <input
                            type="file"
                            name="logo"
                            onChange={(e) => setLogo(e.target.files[0])}
                            required
                        />
                    </label>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <button className='buttonAdminSponsors' type="button" onClick={handleSaveSponsor}>Save</button>
                    <button className='buttonAdminSponsors' type="button" onClick={handleRedirectSponsor}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default AdminNewSponsor;
