import React from "react";
import "./error.scss";
import Footer from "../../components/Footer/Footer"
const error = () => {
  return (
    <>
      <div className="error-page">
      <div class="site">
	<div className="sketch">
		<div className="bee-sketch red"></div>
		<div className="bee-sketch blue"></div>
	</div>

<h1 className="error-title">404:
	<small>Players Not Found</small></h1>
</div>
</div>
      <Footer/>
    </>
  );
};

export default error;
