/* MODEL */

Ext.define('campaigns_articuls', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'NUMBER',         type: 'int'}, {
        name: 'cmp_id',         type: 'int'}, {
        name: 'campaign_id',    type: 'int'}, {
        name: 'articul',        type: 'string'},  {
        name: 'good_name',      type: 'string'}, {
        name: 'good_id',        type: 'int'}, {
        name: 'lf0_id',         type: 'int'}, {
        name: 'name_0',         type: 'string'}, {
        name: 'lf1_id',         type: 'int'}, {
        name: 'name_1',         type: 'string'}, {
        name: 'lf2_id',         type: 'int'}, {
        name: 'name_2',         type: 'string'}, {
        name: 'lf3_id',         type: 'int'}, {
        name: 'name_3',         type: 'string'}, {
        name: 'lf4_id',         type: 'int'}, {
        name: 'name_4',         type: 'string'}, {
        name: 'market_id',      type: 'string'}, {
        name: 'market_name',    type: 'string'}, {
        name: 'short_name',     type: 'string'}, {
        name: 'discount_prc',   type: 'float'}, {
        name: 'points',         type: 'int'}, {
        name: 'points_prc',     type: 'float'
    }]
});

var getWinArticuls = function (campaign_id) {

    var store = Ext.create('Ext.data.JsonStore', {
        autoLoad: false,
        autoDestroy: true,
        model: 'campaigns_articuls',
        proxy: {
            type: 'ajax',
            url: ('api/Articuls?cmp_id=' + campaign_id),
            reader: {
                type: 'json',
                root: 'data',
                idProperty: 'cmp_id',
                totalProperty: 'total'
            }
        },
        remoteSort: false,
        sorters: [{
            property: 'NUMBER',
            direction: 'ASC'
        }],
        pageSize: 100
    });

    var createColumns = function (finish, start) {
        var columns = [
            { dataIndex: 'NUMBER',          text: '№', width: 50 },
            { dataIndex: 'articul',         text: 'Артикул'},
            { dataIndex: 'good_name',       text: 'Назва товару', flex: 1 },
            //{ dataIndex: 'discount_prc',    text: 'Знижка',},
            //{ dataIndex: 'points',          text: 'Бали', },
            //{ dataIndex: 'points_prc',      text: 'Відсоток', },
            { dataIndex: 'name_0',          text: 'Відділ', },
            { dataIndex: 'name_1',          text: 'Департамент', },
            { dataIndex: 'name_2',          text: 'Піддепартамент', },
            { dataIndex: 'name_3',          text: 'Група', flex: 2},
            { dataIndex: 'name_3',          text: 'Підгрупа', flex: 3},
        ];
        return columns.slice(start || 0, finish);
    };

    var grid = Ext.create('Ext.grid.Panel', {
        stateful: true,
        stateId: 'stateful-filter-grid',
        border: false,
        store: store,
        columns: createColumns(),
        loadMask: true,
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
                return record.get('is_run') == true ? 'x-grid-row-run' : 'x-grid-row';
            }
        }
    });
    
    var menu = Ext.create('Ext.button.Split', {
        renderTo: Ext.getBody(),
        text: 'Операції',
        // handle a click on the button itself
        //handler: function () {
        //    alert("The button was clicked");
        //},
        menu: new Ext.menu.Menu({
            items: [
                // these will render as dropdown menu items when the arrow is clicked:
                {
                    text: 'Завантажити артикули', handler: function () {
                        Filler.show(campaign_id);
                    }
                },
                //{ text: 'Item 2', handler: function () { alert("Item 2 clicked"); } }
            ]
        })
    });

    var win = Ext.create('Ext.Window', {
        title: 'Управління кампаниями',
        width: '90%',
        height: '80%',
        modal: true,
        closable: true,
        layout: {
            type: 'vbox',
            align: 'stretch',
            pack: 'start'
        },
        items: [{
            height: 30,
            xtype: 'panel',
            border: false,
            padding: 3,
            items:
                [
                    menu
                ]
                //[{
                //    xtype: 'button',
                //    text: 'Додати артикули',
                //    handler: function (a, b, c) {
                //        Filler.show(campaign_id);
                //    }
                //}]
        }, {
            xtype: 'panel',
            flex: 1,
            layout: 'fit',
            items: [grid]
        }]
    });

    store.load();

    return win;
}

var getFiller = function () {

    var store = Ext.create('Ext.data.JsonStore', {
        model: Ext.define('ModelArticul', {
            extend: 'Ext.data.Model',
            idProperty: 'articul',
            fields: [{
                name: 'articul',
                type: 'string'
            }, {
                name: 'status',
                type: 'string'
            }]
        }),
        autoLoad: false,
        idProperty: 'articul',
        //proxy: {
        //    type: 'rest',
        //    api: {
        //        read: 'api/articuls/',
        //        create:  'api/articuls/',
        //        update: 'api/articuls/',
        //        destroy: 'api/articuls/'
        //    },
        //    actionMethods:
        //    {
        //        destroy: 'POST',
        //        read: 'GET',
        //        create: 'POST',
        //        update: 'PUT'
        //    },
        //    writer: {
        //        type: 'json',
        //        writeAllFields: true,       // --<----------------------
        //        root: 'cell',
        //        allowSingle: true, // set false to send a single record in array
        //        listful: true,
        //        encode: false,
        //    },
        //    //headers: {
        //    //    'Authorization': 'tk ' + btoa(sessionStorage.getItem("token"))
        //    //},
        //    reader: {
        //        type: 'json',
        //        rootProperty: 'data',
        //        idProperty: 'articul',
        //        totalProperty: 'total'
        //    }
        //},
        remoteSort: false,
        sorters: [{
            property: 'articul',
            direction: 'ASC'
        }],
        pageSize: 10000
    });

    

    var grid = Ext.create('Ext.grid.Panel', {
        stateful: true,
        stateId: 'stateful-filter-grid',
        border: false,
        flex:1,
        store: store,
        columns: [
             { dataIndex: 'articul', text: 'Артикул', width: 200 },
             { dataIndex: 'status',  text: 'Статус',  width: 100 }
        ],
        loadMask: true,
        dockedItems: [Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            store: store
        })],
        emptyText: 'Записів більше нема',
        listeners: {
            'rowdblclick': function (grid, record, e) {

            },
            'paste': function (event, element, options) {

            }
        },
        viewConfig: {
            stripeRows: false,
            getRowClass: function (record) {
                return record.get('is_run') == true ? 'x-grid-row-run' : 'x-grid-row';
            }
        }
    });

    var btn = Ext.create('Ext.Button', {
        text: 'Зберегти',
        handler: function () {

            var lst = store.getData().getRange();
            for (var item in lst) {
                var arrt = lst[item].data.articul;
                arrt = arrt.replace(/\r|\n/g, '');

                setArticul(arrt, Filler.CampaignId);
            }
        }
    });

    var setArticul = function (arrt, campaign_id) {
        Ext.Ajax.request({
            url: 'api/articuls',
            method: 'POST',
            //params: { callType: 'setData' },
            jsonData: {
                Articul: arrt,
                CampaignId: campaign_id//
            },
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            success: function (status) {
                setArticulStatus(status.responseText);
            },
            failure: function (error) {

            }
        });
    };

    var setArticulStatus = function (response) { // status.responseText
        if (response != "") {
            var st = JSON.parse(JSON.parse(response));
            var store = Filler.Store;

            store.each(function (record, idx) {
                if (record.get('articul') == st.Articul) {
                    if (st.Status == 0) {
                        record.set('status', 'Збережено');
                        record.commit();
                    } else {
                        record.set('status', 'Відхилено');
                        record.commit();
                    }
                }
            })

        } else {

        }
    }

    var window = Ext.create('Ext.Window', {
        title: 'Додати артикули',
        width: 400,
        height: '50%',
        modal: true,
        closable: true,
        layout: {
            type: 'vbox',
            align: 'stretch',
            pack: 'start'
        },
        items: [
            {
                height: 33,
                xtype: 'panel',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'panel',
                        flex: 1,
                        border: false
                    },
                    {
                        xtype: 'panel',
                        width: 80,
                        border: false,
                        padding: 3,
                        items: [
                            btn
                        ]
                    }
                ]
            },
            grid
        ],
        listeners: {
            hide: function (ctrl, eOpts) {
                if (Filler != null) {
                    if (Filler != undefined) {
                        Filler.hide();
                    }
                }
            }
        }
    });

    var filler = {
        isShow: false,
        Store: store,
        Win: window,
        Grid: grid,
        CampaignId: -1,
        show: function (campaign_id) {
            this.isShow = true;

            this.CampaignId = campaign_id;

            this.Store.removeAll();

            this.Win.show();
        },
        hide: function () {
            //this.Win = null;
            //this.Grid = null;
            this.isShow = false;
        }
    };


    return filler;
}


window.addEventListener('paste', function (event) {

    if (Filler != null) {
        if (Filler != undefined) {
            if (Filler.isShow) {

                event.preventDefault();
                var data = event.clipboardData.getData('text');

                var lst = data.split(/\r/);
                if (lst != null) {
                    if (lst.length > 0) {                        
                        for (var item in lst) {
                            var it = lst[item];

                            var art = Filler.Store.findRecord('articul', it);
                            if (art == null) {
                                if (it.trim() != '') {
                                    var ob = Ext.create('ModelArticul', {
                                        articul: it.replace(/\r|\n/g, ''),
                                        status: 'Новий'
                                    });
                                    Filler.Store.add(ob);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

});

var Filler = getFiller();