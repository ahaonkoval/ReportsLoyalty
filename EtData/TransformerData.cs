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

        public delegate void CreatePack(PackDocs o);
        public event CreatePack onCreatePack;

        public delegate void ProcessedPackEnd();
        public event ProcessedPackEnd onProcessedPackEnd;

        public delegate void CreateDoc(TDoc o);
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
                    onCreatePack(new Models.PackDocs {
                        Count = list.Count,
                        Created = DateTime.Now
                    });

                foreach (CrmWizardDB.TFGetUnprocessedDocumentsResult doc in list)
                {
                    var doc_movement = db.SellMovement.Where(w => w.DocId == doc.doc_id).ToList();
                    if (doc_movement.Count > 0)
                    {
                        switch (doc.doc_type_id)
                        {
                            case 2201:
                                #region 2201	Повернення від клієнта	Воз	BuyerReturn	Возврат от клиента
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
                                               GoodId = lines.GoodId.Value,
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

                                    SetDocStatus(db, doc, 10);
                                } else { SetDocStatus(db, doc, 0); }
                                #endregion
                                break;
                            case 4301:
                                #region 4301	Списання	Спс	Clear	Списание
                                foreach (DataModels.SellMovement sm in doc_movement)
                                {
                                    db.SellMovementHistory.Insert(() => new SellMovementHistory
                                    {
                                        BonusObtained = 0,
                                        BonusUsed = 0,
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
                                SetDocStatus(db, doc, 10);
                                #endregion
                                break;
                            case 8001: 
                                #region 8001	Касова накладна	Кнк	CashInvoice	Кассовая накладная
                                var ci = db.CashinvoiceLine1.Where(w => w.CashinvoiceId == doc.doc_id).ToList();
                                var sell_ci = from dc in doc_movement
                                           join lines in ci
                                           on dc.DocId equals lines.CashinvoiceId
                                           where dc.GoodId == lines.GoodId
                                           select new DataModels.SellMovementHistory
                                           {
                                               BonusObtained = lines.BonusObtained,
                                               BonusUsed = lines.BonusUsed,
                                               BuyPrice = dc.BuyPrice == null ? 0 : dc.BuyPrice.Value,
                                               Created = dc.Created,
                                               DiscountAmount = lines.DiscountAmount,
                                               DocId = doc.doc_id,
                                               DocTypeId = doc.doc_type_id.Value,
                                               FinPrice = dc.FinPrice.Value,
                                               GoodId = dc.GoodId,
                                               MarketId = dc.MarketId,
                                               MarkmoCodeUsingId = lines.MarkmoCodeUsingId,
                                               ParentId = dc.ParentId,
                                               Price = dc.Price,
                                               PromoCodeUsingId = lines.PromoCodeUsingId,
                                               Qty = dc.Qty,
                                               RealPrice = dc.RealPrice,
                                               ShortDate = dc.Created,
                                               StoreId = dc.StoreId
                                           };

                                if (sell_ci.Count() > 0)
                                {
                                    foreach (DataModels.SellMovementHistory sm in sell_ci)
                                    {
                                        db.SellMovementHistory.Insert(() => new SellMovementHistory
                                        {
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
                                    SetDocStatus(db, doc, 10); 
                                } else { SetDocStatus(db, doc, 0); }
                                #endregion
                                break;
                            case 8101: 
                                #region 8101	Роздрібна накладна	Ррз	RetailInvoice	Розничная накладная
                                var ri = db.RetailinvoiceLine1.Where(w => w.RetailinvoiceId == doc.doc_id).ToList();
                                var sell_ri = from dc in doc_movement
                                              join lines in ri
                                              on dc.DocId equals lines.RetailinvoiceId
                                              where dc.GoodId == lines.GoodId.Value
                                              select new DataModels.SellMovementHistory
                                              {
                                                  BonusObtained = lines.BonusObtained,
                                                  BonusUsed = lines.BonusUsed,
                                                  BuyPrice = dc.BuyPrice,
                                                  Created = dc.Created,
                                                  DiscountAmount = lines.DiscountAmount,
                                                  DocId = doc.doc_id,
                                                  DocTypeId = doc.doc_type_id.Value,
                                                  FinPrice = dc.FinPrice,
                                                  GoodId = dc.GoodId,
                                                  MarketId = dc.MarketId,
                                                  MarkmoCodeUsingId = lines.MarkmoCodeUsingId,
                                                  ParentId = dc.ParentId,
                                                  Price = dc.Price,
                                                  PromoCodeUsingId = lines.PromoCodeUsingId,
                                                  Qty = dc.Qty,
                                                  RealPrice = dc.RealPrice,
                                                  ShortDate = dc.Created,
                                                  StoreId = dc.StoreId
                                              };
                                if (sell_ri.Count() > 0)
                                {
                                    foreach (DataModels.SellMovementHistory sm in sell_ri)
                                    {
                                        db.SellMovementHistory.Insert(() => new SellMovementHistory
                                        {
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
                                    SetDocStatus(db, doc, 10);
                                } else { SetDocStatus(db, doc, 0); }
                                #endregion
                                break;
                            case 8201:
                                #region 8201	Безготівкова роздрібна накладна	Рнк	OutcomeInvoice	Безналичная розничная накладная
                                var c_outcome = db.OutcomeinvoiceLine1.Where(w => w.OutcomeinvoiceId == doc.doc_id).ToList();
                                var sell_outcome =
                                    from dc in doc_movement
                                    join lines in c_outcome
                                    on dc.DocId equals lines.OutcomeinvoiceId
                                    where dc.GoodId == lines.GoodId.Value
                                    select new DataModels.SellMovementHistory
                                    {
                                        BonusObtained = 0,
                                        BonusUsed = 0,
                                        BuyPrice = dc.BuyPrice,
                                        Created = dc.Created,
                                        DiscountAmount = lines.DiscountAmount,
                                        DocId = doc.doc_id,
                                        DocTypeId = doc.doc_type_id.Value,
                                        FinPrice = dc.FinPrice,
                                        GoodId = dc.GoodId,
                                        MarketId = dc.MarketId,
                                        MarkmoCodeUsingId = lines.MarkmoCodeUsingId,
                                        ParentId = dc.ParentId,
                                        Price = dc.Price,
                                        PromoCodeUsingId = lines.PromoCodeUsingId,
                                        Qty = dc.Qty,
                                        RealPrice = dc.RealPrice,
                                        ShortDate = dc.Created,
                                        StoreId = dc.StoreId
                                    };
                                if (sell_outcome.Count() > 0)
                                {
                                    foreach (DataModels.SellMovementHistory sm in sell_outcome)
                                    {
                                        db.SellMovementHistory.Insert(() => new SellMovementHistory
                                        {
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
                                    SetDocStatus(db, doc, 10);
                                }
                                else { SetDocStatus(db, doc, 0); }
                                #endregion
                                break;
                            case 14001:
                                #region 14001	Інвентаризація (вирівнювання)	Апс	Inventarization	Инвентаризация (выравнивание)
                                // Деталізацію поки що не передають, тому використовуємо тільки те що є в movement
                                foreach (DataModels.SellMovement sm in doc_movement)
                                {
                                    db.SellMovementHistory.Insert(() => new SellMovementHistory
                                    {
                                        BonusObtained = 0,
                                        BonusUsed = 0,
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
                                SetDocStatus(db, doc, 10);
                                #endregion
                                break;
                        }

                        if (onCreateDoc != null)
                            onCreateDoc(new TDoc {
                                DocId = doc.doc_id,
                                Name = doc.doc_name,
                                Transformered = DateTime.Now
                            });
                    } else
                    {
                        SetDocStatus(db, doc, 0);
                    }
                }

                transaction.Commit();
                if (onProcessedPackEnd != null)
                    onProcessedPackEnd();
            }
        }

        void SetDocStatus(CrmWizardDB db, CrmWizardDB.TFGetUnprocessedDocumentsResult doc, int status)
        {
            db.DocStatusHistory.Insert(() => new DocStatusHistory
            {
                DocId = doc.doc_id,
                DocStatus = status,
                Created = DateTime.Now,
                Updated = DateTime.Now
            });
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
