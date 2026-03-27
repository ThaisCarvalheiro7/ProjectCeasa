const form = document.getElementById("entregadorForm");
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
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function aplicarMascaraTelefone(valor) {
  return valor
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

function aplicarMascaraPlaca(valor) {
  const v = valor.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7);

  return v.replace(/^([A-Z]{3})([A-Z0-9]{1,4})$/, "$1-$2");
}

function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;

  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;

  return resto === parseInt(cpf.substring(10, 11));
}

function validarPlaca(placa) {
  const limpa = placa.toUpperCase().replace(/[^A-Z0-9]/g, "");

  const padraoAntigo = /^[A-Z]{3}[0-9]{4}$/;   // ABC1234 Modelo antigo
  const padraoMercosul = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/; // ABC1D23 Modelo Mercosul

  return padraoAntigo.test(limpa) || padraoMercosul.test(limpa);
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
  const cnh = document.getElementById("cnh").value.trim();
  const categoriaCnh = document.getElementById("categoriaCnh").value;
  const veiculo = document.getElementById("veiculo").value;
  const placa = document.getElementById("placa").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const confirmarSenha = document.getElementById("confirmarSenha").value.trim();
  const terms = document.getElementById("terms").checked;

  formMessage.textContent = "";
  formMessage.className = "form-message";

  if (!nome || !cpf || !email || !telefone || !cnh || !categoriaCnh || !veiculo || !placa || !senha || !confirmarSenha) {
    formMessage.textContent = "Preencha todos os campos obrigatórios.";
    formMessage.classList.add("error");
    return;
  }

  if (!validarCPF(cpf)) {
    formMessage.textContent = "CPF inválido.";
    formMessage.classList.add("error");
    return;
  }

  if (telefone.replace(/\D/g, "").length < 10) {
    formMessage.textContent = "Telefone inválido.";
    formMessage.classList.add("error");
    return;
  }

  if (!validarPlaca(placa)) {
    formMessage.textContent = "Placa inválida. Use formato ABC-1234 ou ABC-1D23.";
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

  formMessage.textContent = "Cadastro de Entregador realizado com sucesso.";
  formMessage.classList.add("success");
  form.reset();

  document.querySelectorAll(".toggle-password").forEach((button) => {
    button.textContent = "👁";
  });
});