using System.ComponentModel.DataAnnotations;

namespace Backend.Services
{
    public static class ValidationHelper
    {
        public static List<string> ValidateObject<T>(T obj)
        {
            ArgumentNullException.ThrowIfNull(obj);
            List<ValidationResult>? results = [];
            var context = new ValidationContext(obj, serviceProvider: null, items: null);

            Validator.TryValidateObject(obj, context, results, validateAllProperties: true);

            return [.. results.Select(res => res.ErrorMessage!)];
        }
    }
}