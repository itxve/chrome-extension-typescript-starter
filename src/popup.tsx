import React from "react";
import ReactDOM from "react-dom";
import PopupApp from "@com/PopupApp";
import "@assets/gloab.less";

const Popup = () => {
  return (
    <div className="popup">
      <PopupApp />
    </div>
  );
};

ReactDOM.render(<Popup />, document.getElementById("root"));
