const form = document.getElementById("producerForm");
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

function aplicarMascaraCpfCnpj(valor) {
  const numeros = valor.replace(/\D/g, "");

  if (numeros.length <= 11) {
    return numeros
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  return numeros
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .slice(0, 18);
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

document.getElementById("cpfCnpj").addEventListener("input", (e) => {
  e.target.value = aplicarMascaraCpfCnpj(e.target.value);
});

document.getElementById("telefone").addEventListener("input", (e) => {
  e.target.value = aplicarMascaraTelefone(e.target.value);
});

document.getElementById("cep").addEventListener("input", (e) => {
  e.target.value = aplicarMascaraCep(e.target.value);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const propriedade = document.getElementById("propriedade").value.trim();
  const responsavel = document.getElementById("responsavel").value.trim();
  const cpfCnpj = document.getElementById("cpfCnpj").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const tamanho = document.getElementById("tamanho").value;
  const cep = document.getElementById("cep").value.trim();
  const cidade = document.getElementById("cidade").value.trim();
  const estado = document.getElementById("estado").value.trim();
  const endereco = document.getElementById("endereco").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const confirmarSenha = document.getElementById("confirmarSenha").value.trim();
  const produtosSelecionados = document.querySelectorAll('input[name="produtos"]:checked');

  formMessage.textContent = "";
  formMessage.className = "form-message";

  if (
    !propriedade ||
    !responsavel ||
    !cpfCnpj ||
    !email ||
    !telefone ||
    !tamanho ||
    !cep ||
    !cidade ||
    !estado ||
    !endereco ||
    !senha ||
    !confirmarSenha
  ) {
    formMessage.textContent = "Preencha todos os campos obrigatórios.";
    formMessage.classList.add("error");
    return;
  }

  if (produtosSelecionados.length === 0) {
    formMessage.textContent = "Selecione pelo menos um tipo de produto.";
    formMessage.classList.add("error");
    return;
  }

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

  formMessage.textContent = "Cadastro de produtor realizado com sucesso.";
  formMessage.classList.add("success");
  form.reset();

  document.querySelectorAll(".toggle-password").forEach((button) => {
    button.textContent = "👁";
  });
});