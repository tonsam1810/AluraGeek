document.addEventListener('DOMContentLoaded',()=>{
    const FormLogin =document.getElementById('form__login__js'); // Obtén el formulario de inicio de sesión
    const MessageAlert =document.getElementById('mensaje__alert'); // Obtén el elemento donde mostrarás mensajes

    FormLogin.addEventListener('submit', async (event) =>{// Agrega un evento para escuchar cuando se envía el formulario
        event.preventDefault(); // Evita el comportamiento predeterminado del formulario (recargar la página)

        const Email = document.getElementById('input__correo').value;// Obtiene el valor ingresado en el campo de correo electrónico
        const Password= document.getElementById('input__pasword').value;// Obtiene el valor ingresado en el campo de contraseña

        try{
            const response = await fetch('http://localhost:3000/users',{
                method: 'GET', //Utiliza el método GET para obtener los usuarios del servidor
                
            });

            if(response.ok){
                const users = await response.json();

                 // Busca un usuario con el correo y contraseña proporcionados
                 const user = users.find(u => u.correo === Email && u.password === Password);

                 if(user){
                     // Muestra un mensaje de inicio de sesión exitoso
                     MessageAlert.innerHTML = `Inicio de sesión exitoso para ${user.nombres} ${user.apellidos}`;

                     // Redirige a otra página después de iniciar sesión (por ejemplo, "dashboard.html")
                     window.location.href='productos.html';
                 }
                 else{
                    // Muestra un mensaje de error si las credenciales son incorrectas
                    MessageAlert.innerHTML = 'Credenciales incorrectas. Por favor, verifica tu correo y contraseña.';
                 }
            }
            else{
                const errorData = await response.json();
                MessageAlert.innerHTML='Credenciales incorrectas. Por favor, verifica tu correo y contraseña.';
                MessageAlert.innerHTML=`Error: ${errorData.error}`;
            }
            }
        catch(error){
            console.error('Error', error);
            // Muestra un mensaje de error si ocurre un error inesperado
            MessageAlert.innerHTML = 'Hubo un error en la solicitud.';

        }
    } );
});