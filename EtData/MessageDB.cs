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

        public IEnumerable<SendMessagesTemplates> GetMessageTemplates()
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                return db.SendMessagesTemplates.ToList();
            }
        }

        public SendMessagesTemplates GetMessageTemplateById(int id)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                return db.SendMessagesTemplates.Where(w => w.Id == id).FirstOrDefault();
            }
        }

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

        public object UpdateOrInsert(int id, string m_key, string m_name, string m_viber, string m_sms, int m_condition_doc_amount, string m_link_image, string m_link_button)
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
    }
}
