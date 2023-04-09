namespace Common.Models.Core;

public class Task {

    public int Id {get; init;}

    public string Title {get; set;} = string.Empty;

    public string Description {get; set;} = string.Empty;

    public int Status {get; set;}

    public int Assignee {get; set;}

    public int Type {get; set;}

    public int Words {get; set;}

    public int Timeliness {get; set;}

    public int ContractId {get; init;}

}