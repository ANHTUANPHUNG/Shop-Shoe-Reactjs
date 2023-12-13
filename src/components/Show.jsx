import React, { Fragment, useState } from "react";
import RadioFunction from "./checkFunction/SelectGroup";
import CheckboxFunction from "./checkFunction/Checkbox";
import CheckboxClass from "./checkClass/Checkbox";
import RadioGroup from "./checkClass/SelectGroup";
import TwoWayBinding from "./TwoWayBinding/TwoWayBinding";
import TwoWayBindingObject from "./TwoWayBinding/TwoWayBindingObject";
import InitState from "./InitStateCallback";
import PlayListApp from "./PlaylistApp";
import ProductShop from "./shopShoe/productClient/ProductShop";
function ShowFunction() {
  const [showCheckboxFunction, setShowCheckboxFunction] = useState(false);
  const [showRadioFunction, setShowRadioFunction] = useState(false);
  const [showCheckboxClass, setShowCheckboxClass] = useState(false);
  const [showRadioClass, setShowRadioClass] = useState(false);
  const [twoWayBinding, setTwoWayBinding] = useState(false);
  const [twoWayBindingObject, setTwoWayBindingObject] = useState(false);
  const [initial, setInitial] = useState(false);
  const [playListApp, setPlayListApp] = useState(false);
  const [productShop, setProductShop] = useState(false);

  const checkHandle = (
    showCheckboxFunction,
    showRadioFunction,
    showCheckboxClass,
    showRadioClass,
    twoWayBinding,
    twoWayBindingObject,
    initial,
    playListApp,
    productShop
  ) => {
    setShowCheckboxFunction(showCheckboxFunction);
    setShowRadioFunction(showRadioFunction);
    setShowCheckboxClass(showCheckboxClass);
    setShowRadioClass(showRadioClass);
    setTwoWayBinding(twoWayBinding);
    setTwoWayBindingObject(twoWayBindingObject);
    setInitial(initial);
    setPlayListApp(playListApp);
    setProductShop(productShop);
  };

  const handleCheckboxButtonClick = () => {
    checkHandle(true, false, false, false, false, false, false, false, false);
  };
  const handleCheckboxClass = () => {
    checkHandle(false, false, true, false, false, false, false, false, false);
  };
  const handleRadioButtonClick = () => {
    checkHandle(false, true, false, false, false, false, false, false, false);
  };
  const handleRadioClass = () => {
    checkHandle(false, false, false, true, false, false, false, false, false);
  };
  const handleTwoWayBinding = () => {
    checkHandle(false, false, false, false, true, false, false, false, false);
  };
  const handleTwoWayBindingObject = () => {
    checkHandle(false, false, false, false, false, true, false, false, false);
  };
  const handleInitialState = () => {
    checkHandle(false, false, false, false, false, false, true, false, false);
  };
  const handlePlayListApp = () => {
    checkHandle(false, false, false, false, false, false, false, true, false);
  };
  const handleShowProductShop = () => {
    checkHandle(false, false, false, false, false, false, false, false, true);
  };
  return (
    <Fragment>
      {!productShop && (
        <div className="row" style={{ height: "100vh" }}>
          <div
            className="btn-group col-3 d-flex flex-column"
            style={{ backgroundColor: "#7ec362", borderRight: "1px solid black" }}
          >
            <div>
              <button
                className="btn btn-primary m-3"
                type="button"
                onClick={handleCheckboxButtonClick}
              >
                CheckboxFunction
              </button>
            </div>
            <div>
              <button
                className="btn btn-primary m-3 mt-0"
                type="button"
                onClick={handleRadioButtonClick}
              >
                RadioFunction
              </button>
            </div>
            <div>
              <button
                className="btn btn-primary m-3 mt-0"
                type="button"
                onClick={handleCheckboxClass}
              >
                CheckboxClass
              </button>
            </div>
            <div>
              <button className="btn btn-primary m-3 mt-0" type="button" onClick={handleRadioClass}>
                RadioClass
              </button>
            </div>
            <div>
              <button
                className="btn btn-primary m-3 mt-0"
                type="button"
                onClick={handleTwoWayBinding}
              >
                TwoWayBinding
              </button>
            </div>
            <div>
              <button
                className="btn btn-primary m-3 mt-0"
                type="button"
                onClick={handleTwoWayBindingObject}
              >
                TwoWayBindingObject
              </button>
            </div>
            <div>
              <button
                className="btn btn-primary m-3 mt-0"
                type="button"
                onClick={handleInitialState}
              >
                InitialState
              </button>
            </div>
            <div>
              <button
                className="btn btn-primary m-3 mt-0"
                type="button"
                onClick={handlePlayListApp}
              >
                PlayListApp
              </button>
            </div>
            <div>
              <button
                className="btn btn-primary m-3 mt-0"
                type="button"
                onClick={handleShowProductShop}
              >
                ProductShop
              </button>
            </div>
          </div>
          <div className="col-9">
            {showCheckboxFunction && <CheckboxFunction />}
            {showRadioFunction && <RadioFunction />}
            {showCheckboxClass && <CheckboxClass />}
            {showRadioClass && <RadioGroup />}
            {twoWayBinding && <TwoWayBinding />}
            {twoWayBindingObject && <TwoWayBindingObject />}
            {initial && <InitState />}
            {playListApp && <PlayListApp />}
          </div>
        </div>
      )}
      <Fragment>{productShop && <ProductShop />}</Fragment>
    </Fragment>
  );
}

export default ShowFunction;
