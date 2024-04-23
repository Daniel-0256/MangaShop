import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";
import "./OrdersUser.css";

const OrdersUser = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.UserId) {
      fetchOrders();
    }
  }, [user]);

  useEffect(() => {
    if (orders.length) {
      filterOrders();
    }
  }, [month, year, orders]);

  const fetchOrders = () => {
    fetch(`https://localhost:44344/api/Orders/User/${user.UserId}`)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setFilteredOrders(data);
      })
      .catch((error) => console.error("Failed to fetch orders:", error));
  };

  const handleViewDetails = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };

  const filterOrders = () => {
    if (!month && !year) {
      setFilteredOrders(orders);
      return;
    }

    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.OrderDate);
      return (
        (!month || orderDate.getMonth() + 1 === parseInt(month)) &&
        (!year || orderDate.getFullYear() === parseInt(year))
      );
    });

    setFilteredOrders(filtered);
  };

  return (
    <div>
      <h1 className="h1-ordersUser">I Tuoi Ordini</h1>
      <div className="filter-containerOrdersUser">
        <select
          className="month-selectOrdersUser"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="">Seleziona Mese</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("it", { month: "long" })}
            </option>
          ))}
        </select>
        <select
          className="year-selectOrdersUser"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">Seleziona Anno</option>
          {Array.from({ length: new Date().getFullYear() - 2019 }, (_, i) => (
            <option key={i} value={2020 + i}>
              {2020 + i}
            </option>
          ))}
        </select>
      </div>
      {filteredOrders.length > 0 ? (
        <table className="table-ordersUser">
          <thead>
            <tr>
              <th>Data Ordine</th>
              <th>Stato</th>
              <th>Prezzo Totale</th>
              <th>Dettagli</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.OrderId}>
                <td data-label="Data Ordine">
                  {new Date(order.OrderDate).toLocaleDateString()}
                </td>
                <td data-label="Stato">{order.Status}</td>
                <td data-label="Prezzo Totale">
                  €{order.TotalPrice.toFixed(2)}
                </td>
                <td data-label="Dettagli">
                  <button
                    className="btn-detailsOrdersUser"
                    onClick={() => handleViewDetails(order.OrderId)}
                  >
                    Visualizza Dettagli
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Non hai ancora effettuato ordini.</p>
      )}
    </div>
  );
};

export default OrdersUser;
