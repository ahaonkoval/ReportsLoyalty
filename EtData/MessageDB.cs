using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using LinqToDB;
using LinqToDB.Data;
using static DataModels.CrmWizardDB;
using DataModels;

namespace LoyaltyDB
{
    public class MessageDB
    {
        public MessageDB() { }
        /// <summary>
        /// Поветнає список шаблонів
        /// </summary>
        /// <returns></returns>
        public IEnumerable<SendMessagesTemplates> GetMessageTemplates()
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                return db.SendMessagesTemplates.ToList();
            }
        }
        /// <summary>
        /// Повертає шаблон
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public SendMessagesTemplates GetMessageTemplateById(int id)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                return db.SendMessagesTemplates.Where(w => w.Id == id).FirstOrDefault();
            }
        }        
        /// <summary>
        /// Додавання шаблону
        /// </summary>
        /// <param name="m_key"></param>
        /// <param name="m_name"></param>
        /// <param name="m_viber"></param>
        /// <param name="m_sms"></param>
        /// <param name="m_condition_doc_amount"></param>
        /// <param name="m_link_image"></param>
        /// <param name="m_link_button"></param>
        /// <returns></returns>
        public object AddMessageTemplate(string m_key, string m_name, string m_viber, string m_sms, int m_condition_doc_amount, string m_link_image, string m_link_button)
        {
            object id = -1;
            using (var db = new DataModels.CrmWizardDB())
            {
                id = db.SendMessagesTemplates.InsertWithIdentity(() => new SendMessagesTemplates
                {
                    MKey = m_key,
                    MName = m_name,
                    MSms = m_sms,
                    MViber = m_viber,
                    ConditionDocAmount = m_condition_doc_amount,
                    LinkButton = m_link_button,
                    LinkImage = m_link_image
                });
            }
            return id;
        }
        /// <summary>
        /// Збереження змін (налаштування шаблону)
        /// </summary>
        /// <param name="id"></param>
        /// <param name="m_key"></param>
        /// <param name="m_name"></param>
        /// <param name="m_viber"></param>
        /// <param name="m_sms"></param>
        /// <param name="m_condition_doc_amount"></param>
        /// <param name="m_link_image"></param>
        /// <param name="m_link_button"></param>
        public void UpdateMessageTemplate(int id, string m_key, string m_name, string m_viber, string m_sms, int m_condition_doc_amount, string m_link_image, string m_link_button)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                db.SendMessagesTemplates.Where(w => w.Id == id)
                    .Set(m => m.MKey, m_key)
                    .Set(m => m.MName, m_name.Trim())
                    .Set(m => m.MSms, m_sms.Trim())
                    .Set(m => m.MViber, m_viber.Trim())
                    .Set(m => m.ConditionDocAmount, m_condition_doc_amount)
                    .Set(m => m.LinkButton, m_link_button.Trim())
                    .Set(m => m.LinkImage, m_link_image.Trim()
                    ).Update();
            }
        }
        /// <summary>
        /// Збереження чи додавання шаблона повідомлення (налаштування шаблону)
        /// </summary>
        /// <param name="id"></param>
        /// <param name="m_key"></param>
        /// <param name="m_name"></param>
        /// <param name="m_viber"></param>
        /// <param name="m_sms"></param>
        /// <param name="m_condition_doc_amount"></param>
        /// <param name="m_link_image"></param>
        /// <param name="m_link_button"></param>
        /// <returns></returns>
        public object UpdateOrInsert(int id, string m_key, string m_name, 
            string m_viber, string m_sms, int m_condition_doc_amount, string m_link_image, string m_link_button)
        {
            object n_id = null;
            try
            {
                using (var db = new DataModels.CrmWizardDB())
                {
                    if (id == 0)
                    {
                        n_id = AddMessageTemplate(m_key, m_name, m_viber, m_sms, m_condition_doc_amount, m_link_image, m_link_button);
                    }
                    else
                    {
                        UpdateMessageTemplate(id, m_key, m_name, m_viber, m_sms, m_condition_doc_amount, m_link_image, m_link_button);
                    };
                }
            } catch (Exception ex)
            {
                int i = 90;
            }
            return n_id;
        }

        public void DeleteMessageTemplate(int id)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                db.SendMessagesTemplates.Delete(w => w.Id == id);
            }
        }
        /// <summary>
        /// ВПовертає список тестових телефонів з вказаними дозволами
        /// </summary>
        /// <returns></returns>
        public IEnumerable<SendTestPhones> GetTestPhones()
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                return db.SendTestPhones.ToList();
            }
        }
        /// <summary>
        /// Відправити тестове повідомлення всім тестовим телефонам кому вказано в списку
        /// </summary>
        /// <param name="templateId"></param>
        public void SendTest(int templateId)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                using (SqlConnection c = new SqlConnection(db.ConnectionString))
                {
                    try
                    {
                        SqlCommand cmd = c.CreateCommand();
                        cmd.CommandTimeout = 100000000;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Connection = c;
                        cmd.CommandText = "calc.p_send_test_message";
                        cmd.Parameters.AddWithValue("@template_id", templateId);

                        if (c.State != ConnectionState.Open)
                            c.Open();
                        cmd.ExecuteNonQuery();

                    }
                    catch (Exception ex)
                    {
                        int i = 0;
                        // TODO Логировать ошибку
                    }
                }
            }
        }
        /// <summary>
        /// Відправляти тестове повідормлення
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="Checked"></param>
        public void SetToTest(int Id, bool Checked)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                db.SendTestPhones.Where(w => w.Id == Id)
                    .Set(p => p.Used, Checked).Update();
            }
        }
        /// <summary>
        /// Виводить статистику по тригерним повідомленням, кількість УПЛ що тримали повідомлення
        /// </summary>
        /// <returns></returns>
        public IEnumerable<object> GetSentTriggerMessages()
        {
            using (var db = new DataModels.CrmWizardDB())
            {                
                var sent = from sc in db.SendCustomers
                         group sc by sc.TemplateId into g
                         select new { TemplateId = g.Key, Count = g.Count() };

                var tm = from mt in db.SendMessagesTemplates
                         join cm in sent on mt.Id equals cm.TemplateId
                         select new { TemplateId = mt.Id, Name = mt.MName, cm.Count };

                return tm.ToList().OrderByDescending(o => o.TemplateId);
            }
        }
        /// <summary>
        /// Вивести всіх УПЛ кому відправленно повідомлення, посторінковий перегляд
        /// </summary>
        /// <param name="id"></param>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <returns></returns>
        public IEnumerable<object> GetRecipientsTriggerMessage(int id, DateTime date, int start, int end)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                var c1 = from sc in db.SendCustomers
                         join c in db.CrmCustomers on sc.CrmCustomerId equals c.CrmCustomerId
                         where sc.TemplateId == id && sc.DateSend == date
                         select new
                                {
                                    RowNumber = Sql.Ext.RowNumber()
                                    .Over()
                                    .OrderBy(sc.Id)
                                    .ToValue(),
                                    CrmCustomerId = sc.CrmCustomerId,
                                    sc.DateSend,
                                    sc.StatusId,
                                    CustomerName = string.Format("{0} {1} {2}", c.Name1, c.Name2, c.Name3),
                                    c.MobilePhone
                                };

                var c_part = c1.ToList().Where(w => w.RowNumber.Between(start, end)).ToList().OrderBy(o => o.RowNumber);

                return c_part.ToList().OrderByDescending(w => w.RowNumber);
            }
        }
        /// <summary>
        /// Для вивантаження всіх УПЛ, кому відправлялись тригерні повідомлення вказаного шаблону
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public DataTable GetAllRecipientsTriggerMessage(int id)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                var c1 = from sc in db.SendCustomers
                         join c in db.CrmCustomers on sc.CrmCustomerId equals c.CrmCustomerId                         
                         where sc.TemplateId == id 
                         select new
                         {
                             RowNumber = Sql.Ext.RowNumber()
                                    .Over()
                                    .OrderBy(sc.Id)
                                    .ToValue(),
                             CrmCustomerId = sc.CrmCustomerId,
                             sc.DateSend,
                             sc.StatusId,
                             CustomerName = string.Format("{0} {1} {2}", c.Name1, c.Name2, c.Name3),
                             c.MobilePhone
                         };

                var a = c1.ToList();

                DataTable a1 = a.Select(x1 => new
                {
                    Номер = x1.RowNumber,
                    CrmCustomerId = x1.CrmCustomerId,
                    УПЛ = x1.CustomerName == null ? string.Empty : x1.CustomerName,
                    Телефон = x1.MobilePhone == null ? string.Empty : x1.MobilePhone,
                    Дата_відправки = x1.DateSend
                }).CopyToDataTable();

                //var c_part = c1.Select(x => new
                //{
                //    RowNumber = x.RowNumber,
                //    CrmCustomerId = x.CrmCustomerId,
                //    CustomerName = x.CustomerName == null ? string.Empty : x.CustomerName,
                //    MobilePhone = x.MobilePhone ==  null ? string.Empty : x.MobilePhone
                //}).ToList();

                return a1; //c_part.CopyToDataTable();//.OrderByDescending(w => w.RowNumber);
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IEnumerable<object> GetSentTriggerMessageByDate(int id)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                var c1 = from sc in db.SendCustomers
                         where sc.TemplateId == id
                         group sc by sc.DateSend into t
                         select new { DateSend = t.Key, CustomersQty = t.Count() };
                return c1.ToList().Select(
                        (m, index) => new {
                            index, m.CustomersQty, DateSend = Convert.ToString(m.DateSend.Value)
                        }
                    );
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int GetRecipientsCountbyTemplateId(int id, DateTime date)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                return db.SendCustomers.Where(w => w.TemplateId == id && w.DateSend == date).Count();
            }
        }
    }
}
