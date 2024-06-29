import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Outlet } from "react-router-dom";
import "./App.css";
import {cursor_png, cursor_blue, cursor_red, cursor_green, cursor_pink, cursor_purple, cursor_yellow} from "../src/assets";

function App() {
  useEffect(() => {
    const cursor = document.querySelector("#cursor");
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.pageX + "px";
      cursor.style.top = e.pageY + "px";
    });
    const toolbar = document.querySelector(".ql-toolbar");
    const childs = toolbar.childNodes;
    childs.forEach(element => {
      element.style.cursor = "none";
      element.childNodes.forEach(elem => {
        elem.style.cursor = "none";
        if(elem.childNodes) {
          elem.childNodes.forEach(e => {
            e.style.cursor = "none";
          })
        }
      });
    });
    // console.log();
  }, []);

  return (
    <>
      <main>
        <Outlet />
          {/* <img id="cursor" className="w-4 h-4 fixed" src={cursor_purple} alt="cursor" /> */}
          <img id="cursor" className="w-4 h-4 fixed" src={cursor_green} alt="cursor" />
          {/* <img id="cursor" className="w-4 h-4 fixed" src={cursor_yellow} alt="cursor" />
          <img id="cursor" className="w-4 h-4 fixed" src={cursor_pink} alt="cursor" /> */}
      </main>
    </>
  );
}

export default App;
