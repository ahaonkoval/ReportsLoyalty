//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class campaign_sub_groups
    {
        public long id { get; set; }
        public Nullable<long> campaign_id { get; set; }
        public Nullable<long> group_id { get; set; }
        public string group_name { get; set; }
    
        public virtual campaigns_mk campaigns_mk { get; set; }
    }
}
