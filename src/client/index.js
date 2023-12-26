'use strict';

import React from "react";
import ReactDOM from "react-dom";

import LikeButton from "./App.tsx";

const domContainer = document.querySelector('#main');
const root = ReactDOM.createRoot(domContainer);
root.render(React.createElement(LikeButton));