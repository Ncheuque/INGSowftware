//Importaciones
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using LMSBackend.API.Models;


namespace LMSBackend.API.Data // Declarando un spacio logico, para organizar el codigo y solucionar problemas de nombramiento de clases.
{
    public class ApplicationDbContext : IdentityDbContext<Usuario> // Creacion de clase (ApplicationDbContext) y hereda de IdentityDbContext, mi entidad principal sera mi clase Usuario
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) // Esto es un Constructor, ApplicationDbContext usa Usuario como el modelo, DbContextOptions<ApplicationDbContext>configura la conexión a la base de datos utilizando opciones externas.
        : base(options) // Le pasa options a IdentityDbContext
        {

        }
    }
}
