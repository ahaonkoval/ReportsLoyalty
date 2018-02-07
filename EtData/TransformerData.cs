using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Win32.SafeHandles;
using System.Runtime.InteropServices;
using DataModels;
using LoyaltyDB.Models;
using System.Collections;
using LinqToDB;

namespace LoyaltyDB
{
    public class TransformerData: IDisposable
    {
        bool disposed = false;
        SafeHandle handle = new SafeFileHandle(IntPtr.Zero, true);

        public delegate void CreatePack(object o);
        public event CreatePack onCreatePack;

        public delegate void CreateDoc(object o);
        public event CreateDoc onCreateDoc;

        List<Task> tasks;

        public TransformerData()
        {
            tasks = new List<Task>();
        }

        public void TransformMovementStep()
        {
            using (var db = new CrmWizardDB())
            {
                var transaction = db.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted);

                var list = db.TFGetUnprocessedDocuments().ToList();
                if (onCreatePack != null)
                    onCreatePack(string.Format("Завантажена партія чеків: {0} шт.", list.Count().ToString()));

                foreach (CrmWizardDB.TFGetUnprocessedDocumentsResult doc in list)
                {
                    var doc_movement = db.SellMovement.Where(w => w.DocId == doc.doc_id).ToList();
                    if (doc_movement.Count > 0)
                    {
                        switch (doc.doc_type_id)
                        {
                            case 2201:
                                var ReturnedLines = db.BuyerreturnLine1.Where(w => w.BuyerreturnId == doc.doc_id).ToList();

                                var sell = from dc in doc_movement
                                           join lines in ReturnedLines
                                           on dc.DocId equals lines.BuyerreturnId
                                           where dc.GoodId == lines.GoodId.Value
                                           select new DataModels.SellMovementHistory
                                           {
                                               BonusObtained = lines.BonusObtained.Value,
                                               BonusUsed = lines.BonusUsed.Value,
                                               BuyPrice = dc.BuyPrice.Value,
                                               Created = dc.Created,
                                               DiscountAmount = 0,
                                               DocId = doc.doc_id,
                                               DocTypeId = doc.doc_type_id.Value,
                                               FinPrice = dc.FinPrice.Value,
                                               GoodId = dc.GoodId,
                                               MarketId = dc.MarketId,
                                               MarkmoCodeUsingId = 0,
                                               ParentId = dc.ParentId,
                                               Price = dc.Price,
                                               PromoCodeUsingId = 0,
                                               Qty = dc.Qty,
                                               RealPrice = dc.RealPrice,
                                               ShortDate = dc.Created,
                                               StoreId = dc.StoreId
                                           };
                                if (sell.Count() > 0)
                                {
                                    foreach (DataModels.SellMovementHistory sm in sell)
                                    {
                                        db.SellMovementHistory.Insert(() => new SellMovementHistory {
                                            BonusObtained = sm.BonusObtained,
                                            BonusUsed = sm.BonusUsed,
                                            BuyPrice = sm.BuyPrice,
                                            Created = sm.Created,
                                            DiscountAmount = 0,
                                            DocId = doc.doc_id,
                                            DocTypeId = doc.doc_type_id.Value,
                                            FinPrice = sm.FinPrice.Value,
                                            GoodId = sm.GoodId,
                                            MarketId = sm.MarketId,
                                            MarkmoCodeUsingId = 0,
                                            ParentId = sm.ParentId,
                                            Price = sm.Price,
                                            PromoCodeUsingId = 0,
                                            Qty = sm.Qty,
                                            RealPrice = sm.RealPrice,
                                            ShortDate = sm.Created,
                                            StoreId = sm.StoreId
                                        });
                                    }
                                }

                                break;
                            case 4301:
                                break;
                            case 8001:
                                var ci = db.CashinvoiceLine1.Where(w => w.CashinvoiceId == doc.doc_id).ToList();
                                break;
                            case 8101:
                                var ri = db.RetailinvoiceLine1.Where(w => w.RetailinvoiceId == doc.doc_id).ToList();
                                break;
                            case 8201:
                                break;
                            case 14001:
                                break;
                        }
                    }
                }

                //if (onCreateDoc != null)
                //    onCreateDoc(doc.doc_id.ToString());           

                transaction.Commit();
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        // Protected implementation of Dispose pattern.
        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
                return;

            if (disposing)
            {
                handle.Dispose();
                // Free any other managed objects here.
                //
            }

            // Free any unmanaged objects here.
            //
            disposed = true;
        }
    }
}
