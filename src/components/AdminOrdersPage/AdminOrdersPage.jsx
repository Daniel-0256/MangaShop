import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    fetchAllOrders();
  }, []);

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
    <div>
      <h1>Elenco Ordini</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.OrderId}>
            <p>Data Ordine: {new Date(order.OrderDate).toLocaleDateString()}</p>
            <p>
              Stato:
              <select
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
            <p>Prezzo Totale dell'Ordine: €{order.TotalPrice.toFixed(2)}</p>
            <p>
              Nome: {order.Users.Name} {order.Users.Surname}
            </p>
            <p>Email: {order.Users.Email}</p>
            <button
              onClick={() => deleteOrder(order.OrderId)}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Elimina Ordine
            </button>
          </div>
        ))
      ) : (
        <p>Non ci sono ordini disponibili.</p>
      )}
    </div>
  );
};

export default AdminOrdersPage;
