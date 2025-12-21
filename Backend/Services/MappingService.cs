using Backend.DataTransferObjects;
using Backend.Models;

namespace Backend.Services
{
    public class MappingService
    {
        public List<M_EventDTO> mapEventsToDTO(List<M_MediaEvent> events)
        {
            return events.Select(ev => new M_EventDTO
            {
                ID = ev.ID,
                UserAccountID = ev.UserAccountID,
                Title = ev.Title,
                Notes = ev.Notes,
                Start = ev.Start,
                End = ev.End,
                IsDone = ev.IsDone,
                EventCreated = ev.EventCreated
            }).ToList();
        }
    }
}
