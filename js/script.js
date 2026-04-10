/* ============================= TELAS DE CADASTRO =============================*/

const form = document.getElementById("clientForm");
const formMessage = document.getElementById("formMessage");
const toggleButtons = document.querySelectorAll(".toggle-password");

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-target");
    const input = document.getElementById(targetId);

    if (input) {
      if (input.type === "password") {
        input.type = "text";
        button.textContent = "🙈";
      } else {
        input.type = "password";
        button.textContent = "👁";
      }
    }
  });
});

function aplicarMascaraCpfCnpj(valor) {
  const numeros = valor.replace(/\D/g, "");

  if (numeros.length <= 11) {
    // CPF
    return numeros
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  // CNPJ
  return numeros
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
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

function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, "");

  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

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

  tamanho += 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  return resultado == digitos.charAt(1);
}

const cpfInput = document.getElementById("cpfCnpj");
if (cpfInput) {
  cpfInput.addEventListener("input", (e) => {
    e.target.value = aplicarMascaraCpfCnpj(e.target.value);
  });
}

function aplicarMascaraTelefone(valor) {
  return valor
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

const telefoneInput = document.getElementById("telefone");
if (telefoneInput) {
  telefoneInput.addEventListener("input", (e) => {
    e.target.value = aplicarMascaraTelefone(e.target.value);
  });
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome")?.value.trim();
    const cpfCnpj = document.getElementById("cpfCnpj")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const telefone = document.getElementById("telefone")?.value.trim();
    const num_Endereco = document.getElementById("num_Endereco")?.value.trim();
    const estado = document.getElementById("estado")?.value.trim();
    const cep = document.getElementById("cep")?.value.trim();
    const endereco = document.getElementById("endereco")?.value.trim();
    const cnh = document.getElementById("cnh")?.value.trim();
    const categoriaCnh = document.getElementById("categoriaCnh")?.value;
    const veiculo = document.getElementById("veiculo")?.value;
    const placa = document.getElementById("placa")?.value.trim();
    const senha = document.getElementById("senha")?.value.trim();
    const confirmarSenha = document.getElementById("confirmarSenha")?.value.trim();
    const terms = document.getElementById("terms")?.checked;

    formMessage.textContent = "";
    formMessage.className = "form-message";

    // PRECISA TER VERIFICAÇÃO PARA O ENDEREÇO TER NO MÁXIMO 5 DÍGITOS, PARA EVITAR QUE O BANCO DE DADOS ESTOURE -marcZ

    if (!nome || !cpfCnpj || !email || !telefone || !num_Endereco || !estado || !cep || !endereco || !cnh || !categoriaCnh || !veiculo || !placa || !senha || !confirmarSenha) {
      formMessage.textContent = "Preencha todos os campos obrigatórios.";
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

    formMessage.textContent = "Cadastro realizado com sucesso.";
    formMessage.classList.add("success");
    form.reset();

    document.querySelectorAll(".toggle-password").forEach((button) => {
      button.textContent = "👁";
    });
  });
}


/* ============================= LOGIN ============================= */


const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("senhaLogin");
const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

if (togglePassword && passwordInput) {
  togglePassword.addEventListener("click", function () {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    this.setAttribute("aria-label", isPassword ? "Ocultar senha" : "Mostrar senha");
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("emailLogin")?.value.trim();
    const password = passwordInput?.value.trim();

    if (message) {
      message.style.display = "block";
    }
  });
}