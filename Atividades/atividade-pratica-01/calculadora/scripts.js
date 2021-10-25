function putElement(value) {
  const operationsP = document.getElementById('display-operation')
  operationsP.innerText += value
}

function clearInput() {
  const operationsP = document.getElementById('display-operation')
  operationsP.innerText = ''
}

function calculateResult() {
  const operationsP = document.getElementById('display-operation')
  const resultsP = document.getElementById('display-result')
  try {
    resultsP.innerText = mexp.eval(operationsP.innerText)
  } catch(err) {
    window.alert(err.message)
  }
}