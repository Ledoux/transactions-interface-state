"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTransactionsProps = getTransactionsProps;
function getTransactionsProps(props) {
  var getFilteredElements = props.getFilteredElements,
      history = props.history,
      requestTransactions = props.requestTransactions;

  return { getFilteredElements: getFilteredElements,
    history: history,
    requestTransactions: requestTransactions
  };
}