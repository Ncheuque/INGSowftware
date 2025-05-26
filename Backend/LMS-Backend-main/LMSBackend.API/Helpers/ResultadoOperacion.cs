
namespace LMSBackend.API.Helpers // Declarando espacio logico de Helpers
{
    public class ResultadoOperacion // Declarando ResultadoOperacion, para poder enviar mensajes sobre operaciones que se hagan.
    {
        public bool Exito { get; set; } // Declarando campo Exito y su tipo bool
        public string Mensaje { get; set; } // Declarando campo mensaje, para que nos ayude a mostrar mensajes de error o exito.
    }
}
