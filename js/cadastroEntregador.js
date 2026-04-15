const form = document.getElementById("entregadorForm");
const formMessage = document.getElementById("formMessage");

// Toggle senha
document.querySelectorAll(".toggle-password").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.target);
    input.type = input.type === "password" ? "text" : "password";
    button.textContent = input.type === "text" ? "🙈" : "👁";
  });
});

// Validação placa
function validarPlaca(placa) {
  return /^[A-Z]{3}-\d{4}$|^[A-Z]{3}-\d[A-Z]\d{2}$/.test(placa);
}

// Submit
form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const cpfCnpj = document.getElementById("cpfCnpj").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const cnh = document.getElementById("cnh").value.trim();
  const categoria = document.getElementById("categoriaCnh").value;
  const veiculo = document.getElementById("veiculo").value;
  const placa = document.getElementById("placa").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const confirmarSenha = document.getElementById("confirmarSenha").value.trim();
  const terms = document.getElementById("terms").checked;

  if (!nome || !cpfCnpj || !telefone || !cnh || !categoria || !veiculo || !placa || !senha || !confirmarSenha || !email) {
    return erro("Preencha todos os campos.");
  }

  if (!validarPlaca(placa)) {
    return erro("Placa inválida.");
  }

  if (senha.length < 6) return erro("Senha muito curta.");
  if (senha !== confirmarSenha) return erro("Senhas não coincidem.");
  if (!terms) return erro("Aceite os termos.");

  sucesso("Cadastro de entregador realizado!");
  setTimeout(() => {
  window.location.href = "telaEntregador.html";
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