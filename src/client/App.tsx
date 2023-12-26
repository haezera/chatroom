'use strict';

import React from "react";

const LikeButton = () => {
  let a: number = 69;
  console.log(a);

  return (
    <button 
      onClick={() => {window.alert("YIPPEE");
    }}>
      Press to Like
    </button>
  );
};

export default LikeButton;