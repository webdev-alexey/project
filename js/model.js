let data = {
  selectedProgram: 0.1,
  cost: 12000000,
  minPrice: 375000,
  maxPrice: 100000000,
  minPaymentPercents: 0.15,
  maxPaymentPercents: 0.9,
  paymentPercents: 0.5,
  payment: 6000000,
  getMinPayment: function () {
    return this.cost * this.minPaymentPercents;
  },
  getMaxPayment: function () {
    return this.cost * this.maxPaymentPercents;
  },
  minYear: 1,
  maxYear: 30,
  time: 10,
  programs: {
    base: 0.1,
    it: 0.047,
    gov: 0.067,
    zero: 0.12,
  },
};

let results = {
  rate: data.selectedProgram,
};

function getData() {
  return { ...data };
}

function getResults() {
  return { ...results };
}

function setData(newData) {
  if (newData.onUpdate === "radioProgram") {
    if (newData.id === "zero-value") {
      data.minPaymentPercents = 0;
    } else {
      data.minPaymentPercents = 0.15;
    }
  }

  if (newData.onUpdate === "inputCost" || newData.onUpdate === "costSlider") {
    if (newData.cost < data.minPrice) newData.cost = data.minPrice;
    if (newData.cost > data.maxPrice) newData.cost = data.maxPrice;
    if (data.payment > data.getMaxPayment()) {
      data.payment = data.getMaxPayment();
    }

    if (data.payment < data.getMinPayment()) {
      data.payment = data.getMinPayment();
    }
  }

  if (newData.onUpdate === "inputPayment") {
    newData.paymentPercents = (newData.payment * 100) / data.cost / 100;

    if (newData.paymentPercents > data.maxPaymentPercents) {
      newData.paymentPercents = data.maxPaymentPercents;
      newData.payment = data.cost * data.maxPaymentPercents;
    }

    if (newData.paymentPercents < data.minPaymentPercents) {
      newData.paymentPercents = data.minPaymentPercents;
      newData.payment = data.cost * data.minPaymentPercents;
    }
  }

  if (newData.onUpdate === "paymentSlider") {
    newData.paymentPercents = newData.paymentPercents / 100;
    data.payment = data.cost * newData.paymentPercents;
  }

  data = {
    ...data,
    ...newData,
  };

  results = {
    rate: data.selectedProgram,
  };
}
export { getData, getResults, setData };
