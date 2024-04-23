import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";
import "./AdminOrders.css";

const AdminOrders = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchMonth, setSearchMonth] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  useEffect(() => {
    fetchAllOrders();
  }, []);

  useEffect(() => {
    const results = orders.filter((order) => {
      const fullName = `${order.Users.Name.toLowerCase()} ${order.Users.Surname.toLowerCase()}`;
      const matchesNameSurname = fullName.includes(searchName.toLowerCase());
      const matchesEmail = order.Users.Email.toLowerCase().includes(
        searchEmail.toLowerCase()
      );
      const matchesMonth = searchMonth
        ? new Date(order.OrderDate).getMonth() + 1 === parseInt(searchMonth)
        : true;
      const matchesYear = searchYear
        ? new Date(order.OrderDate).getFullYear() === parseInt(searchYear)
        : true;
      const matchesStatus = searchStatus ? order.Status === searchStatus : true;

      return (
        matchesNameSurname &&
        matchesEmail &&
        matchesMonth &&
        matchesYear &&
        matchesStatus
      );
    });
    setFilteredOrders(results);
  }, [searchName, searchEmail, searchMonth, searchYear, searchStatus, orders]);

  const fetchAllOrders = () => {
    fetch("https://localhost:44344/api/Orders")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Failed to fetch orders:", error));
  };

  if (!isLoggedIn || user.Role !== "Admin") {
    navigate("/");
    return null;
  }

  const updateOrderStatus = (orderId, newStatus) => {
    fetch(`https://localhost:44344/api/Orders/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ OrderId: orderId, Status: newStatus }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to update order status: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        if (text) {
          const updatedOrder = JSON.parse(text);
          setOrders(
            orders.map((order) =>
              order.OrderId === orderId
                ? { ...order, Status: newStatus }
                : order
            )
          );
        } else {
          setOrders(
            orders.map((order) =>
              order.OrderId === orderId
                ? { ...order, Status: newStatus }
                : order
            )
          );
        }
        alert("Stato dell'ordine aggiornato con successo.");
      })
      .catch((error) => console.error("Error updating order status:", error));
  };

  const deleteOrder = (orderId) => {
    fetch(`https://localhost:44344/api/Orders/${orderId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setOrders(orders.filter((order) => order.OrderId !== orderId));
          alert("Ordine eliminato con successo.");
        } else {
          throw new Error("Failed to delete order");
        }
      })
      .catch((error) => console.error("Error deleting order:", error));
  };

  return (
    <div className="ordersAdmin-list">
      <h1 className="h1-OrdersAdmin">Elenco Ordini</h1>
      <div className="search-fieldsOrdersAdmin">
        <input
          type="text"
          className="input-OrdersAdmin"
          placeholder="Cerca per nome e cognome"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          className="input-OrdersAdmin"
          placeholder="Cerca per email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <select
          className="month-selectOrdersAdmin"
          value={searchMonth}
          onChange={(e) => setSearchMonth(e.target.value)}
        >
          <option value="">Seleziona Mese</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("it", { month: "long" })}
            </option>
          ))}
        </select>
        <select
          className="year-selectOrdersAdmin"
          value={searchYear}
          onChange={(e) => setSearchYear(e.target.value)}
        >
          <option value="">Seleziona Anno</option>
          {Array.from({ length: new Date().getFullYear() - 2019 }, (_, i) => (
            <option key={i} value={2020 + i}>
              {2020 + i}
            </option>
          ))}
        </select>
        <select
          className="status-selectOrdersAdmin"
          value={searchStatus}
          onChange={(e) => setSearchStatus(e.target.value)}
        >
          <option value="">Tutti gli stati</option>
          <option value="In attesa">In attesa</option>
          <option value="In lavorazione">In lavorazione</option>
          <option value="Spedito">Spedito</option>
          <option value="Consegnato">Consegnato</option>
        </select>
      </div>

      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <div key={order.OrderId} className="ordersAdmin-item">
            <p>
              <strong>Data Ordine:</strong>{" "}
              {new Date(order.OrderDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Stato:</strong>
              <select
                className="status-selectOrdersAdmin"
                value={order.Status}
                onChange={(e) =>
                  updateOrderStatus(order.OrderId, e.target.value)
                }
              >
                <option value="In attesa">In attesa</option>
                <option value="In lavorazione">In lavorazione</option>
                <option value="Spedito">Spedito</option>
                <option value="Consegnato">Consegnato</option>
              </select>
            </p>
            <p>
              <strong>Prezzo Totale dell'Ordine:</strong> €
              {order.TotalPrice.toFixed(2)}
            </p>
            <p>
              <strong>Nome:</strong> {order.Users.Name} {order.Users.Surname}
            </p>
            <p>
              <strong>Email:</strong> {order.Users.Email}
            </p>
            <div className="container-buttonOrdersAdmin">
              <button
                className="details-buttonOrdersAdmin"
                onClick={() => navigate(`/orderdetails-admin/${order.OrderId}`)}
              >
                Visualizza Dettagli
              </button>
              <button
                className="delete-buttonOrdersAdmin"
                onClick={() => deleteOrder(order.OrderId)}
              >
                Elimina Ordine
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Non ci sono ordini disponibili.</p>
      )}
    </div>
  );
};

export default AdminOrders;
