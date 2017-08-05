"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTransactionsProps = getTransactionsProps;
function getTransactionsProps(props) {
  var getFilteredElements = props.getFilteredElements,
      history = props.history,
      isEdit = props.isEdit,
      isNew = props.isNew,
      requestTransactions = props.requestTransactions;

  return { getFilteredElements: getFilteredElements,
    history: history,
    isEdit: isEdit,
    isNew: isNew,
    requestTransactions: requestTransactions
  };
}