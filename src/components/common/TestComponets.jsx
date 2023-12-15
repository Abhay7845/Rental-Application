import React from "react";
import shopBag from "../../Asset/Img/shopBag.png"
import '../../Style/ShopBagAnimate.css'


const TestComponets = () => {

  return (
    <div className="shopBagStyle">
      <div class="steam" id="steam1"> </div>
      <div class="steam" id="steam2"> </div>
      <div class="steam" id="steam3"> </div>
      <div class="steam" id="steam4"> </div>

      {/* <div id="cup">
          <div id="cup-body">
            <div id="cup-shade"></div>
          </div>
          <div id="cup-handle"></div>
        </div> */}

      <img src={shopBag} id="saucer" />
      {/* <div id="shadow"></div> */}
    </div>
  );
};

export default TestComponets;
