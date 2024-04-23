import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";
import "./AdminOrderDetails.css";

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
    <div className="container-AdminOrderDetails">
      <h1 className="h1-AdminOrderDetails">Dettagli dell'Ordine</h1>
      {orderDetails.length > 0 ? (
        <div className="container-datiProductAdminOrderDetails">
          <div className="container-datiAdminOrderDetails">
            <p className="p-AdminOrderDetails">
              Data Ordine: {new Date(orderInfo.orderDate).toLocaleDateString()}
            </p>
            <p className="p-AdminOrderDetails">Stato: {orderInfo.status}</p>
            <p className="p-AdminOrderDetails">
              Prezzo Totale dell'Ordine: €{orderInfo.totalPrice.toFixed(2)}
            </p>
            <p className="p-AdminOrderDetails">
              Indirizzo: {userDetails.address}
            </p>
            <p className="p-AdminOrderDetails">Città: {userDetails.city}</p>
            <p className="p-AdminOrderDetails">
              Provincia: {userDetails.province}
            </p>
            <p className="p-AdminOrderDetails">CAP: {userDetails.zipCode}</p>
          </div>
          {orderDetails.map((detail) => (
            <div
              className="container-productAdminOrderDetails"
              key={detail.OrderDetailId}
            >
              <div className="container-img-productAdminOrderDetails">
                <img
                  className="img-productAdminOrderDetails"
                  src={detail.Products.Image}
                  alt={detail.Products.NameProduct}
                />
              </div>
              <div className="container-p-productAdminOrderDetails">
                  <p className="p-productAdminOrderDetails">
                    Prodotto: {detail.Products.NameProduct}
                  </p>
                  <p className="p-productAdminOrderDetails">
                    Prezzo Unitario: €{detail.Products.Price}
                  </p>
                  <p className="p-productAdminOrderDetails">
                    Quantità: {detail.Quantity}
                  </p>
                  <p className="p-productAdminOrderDetails">
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
        className="button-productAdminOrderDetails"
        onClick={() => navigate(-1)}
      >
        Torna Indietro
      </button>
    </div>
  );
};

export default AdminOrderDetails;
