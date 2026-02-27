namespace Application.Common;

public interface IUseCaseHandler<in TRequest, TResult>
{
    Task<TResult> HandleAsync(TRequest request);
}