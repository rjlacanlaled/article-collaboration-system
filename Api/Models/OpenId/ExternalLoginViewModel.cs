using System.ComponentModel.DataAnnotations;

namespace Api.Models.OpenId
{
    public class ExternalLoginViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        public string Provider { get; set; } = string.Empty;

        public string ReturnUrl { get; set; } = string.Empty;
    }
}