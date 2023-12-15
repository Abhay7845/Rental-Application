import React from "react";
import shopBag from "../../Asset/Img/shopBag.png"
import '../../Style/ShopBagAnimate.css'
import earRing from "../../Asset/Img/EarRing.png"
import braslet from "../../Asset/Img/Brasslet.png"
import neckLess from "../../Asset/Img/NeckLess.png"
import fingerRing from "../../Asset/Img/FingerRing.png"


const TestComponets = () => {

  return (
    <div className="shopBagStyle">
      <img src={earRing} class="steam" id="steam1" />
      <img src={braslet} class="steam" id="steam2" />
      <img src={neckLess} class="steam" id="steam3" />
      <img src={fingerRing} class="steam" id="steam4" />

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
