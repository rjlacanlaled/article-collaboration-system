using System.Collections.Generic;

namespace Common.Models.OpenId
{
    public class SendCodeViewModel
    {
        public string SelectedProvider { get; set; } = string.Empty;

        public ICollection<string> Providers { get; set; } = new List<string>();

        public string ReturnUrl { get; set; } = string.Empty;

        public bool RememberMe { get; set; }
    }
}