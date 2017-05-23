﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Этот код создан по шаблону.
//
//     Изменения, вносимые в этот файл вручную, могут привести к непредвиденной работе приложения.
//     Изменения, вносимые в этот файл вручную, будут перезаписаны при повторном создании кода.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EtData
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class LoyaltyEntities : DbContext
    {
        public LoyaltyEntities()
            : base("name=LoyaltyEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<dict_markets> dict_markets { get; set; }
        public virtual DbSet<markmo_types> markmo_types { get; set; }
        public virtual DbSet<markmos1> markmos1 { get; set; }
        public virtual DbSet<campaigns_mk> campaigns_mk { get; set; }
        public virtual DbSet<v_campaigns_mk> v_campaigns_mk { get; set; }
        public virtual DbSet<v_campaigns_mk_run> v_campaigns_mk_run { get; set; }
        public virtual DbSet<campaign_articul> campaign_articul { get; set; }
        public virtual DbSet<campaign_groups> campaign_groups { get; set; }
        public virtual DbSet<campaign_participant> campaign_participant { get; set; }
        public virtual DbSet<campaign_sub_groups> campaign_sub_groups { get; set; }
        public virtual DbSet<v_fgroups> v_fgroups { get; set; }
        public virtual DbSet<campaign_types> campaign_types { get; set; }
    
        public virtual ObjectResult<p_get_trade_with_extra_points_Result> p_get_trade_with_extra_points(Nullable<int> campaign_id, Nullable<System.DateTime> date, Nullable<int> market_id)
        {
            var campaign_idParameter = campaign_id.HasValue ?
                new ObjectParameter("campaign_id", campaign_id) :
                new ObjectParameter("campaign_id", typeof(int));
    
            var dateParameter = date.HasValue ?
                new ObjectParameter("date", date) :
                new ObjectParameter("date", typeof(System.DateTime));
    
            var market_idParameter = market_id.HasValue ?
                new ObjectParameter("market_id", market_id) :
                new ObjectParameter("market_id", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<p_get_trade_with_extra_points_Result>("p_get_trade_with_extra_points", campaign_idParameter, dateParameter, market_idParameter);
        }
    
        public virtual ObjectResult<UPLOAD_CONTROL> p_get_daily_upload_control(Nullable<System.DateTime> date, Nullable<int> market_id)
        {
            var dateParameter = date.HasValue ?
                new ObjectParameter("date", date) :
                new ObjectParameter("date", typeof(System.DateTime));
    
            var market_idParameter = market_id.HasValue ?
                new ObjectParameter("market_id", market_id) :
                new ObjectParameter("market_id", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<UPLOAD_CONTROL>("p_get_daily_upload_control", dateParameter, market_idParameter);
        }
    
        [DbFunction("LoyaltyEntities", "t_get_campaigns")]
        public virtual IQueryable<tf_campaigns> t_get_campaigns(Nullable<bool> isRun)
        {
            var isRunParameter = isRun.HasValue ?
                new ObjectParameter("isRun", isRun) :
                new ObjectParameter("isRun", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.CreateQuery<tf_campaigns>("[LoyaltyEntities].[t_get_campaigns](@isRun)", isRunParameter);
        }
    
        [DbFunction("LoyaltyEntities", "t_get_campaign_customers")]
        public virtual IQueryable<tf_campaign_customers> t_get_campaign_customers(Nullable<long> campaign_id)
        {
            var campaign_idParameter = campaign_id.HasValue ?
                new ObjectParameter("campaign_id", campaign_id) :
                new ObjectParameter("campaign_id", typeof(long));
    
            return ((IObjectContextAdapter)this).ObjectContext.CreateQuery<tf_campaign_customers>("[LoyaltyEntities].[t_get_campaign_customers](@campaign_id)", campaign_idParameter);
        }
    }
}
