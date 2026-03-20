const form = document.getElementById("motoboyForm");
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

function aplicarMascaraCPF(valor) {
  return valor
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function aplicarMascaraTelefone(valor) {
  return valor
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

function aplicarMascaraPlaca(valor) {
  return valor
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .replace(/^([A-Z]{3})(\d)/, "$1-$2")
    .slice(0, 8);
}

document.getElementById("cpf").addEventListener("input", (e) => {
  e.target.value = aplicarMascaraCPF(e.target.value);
});

document.getElementById("telefone").addEventListener("input", (e) => {
  e.target.value = aplicarMascaraTelefone(e.target.value);
});

document.getElementById("placa").addEventListener("input", (e) => {
  e.target.value = aplicarMascaraPlaca(e.target.value);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const nascimento = document.getElementById("nascimento").value;
  const cnh = document.getElementById("cnh").value.trim();
  const categoriaCnh = document.getElementById("categoriaCnh").value;
  const veiculo = document.getElementById("veiculo").value;
  const placa = document.getElementById("placa").value.trim();
  const cidade = document.getElementById("cidade").value.trim();
  const estado = document.getElementById("estado").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const confirmarSenha = document.getElementById("confirmarSenha").value.trim();
  const terms = document.getElementById("terms").checked;

  formMessage.textContent = "";
  formMessage.className = "form-message";

  if (!nome || !cpf || !email || !telefone || !nascimento || !cnh || !categoriaCnh || !veiculo || !placa || !cidade || !estado || !senha || !confirmarSenha) {
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
    formMessage.textContent = "Você precisa aceitar os termos de uso.";
    formMessage.classList.add("error");
    return;
  }

  formMessage.textContent = "Cadastro de motoboy realizado com sucesso.";
  formMessage.classList.add("success");
  form.reset();

  document.querySelectorAll(".toggle-password").forEach((button) => {
    button.textContent = "👁";
  });
});