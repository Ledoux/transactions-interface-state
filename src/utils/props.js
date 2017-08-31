export function getTransactionsProps (props) {
  const { getFilteredElements,
    history,
    requestTransactions
  } = props
  return { getFilteredElements,
    history,
    requestTransactions
  }
}
