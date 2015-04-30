using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;
using Accounting.Models;
using DataBase;


namespace Accounting.Controllers
{
    public class AccountsController : ApiController
    {
        public IHttpActionResult Get()
        {
            var accounts = Repository.GetAccounts();
            return Json(accounts);
        }

        public IHttpActionResult Get(int id)
        {
            var account = Repository.GetAccount(id);
            return Json(account);
        }

        public HttpResponseMessage Delete(int id)
        {
            return Repository.RemoveAccount(id) ? 
                new HttpResponseMessage(HttpStatusCode.OK) : 
                new HttpResponseMessage(HttpStatusCode.NoContent);
        }

        public IHttpActionResult Post(HttpRequestMessage request)
        {
            var newAccountName = request.Content.ReadAsStringAsync().Result;
            if (newAccountName.Length == 0)
                return StatusCode(HttpStatusCode.BadRequest);
            var account = new Account { Name = newAccountName };
            account = Repository.CreateAccount(account);
            return Json(account);
        }
    }
}
