using Backend.DataTransferObjects;
using Backend.Models;

namespace Backend.Services
{
    public class MappingService
    {
        /// <summary>
        /// Function for mapping a list with multiple DB events to its corresponding response DTO objects structure.
        /// </summary>
        /// <param name="events"></param>
        /// <returns></returns>
        public List<M_MediaEventResponseDTO> mapEventsToResponseDTO(List<M_MediaEvent> events)
        {
            return [.. events.Select(ev => new M_MediaEventResponseDTO
            {
                ID = ev.ID.ToString(),
                Title = ev.Title,
                Notes = ev.Notes,
                Start = ev.Start,
                End = ev.End,
                IsDone = ev.IsDone,
                EventCreated = ev.MediaEventCreated
            })];
        }

        /// <summary>
        /// Function for mapping a single DB media event object to its corresponding response DTO object.
        /// </summary>
        /// <param name="ev"></param>
        /// <returns></returns>
        public M_MediaEventResponseDTO mapSingleEventToResponseDTO(M_MediaEvent ev)
        {
            return new M_MediaEventResponseDTO
            {
                ID = ev.ID.ToString(),
                Title = ev.Title,
                Notes = ev.Notes,
                Start = ev.Start,
                End = ev.End,
                IsDone = ev.IsDone,
                EventCreated = ev.MediaEventCreated
            };
        }
    }
}
