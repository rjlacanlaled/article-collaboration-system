using System.ComponentModel.DataAnnotations;

namespace Common.Models.OpenId
{
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Display(Name = "User name")]
        public string UserName { get; set; } = string.Empty;
    }
}