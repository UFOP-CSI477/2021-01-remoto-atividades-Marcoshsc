function submit(e) {
  
}

function valid(field) {
  return !!field.value;
}

function alertIfInvalid(field, fieldName) {
  const invalid = !valid(field)
  if (invalid) alert(`${fieldName} não pode estar vazio.`);
  return invalid
}

function submit(event) {
  const name = document.forms.formCadastroProduto.nome;
  const um = document.forms.formCadastroProduto.um

  const fieldList = [
    { field: name, fieldName: "Nome" },
    { field: um, fieldName: "Unidade de medida" },
  ];
  const invalid = fieldList.reduce((current, {field, fieldName}) => {
    const invalid = alertIfInvalid(field, fieldName)
    return invalid || current 
  }, false)
  
  if(invalid) {
    event.preventDefault()
  }
}

window.onload = () => {
  const form = document.getElementById('form-cadastro')
  form.onsubmit = submit
}