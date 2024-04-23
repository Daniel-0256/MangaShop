import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";
import "./OrderDetailsUser.css";

const OrderDetailsUser = () => {
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
      .then((response) => response.json())
      .then((data) => {
        setOrderDetails(data);
        if (data.length > 0) {
          setOrderInfo({
            orderDate: data[0].Orders.OrderDate,
            status: data[0].Orders.Status,
            totalPrice: data[0].Orders.TotalPrice,
          });
          setUserDetails({
            address: data[0].UserDetails.Address,
            city: data[0].UserDetails.City,
            province: data[0].UserDetails.Province,
            zipCode: data[0].UserDetails.ZipCode,
          });
        }
      })
      .catch((error) => console.error("Failed to fetch order details:", error));
  };

  return (
    <div className="order-DetailsUser">
      <h1>Dettagli dell'Ordine</h1>
      {orderDetails.length > 0 ? (
        <div>
          <div className="orderDetailsUser-containerDati">
            <p className="orderDetailsUser-date">
              Data Ordine: {new Date(orderInfo.orderDate).toLocaleDateString()}
            </p>
            <p className="orderDetailsUser-status">Stato: {orderInfo.status}</p>
            <p className="orderDetailsUser-total">
              Prezzo Totale dell'Ordine: €{orderInfo.totalPrice.toFixed(2)}
            </p>
            <p className="orderDetailsUser-address">
              Indirizzo: {userDetails.address}
            </p>
            <p className="orderDetailsUser-city">Città: {userDetails.city}</p>
            <p className="orderDetailsUser-province">
              Provincia: {userDetails.province}
            </p>
            <p className="orderDetailsUser-zip">CAP: {userDetails.zipCode}</p>
          </div>
          {orderDetails.map((detail) => (
            <div
              key={detail.OrderDetailId}
              className="product-orderDetailsUser"
            >
              <div className="container-orderDetailsUser-image">
                  <img
                    src={detail.Products.Image}
                    alt={detail.Products.NameProduct}
                    className="orderDetailsUser-image"
                  />
              </div>
              <div className="container-puqt">
                  <p>Prodotto: {detail.Products.NameProduct}</p>
                  <p>Prezzo Unitario: €{detail.Products.Price}</p>
                  <p>Quantità: {detail.Quantity}</p>
    
                  <p>
                    Prezzo Totale: €
                    {(detail.Products.Price * detail.Quantity).toFixed(2)}
                  </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Non ci sono dettagli disponibili per questo ordine.</p>
      )}
      <button
        className="back-button-orderDetailsUser"
        onClick={() => navigate(-1)}
      >
        Torna Indietro
      </button>
    </div>
  );
};

export default OrderDetailsUser;
