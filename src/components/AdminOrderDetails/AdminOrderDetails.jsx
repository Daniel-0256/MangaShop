import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/UseAuth';

const AdminOrderDetails = () => {
    const { user } = useAuth();
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState([]);
    const [orderInfo, setOrderInfo] = useState({});
    const [userDetails, setUserDetails] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrderDetails();
    }, [orderId]);

    const fetchOrderDetails = () => {
        fetch(`https://localhost:44344/api/OrderDetails/Order/${orderId}`)
            .then(response => response.json())
            .then(data => {
                setOrderDetails(data);
                if (data.length > 0) {
                    setOrderInfo({
                        orderDate: data[0].Orders.OrderDate,
                        status: data[0].Orders.Status,
                        totalPrice: data[0].Orders.TotalPrice
                    });
                    setUserDetails({
                        address: data[0].UserDetails.Address,
                        city: data[0].UserDetails.City,
                        province: data[0].UserDetails.Province,
                        zipCode: data[0].UserDetails.ZipCode
                    });
                }
            })
            .catch(error => console.error('Failed to fetch order details:', error));
    };

    return (
        <div>
            <h1>Dettagli dell'Ordine</h1>
            {orderDetails.length > 0 ? (
                <div>
                    <p>Data Ordine: {new Date(orderInfo.orderDate).toLocaleDateString()}</p>
                    <p>Stato: {orderInfo.status}</p>
                    <p>Prezzo Totale dell'Ordine: €{orderInfo.totalPrice.toFixed(2)}</p>
                    <p>Indirizzo: {userDetails.address}</p>
                    <p>Città: {userDetails.city}</p>
                    <p>Provincia: {userDetails.province}</p>
                    <p>CAP: {userDetails.zipCode}</p>
                    {orderDetails.map(detail => (
                        <div key={detail.OrderDetailId} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                            <p>Prodotto: {detail.Products.NameProduct}</p>
                            <p>Prezzo Unitario: €{detail.Products.Price}</p>
                            <p>Quantità: {detail.Quantity}</p>
                            <img src={detail.Products.Image} alt={detail.Products.NameProduct} style={{ maxWidth: '100px', height: 'auto' }} />
                            <p>Prezzo Totale: €{(detail.Products.Price * detail.Quantity).toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Non ci sono dettagli disponibili per questo ordine.</p>
            )}
            <button onClick={() => navigate(-1)}>Torna Indietro</button>
        </div>
    );
};

export default AdminOrderDetails;
