import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/UseAuth";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetch(`https://localhost:44344/api/Favorites/User/${user.UserId}`)
            .then((response) => {
                if (!response.ok) {
                    setFavorites([]);
                    return;
                }
                return response.json();
            })
            .then((data) => {
                if (data) {
                    setFavorites(data);
                }
            })
            .catch(error => {
                console.error('Errore nel caricamento dei preferiti:', error);
            });
        }
    }, [user]);
    

    const removeFromFavorites = (favoriteId) => {
        fetch(`https://localhost:44344/api/Favorites/${favoriteId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                setFavorites(favorites.filter(fav => fav.FavoriteId !== favoriteId));
                alert('Prodotto rimosso dai preferiti');
            } else {
                alert('Si è verificato un errore');
            }
        })
        .catch(error => {
            console.error('Errore nella rimozione del prodotto dai preferiti:', error);
            alert('Si è verificato un errore');
        });
    };

    return (
        <div>
            <h1>I tuoi preferiti</h1>
            <div>
                {favorites.length > 0 ? (
                    favorites.map((fav) => (
                        <div key={fav.FavoriteId}>
                            <h2>{fav.Products.NameProduct}</h2>
                            <img src={fav.Products.Image} alt={fav.Products.NameProduct} style={{ maxWidth: "100%", height: "auto" }} />
                            <p>{fav.Products.Description}</p>
                            <button onClick={() => removeFromFavorites(fav.FavoriteId)}>Rimuovi dai Preferiti</button>
                            <button onClick={() => navigate(-1)}>Torna Indietro</button>
                        </div>
                    ))
                ) : (
                    <>
                    <p>Non hai prodotti nei preferiti.</p>
                    <button onClick={() => navigate(-1)}>Torna Indietro</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Favorites;
