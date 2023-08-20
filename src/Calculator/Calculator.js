import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Calculator.css";
import Button from "./CalButton";
import styles from './MySpecificPage.module.css';
import { useEffect } from 'react';

const Calulator = () => {
  
  useEffect(() => {
    // Apply the class to the body element
    document.body.classList.add(styles.specificPageBody);

    // Clean up when the component unmounts
    return () => {
      document.body.classList.remove(styles.specificPageBody);
    };
  }, []);

  const [Display, SetDisplay] = useState("");

  const HandleBUttonClick = (lable) => {
    
    if (lable === "=") {
      const result = eval(Display);
      SetDisplay(result);

    } else if (lable === "AC") {
      SetDisplay("");
    
    } else if (lable === "+/-") {
      SetDisplay(-Display)

    } else if (lable === "÷") {
      SetDisplay(Display + "/")

    } else {
      SetDisplay(Display + lable);
    }
  };

  const RenderButton = () => {

    const btnlbl = [
      "AC",
      "+/-",
      "%",
      "÷",
      "7",
      "8",
      "9",
      "x",
      "4",
      "5",
      "6",
      "-",
      "1",
      "2",
      "3",
      "+",
      "0",
      ".",
      "="
    ];
    
    return btnlbl.map((lable, Key) => (
      <Button
        key={Key}
        ClassName={
          (lable === "x") | (lable === "-") | (lable === "+") | (lable === "=") | (lable === "÷")
            ? "orange-btn"
            : "" | (Key > 3)
            ? "grey-btn "
            : "" | (Key < 3)
            ? "white-btn "
            : "" 
        }
        index={
          lable === "0" ? "x-btn-width" : "" | (lable === "X") ? "undo-btn-red" : ""
        }

        lable={lable}
        onClick={HandleBUttonClick}
      />
    ));
  };

  const SetNum = (event) => {};
  return (
    <div className="container main">
      <div className="container result-container">{Display}</div>
      <div className="container btn-container"> 
      {RenderButton()}
      </div>
      
    </div>
  );
};

export default Calulator;
