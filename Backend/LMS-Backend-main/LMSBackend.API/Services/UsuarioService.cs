using LMSBackend.API.DTOs;
using Microsoft.AspNetCore.Identity;
using LMSBackend.API.Models;
using LMSBackend.API.Helpers;
using Microsoft.EntityFrameworkCore;

namespace LMSBackend.API.Services
{

    public class UsuarioService
    {
        private readonly UserManager<Usuario> _userManager; // Inyección de dependencia para gestionar usuarios mediante ASP.NET Identity (solo lectura).
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly TokenService _tokenService;
        private readonly EmailService _emailService;

        public UsuarioService(UserManager<Usuario> userManager, RoleManager<IdentityRole> roleManager, TokenService tokenService, EmailService emailService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _tokenService = tokenService;
            _emailService = emailService;
        }
        public async Task<ResultadoOperacion> CrearUsuarioAsync(UsuarioCreacionDTO dto)
        {
            var usuarioExistenete = await _userManager.FindByEmailAsync(dto.Correo);
            if (usuarioExistenete != null) // Verificacion de existencia de correo
            {
                return new ResultadoOperacion { Exito = false, Mensaje = "Correo ya ingresado" };
            }

            bool rutExiste = await (_userManager.Users.AnyAsync(Usuario => Usuario.Rut == dto.Rut));
            if (rutExiste) // Verificacion de rut existente, asi no dejaría crear un usuario
            {
                return new ResultadoOperacion { Exito = false, Mensaje = "Rut ya ingresado al sistema" };
            }
            bool rolExiste = await (_roleManager.RoleExistsAsync(dto.Rol));
            if (!rolExiste) // Verifica si el rol ingresado existe; si no, se cancela la operación.
            {
                return new ResultadoOperacion { Exito = false, Mensaje = "El rol no existe" };
            }
            Usuario usuario = new Usuario // Creacion de una instancia del usuario a partir de los datos recibidos en el DTO.
            {
                Nombre = dto.Nombre,
                Rut = dto.Rut,
                Email = dto.Correo,
                UserName = dto.Correo
            };
            IdentityResult resultado = await _userManager.CreateAsync(usuario, dto.Contraseña); // Crear Usuario y contraseña
            if (!resultado.Succeeded) // Verifica si la creación del usuario fue exitosa; si no, retorna un error.
            {
                var errores = string.Join("; ", resultado.Errors.Select(e => e.Description));
                return new ResultadoOperacion { Exito = false, Mensaje = $"Error al crear el usuario: {errores}" };
            }
            await _userManager.AddToRoleAsync(usuario, dto.Rol); // Asignación de rol

            return new ResultadoOperacion { Exito = true, Mensaje = "Usuario creado con exito" }; // Retorno el exito de la operacion crear usuario
        }
        public async Task<ResultadoLogin> LoginUsuarioAsync(UsuarioLoginDTO dto)
        {
            var usuario = await _userManager.FindByEmailAsync(dto.Correo);
            if (usuario == null)
            {
                return new ResultadoLogin { Exito = false, Mensaje = "Credenciales inválidas" };
            }
            var esValida = await _userManager.CheckPasswordAsync(usuario, dto.Contraseña);
            if (!esValida)
            {
                return new ResultadoLogin { Exito = false, Mensaje = "Credenciales inválidas" };
            }

            var token = _tokenService.GenerarToken(usuario);

            return new ResultadoLogin { Exito = true, Mensaje = "Autenticación correcta" };
        }
        public async Task<ResultadoOperacion> RecuperarPasswordAsync(RecuperarPasswordDTO dto)
        {
            var usuario = await _userManager.FindByEmailAsync(dto.Correo);

            if (usuario == null)
            {
                return new ResultadoOperacion { Exito = false, Mensaje = "No se encontró ninguna cuenta asociada a ese correo" };
            }
            var token = await _userManager.GeneratePasswordResetTokenAsync(usuario);

            var link = $"https://localhost:3000/reset-password?token={Uri.EscapeDataString(token)}&email={usuario.Email}";

            var asunto = "Recuperación de contraseña - LMS";

            var cuerpo = $@"
                <h3>Hola {usuario.Nombre},</h3>
                <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                <a href='{link}'>Recuperar contraseña</a>
                <p>Este enlace expirará pronto por seguridad.</p>
            ";

            await _emailService.EnviarCorreoAsync(usuario.Email, asunto, cuerpo);

            return new ResultadoOperacion { Exito = true, Mensaje = "Se ha enviado un correo con istrucciones para restablecer tu contraseña" };
        }
        public async Task<ResultadoOperacion> RestablecerPasswordAsync(RestablecerPasswordDTO dto)
        {
            var usuario = await _userManager.FindByEmailAsync(dto.Correo);

            if (usuario == null)
            {
                return new ResultadoOperacion { Exito = false, Mensaje = "No hay cuenta asociada al correo" };
            }

            var resultado = await _userManager.ResetPasswordAsync(usuario, dto.Token, dto.NuevaContraseña);

            if (!resultado.Succeeded)
            {
                var errores = string.Join("; ", resultado.Errors.Select(e => e.Description));

                return new ResultadoOperacion { Exito = false, Mensaje = $"No se pudo actualizar la contraseña: {errores}" };
            }
            return new ResultadoOperacion { Exito = true, Mensaje = "Contraseña actualizada correctamente" };
        }
    }
}
