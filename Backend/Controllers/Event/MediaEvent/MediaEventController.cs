using Backend.Data;
using Backend.DataTransferObjects;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers.Event
{
    [ApiController]
    [Route("api/[controller]")]
    public class MediaEventController : Controller
    {
        private readonly AppDBProvider _db;
        private readonly MappingService _mappingService;

        public MediaEventController(AppDBProvider db, MappingService mappingService)
        {
            _db = db;
            _mappingService = mappingService;
        }

        public class EventRequest { public required string ID { get; set; } }



        [HttpPost("all")]
        public async Task<ActionResult<ICollection<M_EventDTO>>> getAllEvents([FromBody] EventRequest request)
        {
            if (string.IsNullOrEmpty(request.ID)) return BadRequest("[ERROR] id is empty");

            List<M_MediaEvent>? events = await _db.Events.AsNoTracking().Where(ev => ev.UserAccountID == request.ID).ToListAsync();

            if (events == null || events.Count == 0) return BadRequest("[ERROR] no events found");

            List<M_EventDTO> mappedEvents = _mappingService.mapEventsToDTO(events);

            return Ok(mappedEvents);
        }
    }
}
