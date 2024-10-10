document.addEventListener('DOMContentLoaded', () => { 
    const form = document.querySelector('form');
    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const email = document.getElementById('email');
    const password1 = document.getElementById('password1');
    const password2 = document.getElementById('password2');
    const terminos = document.getElementById('terminos');
    const botonTerminos = document.querySelector('button[data-bs-target="#modalTerminos"]');
    const mensajeTerminos = document.getElementById('mensajeTerminos'); // Mensaje de error para términos y condiciones
  
    // Función para validar campos y mostrar mensajes de error
    const validarCampo = (input, mensaje = '') => {
      const feedbackElement = input.nextElementSibling; // Selecciona el div de feedback justo después del input
      if (mensaje) {
        input.setCustomValidity(mensaje);
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        feedbackElement.style.display = 'block'; // Mostrar el mensaje de error
        feedbackElement.textContent = mensaje; // Muestra el mensaje de error personalizado
      } else {
        input.setCustomValidity('');
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        feedbackElement.style.display = 'none'; // Oculta el mensaje de error
        feedbackElement.textContent = ''; // Limpia el mensaje de error
      }
    };
  
    // Función para validar el checkbox de términos y condiciones
    const validarCheckbox = () => {
      if (!terminos.checked) {
        terminos.classList.add('is-invalid');
        terminos.classList.remove('is-valid');
        botonTerminos.classList.add('text-danger');
        mensajeTerminos.style.display = 'inline'; // Mostrar el mensaje de error al lado del botón
      } else {
        terminos.classList.add('is-valid');
        terminos.classList.remove('is-invalid');
        botonTerminos.classList.remove('text-danger');
        mensajeTerminos.style.display = 'none'; // Oculta el mensaje de error
      }
    };
  
    // Evento submit del formulario
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      form.classList.add('was-validated'); // Marca el formulario como intentado
  
      // Validaciones de campos individuales
      validarCampo(nombre, nombre.value.trim() === '' ? 'Debe ingresar un nombre.' : '');
      validarCampo(apellido, apellido.value.trim() === '' ? 'Debe ingresar un apellido.' : '');
      validarCampo(email, email.validity.typeMismatch ? 'Debe ingresar un email válido.' : '');
      validarCampo(password1, password1.value.length < 6 ? 'Debe ingresar una contraseña con al menos 6 caracteres.' : '');
  
      // Validar campo "Repetir contraseña"
      if (password1.value.length >= 6 && password2.value !== password1.value) {
        validarCampo(password2, 'Las contraseñas deben ser iguales.');
      } else if (password1.value.length < 6) {
        validarCampo(password2, 'Primero debes validar la contraseña.');
      } else {
        validarCampo(password2);
      }
  
      // Validación del checkbox de términos y condiciones
      validarCheckbox();
  
      // Si todo es válido, muestra una alerta de éxito
      if (form.checkValidity()) {
        alert('Formulario enviado correctamente');
      }
    });
  
    // Validaciones en tiempo real para todos los campos después del primer intento de submit
    form.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', () => {
        if (form.classList.contains('was-validated')) {
          if (input.type === 'password' && input.id === 'password2') {
            // Validación especial para el campo "Repetir contraseña"
            validarCampo(input, password1.value !== input.value ? 'Las contraseñas deben ser iguales.' : '');
          } else {
            validarCampo(input);
          }
        }
      });
    });
  
    // Verificación en tiempo real del checkbox cuando cambia su estado
    terminos.addEventListener('change', () => {
      validarCheckbox();
    });
  });