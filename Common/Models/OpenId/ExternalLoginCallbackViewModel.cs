namespace Common.Models.OpenId
{
    public class ExternalLoginCallbackViewModel
    {
        public string ReturnUrl { get; set; } = string.Empty;

        public string RemoteError { get; set; } = string.Empty;
    }
}