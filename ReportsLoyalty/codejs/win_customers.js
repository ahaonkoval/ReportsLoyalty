
var get_campaign_customers_model = function () {
    return Ext.define('tf_campaign_customers', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'number',
            type: 'int'
        }, {
            name: 'name1',
            type: 'string'
        }, {
            name: 'name2',
            type: 'string'
        }, {
            name: 'name3',
            type: 'string'
        }, {
            name: 'gender',
            type: 'string'
        }, {
            name: 'barcode',
            type: 'string'
        }, {
            name: 'mobile_phone',
            type: 'string'
        }, {
            name: 'control_group',
            type: 'string'
        }, {
            name: 'delivery_channel',
            type: 'string'
        }, {
            name: 'market_name',
            type: 'string'
        }]
    })
}

var campaign_customers_model = get_campaign_customers_model();

var store_campaign_customers = function (campaign_id) {
    return Ext.create('Ext.data.JsonStore', {
        //id: 'store_campaign_customers',
        autoLoad: true,
        // store configs
        autoDestroy: true,
        model: campaign_customers_model,
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
    })
}

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
            //flex: 1,
            filter: {
                type: 'string'
            }
        }, {
            dataIndex: 'name2',
            //xtype: 'datecolumn',
            //format: 'd.m.Y',//'Y-m-d', // H:i:s
            text: "ім'я",
            filter: {
                type: 'string'  // specify type here or in store fields config
            }
            //width: 80
        }, {
            dataIndex: 'name3',
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
}

var grid_customers = function (campaign_id) {

    var store = store_campaign_customers(campaign_id);

    return Ext.create('Ext.grid.Panel', {
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
}

var getCustomers = function winCustomers(campaign_id) {
    //var grid = grid_customers(campaign_id);

    win = Ext.create('Ext.Window', {
        //id: 'win_customers',
        title: 'Учасники кампанії',
        width: 1000,
        height: 800,
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
                grid_customers(campaign_id)
            ]
        }],
        buttons: [{
            xtype: 'button',
            text: 'Зберегти',
            listeners: {
                'click': function () {
                }
            }
        }, {
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

    win.show();
};



