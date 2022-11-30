import React, { useEffect, useState } from "react";
import M from "materialize-css";

import PriceInput from "../components/PriceInput/PriceInput.js";
import SelectedDevises from "../components/SelectedDevises/SelectedDevises.js";
import PrintResult from "../components/PrintResult/PrintResult.js";
import Spinner from "../components/Spinner/index.js";
import config from "../config.json";

const Converter = () => {
  // Price Input
  const [priceInputValue, setPriceInputValue] = useState({
    value: 0,
    className: ""
  });

  const handleChangePriceInput = (e) => {
    const clearValue = clearNumber(e?.target?.value);
    setPriceInputValue({
      className: classManage(clearValue),
      value: clearValue
    });
  };

  // From Selector
  const [fromSelectDevicesValue, setFromSelectDevicesValue] = useState("EUR");

  const handleChangeFromSelectDevices = (e) => {
    setStateConvert({ convert: 0 });
    setFromSelectDevicesValue(e?.target?.value);
  };

  // To Selector
  const [toSelectDevicesValue, setToSelectDevicesValue] = useState("EUR");

  const handleChangeToSelectDevices = (e) => {
    setStateConvert({ convert: 0 });
    setToSelectDevicesValue(e?.target?.value);
  };

  //Call API
  const [stateConvert, setStateConvert] = useState({
    isLoading: false,
    convert: 0
  });
  const { convert, isLoading } = stateConvert;

  useEffect(() => {
    //resolve amount bug
    M.updateTextFields();

    const fetchConvert = async () => {
      setStateConvert({ isLoading: true });
      const Alldata = await fetch(
        `${config.URL}&base_currency=${fromSelectDevicesValue}&currencies=${toSelectDevicesValue}`
      );
      const data = await Alldata.json();
      setStateConvert({
        convert: data.data[toSelectDevicesValue].value,
        isLoading: false
      });
    };
    //Condition to convert
    if (
      stateConvert.convert === 0 &&
      priceInputValue.value > 0 &&
      priceInputValue.className !== "invalid" &&
      fromSelectDevicesValue !== toSelectDevicesValue
    ) {
      fetchConvert();
    } else if (
      fromSelectDevicesValue === toSelectDevicesValue &&
      priceInputValue.value > 0
    ) {
      setStateConvert({ convert: 1 });
    }
  }, [priceInputValue, fromSelectDevicesValue, toSelectDevicesValue]);

  const classManage = (number) => {
    if (typeof number !== "string") {
      return "valid";
    } else {
      return "invalid";
    }
  };

  const clearNumber = (number) => {
    if (/^[+-]?\d+(\.\d+)?$/.test(number)) {
      return number * 1;
    } else if (number[0] === undefined) {
      return 0;
    } else {
      return number;
    }
  };

  const calculateConversion = (amount, devices) =>
    isNaN(amount * devices) ? 0 : amount * devices;

  return (
    <div className="container">
      <div className="row">
        <h3>Convertisseur</h3>
        <div className="col s8">
          <div className="row">
            <div className="col s6">
              <SelectedDevises
                label={"From"}
                value={fromSelectDevicesValue}
                onChange={handleChangeFromSelectDevices}
              />
            </div>
            <div className="col s6">
              <SelectedDevises
                label={"To"}
                value={toSelectDevicesValue}
                onChange={handleChangeToSelectDevices}
              />
            </div>
            <div className="row">
              <PriceInput
                value={priceInputValue.value}
                onChange={handleChangePriceInput}
                className={priceInputValue.className}
              />
              <div className="input-field col s12">
                <h5>
                  Result :
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <PrintResult
                      inputValue={calculateConversion(
                        convert,
                        priceInputValue.value
                      )}
                    />
                  )}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Converter;
