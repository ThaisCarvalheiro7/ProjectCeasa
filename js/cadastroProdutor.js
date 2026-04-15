const form = document.getElementById("clientForm");
const formMessage = document.getElementById("formMessage");

// Mostrar/ocultar senha
document.querySelectorAll(".toggle-password").forEach((button) => {
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

// Máscara CPF/CNPJ
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
    .replace(/(\d{4})(\d)/, "$1-$2");
}

// Máscara telefone
function aplicarMascaraTelefone(valor) {
  return valor
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

// Aplicar máscaras
document.getElementById("cpfCnpj")?.addEventListener("input", (e) => {
  e.target.value = aplicarMascaraCpfCnpj(e.target.value);
});

document.getElementById("telefone")?.addEventListener("input", (e) => {
  e.target.value = aplicarMascaraTelefone(e.target.value);
});

// SUBMIT
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const cpfCnpj = document.getElementById("cpfCnpj").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const propriedade = document.getElementById("nome_propriedade").value.trim();
  const categoria = document.getElementById("categoriaCnh").value;
  const cep = document.getElementById("cep").value.trim();
  const endereco = document.getElementById("endereco").value.trim();
  const numero = document.getElementById("num_Endereco").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const confirmarSenha = document.getElementById("confirmarSenha").value.trim();
  const terms = document.getElementById("terms").checked;

  formMessage.textContent = "";
  formMessage.className = "form-message";

  // Validação básica
  if (
    !nome || !cpfCnpj || !email || !telefone ||
    !propriedade || !categoria || !cep ||
    !endereco || !numero || !senha || !confirmarSenha
  ) {
    formMessage.textContent = "Preencha todos os campos obrigatórios.";
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

  if (!terms) {
    formMessage.textContent = "Você precisa aceitar os termos.";
    formMessage.classList.add("error");
    return;
  }

  // Sucesso
  formMessage.textContent = "Cadastro de produtor realizado com sucesso!";
    setTimeout(() => {
  window.location.href = "telaProdutor.html";
}, 1500);
  formMessage.classList.add("success");

  form.reset();

  document.querySelectorAll(".toggle-password").forEach((btn) => {
    btn.textContent = "👁";
  });
});