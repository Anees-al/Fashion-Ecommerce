import { useState } from "react";
import axios from "axios";
import { backendurl } from "../App";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { useContext } from "react";

const Orders = ({ token }) => {
  const [orders, setorders] = useState([]);

  const fetchOrders = async (req, res) => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendurl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setorders(response.data.orders || []);
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statushandle=async(event,orderId)=>{
    try {
       const responce=await axios.post(backendurl +'/api/order/status',{orderId,status:event.target.value},{headers:{token}})
       if(responce.data.success){
        await fetchOrders()
       }
    } catch (error) {
      console.log(error)
      toast.error(responce.data.message)
    }
  }

  console.log(orders);
  console.log("Token sent to backend:", token);

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div>
      <h3>Orders page</h3>
      <div>
        {orders.map((order, index) => (
          <div className= " bg-slate-300 grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr] gap-3 lg:grid_cols-[1fr_1fr_1fr_1fr_1fr] items-start border-2 border-gray-600 p-5 md:p-8 my-3 text-sm ">
            <div key={index}>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span> ,
                      </p>
                    );
                  }
                })}
              </div>
              <p>{order.address.firstName + " " + order.address.lastname}</p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    "," +
                    order.address.state +
                    "," +
                    order.address.country +
                    "," +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div className="ml-12">
              <p className="text-sm">Items: {order.items.length}</p>
              <p>Payment Method:{order.paymentMethod}</p>
              <p>Payment:{order.payment ? "done" : "pending"}</p>
              <p>{new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-red-600">{order.amount}</p>
            <select onChange={(event)=>statushandle(event,order._id)} className="font-semibold p-2" value={order.status}>
              <option value="orderplaced">Order placed</option>
              <option value="packing">packing</option>
              <option value="shiped">Shipped</option>
              <option value="out of delivery">Out of delivery</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
