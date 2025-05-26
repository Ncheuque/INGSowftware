using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;

namespace LMSBackend.API.Services
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task EnviarCorreoAsync(string destinatario, string asunto, string cuerpoHtml)
        {
            var usuario = _configuration["Smtp:Username"];
            var contraseña = _configuration["Smtp:Password"];
            var host = _configuration["Smtp:Host"];
            var port = int.Parse(_configuration["Smtp:Port"]);
            var smtpClient = new SmtpClient(host, port);
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = new NetworkCredential(usuario, contraseña);
            smtpClient.EnableSsl = true;

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_configuration["Smtp:From"]),
                Subject = asunto,
                Body = cuerpoHtml,
                IsBodyHtml = true
            };
            mailMessage.To.Add(destinatario);

            await smtpClient.SendMailAsync(mailMessage);
        }
    }
}
