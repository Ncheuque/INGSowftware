using Microsoft.AspNetCore.Identity;

namespace LMSBackend.API.Helpers // Declarando Espacio logico
{
    public static class InicializadorDeRoles // Declarando la clase inicializador de roles para inicializar los roles necesarios en la aplicacion, tipo static, no se pueden crear instancias de esta clase.
    {
        public static async Task InicializarRolesAsync(IServiceProvider serviceProvider) // Recibe el IServiceProvider para acceder a servicios registrados como RoleManager.
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>(); // Obtengo el servicio RoleManager desde el contenedor de dependencias.

            string[] roles = { "Administrador", "Docente", "Alumno" }; // Declarando un array y definiendo roles que deben estar en el sistema.

            foreach (var rol in roles) // Recorreindo el array de los roles, para verificar la existencia del rol.
            {
                if (!await roleManager.RoleExistsAsync(rol)) // Si el rol no existe se ejecuta el siguiente bloque de codigo
                {
                    await roleManager.CreateAsync(new IdentityRole(rol)); // Se crea asincronicamente un nuevo rol, utilizando indentity framework
                }
            }
        }
    }
}
