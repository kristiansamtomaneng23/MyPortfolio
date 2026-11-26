using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Models;
using PortfolioApi.Services;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IContactService _contactService;

    // IContactService is resolved automatically by the DI container
    public ContactController(IContactService contactService)
    {
        _contactService = contactService;
    }

    [HttpPost]
    public async Task<IActionResult> SendMessage([FromBody] ContactRequestDto request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var saved = await _contactService.SaveMessageAsync(request);
        return Ok(new
        {
            id = saved.Id,
            message = "Thank you! Your message has been saved."
        });
    }
}