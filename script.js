document.addEventListener("DOMContentLoaded", function () {
  // ----- Funciones para la barra lateral -----
  function closeSidebar() {
      const sidebar = document.getElementById("mySidebar");
      const main = document.getElementById("main");
      if (!sidebar || !main) return;
      sidebar.style.width = "0px";
      if (window.innerWidth >= 768) main.style.marginLeft = "0";
  }

  function showMenu() {
      const sidebar = document.getElementById("mySidebar");
      const main = document.getElementById("main");
      if (!sidebar || !main) return;
      const isClosed = sidebar.style.width === "0px" || sidebar.style.width === "";
      sidebar.style.width = isClosed ? "260px" : "0px";
      if (window.innerWidth >= 768) main.style.marginLeft = isClosed ? "260px" : "0px";
  }

  function adjustSidebar() {
      const sidebar = document.getElementById("mySidebar");
      const main = document.getElementById("main");
      if (!sidebar || !main) return;
      if (window.innerWidth >= 768) {
          sidebar.style.width = "260px";
          main.style.marginLeft = "260px";
      } else {
          sidebar.style.width = "0px";
          main.style.marginLeft = "0";
      }
  }

  // ----- Función para ajustar la altura del textarea -----
  function autoResizeTextarea() {
      const textarea = document.querySelector(".textarea");
      if (!textarea) return;
      textarea.addEventListener("input", function () {
          this.style.height = "auto";
          this.style.height = Math.min(this.scrollHeight, 200) + "px";
      });
  }

  // ----- Función para alternar modo claro/oscuro -----
  function toggleTheme() {
      const themeToggle = document.getElementById("theme-toggle");
      const body = document.body;
      const lightIcon = document.getElementById("light-icon");
      const darkIcon = document.getElementById("dark-icon");
      if (!themeToggle || !lightIcon || !darkIcon) return;
      const currentTheme = localStorage.getItem("theme");
      body.classList.toggle("light-mode", currentTheme === "light");
      body.classList.toggle("dark-mode", currentTheme !== "light");
      lightIcon.style.display = currentTheme === "light" ? "block" : "none";
      darkIcon.style.display = currentTheme !== "light" ? "block" : "none";
      themeToggle.addEventListener("click", () => {
          const isDarkMode = body.classList.contains("dark-mode");
          body.classList.toggle("dark-mode", !isDarkMode);
          body.classList.toggle("light-mode", isDarkMode);
          lightIcon.style.display = isDarkMode ? "block" : "none";
          darkIcon.style.display = isDarkMode ? "none" : "block";
          localStorage.setItem("theme", isDarkMode ? "light" : "dark");
      });
  }

  // ----- Función para manejar el menú desplegable -----
  function dropdownMenuHandler() {
      const toggleDropdown = document.getElementById("toggleDropdown");
      const dropdownMenu = document.getElementById("dropdownMenu");
      if (!toggleDropdown || !dropdownMenu) return;
      toggleDropdown.addEventListener("click", function (event) {
          event.stopPropagation();
          dropdownMenu.classList.toggle("show");
      });
      document.addEventListener("click", function (event) {
          if (!toggleDropdown.contains(event.target) && !dropdownMenu.contains(event.target)) {
              dropdownMenu.classList.remove("show");
          }
      });
  }

  // ----- Función para manejar el chat -----
  function chatHandler() {
      const textarea = document.querySelector(".textarea");
      const sendButton = document.querySelector(".send-button");
      const chatContainer = document.querySelector(".chat-container");
      const introText = document.querySelector(".intro-text");

      if (!textarea || !sendButton || !chatContainer) return;

      // Respuestas predefinidas
      const respuestas = {
          "hola": "¡Hola! ¿En qué puedo ayudarte?",
          "cómo estás": "Soy un chatbot, pero estoy aquí para ayudarte 😊",
          "adiós": "¡Hasta luego! Que tengas un buen día.",
          "qué puedes hacer": "Puedo responder preguntas básicas y ayudarte con información general."
      };

      function agregarMensaje(mensaje, tipo) {
          const div = document.createElement("div");
          div.classList.add("chat-message", tipo === "usuario" ? "mensaje-usuario" : "mensaje-bot");
          div.textContent = mensaje;
          chatContainer.appendChild(div);
          chatContainer.scrollTop = chatContainer.scrollHeight; // Hace scroll hacia abajo
      }

      function responder(mensajeUsuario) {
          const mensajeLimpio = mensajeUsuario.toLowerCase().trim();
          const respuesta = respuestas[mensajeLimpio] || "Lo siento, no entiendo la pregunta.";
          setTimeout(() => agregarMensaje(respuesta, "bot"), 500);
      }

      function sendMessage() {
          const mensaje = textarea.value.trim();
          if (!mensaje) return;
          if (introText) introText.style.display = "none";
          agregarMensaje(mensaje, "usuario");
          responder(mensaje);
          textarea.value = "";
      }

      sendButton.addEventListener("click", sendMessage);
      textarea.addEventListener("keypress", function (event) {
          if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              sendMessage();
          }
      });
  }

  // ----- Inicialización de funciones -----
  adjustSidebar();
  autoResizeTextarea();
  toggleTheme();
  dropdownMenuHandler();
  chatHandler();

  // ----- Eventos -----
  window.addEventListener("resize", adjustSidebar);
  const showMenuBtn = document.getElementById("showMenu");
  if (showMenuBtn) showMenuBtn.addEventListener("click", showMenu);
  const closeSidebarBtn = document.getElementById("closeSidebar");
  if (closeSidebarBtn) closeSidebarBtn.addEventListener("click", closeSidebar);
});
