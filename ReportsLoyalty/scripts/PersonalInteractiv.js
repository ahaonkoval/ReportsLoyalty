
var showPersonalInteractiv = function ()
{
    var center = Ext.getCmp('pnlCenter');

    var p_personal_offers = Ext.getCmp('p_personal_offers');
    if (p_personal_offers != null) return;

    var storeReport = Ext.create('Ext.data.JsonStore',
        {
            autoLoad: false,
            autoDestroy: true,
            //model: campaign_customers_model,
            proxy: {
                type: 'ajax',
                url: ('api/report'),

                //url: (local ? url.local : url.remote),
                reader: {
                    type: 'json',
                    root: 'data',
                    idProperty: 'id',
                    totalProperty: 'total'
                }
            },
            remoteSort: false,
            sorters: [
                {
                    property: 'number',
                    direction: 'ASC'
                }
            ],
            pageSize: 50,
            fields: [
                { name: 'market_id', type: 'int' },
                { name: 'shopping_center', type: 'string' },
                { name: 'doc_qty_art', type: 'int' },
                { name: 'customers_qty_art', type: 'int' },
                { name: 'sm_discount', type: 'float' },
                { name: 'avg_art', type: 'float' },
                { name: 'sm_art', type: 'float' },
                { name: 'doc_qty_group', type: 'int' },
                { name: 'customers_qty_group', type: 'int' },
                { name: 'avg_group', type: 'float' },
                { name: 'sm_group', type: 'float' },
                { name: 'doc_qty_depart', type: 'int' },
                { name: 'customers_qty_depart', type: 'int' },
                { name: 'avg_depart', type: 'float' },
                { name: 'sm_depart', type: 'float' },
                { name: 'doc_qty_market', type: 'int' },
                { name: 'customers_qty_market', type: 'int' },
                { name: 'avg_market', type: 'float' },
                { name: 'sm_market', type: 'float' },
                { name: 'sm_discount_all', type: 'float' },
                { name: 'sm_buy_art', type: 'float' },
                { name: 'sm_buy_group', type: 'float' },
                { name: 'sm_buy_depart', type: 'float' },
                { name: 'sm_buy_market', type: 'float' },
                { name: 'margin_art', type: 'float' },
                { name: 'margin_group', type: 'float' },
                { name: 'margin_depart', type: 'float' },
                { name: 'margin_market', type: 'float' },
                { name: 'qty_customers', type: 'int' },
                //{ name: 'sm_discount_all', type: 'float' }
            ]
        });

    var createColumns = function (finish, start) {

        var columns = [
            {
                dataIndex: 'market_id',
                text: '№',
                filterable: false,
                width: 35,
                menuDisabled: true
            }, {
                text: 'ТЦ',
                dataIndex: 'shopping_center',
                menuDisabled: true,
                width: 150,                
            },
            {
                text: 'По артикулах',
                flex: 1,
                //menuDisabled: true,                
                columns: [
                    {
                        width: 55,
                        dataIndex: 'doc_qty_art',
                        text: 'К-сть док.',
                        menuDisabled: true,
                        height: 60,
                    },
                    {
                        width: 60,
                        dataIndex: 'customers_qty_art',
                        text: 'К-сть УПЛ',
                        menuDisabled: true
                    },
                    {
                        width: 60,
                        dataIndex: 'sm_discount',
                        text: 'Сума знижки',
                        menuDisabled: true
                    },
                    {
                        width: 60,
                        dataIndex: 'sm_art',
                        text: 'Оберт. грн',
                        menuDisabled: true
                    },
                    {                     
                        width: 60,
                        dataIndex: 'margin_art',
                        text: 'Маржа грн.',
                        menuDisabled: true
                    },
                    {
                        width: 60,
                        dataIndex: 'avg_art',
                        text: 'Середній чек',
                        cls: 'grid-header-phone',
                        menuDisabled: true
                    },
                    {
                        width: 60,
                        dataIndex: 'margin_art',
                        text: 'Фактична маржа',
                        cls: 'grid-header-phone',
                        menuDisabled: true
                    }
                ]
            },
            {

                text: 'Департамент',
                columns: [
                    {
                        width: 60,
                        dataIndex: 'doc_qty_group',
                        text: 'К-сть док.',
                        menuDisabled: true,
                    },
                    {
                        width: 60,
                        dataIndex: 'customers_qty_group',
                        text: 'К-сть УПЛ',
                        menuDisabled: true,
                    },
                    {
                        width: 60,
                        dataIndex: 'sm_group',
                        text: 'Оберт. грн',
                        menuDisabled: true,
                    },
                    {
                        width: 60,
                        dataIndex: 'margin_group',
                        text: 'Маржа грн.',
                        menuDisabled: true,
                    },
                    {
                        width: 60,
                        dataIndex: 'avg_group',
                        text: 'Середній чек', cls: 'grid-header-phone',
                        menuDisabled: true,
                    },
                    {
                        width: 60,
                        dataIndex: 'margin_group',
                        text: 'Фактична маржа', cls: 'grid-header-phone',
                        menuDisabled: true,
                    }
                ]
            },
            {

                text: 'Відділ',
                columns: [
                    {
                        width: 60,
                        dataIndex: 'doc_qty_depart',
                        text: 'К-сть док.',
                        menuDisabled: true,
                    },
                    {
                        width: 60,
                        dataIndex: 'customers_qty_depart',
                        text: 'К-сть УПЛ',
                        menuDisabled: true,
                    },
                    {
                        width: 60,
                        dataIndex: 'sm_depart',
                        text: 'Оберт. грн',
                        menuDisabled: true,
                    },
                    {
                        width: 60,
                        dataIndex: 'margin_depart',
                        text: 'Маржа грн.',
                        menuDisabled: true,
                    },
                    {
                        width: 60,
                        dataIndex: 'avg_depart',
                        text: 'Середній чек', cls: 'grid-header-phone',
                        menuDisabled: true,
                    },
                    {
                        width: 60,
                        dataIndex: 'margin_depart',
                        text: 'Фактична маржа', cls: 'grid-header-phone',
                        menuDisabled: true,
                    }
                ]
            }, {
                text: 'По маркету',
                columns: [
                    {
                        width: 60,
                        dataIndex: 'doc_qty_market',
                        text: 'К-сть док.',
                        menuDisabled: true,
                    },
                    {
                        width: 60,
                        dataIndex: 'customers_qty_market',
                        text: 'К-сть УПЛ',
                        menuDisabled: true,
                    },
                    {
                        width: 60,
                        dataIndex: 'sm_market',
                        text: 'Оберт. грн',
                        menuDisabled: true,
                    },
                    {
                        width: 60,
                        dataIndex: 'margin_market',
                        text: 'Маржа грн.',
                        menuDisabled: true,
                    },
                    {
                        width: 60,
                        dataIndex: 'avg_market',
                        text: 'Середній чек',
                        cls: 'grid-header-phone',
                        menuDisabled: true,
                    },
                    {
                        width: 60,
                        dataIndex: 'margin_market',
                        text: 'Фактична маржа',
                        cls: 'grid-header-phone',
                        menuDisabled: true,
                    }
                ]
            }, {
                text: 'Загальна знижка',
                dataIndex: 'sm_discount_all',
            }
             
        ];

        return columns.slice(start || 0, finish);
    };

    var grid = Ext.create('Ext.grid.Panel', {
        stateful: true,
        stateId: 'stateful-filter-grid',
        border: false,
        store: storeReport,
        columns: createColumns(9),
        plugins: 'gridfilters',
        loadMask: true,
        //features: [filters],
        dockedItems: [Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            //store: store,
            listeners: {
                beforechange(ctrl, page, eOpts) {
                    // ураааааа!!!!
                    //store.getProxy().extraParams.isRun = checkboxIsRun.getValue();
                    //store.getProxy().extraParams.TypeId = comboBox.getValue();
                    //store.getProxy().extraParams.blogid = 1;
                }
            }
        })],
        emptyText: 'Записів більше нема',
        listeners: {
            rowdblclick: function (grid, record, e) {
                /* открываєм окно редактирования */
                //winCd.Show(record);
            },
            selectionchange (ctrl, selected, eOpts) {
                //alert(selected);
                //if (selected[0].get('mailing_id') == "") {
                //    btnStartGettingMailingStatus.setHidden(true);
                //} else {
                //    btnStartGettingMailingStatus.setHidden(false);
                //}
            }
        },
        plugins: {
            ptype: "rowexpander",
            rowBodyTpl: '<div class="ux-row-expander-box"></div>'
        },
        viewConfig: {
            forceFit: true,
            stripeRows: false,
            trackOver: false,
            scrollable: true,
            listeners: {
                expandbody: function (rowNode, record, expandRow, eOpts) {
                    var element = Ext.get(expandRow).child('.x-grid-cell-rowbody').child('.x-grid-rowbody ').child('.ux-row-expander-box');
                    var contain = element.child('.x-panel', true);
                    if (contain == null) {

                        var subPanel = Ext.create('Ext.panel.Panel', {
                            height: 150
                            //html: '<p>World!</p>'
                        });

                        subPanel.render(element);
                    }
                }
            }
            //getRowClass: function (record) {
                //return record.get('is_run') == true ? 'child-row' : 'adult-row';
                //var css = record.get('is_run') == true ? 'x-grid-row-run' : 'x-grid-row';
                //if (record.get('is_start_get_status') == 1) {
                //    return 'x-grid-row-getting-status';
                //} else {
                //    return css;
                //}
                //record.get('is_run') == true ? 'x-grid-row-run' : 'x-grid-row';
            //}
        }
    });

    var comboBoxMarkets = Ext.create('Ext.form.ComboBox', {
        fieldLabel: 'Магазин',
        store: dict.getStoreMarkets(),
        multiSelect: true,
        queryMode: 'local',
        valueField: 'ShortName',
        displayField: 'MarketName',
        width: 300,
        labelWidth: 50,
        emptyText: 'Всі',
        itemCls: 'make-bold',
        renderTo: Ext.getBody(),
        tpl: Ext.create('Ext.XTemplate',
            '<tpl for=".">',
                '<div class="x-boundlist-item">{MarketName}</div>',
            '</tpl>'
        ),
        displayTpl: Ext.create('Ext.XTemplate',
            '<tpl for=".">',
                '{ShortName};',
            '</tpl>'
        ),
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpts) {
                if (newValue.indexOf('all') > -1 && oldValue.indexOf('all') == -1) {
                    ctrl.setValue(['all'])
                } else {
                    if (oldValue != null) {
                        if (newValue.indexOf('all') > -1 && oldValue.indexOf('all') > -1)
                            ctrl.setValue([]);
                    }
                }
            }
        }
    });

    var comboBoxCampaigns = Ext.create('Ext.form.ComboBox', {
        //xtype: 'combobox',
        width: 420,
        store: dict.getStoreCampaigns(2),
        queryMode: 'local',
        displayField: 'Name',
        valueField: 'Id',
        renderTo: Ext.getBody()
    });

    var datefieldCampaigns = Ext.create('Ext.form.DateField', {
        //xtype: 'combobox',
        //store: dict.getStoreCampaigns(2),
        format: "d/m/Y",
        minDate: new Date(),
        width: 100,
        //scope: this,
        listeners: {            
            expand: function (ctrl, eOpts) {
                //var cmbCampaigns = Ext.getCmp('cmbCampaigns_personal_offers');
                if (comboBoxCampaigns != null) {
                    if (comboBoxCampaigns.getValue() != null) {
                        getDisabledDatesById(
                            comboBoxCampaigns.getValue(),
                            datefieldCampaigns);
                    }
                }
            }
        }
    });

    var btnEdit = Ext.create('Ext.Button', {
        text: 'Показати',
        width: 100,
        renderTo: Ext.getBody(),
        scope: storeReport,
        handler: function (ctrl, event) {
            var selection_record = ctrl.scope.getSelection();
            if (selection_record.length > 0)
                winCd.Show(selection_record[0], grid.getStore());
        }
    });


    var cbfControlGrp = Ext.create('Ext.form.field.Checkbox', { //Ext.form.CheckBoxField
        
    });


    tab = center.add({
        id: 'p_personal_offers',
        title: 'Персональні пропозиції',
        extend: 'Ext.panel.Panel',
        closable: true,
        layout: 'fit',
        items: {
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'start'
            },
            items: [{
                xtype: 'panel',
                height: 36,
                items: {
                    xtype: 'toolbar',
                    height: 35,
                    items: [{
                        xtype: 'label',
                        text: 'Акції'
                    },
                    comboBoxCampaigns,
                    {
                        xtype: 'tbseparator'
                    }, {
                        xtype: 'label',
                        text: 'На дату:'
                    },
                    datefieldCampaigns,
                    {
                        xtype: 'tbseparator'
                    },
                    comboBoxMarkets,
                    {
                        xtype: 'label',
                        text: 'Контрольна група:'
                    },
                    cbfControlGrp,
                    //,{
                    //    xtype: 'checkboxfield',
                    //    id: 'ch_control_group_personal_offers',
                    //    name: 'salami'
                    //},
                    {
                        xtype: 'button',
                        width: 100,
                        text: 'Показати',
                        scope: storeReport,
                        handler: function (ctrl) {
                            var store = ctrl.scope;
                            store.loadPage(1, {
                                params: {
                                    CampaignId: comboBoxCampaigns.getValue(),
                                    RDate: datefieldCampaigns.getValue(),
                                    MarketLst: comboBoxMarkets.getValue(),
                                    ControlGrp: cbfControlGrp.getValue()
                                    }
                                });
                            }
                    }
                    ]
                }
            }, {
                xtype: 'panel',
                layout: 'fit',
                id: 'p_rep_conteiner_personal_offers',
                flex: 1,
                items: [
                    grid
                ]
            }]
        }
    });

    //storeReport.load();

    //storeReport.load({
    //    params: {
    //        CampaignId: comboBoxCampaigns.getValue(),
    //        RDate: '01.01.01',
    //        MarketLst: '123',
    //        ControlGrp: '0'
    //    }
    //});

    center.setActiveTab(tab);
}