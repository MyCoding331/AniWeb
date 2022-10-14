import React from "react";
import { GrFormClose } from "react-icons/gr";
import {Link } from "react-router-dom"
import "./Thanx.scss"
const Thanx = () => {
  return (
    <>
      <div className="payment-success">
       

      <span className="success">✔</span> 
          <h2 class="title">Payment Successful</h2>

          <img  class="main-img"
            src="https://financialit.net/sites/default/files/razorpay_0.jpg"
            alt=""
          />
        
        
      
       
      </div>
      <div className="return">
        <Link
        to="/home"
        >
<button>

        Go to homepage
</button>
        </Link>
      </div>
    </>
  );
};

export default Thanx;
