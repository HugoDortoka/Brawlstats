import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function AdminSponsor({ onAdminLogout }) {
    const [sponsors, setSponsors] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSponsor, setCurrentSponsor] = useState({ CIF: '', nom: '' });
    
    const navigate = useNavigate();
    useEffect(() => {
        fetch('http://localhost:3000/sponsors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('No se pudo completar la solicitud');
          }
          return response.json();
        })
        .then(data => {
          // Si la solicitud es exitosa, establecer los datos de los sponsors
          setSponsors(data);
        })
        .catch(error => {
          // Si hay un error, establecer el error
          console.error('Error fetching sponsors:', error);
        });
      }, []);

    const handleEditClick = (sponsor) => {
        setIsEditing(true);
        setCurrentSponsor(sponsor);
    };

    const handleDeleteClick = (CIF, imageName) => {
        fetch(`http://localhost:3000/sponsors/${CIF}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo completar la solicitud de eliminación');
                }
                deleteLocalImage(imageName);
                setSponsors(sponsors.filter(sponsor => sponsor.CIF !== CIF));
            })
            .catch(error => {
                console.error('Error deleting sponsor:', error);
            });
    };

    const deleteLocalImage = (imageName) => {
        const imagePath = `client/src/assets/images/${imageName}`;
        fetch(imagePath, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo eliminar la imagen localmente');
            }
            console.log('Imagen eliminada');
        })
        .catch(error => {
            console.error('Error deleting image:', error);
        });
    };

    const handleSaveEdit = () => {
        fetch(`http://localhost:3000/sponsors/${currentSponsor.CIF}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentSponsor)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo completar la solicitud de edición');
                }
                return response.json();
            })
            .then(updatedSponsor => {
                setSponsors(sponsors.map(sponsor => 
                    sponsor.CIF === updatedSponsor.CIF ? updatedSponsor : sponsor
                ));
                setIsEditing(false);
                setCurrentSponsor({ CIF: '', nom: '' });
            })
            .catch(error => {
                console.error('Error updating sponsor:', error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentSponsor({ ...currentSponsor, [name]: value });
    };

    return (
        <div>
            <h1>Admin Sponsor</h1>
            <button onClick={() => {
                onAdminLogout(); // Llama a la función onLogout
                navigate('/adminLogin');
            }}>Cerrar sesión</button>
            <table>
                <thead>
                    <tr>
                        <th>CIF</th>
                        <th>Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {sponsors.map(sponsor => (
                        <tr>
                            <td>{sponsor.CIF}</td>
                            <td>{sponsor.nom}</td>
                            <td>
                                <button onClick={() => handleEditClick(sponsor)}>Editar</button>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteClick(sponsor.CIF, sponsor.logo)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isEditing && (
                <div>
                    <h2>Edit Sponsor</h2>
                    <form onSubmit={handleSaveEdit}>
                        <label>
                            CIF:
                            <input
                                type="text"
                                name="CIF"
                                value={currentSponsor.CIF}
                                onChange={handleInputChange}
                                disabled
                            />
                        </label>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="nom"
                                value={currentSponsor.nom}
                                onChange={handleInputChange}
                            />
                        </label>
                        <button type="button" onClick={handleSaveEdit}>Save</button>
                        <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default AdminSponsor;
