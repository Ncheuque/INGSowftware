using Microsoft.AspNetCore.Mvc;
using LMSBackend.API.Services;
using LMSBackend.API.DTOs;

namespace LMSBackend.API.Controllers
{
    [ApiController] // Declaro que es una API
    [Route("api/[controller]")] // Declaro la forma en como se puede acceder a la API desde el exterior.

    public class UsuariosController : ControllerBase
    {
        private readonly UsuarioService _usuarioService; // Declarando metodo UsuarioService, privado y solo lectura.

        public UsuariosController(UsuarioService usuarioService) // Inyectando el metodo a la clase UsuriosController.
        {
            _usuarioService = usuarioService;
        }
        [HttpPost] // Metodo Responde a solo solicitudes Post
        public async Task<ActionResult> CrearUsuario([FromBody] UsuarioCreacionDTO dto) // Metodo público y asincrónico que maneja la creación de nuevos usuarios.
                                                                                        // Recibe un DTO desde el cuerpo de la soliciutd y retonra un resultado HTTP.`
        {
            var resultado = await _usuarioService.CrearUsuarioAsync(dto);

            if (resultado.Exito)
            {
                return Ok(resultado.Mensaje);
            }
            else
            {
                return BadRequest(resultado.Mensaje);
            }
        }
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] UsuarioLoginDTO dto)
        {
            var resultado = await _usuarioService.LoginUsuarioAsync(dto);

            if (resultado.Exito)
            {
                return Ok(new { token = resultado.Token });
            }
            else
            {
                return Unauthorized(resultado.Mensaje);
            }

        }
        [HttpPost("recuperar-password")]
        public async Task<ActionResult> RecuperarPassword([FromBody] RecuperarPasswordDTO dto)
        {
            var resultado = await _usuarioService.RecuperarPasswordAsync(dto);

            if (resultado.Exito)
            {
                return Ok(resultado.Mensaje);
            }
            else
            {
                return BadRequest(resultado.Mensaje);
            }
        }
        [HttpPost("restablecer-password")]
        public async Task<ActionResult> RestablecerPassword([FromBody] RestablecerPasswordDTO dto)
        {
            var resultado = await _usuarioService.RestablecerPasswordAsync(dto);

            if (resultado.Exito)
            {
                return Ok(resultado.Mensaje);
            }
            else
            {
                return BadRequest(resultado.Mensaje);
            }
        }
    }
}
