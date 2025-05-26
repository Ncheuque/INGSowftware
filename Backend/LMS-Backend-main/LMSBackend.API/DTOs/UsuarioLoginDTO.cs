
namespace LMSBackend.API.DTOs // Declarando espacio logico
{
    public class UsuarioLoginDTO // Creando la clase UsuarioLoginDTO
    {
        // Declaración de atributos que el cliente necesita enviar para iniciar sesion

        public string Correo { get; set; }
        public string Contraseña { get; set; }
    }
}
