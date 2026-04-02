const form = document.getElementById("vendedorForm");
const formMessage = document.getElementById("formMessage");
const toggleButtons = document.querySelectorAll(".toggle-password");

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-target");
    const input = document.getElementById(targetId);

    if (input.type === "password") {
      input.type = "text";
      button.textContent = "🙈";
    } else {
      input.type = "password";
      button.textContent = "👁";
    }
  });
});

function aplicarMascaracnpj(valor) {
  const numeros = valor.replace(/\D/g, "").slice(0, 14);

  return numeros
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

function aplicarMascaraTelefone(valor) {
  return valor
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
}

function aplicarMascaraCep(valor) {
  return valor
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 9);
}

function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, "");

  if (cnpj.length !== 14) return false;

  if (/^(\d)\1+$/.test(cnpj)) return false;

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1)) return false;

  return true;
}

document.getElementById("cnpj").addEventListener("input", (e) => {
  e.target.value = aplicarMascaracnpj(e.target.value);
});

document.getElementById("telefone").addEventListener("input", (e) => {
  e.target.value = aplicarMascaraTelefone(e.target.value);
});

document.getElementById("cep").addEventListener("input", (e) => {
  e.target.value = aplicarMascaraCep(e.target.value);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const loja = document.getElementById("loja").value.trim();
  const responsavel = document.getElementById("responsavel").value.trim();
  const cnpj = document.getElementById("cnpj").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const cep = document.getElementById("cep").value.trim();
  const num_endereco = document.getElementById("num_endereco").value.trim();
  const endereco = document.getElementById("endereco").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const confirmarSenha = document.getElementById("confirmarSenha").value.trim();
  /*const produtosSelecionados = document.querySelectorAll('input[name="produtos"]:checked');*/ // Descomentar esta linha quando os checkboxes de produtos estiverem implementados -marcZ

  formMessage.textContent = "";
  formMessage.className = "form-message";
  // PRECISA TER VERIFICAÇÃO PARA O ENDEREÇO TER NO MÁXIMO 5 DÍGITOS, PARA EVITAR QUE O BANCO DE DADOS ESTOURE -marcZ
  if (
    !loja ||
    !responsavel ||
    !cnpj ||
    !email ||
    !telefone ||
    !cep ||
    !num_endereco ||
    !endereco ||
    !senha ||
    !confirmarSenha
  ) {
    formMessage.textContent = "Preencha todos os campos obrigatórios.";
    formMessage.classList.add("error");
    return;
  }

  /*if (produtosSelecionados.length === 0) {
    formMessage.textContent = "Selecione pelo menos um tipo de produto.";
    formMessage.classList.add("error");
    return;
  }*/ // Descomentar este bloco quando os checkboxes de produtos estiverem implementados -marcZ

  if (senha.length < 6) {
    formMessage.textContent = "A senha deve ter no mínimo 6 caracteres.";
    formMessage.classList.add("error");
    return;
  }

  if (senha !== confirmarSenha) {
    formMessage.textContent = "As senhas não coincidem.";
    formMessage.classList.add("error");
    return;
  }

  formMessage.textContent = "Cadastro de vendedor realizado com sucesso.";
  formMessage.classList.add("success");
  form.reset();

  document.querySelectorAll(".toggle-password").forEach((button) => {
    button.textContent = "👁";
  });
});