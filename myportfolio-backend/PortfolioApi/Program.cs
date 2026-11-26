using Microsoft.EntityFrameworkCore;
using Npgsql;
using PortfolioApi.Data;
using PortfolioApi.Services;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' is not configured.");
var databasePassword = builder.Configuration["Database:Password"]
    ?? throw new InvalidOperationException("Database password is not configured. Set the Database__Password environment variable.");
var npgsqlConnectionString = new NpgsqlConnectionStringBuilder(connectionString)
{
    Password = databasePassword
}.ConnectionString;

// 1. Register PostgreSQL DbContext with Dependency Injection
builder.Services.AddScoped<AppDbContext>(serviceProvider =>
{
    var options = new DbContextOptionsBuilder<AppDbContext>()
        .UseNpgsql(npgsqlConnectionString)
        .Options;

    return new AppDbContext(options);
});

// 2. Register ContactService with Scoped lifetime (one instance per HTTP request)
builder.Services.AddScoped<IContactService, ContactService>();

builder.Services.AddControllers();

// 3. Configure CORS for the React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();

app.Run();