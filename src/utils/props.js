export function getTransactionsProps (props) {
  const { getFilteredElements,
    history,
    isEdit,
    isNew,
    requestTransactions
  } = props
  return { getFilteredElements,
    history,
    isEdit,
    isNew,
    requestTransactions
  }
}
