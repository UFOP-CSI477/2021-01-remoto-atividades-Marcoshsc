function valid(field) {
  return !!field.value;
}

function alertIfInvalid(field, fieldName) {
  const invalid = !valid(field)
  if (invalid) alert(`${fieldName} não pode estar vazio.`);
  return invalid
}

function submit() {
  const name = document.forms.formCadastroPessoa.nome;
  const address = document.forms.formCadastroPessoa.address;
  const cpf = document.forms.formCadastroPessoa.cpf;
  const phone = document.forms.formCadastroPessoa.phone;
  const gender = document.forms.formCadastroPessoa.gender;

  const fieldList = [
    { field: name, fieldName: "Nome" },
    { field: address, fieldName: "Endereço" },
    { field: cpf, fieldName: "CPF" },
    { field: phone, fieldName: "Telefone" },
    { field: gender, fieldName: "Gênero" },
  ];
  const invalid = fieldList.reduce((current, {field, fieldName}) => {
    const invalid = alertIfInvalid(field, fieldName)
    return invalid || current 
  }, false)
  
  if(!invalid) {
    alert('Validado com sucesso!')
  }
}
