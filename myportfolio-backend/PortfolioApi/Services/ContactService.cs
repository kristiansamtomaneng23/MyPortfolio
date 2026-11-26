using PortfolioApi.Data;
using PortfolioApi.Models;

namespace PortfolioApi.Services;

public class ContactService : IContactService
{
    private readonly AppDbContext _dbContext;

    // AppDbContext is injected via Dependency Injection
    public ContactService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<ContactMessage> SaveMessageAsync(ContactRequestDto dto)
    {
        var entity = new ContactMessage
        {
            FullName = dto.FullName.Trim(),
            Email = dto.Email.Trim(),
            Message = dto.Message.Trim(),
            CreatedAt = DateTime.UtcNow
        };

        _dbContext.ContactMessages.Add(entity);
        await _dbContext.SaveChangesAsync();
        return entity;
    }
}