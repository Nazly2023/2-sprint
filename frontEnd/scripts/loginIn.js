const URL_API_loginIn = "http://localhost:3000";

let user = [];

const form = document.getElementById("loginIn");
const numberInput = document.querySelector(".numberInput");
const passwordInput = document.querySelector(".passwordInput");

const getUsers = async () => {
  try {
    const endpoint = "/user";
    const resp = await axios.get(`${URL_API_loginIn}${endpoint}`);
    const response = await resp.data;

    return response;
  } catch (error) {
    alert(error);
    return [];
  }
};

const getUserByPhone = async (number) => {
  try {
    const endpoint = "/user";
    const resp = await axios.get(`${URL_API_loginIn}${endpoint}`, {
      params: {
        number,
      },
    });
    const response = await resp.data;

    return response;
  } catch (error) {
    alert(error);
    return [];
  }
};

const getUserByPhonePassword = async (number, password) => {
  try {
    const endpoint = "/user";
    const resp = await axios.get(`${URL_API_loginIn}${endpoint}`, {
      params: {
        number,
        password,
      },
    });
    const response = await resp.data;

    return response;
  } catch (error) {
    alert(error);
    return [];
  }
};

function mostrarMensajeBienvenida(name = "Usuario") {
  const welcomeMessage = `¡Bienvenido ${name}!`;
  const mensaje = document.createElement("div");
  mensaje.textContent = welcomeMessage;
  mensaje.className = "mensaje-bienvenida";
  mensaje.classList.add("mensaje-bienvenida");
  document.body.appendChild(mensaje);
  setTimeout(function () {
    mensaje.remove();
    window.location.href = "home.html";
  }, 3000); // Redirigir después de 3 segundos (ajusta el tiempo según tus necesidades)
}

// Agregar un evento de escucha al formulario cuando se envíe
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Evitar que el formulario se envíe

  // Obtener los valores ingresados por el usuario
  const phoneNumber = numberInput.value;
  const password = passwordInput.value;

  if (phoneNumber.trim() === "") {
    alert("Por favor, ingrese su número de teléfono.");
    return;
  }

  if (password.trim() === "") {
    alert("Por favor, ingrese su contraseña.");
    return;
  }

  // console.log(phoneNumber, password);
  let user = await getUserByPhone(phoneNumber);

  if (user.length === 0) {
    alert(`El número ${phoneNumber} no existe`);
    return;
  }

  user = await getUserByPhonePassword(phoneNumber, password);

  user.length === 0
    ? alert(`la contraseña ingresada es incorrecta`)
    : mostrarMensajeBienvenida();

  // Redireccionar a home.html
});
