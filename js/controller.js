import * as Model from "./model.js";
import programs from "./view/radioPrograms.js";
import updateResultsView from "./view/updateResultsView.js";
import { updateMinPercents } from "./view/utils.js";

import costInput from "./view/costInput.js";
import costRange from "./view/costRange.js";

import paymentInput from "./view/paymentInput.js";

window.onload = function () {
  const getData = Model.getData;

  programs(getData);

  const cleaveCost = costInput(getData);
  const sliderCost = costRange(getData);

  const cleavePayment = paymentInput(getData);

  document.addEventListener("updateForm", (e) => {
    Model.setData(e.detail);

    const data = Model.getData();
    const results = Model.getResults();

    updateFormAndSliders(data);

    updateResultsView(results);
  });

  function updateFormAndSliders(data) {
    if (data.onUpdate === "radioProgram") {
      updateMinPercents(data);
    }

    if (data.onUpdate !== "inputCost") {
      cleaveCost.setRawValue(data.cost);
    }

    if (data.onUpdate !== "costSlider") {
      sliderCost.noUiSlider.set(data.cost);
    }

    if (data.onUpdate !== "inputPayment") {
      cleavePayment.setRawValue(data.payment);
    }
  }
};
