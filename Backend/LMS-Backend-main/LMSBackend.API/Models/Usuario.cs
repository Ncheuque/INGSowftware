using Microsoft.AspNetCore.Identity;

namespace LMSBackend.API.Models //Declarando un spacio logico, para organizar el codigo y solucionar problemas de nombramiento de clases.
{
    public class Usuario : IdentityUser // Declarando clase usuario, heredando de IdentityUser
    {
        public string Nombre { get; set; } // Agregando un campo personalizado, que es propiedad publica con getter y setter (puedes leer y escribir).
        public string Rut { get; set; }
    }
}
