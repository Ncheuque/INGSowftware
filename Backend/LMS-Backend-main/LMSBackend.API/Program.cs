using LMSBackend.API.Data;
using LMSBackend.API.Models;
using LMSBackend.API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using LMSBackend.API.Helpers;
using DotNetEnv;

DotNetEnv.Env.Load(); // Cargando .env

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection"); // Obtiene la conexion a la bd, que esta en appsettings.json

// Listing services, adding ApplicationDbContext and Connect using PostgreSQL using connection string
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(connectionString));

// Registering Indentity Sistem using class Usuario and IdentityRole, utilize APPDBContext to storage and read data in the DB and include the token generator to do certains actions.
builder.Services.AddIdentity<Usuario, IdentityRole>().AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();

// Registrar todos los servicios necesarios
builder.Services.AddControllers();
builder.Services.AddScoped<UsuarioService>(); // Registra UsuarioService como un servicio scoped, en el conteneder de dependencias, se crea una nueva instancia por cada solicitud HTTP.
builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<EmailService>();

var smtpSettings = builder.Configuration.GetSection("Smtp");

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    await InicializadorDeRoles.InicializarRolesAsync(services);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

//app.UseHttpsRedirection();

app.MapControllers();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
