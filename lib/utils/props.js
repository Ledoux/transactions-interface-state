"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTransactionsProps = getTransactionsProps;
function getTransactionsProps(props) {
  var getFilteredElements = props.getFilteredElements,
      requestTransactions = props.requestTransactions;

  return { getFilteredElements: getFilteredElements,
    requestTransactions: requestTransactions
  };
}