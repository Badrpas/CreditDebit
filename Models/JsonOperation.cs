using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Accounting.Models
{
    public class JsonOperation
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        
        public JsonOperation(DataBase.Operation operation)
        {
            Id = operation.Id;
            Amount = operation.Amount;
        }
    }
}