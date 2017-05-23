using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace ReportsLoyalty.Helpers
{
    public class AuthHelper
    {
        public UsersDS DataSet { get; set; }

        public AuthHelper()
        {
            DataSet = new UsersDS();
            string path = HttpContext.Current.Server.MapPath("~/UsersData.xml");

            DataSet.ReadXml(path, System.Data.XmlReadMode.InferSchema);
        }
        
        public bool Auth(string user, string password, out UserMasterGift umuser)
        {
            DataRow[] rows = DataSet.Users.Select(
                string.Format("UserName= '{0}' and Password= '{1}'", user, password));
            if (rows.Count() > 0)
            {
                umuser = new UserMasterGift(
                    Convert.ToInt32(rows[0]["id"]), 
                    rows[0]["UserName"].ToString(), 
                    rows[0]["Role"].ToString());

                return true; 
            } else {
                umuser = null;
                return false; 
            }
        }

        public UserMasterGift GetRoleByLogin(string user)
        {

            DataRow[] rows = DataSet.Users.Select(string.Format("UserName= '{0}'", user));
            if (rows.Count() > 0)
            {
                UsersDS.UsersRow row = ((UsersDS.UsersRow)rows[0]);
                UserMasterGift umuser = new UserMasterGift(row.id, row.UserName, row.Role);

                return umuser;
            }
            else
            {
                return null;
            }
        }
    }

    public class UserMasterGift
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public MasterGiftRoles Role { get; set; }
        public string CreatedBy { 
                get {
                    return string.Format("{0}:{1}", this.Role.ToString(), this.UserName);
                } 
        }

        public UserMasterGift()
        {

        }

        public UserMasterGift(int id, string username, string role)
        {
            this.Id = id;
            this.UserName = username;
            this.Role = (MasterGiftRoles)Convert.ToInt16(role);
        }
    }

    public enum MasterGiftRoles
    {
        admin = 1,
        manager = 2,
        store = 3
    }
}