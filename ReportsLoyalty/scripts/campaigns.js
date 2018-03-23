
/* MODEL */
Ext.define('campaigns_mk', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'name'
    }, {
        name: 'date_start',
        type: "date",
        convert: function (v, record) {
            if (v != null) {
                if (v.toString().indexOf('/') > -1) {
                    return new Date(parseInt(v.substr(6)));
                } else {
                    return v;
                }

            } else {
                return '';
            }
        }
    }, {
        name: 'date_end',
        type: 'date',
        convert: function (v, record) {
            if (v != null) {
                if (v.toString().indexOf('/') > -1) {
                    return new Date(parseInt(v.substr(6)));
                } else {
                    return v;
                }

            } else {
                return '';
            }
        }
    }, {
        name: 'created',
        type: 'date',
        dateFormat: 'Y-m-d'
    }, {
        name: 'is_run',
        type: 'boolean'
    }, {
        name: 'type_id',
        type: 'int'
    },
    //{
    //    name: 'margin_markets',
    //    type: 'float'
    //},
    //{
    //    name: 'margin_lavel_0',
    //    type: 'float'
    //}, {
    //    name: 'margin_lavel_1',
    //    type: 'float'
    //}, {
    //    name: 'margin_lavel_2',
    //    type: 'float'
    //}, {
    //    name: 'margin_lavel_3',
    //    type: 'float'
    //},
    //{
    //    name: 'group_id',
    //    type: 'int'
    //}, {
    //    name: 'group_name',
    //    type: 'string'
    //}, {
    //    name: 'depart_id',
    //    type: 'int'
    //}, {
    //    name: 'depart_name',
    //    type: 'string'
    //},
    {
        name: 'customers_qty',
        type: 'int'
    }, {
        name: 'customers_qty_control',
        type: 'int'
    }, {
        name: 'customers_grp',
        type: 'string',
        convert: function (v, record) {
            if (v == null) {
                var customers_qty = record.get('customers_qty');
                var customers_qty_control = record.get('customers_qty_control')
                return customers_qty.toString() + '/' + customers_qty_control.toString();
            }
        }
    }, {
        name: 'max_term_date',
        type: 'date',
        convert: function (v, record) {
            if (v != null) {
                if (v.toString().indexOf('/') > -1) {

                    var dot = new Date(parseInt(v.substr(6)));

                    //var dateObj = new Date();
                    var month = dot.getUTCMonth() + 1; //months from 1-12
                    var day = dot.getUTCDate();
                    var year = dot.getUTCFullYear();

                    //var rtn = year + "/" + month + "/" + day;
                    if (day.toString().length == 1) day = '0' + day.toString();
                    if (month.toString().length == 1) month = '0' + month.toString();

                    var rtn = day + '.' + month + '.' + year;
                    return rtn;
                    //return new Date(parseInt(v.substr(6)));
                } else {
                    var d = new Date(v),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                    if (month.length < 2) month = '0' + month;
                    if (day.length < 2) day = '0' + day;

                    return [day, month, year].join('.');
                    //return [year, month, day].join('-');
                    //return v;
                }

            } else {
                return '';
            }
        }
    }, {
        name: 'articuls_qty',
        type: 'int',
        convert: function (v, record) {
            if (v != null) {
                if (v == 0) {
                    return '';
                } else {
                    return v;
                }
            } else {
                return '';
            }
        }
    }, {
        name: 'group_id_0',
        type: 'int'
    }, {
        name: 'mailing_id',
        type: 'string'
    }]
});

var getWinCampaigns = function () {
    var encode = false;
    var local = true;

    var checkboxIsRun = Ext.create('Ext.form.Checkbox', {
        value: false,
        listeners: {
            'change': function (cmp, newValue, oldValue, eOpts) {
                store.loadPage(1, {
                    params: {
                        isRun: newValue,
                        TypeId: comboBox.getValue()
                    }
                });
            }
        }
    });

    var comboBox = Ext.create('Ext.form.ComboBox', {
        fieldLabel: 'Типи кампаній:',
        store: dict.getStoreCampaignTypesFiltered(),
        //multiSelect: true,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        width: 400,
        labelWidth: 100,
        emptyText: 'Всі',
        itemCls: 'make-bold',
        renderTo: Ext.getBody(),
        tpl: Ext.create('Ext.XTemplate',
            '<tpl for=".">',
                '<div class="x-boundlist-item">{name}</div>',
            '</tpl>'
        ),
        displayTpl: Ext.create('Ext.XTemplate',
            '<tpl for=".">',
                '{name};',
            '</tpl>'
        ),
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpts) {
                store.loadPage(1, {
                    params: {
                        isRun: checkboxIsRun.getValue(),
                        TypeId: newValue
                    }
                });
            }
        }

    });

    var store = Ext.create('Ext.data.JsonStore', {
        id: 'store_campaign_mk',
        autoLoad: false,
        // store configs
        autoDestroy: true,
        model: 'campaigns_mk',
        //baseParams: {
        //    isRun: 1
        //},
        proxy: {
            type: 'ajax',
            url: ('api/Campaign/'),

            //url: (local ? url.local : url.remote),
            reader: {
                type: 'json',
                root: 'data',
                idProperty: 'id',
                totalProperty: 'total'
            },
            extraParams: {
                isRun: checkboxIsRun.getValue(),
                TypeId: comboBox.getValue()
            }
        },
        remoteSort: false,
        sorters: [{
            property: 'id',
            direction: 'DESC'
        }],
        pageSize: 50
    });

    var filters = {
        ftype: 'filters',
        // encode and local configuration options defined previously for easier reuse
        encode: encode, // json encode the filter query
        local: local,   // defaults to false (remote filtering)

        // Filters are most naturally placed in the column definition, but can also be
        // added here.
        filters: [{
            type: 'boolean',
            dataIndex: 'is_run'
        }]
    };

    var createColumns = function (finish, start) {

        var columns = [
            {
                dataIndex: 'id',
                text: 'Id',
                filterable: false,
                width: 50,
                //height: 100
            },
            {
                text: 'Назва кампанії',
                flex: 1,
                dataIndex: 'name',
            },
            //{
            //    dataIndex: 'name',
            //    text: 'Назва кампанії',
            //    id: 'name',
                //flex: 1,
                //filter: {
                //    type: 'string'
                //}
            //},
            {
                dataIndex: 'date_start',
                xtype: 'datecolumn',
                format: 'd.m.Y',//'Y-m-d', // H:i:s
                text: 'Дата початку',
                width: 80,
                headerWrap: true,
                filter: {
                    type: 'date'  // specify type here or in store fields config
                }
                //width: 80
            }, {
                dataIndex: 'date_end',
                xtype: 'datecolumn',
                text: 'Дата кінця',
                width: 80,
                format: 'd.m.Y',
                filter: {
                    type: 'date'  // specify type here or in store fields config
                }
                //filter: {
                //    type: 'list',
                //    store: optionsStore,
                //    phpMode: true
                //}
            },
            {
                text: 'Артикули',
                width: 70,
                height: 20,                
                columns: [
                    {
                        dataIndex: 'articuls_qty',
                    }, {
                        xtype: 'actioncolumn',
                        width: 25,
                        items: [{
                            tooltip: 'Управління артикулами',
                            icon: 'img/application.ico',
                            handler: function (view, rowIndex, colIndex, item, e, record, row) {
                                var campaign_id = record.get('id');
                                getWinArticuls(campaign_id).show();
                            }
                        }]
                    }
                ]
            },
            {
                text: 'Учасники',
                width: 70,
                height: 20,
                columns: [{
                    text: 'група/тест',
                    dataIndex: 'customers_grp'
                }, {
                    xtype: 'actioncolumn',
                    width:25,
                    items: [{
                        tooltip: 'Перегляд',
                        icon: 'img/application.ico',
                        handler: function (view, rowIndex, colIndex, item, e, record, row) {
                            var campaign_id = record.get('id');
                            getCustomers(campaign_id);
                        }
                    }]
                }]
            }, {
                text: 'Умови кампанії',
                columns: [
                    {
                        text: 'Коментарі',
                        dataIndex: 'max_term_date',
                        width: 120
                    }, {
                        xtype: 'actioncolumn',
                        width: 25,
                        items: [{
                            tooltip: 'Перегляд умов',
                            icon: 'img/application.ico',
                            handler: function (view, rowIndex, colIndex, item, e, record, row) {
                                var campaign_id = record.get('id');
                                get_campaigns_terms(campaign_id)
                            }
                        }]
                    }
                ]
            }
        ];

        return columns.slice(start || 0, finish);
    };

    var columns = createColumns(9);

    var grid = Ext.create('Ext.grid.Panel', {
        stateful: true,
        stateId: 'stateful-filter-grid',
        border: false,
        store: store,
        columns: columns,
        plugins: 'gridfilters',
        loadMask: true,
        //features: [filters],
        dockedItems: [Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            store: store,
            listeners: {
                beforechange(ctrl, page, eOpts) {
                    // ураааааа!!!!
                    store.getProxy().extraParams.isRun = checkboxIsRun.getValue();
                    store.getProxy().extraParams.TypeId = comboBox.getValue();
                    //store.getProxy().extraParams.blogid = 1;
                }
            }
        })],
        emptyText: 'Записів більше нема',
        listeners: {
            'rowdblclick': function (grid, record, e) {
                /* открываєм окно редактирования */
                winCd.Show(record);
                //win_campaign_details_show(record);
            }
        },
        viewConfig: {
            stripeRows: false,
            getRowClass: function (record) {
                //return record.get('is_run') == true ? 'child-row' : 'adult-row';
                return record.get('is_run') == true ? 'x-grid-row-run' : 'x-grid-row';
            }
        }
    });

    var win_campaigns = Ext.create('Ext.Window', {
        title: 'Управління кампаниями',
        width: '90%',
        height: '80%',
        modal: true,
        closable: true,
        //constrain: true,
        //layout: 'fit',
        layout: {
            type: 'vbox',
            align: 'stretch',
            pack: 'start'
        },
        items: [{
            xtype: 'panel',
            height: 38,
            //border: false,
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [
                    {
                        xtype: 'panel', width: 600, border: false,
                        dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    flex: 1,
                                    dock: 'top',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Тільки активні кампанії:'
                                        },
                                        checkboxIsRun,
                                        comboBox
                                        , {
                                            id: 'hidden_campaign_id',
                                            xtype: 'hiddenfield',
                                            name: 'hidden_campaign_id',
                                            value: ''
                                        }
                                    ]
                                }
                        ]
                    },
                    { xtype: 'panel', flex: 1, border: false },
                    {
                        xtype: 'panel', width: 90, border: false,
                        dockedItems: [
                            {
                                xtype: 'toolbar',
                                flex: 1,
                                dock: 'top',
                                items: [
                                    {
                                        xtype: 'button',
                                        text: 'Створити',
                                        itemId: 'campaignadd',
                                        listeners: {
                                            'click': function () {
                                                winCd.Show(null);
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
            ]
        }, {
            xtype: 'panel',
            flex: 1,
            layout: 'fit',
            items: [grid]
        }],
        listeners: {
            'close': function (win) {
            },
            'hide': function (win) {
                console.info('just hidden');
            }
        }
    });

    store.load({
        params: {
            isRun: checkboxIsRun.getValue()
        }
    });

    //win_campaigns.show();
    return win_campaigns;

    //store.load({
    //    params: { isRun: Ext.getCmp('cisRun').getValue() }
    //});
}


/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
Ext.override(Ext.Window, {
    closeAction: 'hide'
})
/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

