using Application.Common;
using Application.Exceptions;
using Domain.GeneralEvents;

namespace Application.GeneralEvents.Delete;

public class DeleteGeneralEventHandler(IGeneralEventRepository repository) : IUseCaseHandler<DeleteGeneralEventCommand, GeneralEventResult>
{
    public async Task<GeneralEventResult> HandleAsync(DeleteGeneralEventCommand request)
    {
        GeneralEvent? mediaEvent = await repository.GetGeneralEventById(request.UserAccountId, request.EventId);

        if (mediaEvent is null) throw new NotFoundException("[ERROR - DeleteMediaEventHandler: HandleAsync()] Error when trying to get media for deleting");

        return new GeneralEventResult(
            mediaEvent.ID,
            mediaEvent.Title,
            mediaEvent.Notes,
            mediaEvent.MeetingPlace,
            mediaEvent.Start,
            mediaEvent.End,
            mediaEvent.IsDone
        );
    }
}