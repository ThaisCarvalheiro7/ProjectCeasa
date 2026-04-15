const form = document.getElementById("clientForm");
const formMessage = document.getElementById("formMessage");

// Toggle senha
document.querySelectorAll(".toggle-password").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.target);
    input.type = input.type === "password" ? "text" : "password";
    button.textContent = input.type === "text" ? "🙈" : "👁";
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

document.getElementById("cpfCnpj")?.addEventListener("input", (e) => {
  e.target.value = aplicarMascaraCpfCnpj(e.target.value);
});

// Máscara telefone
document.getElementById("telefone")?.addEventListener("input", (e) => {
  e.target.value = e.target.value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
});

// Submit
form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const cpfCnpj = document.getElementById("cpfCnpj").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const cep = document.getElementById("cep").value.trim();
  const endereco = document.getElementById("endereco").value.trim();
  const numero = document.getElementById("num_Endereco").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const confirmarSenha = document.getElementById("confirmarSenha").value.trim();
  const terms = document.getElementById("terms").checked;

  if (!nome || !cpfCnpj || !email || !telefone || !cep || !endereco || !numero || !senha || !confirmarSenha) {
    return erro("Preencha todos os campos.");
  }

  if (senha.length < 6) return erro("Senha muito curta.");
  if (senha !== confirmarSenha) return erro("Senhas não coincidem.");
  if (!terms) return erro("Aceite os termos.");

  sucesso("Cadastro realizado com sucesso!");
  setTimeout(() => {
  window.location.href = "catalogoProdutos.html";
}, 1500);
  form.reset();
});

function erro(msg) {
  formMessage.textContent = msg;
  formMessage.className = "form-message error";
}

function sucesso(msg) {
  formMessage.textContent = msg;
  formMessage.className = "form-message success";
}