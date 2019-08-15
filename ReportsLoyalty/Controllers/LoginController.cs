using ReportsLoyalty.Helpers;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Security;

namespace ReportsLoyalty.Controllers
{
    public class LoginController : ApiController
    {
        // GET: api/Login
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Login/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Login
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Login/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Login/5
        public void Delete(int id)
        {
        }

        [HttpGet]
        public string auth(int id)
        {
            string returned = string.Empty;
            AuthHelper auth = new AuthHelper();
            var parameters = Request.GetQueryNameValuePairs();
            var username = parameters.Where(o => o.Key == "username").FirstOrDefault();
            var password = parameters.Where(o => o.Key == "password").FirstOrDefault();

            UserMasterGift umg = new UserMasterGift();
            if (ModelState.IsValid)
            {
                if (auth.Auth(username.Value, password.Value, out umg))
                {
                    FormsAuthentication.SetAuthCookie(username.Value, true);
                    returned = "true";
                }
                else
                {
                    returned = "false";
                }
            }
            return returned;
        }

        [HttpGet]
        public string logout(int id)
        {
            FormsAuthentication.SignOut();
            return "true";
        }

        [HttpGet]
        public bool check(int id)
        {
            bool isAuth = System.Web.HttpContext.Current.User.Identity.IsAuthenticated;
            return isAuth;
        }
    }
}

