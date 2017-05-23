var win_campaigns = null;

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
    }, {
        name: 'margin_markets',
        type: 'float'
    }, {
        name: 'margin_lavel_0',
        type: 'float'
    }, {
        name: 'margin_lavel_1',
        type: 'float'
    }, {
        name: 'margin_lavel_2',
        type: 'float'
    }, {
        name: 'margin_lavel_3',
        type: 'float'
    }, {
        name: 'group_id',
        type: 'int'
    }, {
        name: 'group_name',
        type: 'string'
    }, {
        name: 'depart_id',
        type: 'int'
    }, {
        name: 'depart_name',
        type: 'string'
    }]
});

var encode = false;
var local = true;

var store = Ext.create('Ext.data.JsonStore', {
    id: 'store_campaign_mk',
    autoLoad:false,
    // store configs
    autoDestroy: true,
    model: 'campaigns_mk',
    proxy: {
        type: 'ajax',        
        url: ('api/Campaign'),

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
        property: 'id',
        direction: 'ASC'
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
            width: 50
        }, {
            dataIndex: 'name',
            text: 'Назва кампанії',
            id: 'name',
            flex: 1,
            filter: {
                type: 'string'
            }
        }, {
            dataIndex: 'date_start',
            xtype: 'datecolumn',
            format: 'd.m.Y',//'Y-m-d', // H:i:s
            text: 'Дата початку',
            filter: {
                type: 'date'  // specify type here or in store fields config
            }
            //width: 80
        }, {
            dataIndex: 'date_end',
            xtype: 'datecolumn',
            text: 'Дата кінця',
            format: 'd.m.Y',
            filter: {
                type: 'date'  // specify type here or in store fields config
            }
            //filter: {
            //    type: 'list',
            //    store: optionsStore,
            //    phpMode: true
            //}
        }, {
            dataIndex: 'is_run',
            disabled: true,
            xtype: 'checkcolumn',
            text: 'Працює',
            width: 70
            //filter true
            //renderer: Ext.util.Format.dateRenderer('m/d/Y')
        }
        //, {
        //    dataIndex: 'margin_markets',
        //    text: 'Маржа по маркету'
        //    // this column's filter is defined in the filters feature config
        //}
    ];

    return columns.slice(start || 0, finish);
};

var grid = Ext.create('Ext.grid.Panel', {
    stateful: true,
    stateId: 'stateful-filter-grid',
    border: false,
    store: store,
    columns: createColumns(5),
    plugins: 'gridfilters',
    loadMask: true,
    //features: [filters],
    dockedItems: [Ext.create('Ext.toolbar.Paging', {
        dock: 'bottom',
        store: store
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

var win_campaigns_show = function () {
    win_campaigns = Ext.create('Ext.Window', {
        title: 'Управління кампаниями',
        width: 1000,
        height: 800,
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
                        xtype: 'panel', width: 400, border: false,
                        dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    flex: 1,
                                    dock: 'top',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Тыльки активні кампанії:'
                                        },
                                        {
                                            xtype: 'checkbox',
                                            value: true,
                                            id: 'cisRun',
                                            listeners: {
                                                'change': function (cmp, newValue, oldValue, eOpts ) {
                                                    store.load({
                                                        params: { isRun: newValue }
                                                    });
                                                }
                                            }
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
        },{
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

    win_campaigns.show();
    store.load({
        params: { isRun: Ext.getCmp('cisRun').getValue() }
    });
};

Ext.override(Ext.Window, {
    closeAction: 'hide'
})

