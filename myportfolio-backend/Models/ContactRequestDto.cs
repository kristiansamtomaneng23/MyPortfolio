using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.Models;

public record ContactRequestDto(
    [Required] string FullName,
    [Required, EmailAddress] string Email,
    [Required] string Message
);