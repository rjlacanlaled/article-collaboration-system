using System.ComponentModel.DataAnnotations;

namespace Api.Models.OpenId
{
    public class VerifyCodeViewModel
    {
        [Required]
        public string Provider { get; set; } = string.Empty;

        [Required]
        public string Code { get; set; } = string.Empty;

        public string ReturnUrl { get; set; } = string.Empty;

        [Display(Name = "Remember this browser?")]
        public bool RememberBrowser { get; set; }

        public bool RememberMe { get; set; }
    }
}