namespace Application.Exceptions;

public class PersistanceExeption : Exception
{
    public PersistanceExeption(string message, Exception innerException) : base(message, innerException) { }
}