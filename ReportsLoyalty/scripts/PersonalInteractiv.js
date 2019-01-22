
var showPersonalInteractiv = function ()
{
    var center = Ext.getCmp('pnlCenter');

    var p_personal_offers_view = Ext.getCmp('p_personal_offers_view');
    if (p_personal_offers_view != null) return;

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
                        height: 60,
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
                        height: 60,
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
                        height: 60,
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
            },
            selectionchange (ctrl, selected, eOpts) {
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

                        var storeMarket = Ext.create('Ext.data.JsonStore',
                               {
                                   autoLoad: false,
                                   autoDestroy: true,
                                   proxy: {
                                       type: 'ajax',
                                       url: ('api/report'),
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
                                           property: 'market_id',
                                           direction: 'ASC'
                                       }
                                   ],
                                   pageSize: 50,
                                   fields: [
                                            { name: 'market_id', type: 'int' },
                                            { name: 'Prms', type: 'string' },
                                            { name: '_10', type: 'number' },
                                            { name: '_20', type: 'number' },
                                            { name: '_30', type: 'number' },
                                            { name: '_40', type: 'number' },
                                            { name: '_50', type: 'number' },
                                            { name: '_60', type: 'number' },
                                            { name: '_70', type: 'number' },
                                            { name: '_80', type: 'number' },
                                            { name: '_90', type: 'number' },
                                            { name: '_100', type: 'number' },
                                            { name: '_210', type: 'number' },
                                            { name: '_310', type: 'number' },
                                            { name: '_800', type: 'number' },
                                            { name: '_0', type: 'number' },
                                   ]
                               });

                        var gridMarket = Ext.create('Ext.grid.Panel', {
                            stateful: true,
                            stateId: 'stateful-filter-grid',
                            border: false,
                            store: storeMarket,
                            columns: [
                                {
                                    width: 100, dataIndex: 'Prms', text: 'Параметр', menuDisabled: true, align: 'center'
                                }, {
                                    width: 70, dataIndex: '_310', text: '310', menuDisabled: true, align: 'center'
                                }, {
                                    width: 70, dataIndex: '_10', text: '10', menuDisabled: true, align: 'center'
                                }, {
                                    width: 70, dataIndex: '_20', text: '20', menuDisabled: true, align: 'center'
                                }, {
                                    width: 70, dataIndex: '_30', text: '30', menuDisabled: true, align: 'center'
                                }, {
                                    width: 70, dataIndex: '_40', text: '40', menuDisabled: true, align: 'center'
                                }, {
                                    width: 70, dataIndex: '_50', text: '50', menuDisabled: true, align: 'center'
                                }, {
                                    width: 70, dataIndex: '_60', text: '60', menuDisabled: true, align: 'center'
                                }, {
                                    width: 70, dataIndex: '_70', text: '70', menuDisabled: true, align: 'center'
                                }, {
                                    width: 70, dataIndex: '_80', text: '80', menuDisabled: true, align: 'center'
                                }, {
                                    width: 70, dataIndex: '_90', text: '90', menuDisabled: true, align: 'center'
                                }, {
                                    width: 70, dataIndex: '_100', text: '100', menuDisabled: true, align: 'center'
                                }, {
                                    width: 70, dataIndex: '_800', text: '800', menuDisabled: true, align: 'center'
                                }, {
                                    width: 70, dataIndex: '_210', text: '210', menuDisabled: true, align: 'center'
                                }, {
                                    width: 70, dataIndex: '_0', text: 'н/у', menuDisabled: true, align: 'center'
                                }
                            ],
                            loadMask: true
                        });

                        var p = Ext.create('Ext.panel.Panel', {
                            layout: 'fit',
                            //id: 'pnl' + record.get('market_id'),
                            html: '<div id="graph' + record.get('market_id') + '" style="width:100%; height:200px;"></div>',
                            scope: record.get('market_id'),
                            listeners: {                                
                                afterrender: function (ctrl, eOpts) {

                                    var store = Ext.create('Ext.data.JsonStore',
                                    {
                                        autoLoad: false,
                                        autoDestroy: true,
                                        proxy: {
                                            type: 'ajax',
                                            url: ('api/report'),
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
                                                property: 'market_id',
                                                direction: 'ASC'
                                            }
                                        ],
                                        pageSize: 50,
                                        fields: [
                                            { name: 'market_id', type: 'int' },
                                            { name: 'Name', type: 'string' },
                                            { name: 'qty_docs', type: 'int' },
                                            { name: 'qty_customers', type: 'int' },
                                            { name: 'obert', type: 'int' },
                                            { name: 'department', type: 'string' }
                                        ]
                                    });

                                    store.loadPage(1, {
                                        params: {
                                            TypeLoad: 'market_otd',
                                            CampaignId: comboBoxCampaigns.getValue(),
                                            RDate: datefieldCampaigns.getValue(),
                                            MarketId: record.get('market_id'),
                                            ControlGrp: cbfControlGrp.getValue()
                                        },
                                        callback: function (records, operation, success) {

                                            var rc = []

                                            records.forEach(function (record) {
                                                //console.log(record);
                                                var o = {
                                                    Name: record.data.Name,
                                                    QtyCustomers: record.data.qty_customers,
                                                    QtyDocs: record.data.qty_docs,
                                                    Obert: record.data.obert,
                                                    Department: record.data.department
                                                };
                                                rc.push(o);
                                            });

                                            Morris.Bar({
                                                element: 'graph' + ctrl.scope,
                                                data: rc,
                                                xkey: 'Department',
                                                ykeys: ['QtyDocs', 'QtyCustomers'], // , 'Obert'
                                                labels: ['К-сть док:', 'К-сть УПЛ:'] //, 'Obert'
                                                //labels: ['Y', 'Z', 'A']
                                            }).on('click',
                                                function (i, row) {
                                                    console.log(i, row);
                                                }
                                            );
                                        }
                                    });
                                }
                            }
                        });

                        /*  ===============================================================================================================================================  */

                        var p_obert = Ext.create('Ext.panel.Panel', {
                            layout: 'fit',
                            //id: 'pnl' + record.get('market_id'),
                            html: '<div id="obert' + record.get('market_id') + '" style="width:100%; height:200px;"></div>',
                            scope: record.get('market_id'),
                            listeners: {                                
                                afterrender: function (ctrl, eOpts) {

                                    var store = Ext.create('Ext.data.JsonStore',
                                    {
                                        autoLoad: false,
                                        autoDestroy: true,
                                        proxy: {
                                            type: 'ajax',
                                            url: ('api/report'),
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
                                                property: 'market_id',
                                                direction: 'ASC'
                                            }
                                        ],
                                        pageSize: 50,
                                        fields: [
                                            { name: 'market_id', type: 'int' },
                                            { name: 'Name', type: 'string' },
                                            { name: 'qty_docs', type: 'int' },
                                            { name: 'qty_customers', type: 'int' },
                                            { name: 'obert', type: 'int' },
                                            { name: 'department', type: 'string' }
                                        ]
                                    });

                                    store.loadPage(1, {
                                        params: {
                                            TypeLoad: 'market_otd',
                                            CampaignId: comboBoxCampaigns.getValue(),
                                            RDate: datefieldCampaigns.getValue(),
                                            MarketId: record.get('market_id'),
                                            ControlGrp: cbfControlGrp.getValue()
                                        },
                                        callback: function (records, operation, success) {

                                            var rc = []

                                            records.forEach(function (record) {
                                                var o = {
                                                    Name: record.data.Name,
                                                    QtyCustomers: record.data.qty_customers,
                                                    QtyDocs: record.data.qty_docs,
                                                    Obert: record.data.obert,
                                                    Department: record.data.department
                                                };
                                                rc.push(o);
                                            });

                                            Morris.Bar({
                                                element: 'obert' + ctrl.scope,
                                                data: rc,
                                                xkey: 'Department',
                                                ykeys: ['Obert'], 
                                                labels: ['Оберт'] //, 'Obert'
                                                //labels: ['Y', 'Z', 'A']
                                            }).on('click',
                                                function (i, row) {
                                                    console.log(i, row);
                                                }
                                            );
                                        }
                                    });
                                }
                            }
                        });

                        /*  ===============================================================================================================================================  */

                        var subPanel = Ext.create('Ext.panel.Panel', {
                            height: 250,
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'tabpanel',
                                    items: [{
                                        xtype: 'panel',
                                        title: 'По маркету',
                                        items: [gridMarket],
                                        scrollable: true
                                    },{
                                        title: 'Графік УПЛ - Документи',
                                        layout: 'fit',
                                        items: [p]
                                    }, {

                                        xtype: 'panel',
                                        title: 'Графік - Оберт',
                                        items: [p_obert],
                                    }]
                                }]
                        });                        

                        subPanel.render(element);

                        storeMarket.loadPage(1, {
                            params: {
                                TypeLoad: 'market_otd_pivot',//'market_otd',
                                CampaignId: comboBoxCampaigns.getValue(),
                                RDate: datefieldCampaigns.getValue(),
                                MarketId: record.get('market_id'),
                                ControlGrp: cbfControlGrp.getValue()
                            },
                            callback: function (records, operation, success) {

                            }
                        });
                    }
                }
            }
        }
    });

    var comboBoxMarkets = Ext.create('Ext.form.ComboBox', {
        fieldLabel: 'Магазин',
        store: dict.getStoreMarkets(),
        multiSelect: true,
        queryMode: 'local',
        valueField: 'ShortName',
        displayField: 'MarketName',
        width: 250,
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
        width: 220,
        store: dict.getStoreCampaigns(2),
        queryMode: 'local',
        displayField: 'Name',
        valueField: 'Id'
        //renderTo: Ext.getBody()
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
        id: 'p_personal_offers_view',
        title: 'Персональні пропозиції (перегляд)',
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
                    {
                        xtype: 'button',
                        width: 100,
                        text: 'Показати',
                        scope: storeReport,
                        handler: function (ctrl) {
                            var store = ctrl.scope;
                            store.loadPage(1, {
                                params: {
                                    TypeLoad: 'base',
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
                //id: 'p_rep_conteiner_personal_offers',
                flex: 1,
                items: [
                    grid
                ]
            }]
        }
    });

    center.setActiveTab(tab);
}