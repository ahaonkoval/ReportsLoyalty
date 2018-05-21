
Ext.define('model_stoplist_mk', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'StopListId',
        type: 'int'
    }, {
        name: 'MobilePhone',
        type: 'string'
    }, {
        name: 'MPhone',
        type: 'string'
    }, {
        name: 'Created',
        type: 'string',
        //dateFormat: 'd.m.Y'
    }]
});

var getWinStopList = function () {
    var encode = false;
    var local = true;

    var store = Ext.create('Ext.data.JsonStore', {
        id: 'store_stoplist_mk',
        autoLoad: false,
        // store configs
        autoDestroy: true,
        model: 'model_stoplist_mk',
        proxy: {
            type: 'ajax',
            url: ('api/dict/getstoplist/0'),

            //url: (local ? url.local : url.remote),
            reader: {
                type: 'json',
                root: 'data',
                idProperty: 'StopListId',
                totalProperty: 'total'
            }
        },
        remoteSort: false,
        sorters: [{
            property: 'StopListId',
            direction: 'ASC'
        }],
        pageSize: 10
    });

    var createColumns = function (finish, start) {

        var columns = [
            {
                dataIndex: 'StopListId',
                text: '№',
                filterable: false,
                width: 100
            }, {
                dataIndex: 'MobilePhone',
                text: 'Мобільний телефон',
                flex: 1,
                filter: {
                    type: 'string'
                }
            }, {
                dataIndex: 'Created',
                xtype: 'datecolumn',
                format: 'd.m.Y',//'Y-m-d', // H:i:s
                text: 'Занесено'
            }, {
                menuDisabled: true,
                sortable: false,
                xtype: 'actioncolumn',
                width: 25,
                items: [{
                    tooltip: 'Delete',
                    icon: 'img/001_02.ico',
                    handler: function (view, rowIndex, colIndex, item, e, record, row) {

                        Ext.Msg.confirm("Увага!", "Видалити телефон " + record.get('MobilePhone') + "?", function (btnText) {
                            if (btnText === "no") {
                                //Ext.Msg.alert("Alert", "You have confirmed 'No'.");
                            }
                            else if (btnText === "yes") {
                                //Ext.Msg.alert("Alert", "You have confirmed 'Yes'.");

                                var o = {
                                    StopListId: record.get('StopListId')
                                };

                                Ext.Ajax.request({
                                    url: 'api/dict/PutPhoneById/' + record.get('StopListId'),
                                    method: 'PUT',
                                    //params: { callType: 'setData' },
                                    jsonData: o,
                                    headers: { 'Content-Type': 'application/json; charset=utf-8' },
                                    success: function (returned) {
                                        if (returned.responseText == 0) {
                                            store.removeAt(rowIndex);
                                        }
                                    },
                                    failure: function (error) {
                                        Ext.MessageBox.alert('Увага!', 'В процессі видалення виникла помилка.', function () {

                                        });
                                    }
                                });

                            }
                        }, this);
                    }
                }]
            }
        ];

        return columns.slice(start || 0, finish);
    };

    var grid = Ext.create('Ext.grid.Panel', {
        stateful: true,
        stateId: 'stateful-filter-grid',
        border: false,
        store: store,
        columns: createColumns(4),
        plugins: 'gridfilters',
        loadMask: true,
        //features: [filters],
        dockedItems: [Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            store: store,
            //html: 'Some text',
            items: [
                            {
                                xtype: 'button',
                                dock: 'right',
                                text: 'Додати',
                                width: 100,
                                handler: function () {
                                    getWinAddStopList(store).show();
                                }
                            },
                            {
                                xtype: 'button',
                                dock: 'right',
                                text: 'Видалити',
                                width: 100,
                                handler: function () {

                                }
                            }
            ]
        })],
        emptyText: 'Записів більше нема',
        listeners: {
            'rowdblclick': function (grid, record, e) {
            }
        },
    });

    var win = Ext.create('Ext.Window', {
        title: 'Stop List',
        width: '30%',
        height: '40%',
        modal: true,
        closable: true,
        //constrain: true,
        layout: 'fit',
        items: [{
            xtype: 'panel',
            height: 38,
            border: false,
            layout: 'fit',
            items: [
            {
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
        }]
    });

    store.load();
    return win;
};


var getWinAddStopList = function (store) {

    var ttf = new Ext.form.TextField({
        labelWidth: 0,
        labelSeparator: '&nbsp',
        id: 'first_name',
        width: 100,
        allowBlank: false
    });

    var btn = new Ext.Button({
        text: 'Додати',
        listeners: {
            click: function (ctrl, evt) {

                var o = {
                    Phone: ttf.getValue()
                };

                Ext.Ajax.request({
                    url: 'api/dict/SetToStopList',
                    method: 'POST',
                    params: { callType: 'setData' },
                    jsonData: o,
                    headers: { 'Content-Type': 'application/json; charset=utf-8' },
                    success: function (returned) {
                        if (returned.responseText == 0) {
                            ttf.setValue();
                            store.load();
                            win.hide();
                        }
                    },
                    failure: function (error) {
                        Ext.MessageBox.alert('Увага!', 'В процессі збереження виникла помилка.', function () {

                        });
                    }
                });
            }
        }
    });

    var win = Ext.create('Ext.Window', {
        title: 'Додати номер',
        width: 300,
        height: 70,
        modal: true,
        closable: true,
        layout: 'fit',
        items: [{
            xtype: 'panel',
            height: 38,
            border: false,
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [{
                xtype: 'panel',
                layout: 'fit',
                flex: 1,
                items: [
                    ttf
                ]
            }, {
                xtype: 'panel',
                width: 70,
                layout: 'fit',
                items: [
                    btn
                ]
            }],
        }]
    });

    return win;
}