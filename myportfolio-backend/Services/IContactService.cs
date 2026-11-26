using PortfolioApi.Models;

namespace PortfolioApi.Services;

public interface IContactService
{
    Task<ContactMessage> SaveMessageAsync(ContactRequestDto dto);
}