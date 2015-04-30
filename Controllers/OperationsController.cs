using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Accounting.Models;
using DataBase;
using Newtonsoft.Json;

namespace Accounting.Controllers
{

    public class JsonNewOperation
    {
        public decimal Amount { get; set; }
        public int AccountId { get; set; }
    }

    public class OperationsController : ApiController
    {
        public IHttpActionResult Get(int id)
        {
            var operations = Repository.GetOperations(id);
            var operations_resp = operations.Select(operation => new JsonOperation(operation)).ToList();
            return Json(operations_resp);
        }

        public IHttpActionResult Post(HttpRequestMessage request)
        {
            var jsonString = request.Content.ReadAsStringAsync().Result;
            var acc = JsonConvert.DeserializeObject<JsonNewOperation>(jsonString);
            if (acc.AccountId == 0)
                return null;
            var operation = Repository.CreateOperation(acc.Amount, acc.AccountId);
            if (operation != null)
            {
                return Json(operation);
            }
            else
            {
                return StatusCode(HttpStatusCode.Gone);
            }
        }
    }
}
