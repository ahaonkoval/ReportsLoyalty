
/* MODEL */

Ext.define('campaigns_mk', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id', type: 'int'
    }, {
        name: 'name'
    }, {
        name: 'date_start', type: "date",
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
        name: 'date_end', type: 'date',
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
        name: 'created', type: 'date', dateFormat: 'Y-m-d'
    }, {
        name: 'is_run', type: 'boolean'
    }, {
        name: 'type_id', type: 'int'
    }, {
        name: 'date_send', type: 'date',
        dateFormat: 'Y-m-d',
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
    },
    {
        name: 'customers_qty',
        type: 'int'
    }, {
        name: 'customers_qty_control',
        type: 'int'
    }, {
        name: 'customers_qty_delivered',
        type: 'int'
    },
    //customers_qty_delivered
    {
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
                    var month = dot.getUTCMonth() + 1;
                    var day = dot.getUTCDate();
                    var year = dot.getUTCFullYear();

                    if (day.toString().length == 1) day = '0' + day.toString();
                    if (month.toString().length == 1) month = '0' + month.toString();

                    var rtn = day + '.' + month + '.' + year;
                    return rtn;
                } else {
                    var d = new Date(v),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                    if (month.length < 2) month = '0' + month;
                    if (day.length < 2) day = '0' + day;

                    return [day, month, year].join('.');
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
    }, {
        name: 'is_start_get_status',
        type: 'int'
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
            url: ('api/Campaign'),

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
            {
                dataIndex: 'date_send',
                xtype: 'datecolumn',
                format: 'd.m.Y',//'Y-m-d', // H:i:s
                text: 'Дата відправки',
                width: 80,
                headerWrap: true,
                filter: {
                    type: 'date'  // specify type here or in store fields config
                }
            },
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

            },
            {
                text: 'Артикули',
                height: 20,                
                columns: [
                    {
                        dataIndex: 'articuls_qty',
                        width: 70,
                        text: 'Кількість',
                    }, {
                        xtype: 'actioncolumn',
                        width: 23,
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
                height: 20,
                columns: [{
                    text: 'група/тест',
                    dataIndex: 'customers_grp',
                    width: 110
                }, {
                    text: 'доставлено',
                    dataIndex: 'customers_qty_delivered',
                    width: 80
                }, {
                    xtype: 'actioncolumn',
                    width:23,
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
                        width: 90
                    }, {
                        xtype: 'actioncolumn',
                        width: 23,
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
            },
            //{
            //    xtype: 'actioncolumn',
            //    width: 23,
            //    items: [{
            //        tooltip: 'Перерахувати',
            //        icon: 'img/application.ico',
            //        handler: function (view, rowIndex, colIndex, item, e, record, row) {
            //            var campaign_id = record.get('id');
            //            $.ajax({
            //                url: 'api/campaign/StartCalculation/' + campaign_id,
            //                type: 'get',
            //                data: { cData: '2018-06-07'},
            //                success: function (a) {

            //                }
            //            });
            //        }
            //    }]
            //}
        ];

        return columns.slice(start || 0, finish);
    };

    var grid = Ext.create('Ext.grid.Panel', {
        stateful: true,
        stateId: 'stateful-filter-grid',
        border: false,
        store: store,
        columns: createColumns(9),
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
            },
            selectionchange (ctrl, selected, eOpts) {
                if (selected[0] == undefined)
                    return;
                //alert(selected);
                if (selected[0].get('mailing_id') == "")
                {
                    btnStartGettingMailingStatus.setHidden(true);
                } else {
                    btnStartGettingMailingStatus.setHidden(false);
                }
            }
        },
        viewConfig: {
            stripeRows: false,
            getRowClass: function (record) {
                //return record.get('is_run') == true ? 'child-row' : 'adult-row';
                var css = record.get('is_run') == true ? 'x-grid-row-run' : 'x-grid-row';
                if (record.get('is_start_get_status') == 1) {
                    return 'x-grid-row-getting-status';
                } else {
                    return css;
                }
                //record.get('is_run') == true ? 'x-grid-row-run' : 'x-grid-row';
            }
        }
    });

    var btnCreate = Ext.create('Ext.Button', {
        text: 'Створити',
        width: "100%",
        renderTo: Ext.getBody(),
        handler: function (ctrl, event) {
            winCd.Show(null);
        }
    });

    var btnEdit = Ext.create('Ext.Button', {
        text: 'Редагувати',
        width: "100%",
        renderTo: Ext.getBody(),
        scope: grid,
        handler: function (ctrl, event) {
            var selection_record = ctrl.scope.getSelection();
            if (selection_record.length > 0)
                winCd.Show(selection_record[0], grid.getStore());
        }
    });

    var btnStartGettingMailingStatus = Ext.create('Ext.Button', {
        text: 'Отримати статуси',
        width: "100%",
        wrap: true,
        renderTo: Ext.getBody(),
        scope: grid,
        handler: function (ctrl, event) {
            var selection_record = ctrl.scope.getSelection();
            if (selection_record.length > 0)
                //winCd.Show(selection_record[0]);
                //        var property_grd = Ext.getCmp('property_grd');
                //        var store = property_grd.getStore();
                //        var record = ctrl.scope.record;
                //        var storeList = ctrl.scope.storeListCampaigns;

                Ext.Msg.confirm(
                    "Увага!",
                    Ext.String.format("Запустити процес отримання статусів доставки повідомлень кампанії '{0}'?",
                    record.get('name')),
                    function (txtGet) {
                        if (txtGet === "yes") {
                            var o = {
                                CampaignId: record.get('id'),
                                Name: record.get('name')
                            };
                            Ext.Ajax.request({
                                url: 'api/campaign/SetCampaignData',
                                method: 'POST',
                                params: { callType: 'SetStartRequesStatus' },
                                jsonData: o,
                                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                                success: function (respons) {
                                    var wnd = Ext.getCmp('win_campaign_details');
                                    wnd.hide();
                                    storeList.load();
                                    //store.load();

                                },
                                failure: function (error) {

                                }
                            });

                        }
                    });
        }
    });

    var panel = Ext.create('Ext.panel.Panel', {
        border: false,
        layout: {
            type: 'hbox',
        },
        renderTo: Ext.getBody(),
        items: [
            {
                xtype: 'panel',
                flex: 1,
                height: '100%',
                layout: 'fit',
                items: [
                    {
                        xtype: 'panel',                        
                        layout: 'fit',
                        border: false,
                        items: [
                            grid
                        ]
                    }]
            }, {
                xtype: 'panel',
                width: 120,
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                    pack: 'start'
                },
                items: [{
                    xtype: 'panel',
                    border: false,
                    padding: 2,
                    items: [
                        btnCreate
                    ]
                }, {
                    xtype: 'panel',
                    border: false,
                    padding: 2,
                    items: [
                        btnEdit
                    ]
                }, {
                    xtype: 'panel',
                    border: false,
                    padding: 2,
                    items: [
                        btnStartGettingMailingStatus
                    ]
                }]
            }
        ]
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

                                ]
                            }
                        ]
                    }
            ]
        }, {
            xtype: 'panel',
            flex: 1,
            layout: 'fit',
            items: [panel]
        }],
        listeners: {
            'close': function (win) {
            },
            'hide': function (win) {
                //console.info('just hidden');
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

