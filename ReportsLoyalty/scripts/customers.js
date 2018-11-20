
Ext.define('tf_campaign_customers', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'number', type: 'int' },
        { name: 'name1', type: 'string' },
        { name: 'name2', type: 'string' }, {
            name: 'name3', type: 'string'
        }, {
            name: 'gender', type: 'string'
        }, {
            name: 'barcode', type: 'string'
        }, {
            name: 'mobile_phone', type: 'string'
        }, {
            name: 'control_group', type: 'string'
        }, {
            name: 'delivery_channel', type: 'string'
        }, {
            name: 'market_name', type: 'string'
        }]
});

Ext.define('p_TmpSchemaTableList', {
        extend: 'Ext.data.Model',
        fields: [
            { name: 'object_id',    type: 'int' },
            { name: 'name', type: 'string' },
            { name: 'row_count', type: 'string' },
            {
                name: 'name_row_count',
                type: 'string',
                convert: function (v, record) {
                    if (v == null) {
                        var value = record.get('name') + ' ' + record.get('row_count');
                        
                        return value;
                    }
                }
            }
        ]
    });

var getWinCustomers = function (campaign_id) {
    
    var cmp_id = campaign_id;

    var createColumns = function (finish, start) {

        var columns = [
            {
                dataIndex: 'number',
                text: 'Id',
                //filterable: false,
                width: 50
            }, {
                dataIndex: 'name1',
                text: 'Прізвище',
                //id: 'name',
                flex: 3,
                filter: {
                    type: 'string'
                }
            }, {
                dataIndex: 'name2',
                flex: 2,
                //xtype: 'datecolumn',
                //format: 'd.m.Y',//'Y-m-d', // H:i:s
                text: "ім'я",
                filter: {
                    type: 'string'  // specify type here or in store fields config
                }
                //width: 80
            }, {
                dataIndex: 'name3',
                flex: 1,
                //xtype: 'datecolumn',
                text: 'по батькові',
                //format: 'd.m.Y',
                filter: {
                    type: 'string'  // specify type here or in store fields config
                }
            }, {
                dataIndex: 'gender',
                disabled: true,
                //xtype: 'checkcolumn',
                text: 'Стать',
                width: 60
            }, {
                dataIndex: 'barcode',
                disabled: true,
                text: '№ картки',
                width: 90
            }, {
                dataIndex: 'mobile_phone',
                disabled: true,
                text: 'Моб. телефон',
                width: 120
            }, {
                dataIndex: 'control_group',
                disabled: true,
                text: 'Контр. грп.',
                width: 100
            }, {
                dataIndex: 'delivery_channel',
                disabled: true,
                text: 'Канал',
                width: 80
            }, {
                dataIndex: 'market_name',
                disabled: true,
                text: 'Видано',
                width: 150
            }
        ];

        return columns.slice(start || 0, finish);
    };

    var store = Ext.create('Ext.data.JsonStore', {
        //id: 'store_campaign_customers',
        autoLoad: true,
        // store configs
        autoDestroy: true,
        model: tf_campaign_customers,
        proxy: {
            type: 'ajax',
            url: ('api/Customer?campaign_id=' + campaign_id),

            //url: (local ? url.local : url.remote),
            reader: {
                type: 'json',
                root: 'data',
                idProperty: 'id',
                totalProperty: 'total'
            }
        },
        remoteSort: false,
        sorters: [{
            property: 'number',
            direction: 'ASC'
        }],
        pageSize: 50
    });

    var grid = Ext.create('Ext.grid.Panel', {
        stateful: true,
        stateId: 'stateful-filter-grid',
        border: false,
        store: store,
        columns: createColumns(10),
        plugins: 'gridfilters',
        loadMask: true,
        //features: this.filters,
        //dockedItems: [dctItm],
        dockedItems: [Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            store: store
        })],
        emptyText: 'Записів більше нема',
        listeners: {
            'rowdblclick': function (grid, record, e) {
                /* открываєм окно редактирования */
                //winCd.Show(record);
                //win_campaign_details_show(record);
            }
        },
        viewConfig: {
            stripeRows: false,
            getRowClass: function (record) {
                //return record.get('is_run') == true ? 'child-row' : 'adult-row';
                //return record.get('is_run') == true ? 'x-grid-row-run' : 'x-grid-row';
            }
        }
    })

    var btnCustomersAdd = Ext.create('Ext.button.Split', {
        renderTo: Ext.getBody(),
        text: 'Завантаження УПЛ',
        // handle a click on the button itself
        handler: function () {
            //alert("The button was clicked");
        },
        menu: new Ext.menu.Menu({
            items: [
                // these will render as dropdown menu items when the arrow is clicked:
                {
                    text: 'Вибрати по вказаним параметрам', handler: function () {
                        getWinSelectCustomers(cmp_id, win).show();
                    }
                },
                {
                    text: 'Завантажити з створеної вибірки', handler: function () {
                        getWinFillCustomersList(cmp_id).show();
                    }
                }
            ]
        })
    });

    var win = Ext.create('Ext.Window', {
        //id: 'win_customers',
        title: 'Учасники кампанії',
        width: '80%',
        height: '80%',
        modal: true,
        closable: true,
        layout: {
            type: 'vbox',
            align: 'stretch',
            pack: 'start'
        },
        items: [{
            xtype: 'panel',
            height: 1
        }, {
            xtype: 'panel',
            border: false,
            flex: 1,
            layout: 'fit',
            items: [
                {                    
                    header: false,
                    layout: 'fit',
                    items: [
                        //grid_customers(campaign_id)
                        grid
                    ]
                }
            ]           
        }],
        buttons: [btnCustomersAdd,
            {
                xtype: 'button',
                text: 'В CSV (Всі поля)',
                scope: cmp_id,
                listeners: {
                    'click': function (ctrl) {
                        var url = 'api/Customer/GetCustomersFileLong/' + ctrl.scope;
                        window.open(url);
                    }
                }
            },
            {
            xtype: 'button',
            text: 'В CSV (коротко)',
            scope: cmp_id,
            listeners: {
                'click': function (ctrl) {
                    var url = 'api/Customer/GetCustomersFile/' + ctrl.scope;
                    window.open(url);
                }
            }
        },
        //{
        //    xtype: 'button',
        //    text: 'Зберегти',
        //    listeners: {
        //        'click': function () {
        //        }
        //    }
        //}
        , {
            xtype: 'button',
            text: 'Закрити',
            scope: this,
            listeners: {
                'click': function () {
                    win.close();
                }
            }
        }]
    })

    return win;
};

var getWinFillCustomersList = function (campaign_id) {

    var cmpId = campaign_id;

    var store = Ext.create('Ext.data.JsonStore', {
        autoLoad: true,
        // store configs
        autoDestroy: true,
        model: p_TmpSchemaTableList,
        proxy: {
            type: 'ajax',
            url: ('api/dict/GetTmpSchemaTableList/0'),

            //url: (local ? url.local : url.remote),
            reader: {
                type: 'json',
                root: 'data',
                idProperty: 'object_id',
                totalProperty: 'total'
            }
        },
        remoteSort: false,
        sorters: [{
            property: 'number',
            direction: 'ASC'
        }],
        pageSize: 50
    });

    var grid = Ext.create('Ext.grid.Panel', {
        stateful: true,
        stateId: 'stateful-filter-grid',
        border: false,
        store: store,
        columns: [
                {
                    dataIndex: 'name_row_count',
                    text: 'Таблиця',
                    width: '100%',
                }
        ],
        loadMask: true,
        dockedItems: [Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            store: store
        })],
        emptyText: 'Записів більше нема',
        listeners: {
            'rowdblclick': function (grid, record, e) {
                /* открываєм окно редактирования */
                Ext.Msg.confirm("Увага!", "Завантажити УПЛ з таблиці '" + record.get('name') + "'", function (btnText) {
                    if (btnText === "no") {

                    }
                    else if (btnText === "yes") {
                        StartFillCampaign(record, cmpId);
                        win.hide();
                    }
                }, this);
            }
        },
        viewConfig: {
            stripeRows: false,
            getRowClass: function (record) {
                //return record.get('is_run') == true ? 'child-row' : 'adult-row';
                //return record.get('is_run') == true ? 'x-grid-row-run' : 'x-grid-row';
            }
        }
    })

    var checkbox = new Ext.form.Checkbox({
        boxLabel: 'Видалити після завантаження: ',
        boxLabelAlign: 'before',
        padding: 3
    }).setValue(true);

    var win = Ext.create('Ext.Window', {
        //id: 'win_customers',
        title: 'Завантажити УПЛ з готової вибірки...',
        width: 400,
        height: 500,
        modal: true,
        closable: true,
        layout: 'fit',
        items: [
        {
            xtype: 'panel',
            border: false,
            //flex: 1,
            //layout: 'fit',
            layout: {
                type: 'vbox',
                align : 'stretch',
                pack  : 'start',
            },
            items: [
                { height: 30, items: [checkbox]
            },
                {
                    html: 'panel 3', flex: 1, layout: 'fit',
                    items: [ grid ]
                }
            ]
        }],
        buttons: [            
            {
                xtype: 'button',
                text: 'Завантажити',
                //scope: cmp_id,
                listeners: {
                    'click': function (ctrl) {
                        var selection = grid.selModel.getSelection();
                        if (selection.length > 0) {
                            StartFillCampaign(selection[0], cmpId, checkbox.getValue())
                            win.hide();
                        } else {
                            Ext.Msg.alert("Увага!", "Не вибрана таблиця для заванатження УПЛ!");
                        }
                    }
                }
            },
            {
                xtype: 'button',
                text: 'Закрити',
                //scope: cmp_id,
                listeners: {
                    'click': function (ctrl) {
                        win.hide();
                    }
                }
            },]
     })

    return win;
};

var StartFillCampaign = function (record, campaignId, todelete) {
    var name = record.get('name');

    $.ajax({
        url: 'api/start/0',
        type: 'get',
        data: {
            TypeRequest: 20,
            CampaignId: campaignId,
            TableName: name,
            toDelete: todelete
        },
        success: function (state) {
        }
    });
}

var getWinSelectCustomers = function (campaign_id, parentWin) {
    // ---------------------------------------------------------------------------------------
    var checkboxTradeCentre = new Ext.form.field.Checkbox({
        labelWidth: 220,
        fieldLabel: 'Вибрати ТЦ',
        boxLabelAlign: 'before',
        padding: 3,
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpts) {
                comboBoxMarketsOm.setDisabled(!newValue);
            }
        }
    });

    comboBoxMarketsOm = Ext.create('Ext.form.ComboBox', {
        disabled:true,
        fieldLabel: 'ТЦ',
        labelWidth: 40,
        store: dict.getStoreMarkets(),
        multiSelect: true,
        //queryMode: 'local',
        valueField: 'ShortName',
        displayField: 'MarketName',
        width: 300,
        labelWidth: 50,
        emptyText: 'Всі',
        itemCls: 'make-bold',
        padding: 3,
        //renderTo: Ext.getBody(),
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
    // ---------------------------------------------------------------------------------------
    var checkboxStartPart = new Ext.form.Checkbox({
        labelWidth: 220,
        fieldLabel: 'Початок участі в програмі',
        boxLabelAlign: 'before',
        padding: 3,
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpts) {
                datefieldStartPart_1.setDisabled(!newValue);
                datefieldStartPart_2.setDisabled(!newValue);
            }
        }
    });
    var datefieldStartPart_1 = Ext.create('Ext.form.DateField', {
        disabled: true,
        labelWidth: 50,
        fieldLabel: 'Початок:',
        format: "d.m.Y",
        minDate: new Date(),
        width: 200,
        padding: 3,
        listeners: {
            expand: function (ctrl, eOpts) {
            }
        }
    });
    var datefieldStartPart_2 = Ext.create('Ext.form.DateField', {
        disabled: true,
        labelWidth: 50,
        fieldLabel: 'Кінець:',
        format: "d.m.Y",
        minDate: new Date(),
        width: 200,
        padding: 3,
        listeners: {
            expand: function (ctrl, eOpts) {
            }
        }
    }).setValue(new Date());
    // ---------------------------------------------------------------------------------------
    var checkboxLastPart = new Ext.form.Checkbox({
        labelWidth: 220,
        fieldLabel: 'Останній день участі в програмі',
        boxLabelAlign: 'before',
        padding: 3,
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpts) {
                datefieldLastPart_1.setDisabled(!newValue);
                datefieldLastPart_2.setDisabled(!newValue);
            }
        }
    });
    var datefieldLastPart_1 = Ext.create('Ext.form.DateField', {
        disabled: true,
        labelWidth: 50,
        fieldLabel: 'Початок:',
        format: "d.m.Y",
        minDate: new Date(),
        width: 200,
        padding: 3,
        listeners: {
            expand: function (ctrl, eOpts) {
            }
        }
    });
    var datefieldLastPart_2 = Ext.create('Ext.form.DateField', {
        disabled: true,
        labelWidth: 50,
        fieldLabel: 'Початок:',
        format: "d.m.Y",
        minDate: new Date(),
        width: 200,
        padding: 3,
        listeners: {
            expand: function (ctrl, eOpts) {
            }
        }
    }).setValue(new Date());;
    // ---------------------------------------------------------------------------------------
    var checkboxQtyVisits = new Ext.form.Checkbox({
        labelWidth: 220,
        fieldLabel: 'Кількість візитів в ТЦ',
            boxLabelAlign: 'before',
            padding: 3,
            listeners: {
                change: function (ctrl, newValue, oldValue, eOpts) {
                    numberQtyVisits_1.setDisabled(!newValue);
                    numberQtyVisits_2.setDisabled(!newValue);
                }
            }
    });
    var numberQtyVisits_1 = new Ext.form.field.Number({
        labelWidth: 50,
        fieldLabel: 'Початок',
        padding: 3,
        width: 200
    }).setValue(0).setDisabled(true);
    var numberQtyVisits_2 = new Ext.form.field.Number({
        labelWidth: 50,
        fieldLabel: 'Кінець',
        padding: 3,
        width: 200
    }).setValue(0).setDisabled(true);
    // ---------------------------------------------------------------------------------------
    var checkboxQtyDoc = new Ext.form.Checkbox({
        labelWidth: 220,
        fieldLabel: 'Кількість документів',
        boxLabelAlign: 'before',
        padding: 3,
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpts) {
                numberQtyDoc_1.setDisabled(!newValue);
                numberQtyDoc_2.setDisabled(!newValue);
            }
        }
    });
    var numberQtyDoc_1 = new Ext.form.field.Number({
        labelWidth: 50,
        fieldLabel: 'Початок',
        padding: 3,
        width: 200
    }).setValue(0).setDisabled(true);
    var numberQtyDoc_2 = new Ext.form.field.Number({
        labelWidth: 50,
        fieldLabel: 'Кінець',
        padding: 3,
        width: 200
    }).setValue(0).setDisabled(true);    
    // ---------------------------------------------------------------------------------------
    var checkboxObert = new Ext.form.Checkbox({
        labelWidth: 220,
        fieldLabel: 'Оберт',
        boxLabelAlign: 'before',
        padding: 3,
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpts) {
                textfieldObert_1.setDisabled(!newValue);
                textfieldObert_2.setDisabled(!newValue);
            }
        }
    });
    var textfieldObert_1 = Ext.create('Ext.form.field.Text', {
        labelWidth: 50,
        fieldLabel: 'Початок',
        padding: 3,
        width: 200
    }).setValue(0).setDisabled(true);
    var textfieldObert_2 = Ext.create('Ext.form.field.Text', {
        labelWidth: 50,
        fieldLabel: 'Кінець',
        padding: 3,
        width: 200
    }).setValue(0).setDisabled(true);
    // ---------------------------------------------------------------------------------------
    var checkboxAvgDoc = new Ext.form.Checkbox({
        labelWidth: 220,
        fieldLabel: 'Середній чек',
        boxLabelAlign: 'before',
        padding: 3,
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpts) {
                textfieldAvgDoc_1.setDisabled(!newValue);
                textfieldAvgDoc_2.setDisabled(!newValue);
            }
        }
    });
    var textfieldAvgDoc_1 = Ext.create('Ext.form.field.Text', {
        labelWidth: 50,
        fieldLabel: 'Початок',
        padding: 3,
        width: 200
    }).setValue(0).setDisabled(true);
    var textfieldAvgDoc_2 = Ext.create('Ext.form.field.Text', {
        labelWidth: 50,
        fieldLabel: 'Кінець',
        padding: 3,
        width: 200
    }).setValue(0).setDisabled(true);
    // ---------------------------------------------------------------------------------------
    var checkboxmaxDoc = new Ext.form.Checkbox({
        labelWidth: 220,
        fieldLabel: 'Максимальний чек',
        boxLabelAlign: 'before',
        padding: 3,
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpts) {
                textfieldmaxDoc_1.setDisabled(!newValue);
                textfieldmaxDoc_2.setDisabled(!newValue);
            }
        }
    });
    var textfieldmaxDoc_1 = Ext.create('Ext.form.field.Text', {
        labelWidth: 50,
        fieldLabel: 'Початок',
        padding: 3,
        width: 200
    }).setValue(0).setDisabled(true);
    var textfieldmaxDoc_2 = Ext.create('Ext.form.field.Text', {
        labelWidth: 50,
        fieldLabel: 'Кінець',
        padding: 3,
        width: 200
    }).setValue(0).setDisabled(true);
    // ---------------------------------------------------------------------------------------
    var checkboxAvgDistance = new Ext.form.Checkbox({
        labelWidth: 220,
        fieldLabel: 'Середня відстань між візитами',
        boxLabelAlign: 'before',
        padding: 3,
        listeners: {
            change : function(ctrl, newValue, oldValue, eOpts) {
                textfieldAvgDistance_1.setDisabled(!newValue);
                textfieldAvgDistance_2.setDisabled(!newValue);
            }
        }
    });
    var textfieldAvgDistance_1 = Ext.create('Ext.form.field.Text', {
        labelWidth: 50,
        fieldLabel: 'Початок',
        padding: 3,
        width: 200
    }).setValue(0).setDisabled(true);
    var textfieldAvgDistance_2 = Ext.create('Ext.form.field.Text', {
        labelWidth: 50,
        fieldLabel: 'Кінець',
        padding: 3,
        width: 200
    }).setValue(0).setDisabled(true);
    // ---------------------------------------------------------------------------------------
    var checkboxPointCount = new Ext.form.Checkbox({
        labelWidth: 220,
        fieldLabel: 'Кількість балів',
        boxLabelAlign: 'before',
        padding: 3,
        listeners: {
            change : function(ctrl, newValue, oldValue, eOpts) {
                textfieldPointCount_1.setDisabled(!newValue);
                textfieldPointCount_2.setDisabled(!newValue);
            }
        }
    });
    var textfieldPointCount_1 = Ext.create('Ext.form.field.Text', {
        labelWidth: 50,
        fieldLabel: 'Початок',
        padding: 3,
        width: 200
    }).setValue(0).setDisabled(true);
    var textfieldPointCount_2 = Ext.create('Ext.form.field.Text', {
        labelWidth: 50,
        fieldLabel: 'Кінець',
        padding: 3,
        width: 200
    }).setValue(0).setDisabled(true);
    // ---------------------------------------------------------------------------------------
    var checkboxCardType = new Ext.form.Checkbox({
        labelWidth: 220,
        fieldLabel: 'Тип карти',
        boxLabelAlign: 'before',
        padding: 3,
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpts) {                
                cmbCrmCustomerStatus.setDisabled(!newValue);
                //textfieldPointCount_2.setDisabled(!newValue);
            }
        }
    });
    cmbCrmCustomerStatus = Ext.create('Ext.form.ComboBox', {
        disabled: true,
        fieldLabel: 'ТЦ',
        labelWidth: 40,
        store: dict.getCrmCustomerStatus(),
        multiSelect: true,
        //queryMode: 'local',
        valueField: 'CrmCustomerStatusId',
        displayField: 'NameUa',
        width: 530,
        labelWidth: 50,
        emptyText: 'Всі',
        itemCls: 'make-bold',
        padding: 3,
        //renderTo: Ext.getBody(),
        tpl: Ext.create('Ext.XTemplate',
            '<tpl for=".">',
                '<div class="x-boundlist-item">{NameUa}</div>',
            '</tpl>'
        ),
        displayTpl: Ext.create('Ext.XTemplate',
            '<tpl for=".">',
                '{NameUa};',
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
    // ---------------------------------------------------------------------------------------
    var checkboxObertIntersport = new Ext.form.Checkbox({
        labelWidth: 220,
        fieldLabel: 'Оберт по Інтерспорту',
        boxLabelAlign: 'before',
        padding: 3,
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpts) {
                textfieldObertIntersport_1.setDisabled(!newValue);
                textfieldObertIntersport_2.setDisabled(!newValue);
            }
        }
    });
    var textfieldObertIntersport_1 = Ext.create('Ext.form.field.Text', {
        labelWidth: 50,
        fieldLabel: 'Початок',
        padding: 3,
        width: 200
    }).setValue(0).setDisabled(true);
    var textfieldObertIntersport_2 = Ext.create('Ext.form.field.Text', {
        labelWidth: 50,
        fieldLabel: 'Кінець',
        padding: 3,
        width: 200
    }).setValue(0).setDisabled(true);
    // ---------------------------------------------------------------------------------------
    var checkboxObertMoncheri = new Ext.form.Checkbox({
        labelWidth: 220,
        fieldLabel: 'Оберт по Моншері',
        boxLabelAlign: 'before',
        padding: 3,
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpts) {
                textfieldObertMoncheri_1.setDisabled(!newValue);
                textfieldObertMoncheri_2.setDisabled(!newValue);
            }
        }
    });
    var textfieldObertMoncheri_1 = Ext.create('Ext.form.field.Text', {
        labelWidth: 50,
        fieldLabel: 'Початок',
        padding: 3,
        width: 200
    }).setValue(0).setDisabled(true);
    var textfieldObertMoncheri_2 = Ext.create('Ext.form.field.Text', {
        labelWidth: 50,
        fieldLabel: 'Кінець',
        padding: 3,
        width: 200
    }).setValue(0).setDisabled(true);
    // ---------------------------------------------------------------------------------------

    var win = Ext.create('Ext.Window', {
        //id: 'win_customers',
        title: 'Створити вибірку та завантажити УПЛ для кампанії ' + campaign_id,
        width: 800,
        height: 550,
        modal: true,
        closable: true,
        layout: 'fit',
        items: [
        {
            xtype: 'panel',
            border: true,
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'start',
            },
            items: [
                // вибір маркетів, коли нічого, то всі -------------------------------------------------------------------------------------------------
                {
                    border: false,
                    //id: 'pTradeCentre',
                    //xtype: 'panel',
                    height: 35,
                    layout: { type: 'hbox', pack: 'start', align: 'stretch' },
                    items: [
                        { border: false, width: 250, items: [checkboxTradeCentre] },
                        { border: false, flex: 1, layout: 'fit', items: [comboBoxMarketsOm] }
                    ]
                },
                // вибір по даті початку участі -------------------------------------------------------------------------------------------------
                {
                    border: false,
                    height: 35,
                    layout: { type: 'hbox', pack: 'start', align: 'stretch' },
                    items: [
                        { border: false, width: 250, items: [checkboxStartPart] },
                        {
                            border: false,
                            layout: { type: 'hbox', pack: 'start', align: 'stretch' },
                            items: [
                                { border: false, flex: 1, items: [datefieldStartPart_1] },
                                { border: false, flex: 2, items: [datefieldStartPart_2] }
                            ]
                        }
                    ]
                },
                // вибір по даіт останньої участі (остання покупка) --------------------------------------------------------------------------------------
                {
                    border: false,
                    height: 35,
                    layout: { type: 'hbox', pack: 'start', align: 'stretch' },
                    items: [
                        { border: false, width: 250, items: [checkboxLastPart] },
                        {
                            border: false,
                            layout: { type: 'hbox', pack: 'start', align: 'stretch' },
                            items: [
                                { border: false, flex: 1, items: [datefieldLastPart_1] },
                                { border: false, flex: 2, items: [datefieldLastPart_2]}
                            ]
                        }
                    ]
                },
                // вибір по кількості візитів в мережу ТЦ -------------------------------------------------------------------------------------------------
                {
                    border: false,
                    height: 35,
                    layout: { type: 'hbox', pack: 'start', align: 'stretch' },
                    items: [
                        { border: false, width: 250, items: [checkboxQtyVisits]
                    },
                        {
                            border: false,
                            layout: { type: 'hbox', pack: 'start', align: 'stretch' },
                            items: [
                                { border: false, flex: 1, items: [numberQtyVisits_1] },
                                { border: false, flex: 2, items: [numberQtyVisits_2] }
                            ]
                        }
                    ]
                },
                {
                    border: false,
                    height: 35,
                    layout: { type: 'hbox', pack: 'start', align: 'stretch' },
                    items: [
                        {
                            border: false, width: 250, items: [checkboxQtyDoc]
                        },
                        {
                            border: false,
                            layout: { type: 'hbox', pack: 'start', align: 'stretch' },
                            items: [
                                { border: false, flex: 1, items: [numberQtyDoc_1] },
                                { border: false, flex: 2, items: [numberQtyDoc_2] }
                            ]
                        }
                    ]
                },
                {
                    border: false,
                    height: 35,
                    layout: { type: 'hbox', pack: 'start', align: 'stretch' },
                    items: [
                        {
                            border: false, width: 250, items: [checkboxObert]
                        },
                        {
                            border: false,
                            layout: { type: 'hbox', pack: 'start', align: 'stretch' },
                            items: [
                                { border: false, flex: 1, items: [textfieldObert_1] },
                                { border: false, flex: 2, items: [textfieldObert_2] }
                            ]
                        }
                    ]
                },
                {
                    border: false,
                    height: 35,
                    layout: { type: 'hbox', pack: 'start', align: 'stretch' },
                    items: [
                        {
                            border: false, width: 250, items: [checkboxAvgDoc]
                        },
                        {
                            border: false,
                            layout: { type: 'hbox', pack: 'start', align: 'stretch' },
                            items: [
                                { border: false, flex: 1, items: [textfieldAvgDoc_1] },
                                { border: false, flex: 2, items: [textfieldAvgDoc_2] }
                            ]
                        }
                    ]
                },
                {
                    border: false,
                    height: 35,
                    layout: { type: 'hbox', pack: 'start', align: 'stretch' },
                    items: [
                        {
                            border: false, width: 250, items: [checkboxmaxDoc]
                        },
                        {
                            border: false,
                            layout: { type: 'hbox', pack: 'start', align: 'stretch' },
                            items: [
                                { border: false, flex: 1, items: [textfieldmaxDoc_1] },
                                { border: false, flex: 2, items: [textfieldmaxDoc_2] }
                            ]
                        }
                    ]
                },
                {
                    border: false,
                    height: 35,
                    layout: { type: 'hbox', pack: 'start', align: 'stretch' },
                    items: [
                        {
                            border: false, width: 250, items: [checkboxAvgDistance]
                        },
                        {
                            border: false,
                            layout: { type: 'hbox', pack: 'start', align: 'stretch' },
                            items: [
                                { border: false, flex: 1, items: [textfieldAvgDistance_1] },
                                { border: false, flex: 2, items: [textfieldAvgDistance_2] }
                            ]
                        }
                    ]
                },
                {
                    border: false,
                    height: 35,
                    layout: { type: 'hbox', pack: 'start', align: 'stretch' },
                    items: [
                        {
                            border: false, width: 250, items: [checkboxPointCount]
                        },
                        {
                            border: false,
                            layout: { type: 'hbox', pack: 'start', align: 'stretch' },
                            items: [
                                { border: false, flex: 1, items: [textfieldPointCount_1] },
                                { border: false, flex: 2, items: [textfieldPointCount_2] }
                            ]
                        }
                    ]
                },
                {
                    border: false,
                    height: 35,
                    layout: { type: 'hbox', pack: 'start', align: 'stretch' },
                    items: [
                        {
                            border: false, width: 250, items: [checkboxCardType]
                        },
                        {
                            border: false,
                            layout: { type: 'hbox', pack: 'start', align: 'stretch' },
                            items: [
                                { border: false, flex: 1, items: [cmbCrmCustomerStatus] },
                                { border: false, flex: 2, items: [] }
                            ]
                        }
                    ]
                },
                {
                    border: false,
                    height: 35,
                    layout: { type: 'hbox', pack: 'start', align: 'stretch' },
                    items: [
                        {
                            border: false, width: 250, items: [checkboxObertIntersport]
                        },
                        {
                            border: false,
                            layout: { type: 'hbox', pack: 'start', align: 'stretch' },
                            items: [
                                { border: false, flex: 1, items: [textfieldObertIntersport_1] },
                                { border: false, flex: 2, items: [textfieldObertIntersport_2] }
                            ]
                        }
                    ]
                },
                {
                    border: false,
                    height: 35,
                    layout: { type: 'hbox', pack: 'start', align: 'stretch' },
                    items: [
                        {
                            border: false, width: 250, items: [checkboxObertMoncheri]
                        },
                        {
                            border: false,
                            layout: { type: 'hbox', pack: 'start', align: 'stretch' },
                            items: [
                                { border: false, flex: 1, items: [textfieldObertMoncheri_1] },
                                { border: false, flex: 2, items: [textfieldObertMoncheri_2] }
                            ]
                        }
                    ]
                }
            ]
        }],
        buttons: [
            {
                xtype: 'button',
                text: 'Перевірити кількість УПЛ',
                listeners: {
                    'click': function (ctrl) {
                        var o = createData();

                        //JSON.stringify(o);
                        //console.log(JSON.stringify(o));
                        //console.log(o);                       

                        $.ajax({
                            url: 'api/customer/GetSelectedCustomescount/0',
                            type: 'get',
                            data: o,
                            beforeSend: function () {
                                win.setDisabled(true);
                            },
                            success: function (returned) {

                                Ext.Msg.alert('Рузультат...', returned + ' УПЛ.');

                                win.setDisabled(false);
                            }
                        });

                    }
                }
            },
            {
                xtype: 'button',
                text: 'Почати завантаження',
                listeners: {
                    'click': function (ctrl) {
                        var o = createData();
                        
                        $.ajax({
                            url: 'api/customer/StartFillCampaignFromSelectedCustomes/' + campaign_id,
                            type: 'get',
                            data: o,
                            beforeSend: function () {
                                //win.setDisabled(true);
                            },
                            success: function (returned) {
                                //Ext.Msg.alert('Рузультат...', returned + ' УПЛ.');                                                               
                            }
                        });
                        
                        //comboBoxMarkets = null;

                        parentWin.hide();
                        //win.hide();
                        win.close();
                    }
                }
            },
            {
                xtype: 'button',
                text: 'Закрити',
                //scope: cmp_id,
                listeners: {
                    'click': function (ctrl) {
                        win.hide();
                    }
                }
            }, ]
    })

    var createData = function () {
        //console.log("{0}|{1}".format(new Date(datefieldStartPart_1.getValue()).yyyymmdd(), new Date(datefieldStartPart_2.getValue()).yyyymmdd()));
        var o = {
            marketLst: '',
            startDate: '', //"{0}|{1}".format(new Date(datefieldStartPart_1.getValue()).yyyymmdd(), new Date(datefieldStartPart_2.getValue()).yyyymmdd()),
            lastDate: '',
            qtyAtd: '',
            qtyDocs: '',
            obert: '',
            avgDoc: '',
            maxDoc: '',
            avgBetweenAtd: '',
            qtyPoints: '',
            cardTypeLst: '',
            obertIntersport: '',
            obertMoncheri: ''
        };
        if (checkboxTradeCentre.getValue()) {
            o.marketLst = comboBoxMarketsOm.getValue();
        } else { o.marketLst = ''; }

        if (checkboxStartPart.getValue()) {
            o.startDate = "{0}|{1}".format(new Date(datefieldStartPart_1.getValue()).yyyymmdd(), new Date(datefieldStartPart_2.getValue()).yyyymmdd());
        } else { o.startDate = ''; }

        if (checkboxLastPart.getValue()) {
            o.lastDate = "{0}|{1}".format(new Date(datefieldLastPart_1.getValue()).yyyymmdd(), new Date(datefieldLastPart_2.getValue()).yyyymmdd());
        } else { o.lastDate = ''; }

        if (checkboxQtyVisits.getValue()) {
            o.qtyAtd = "{0}|{1}".format(numberQtyVisits_1.getValue(), numberQtyVisits_2.getValue());
        } else { o.qtyAtd = ''; }

        if (checkboxQtyDoc.getValue()) {
            o.qtyDocs = "{0}|{1}".format(numberQtyDoc_1.getValue(), numberQtyDoc_2.getValue());
        } else { o.qtyDocs = ''; }

        if (checkboxObert.getValue()) {
            o.obert = "{0}|{1}".format(textfieldObert_1.getValue(), textfieldObert_2.getValue());
        } else { o.obert = ''; }

        if (checkboxAvgDoc.getValue()) {
            o.avgDoc = "{0}|{1}".format(textfieldAvgDoc_1.getValue(), textfieldAvgDoc_2.getValue());
        } else { o.avgDoc = ''; }

        if (checkboxmaxDoc.getValue()) {
            o.maxDoc = "{0}|{1}".format(textfieldmaxDoc_1.getValue(), textfieldmaxDoc_2.getValue());
        } else { o.maxDoc = ''; }

        if (checkboxAvgDistance.getValue()) {
            o.avgBetweenAtd = "{0}|{1}".format(textfieldAvgDistance_1.getValue(), textfieldAvgDistance_2.getValue());
        } else { o.avgBetweenAtd = ''; }

        if (checkboxPointCount.getValue()) {
            o.qtyPoints = "{0}|{1}".format(textfieldPointCount_1.getValue(), textfieldPointCount_2.getValue());
        } else { o.qtyPoint = ''; }
        // --------------------------------------------------------
        if (checkboxCardType.getValue()) {
            o.cardTypeLst = cmbCrmCustomerStatus.getValue();
        } else { o.cardTypeLst = ''; }

        if (checkboxObertIntersport.getValue()) {
            o.obertIntersport = "{0}|{1}".format(textfieldObertIntersport_1.getValue(), textfieldObertIntersport_2.getValue());
        } else { o.obertIntersport = ''; }

        if (checkboxObertMoncheri.getValue()) {
            o.obertMoncheri = "{0}|{1}".format(textfieldObertMoncheri_1.getValue(), textfieldObertMoncheri_2.getValue());
        } else { o.obertMoncheri = ''; }

        return o;
    };

    return win;
}
/* ================================================================================================================== */
String.prototype.format = function () {
    a = this;
    for (k in arguments) {
        a = a.replace("{" + k + "}", arguments[k])
    }
    return a
};

Date.prototype.yyyymmdd = function () {
    if (this != null) {
        var mm = this.getMonth() + 1;
        var dd = this.getDate();

        return [this.getFullYear(),
                (mm > 9 ? '' : '0') + mm,
                (dd > 9 ? '' : '0') + dd
        ].join('-');
    } else {
        return 'null';
    }
};
/* ================================================================================================================== */
