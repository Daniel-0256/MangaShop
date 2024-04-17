import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/UseAuth';

const OrdersPageUser = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.UserId) {
            fetchOrders();
        }
    }, [user]);

    const fetchOrders = () => {
        fetch(`https://localhost:44344/api/Orders/User/${user.UserId}`)
            .then(response => response.json())
            .then(data => setOrders(data))
            .catch(error => console.error('Failed to fetch orders:', error));
    };

    const handleViewDetails = (orderId) => {
        navigate(`/order-details/${orderId}`);
    };

    return (
        <div>
            <h1>I Tuoi Ordini</h1>
            {orders.length > 0 ? (
                orders.map(order => (
                    <div key={order.OrderId} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                        <p>Data Ordine: {new Date(order.OrderDate).toLocaleDateString()}</p>
                        <p>Stato: {order.Status}</p>
                        <p>Prezzo Totale: €{order.TotalPrice.toFixed(2)}</p>
                        <button onClick={() => handleViewDetails(order.OrderId)}>Visualizza Dettagli</button>
                    </div>
                ))
            ) : (
                <p>Non hai ancora effettuato ordini.</p>
            )}
        </div>
    );
};

export default OrdersPageUser;
