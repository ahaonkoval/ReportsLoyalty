    declare 
        @t_goods table (good_id bigint primary key)
    declare
        @t_customers_doc table (
            crm_customer_id bigint, 
            doc_id          bigint,
            created         date
        );
    declare 
        @t_customers_doc_details table (
            crm_customer_id bigint, 
            doc_id          bigint,
            good_id         bigint,
            price           decimal(10,2),
            quantity        decimal(10,3)
        );        
    declare
        @condition_doc_amount   int,
        @template_id            int     = 4

    set @condition_doc_amount = (
            select top 1 isnull(tm.condition_doc_amount, 0) 
                from calc.send_messages_templates (nolock) tm 
                    where tm.id = @template_id)

   insert into @t_goods (good_id)
    select dt.good_id from calc.dict_goods dt (nolock) where left(dt.articul, 5) in (
        '10801','10808','10813','10819','10820','10822','10823','10826','10828',
        '10829','10830','10831','10835','10836','10837','10840','10844','10846',
        '10849','10851','10852','10856','10857','10861','10862','10864','10869',
        '10872','10874','10876','10878','10882','10883','10886','10888','10890');
    /* Групи які проходять як тригерні по купках */
    insert into @t_goods (good_id)
    select dt.good_id from calc.dict_goods dt (nolock) 
        left join @t_goods t on dt.good_id = t.good_id
    where t.good_id is null
        and left(dt.articul, 5) in (
        '10901','10902','10903','10904','10905','10906','10907','10908','10909',
        '10910','10911','10912','10913','10914','10915','10916','10917','10918',
        '10919','10920','10921','10922','10923','10924','10925','10926','10927',
        '10928','10929','10930','10931','10932','10933','10934','10935','10936',
        '10937');
    /* Групи які проходять як тригерні по купках */
    insert into @t_goods (good_id) 
    select dt.good_id from calc.dict_goods dt (nolock) 
        left join @t_goods t on dt.good_id = t.good_id
    where t.good_id is null
        and left(dt.articul, 5) in (
        '10501','10502','10504','10506','10508','10509')
    /* Збираємо чеки УПЛ що зробили покупку */
    insert into @t_customers_doc (crm_customer_id, doc_id, created)
    select uc.crm_customer_id, uc.doc_id, uc.short_created 
    from calc.v_cardusing uc --inner join dbo.short_docs1 sd (nolock) on uc.doc_id = sd.doc_id
        where uc.short_created >= '2019-03-01'

    insert into @t_customers_doc_details (crm_customer_id, doc_id, good_id, price, quantity)
    select a.crm_customer_id, a.doc_id, c1.good_id, c1.price_nds, c1.quantity 
        from @t_customers_doc a inner join dbo.cashinvoice_line1 c1 (nolock) 
            on a.doc_id = c1.cashinvoice_id
    /* Залишаємо покупки тільки потрібних артикулів */
    insert into @t_customers_doc_details (crm_customer_id, doc_id, good_id, price, quantity)
    select a.crm_customer_id, a.doc_id, c1.good_id, c1.price_nds, c1.quantity 
        from @t_customers_doc a inner join dbo.retailinvoice_line1 c1 (nolock) 
            on a.doc_id = c1.retailinvoice_id

    insert into @t_customers_doc_details (crm_customer_id, doc_id, good_id, price, quantity)
    select a.crm_customer_id, a.doc_id, c1.good_id, c1.price_nds, c1.quantity 
    from @t_customers_doc a 
        inner join dbo.bill_line1 c1 (nolock) 
            on a.doc_id = c1.bill_id

    SELECT 
        l.barcode,
        cast(sd.name as nvarchar)       as doc_name,
        sd.created						as date_sell,
        cast(a.features as nvarchar)	as details
    FROM (
        select 
            a.crm_customer_id, 
            a.doc_id,
            N'Сума покупок артикулів: ' 
                + cast(cast(sum(a.price * a.quantity) as real) as nvarchar) features
        from @t_customers_doc_details a 
                inner join @t_goods t on a.good_id = t.good_id
        group by
            a.crm_customer_id,
            a.doc_id
        having
            sum(a.price * a.quantity) >= 500
    ) a 
    inner join dbo.short_docs1 sd (nolock) on a.doc_id = sd.doc_id
    cross apply (
        select top 1 * from dbo.cards cc (nolock) 
            where cc.crm_customer_id = a.crm_customer_id
                order by cc.[start] desc
    ) l
    ORDER BY
        sd.created,
        l.barcode,
        sd.name
        