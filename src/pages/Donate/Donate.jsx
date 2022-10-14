import React from "react";


import "./Donate.scss";
const Donate = () => {

 
  return (
    <>
      <div className="donation">
        <h1 className="slogan">
          Actions <span>speak</span> louder than <span>words</span>! Give today.
        </h1>
        <div className="pay-button">
       <a   target="_blank"
              rel="noopener noreferrer"
               href="https://www.buymeacoffee.com/Ani.Web"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=Ani.Web&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff" /></a>
          <div className="razor-pay">
            <a
              href="https://rzp.io/l/aniweb"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://financialit.net/sites/default/files/razorpay_0.jpg"
                alt=""
              />
            </a>
          </div>
       
        </div>
      </div>
    </>
  );
};

export default Donate;
