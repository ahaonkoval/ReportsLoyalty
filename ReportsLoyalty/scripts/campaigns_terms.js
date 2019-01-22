
//Ext.define('Fiddle.View', {
//    extend: 'Ext.panel.Panel',
//    frame: null,
//    layout: 'fit',
//    items: {
//        xtype: 'htmleditor',
//        enableColors: true,
//        enableAlignments: true,
//        enableSourceEdit: true,
//        enableFont: true,
//        enableFontSize: true,
//        enableFormat: true,
//        enableLinks: true,
//        enableLists: true
//    }
//});

var campaigns_terms_model = Ext.define('campaigns_terms_model', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'Rn',
        type: 'int'
    }, {
        name: 'CampaignsTermsId',
        type: 'int'
    }, {
        name: 'CampaignId',
        type: 'int'
    }, {
        name: 'Created',
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
        name: 'ShortComment',
        type: 'string'
    }, {
        name: 'Description',
        type: 'string'
    }, {
        name: 'Link',
        type: 'string'
    }]
});

//var store_campaigns_terms = function (campaign_id) {
//    return Ext.create('Ext.data.JsonStore', {
//        autoLoad: true,
//        // store configs
//        //autoDestroy: true,
//        model: campaigns_terms_model,
//        proxy: {
//            type: 'ajax',
//            url: ('api/campaign/GetCampaignsTerms/' + campaign_id),

//            //url: (local ? url.local : url.remote),
//            reader: {
//                type: 'json',
//                root: 'data',
//                idProperty: 'Id',
//                totalProperty: 'total'
//            }
//        },
//        remoteSort: false,
//        sorters: [{
//            property: 'Rn',
//            direction: 'ASC'
//        }],
//        pageSize: 50
//        //listeners: {
//        //    load: function () {
//        //        //this.grid.getSelectionModel().setSelected(0);//.selectFirstRow();
//        //        //this.grid.getSelectionModel().select(0);//.selectFirstRow();
//        //    },
//        //    scope: this
//        //}
//    })
//};

//var createColumns_terms = function (finish, start) {

//    var columns = [
//        {
//            dataIndex: 'Rn',
//            text: 'ID',
//            width: 35
//        },
//        {
//            dataIndex: 'Created',
//            text: 'Створено',
//            xtype: 'datecolumn',
//            flex: 1
//            //width: 90
//        }, {
//            dataIndex: 'ShortComment',            
//            text: 'Короткий комментар',
//            //flex: 1
//            visible: false
//        }
//    ];

//    return columns.slice(start || 0, finish);
//};
//
var getCampaignsTerms = function winCustomers(campaign_id, campaignName) {

    //var fiddle = Ext.create('Fiddle.View', {
    //    id: 'fiddle_1',
    //});

    var columns = [
        {
            dataIndex: 'Rn',
            text: 'ID',
            width: 35
        },
        {
            dataIndex: 'Created',
            text: 'Створено',
            xtype: 'datecolumn',            
            width: 80
            //editor: {
            //    xtype: 'datefield',
            //    format: 'm/d/y',
            //    minValue: '01/01/06',
            //    disabledDays: [0, 6],
            //    disabledDaysText: 'Plants are not available on the weekends'
            //}
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'ShortComment',
            text: 'Короткий комментар',
            flex: 1,
            visible: false,
            editor: {
                //xtype: 'textfield'
                allowBlank: false
            }
        }
    ];

    var store = Ext.create('Ext.data.JsonStore', {
        autoLoad: true,
        // store configs
        //autoDestroy: true,
        model: campaigns_terms_model,
        proxy: {
            type: 'ajax',
            url: ('api/campaign/GetCampaignsTerms/' + campaign_id),

            //url: (local ? url.local : url.remote),
            reader: {
                type: 'json',
                root: 'data',
                idProperty: 'Id',
                totalProperty: 'total'
            }
        },
        remoteSort: false,
        sorters: [{
            property: 'Rn',
            direction: 'ASC'
        }],
        pageSize: 50
        //listeners: {
        //    load: function () {
        //        //this.grid.getSelectionModel().setSelected(0);//.selectFirstRow();
        //        //this.grid.getSelectionModel().select(0);//.selectFirstRow();
        //    },
        //    scope: this
        //}
    })

    var grid = Ext.create('Ext.grid.Panel', {
        //id: 'grid_campaign_terms',
        stateful: true,
        stateId: 'stateful-filter-grid',
        //border: false,
        store: store,
        columns: columns, 
        //plugins: 'gridfilters',
        loadMask: true,        
        selModel: {
            mode: 'SINGLE'
        },
        //multiSelect: true,
        dockedItems: [Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            store: store
        })],
        emptyText: 'Записів більше нема',
        viewConfig: {
            stripeRows: false,
            getRowClass: function (record) {
                //return record.get('is_run') == true ? 'child-row' : 'adult-row';
                //return record.get('is_run') == true ? 'x-grid-row-run' : 'x-grid-row';
            }
        },
        plugins: {
            ptype: 'cellediting',
            clicksToEdit: 1
        },
        listeners: {
            //scope: this,
            selectionchange: 
                function (view, selections, options) {
                    if (selections.length > 0) {
                        var record = selections[0].getData();

                        Ext.getCmp('htmleditor_term').setValue(record.Description);
                        if (record.Link != '') {
                            url.setHtml('Посилання тут: <a target="_blank" rel="noopener noreferrer" href="' + record.Link + '">Натиснути</a>');
                        } else {
                            url.setHtml('Нема посилання...');
                        }

                    } else {
                        Ext.getCmp('htmleditor_term').setValue('');
                    }
                },
            render: function (component) {
                if (this.store.isLoading() || this.store.getCount() == 0) {
                    this.store.on('load', function () {
                        this.getSelectionModel().select(0);
                    }, this, { single: true });
                } else {
                    this.getSelectionModel().select(0);
                }
            }
        }
    });

    var url = Ext.create('Ext.Component', {
        html: 'Посилання тут: <a href="#">Натиснути</a> ',
        listeners: {
            'click': function () {
                // do stuff
            },
            // name of the component property which refers to the element to add the listener to
            element: 'el',
            // css selector to filter the target element
            delegate: 'a'
        }
    });

    var win = Ext.create('Ext.Window', {
        title: 'Умови проходження кампанії: ' + 'ID(' + campaign_id + ') ' + campaignName,
        width: '50%',
        height: '65%',
        modal: true,
        closable: true,
        padding: 5,
        items: [
        {
            xtype: 'panel',
            border: false,
            layout:
            {
                type: 'vbox',
                align : 'stretch',
                pack  : 'start',
            },
            items: [
                //{xtype: 'panel', flex:1},
                {
                    height: 150, layout: 'fit', items: [ grid ]
                }, {
                    height: 30, layout: 'fit', padding: 5, border: false, items: [ url ]
                },
                {
                    flex: 1, layout: 'fit',
                    items: [
                    {
                        xtype: 'htmleditor',
                        id: 'htmleditor_term',
                        enableColors: true,
                        enableAlignments: true,
                        enableSourceEdit: true,
                        enableFont: true,
                        enableFontSize: true,
                        enableFormat: true,
                        enableLinks: true,
                        enableLists: true,
                        readOnly: true,
                        height: 335
                    }]}
            ]
        }],
        buttons: [{
            xtype: 'button',
            text: 'Додати',
            listeners: {
                'click': function () {
                    //get_win_add_terms(campaign_id);
                    getWinAddNewTerms(campaign_id, grid).show();
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
    });
   
    return win;
};

var getWinAddNewTerms = function (campaign_id, grid) {

    var htmlEditor = Ext.create('Ext.form.HtmlEditor', {
        width: 580,
        height: 250,
        renderTo: Ext.getBody()
    });

    var text = Ext.create('Ext.form.field.TextArea', {
        anchor: '100%',
        fieldLabel: 'Умови (коротко):',
        renderTo: Ext.getBody()
    });

    var uritext = Ext.create('Ext.form.field.TextArea', {
        anchor: '100%',
        fieldLabel: 'Посилання да документацію:',
        renderTo: Ext.getBody()
    });

    var win = Ext.create('Ext.Window', {
        title: 'Додати умову',
        width: '50%',
        height: '60%',
        modal: true,
        closable: true,
        layout: {
            type: 'vbox',
            align: 'stretch',
            pack: 'start',
        },
        items: [
                {
                    xtype: 'panel',
                    border: false,
                    layout: 'fit', // anchor
                    padding: 5,
                    items: [ text ]
                }, {
                    layout: 'fit', // anchor
                    padding: 5,
                    items: [uritext]
                }, {
                    xtype: 'panel',
                    border: false,
                    flex: 1,
                    layout: 'fit',
                    padding: 5,
                    items: [htmlEditor
                         //{
                             //xtype: 'htmleditor',
                             //enableColors: true,
                             //enableAlignments: true,
                             //enableSourceEdit: true,
                             //enableFont: true,
                             //enableFontSize: true,
                             //enableFormat: true,
                             //enableLinks: true,
                             //enableLists: true,
                             //readOnly: true,
                             //height: 335
                            // id: 'campaign_terms_details',
                            //xtype: 'textareafield',
                            //fieldLabel: 'Детальний опис:',
                            //grow: true,
                            //name: 'terms',
                            //anchor: '100%'
                         //}
                    ]
                }
        ],
        buttons: [{
            xtype: 'button',
            text: 'Додати',
            listeners: {
                'click': function () {
                    var term = {
                        campaign_id: campaign_id,

                        campaign_terms_short: text.getValue(),//Ext.getCmp('campaign_terms_short').getValue(),
                        campaign_terms_details: htmlEditor.getValue(),
                        campaign_link: uritext.getValue()
                    }

                    Ext.Ajax.request({
                        url: 'api/term',
                        method: 'POST',
                        params: { callType: 'setData' },
                        jsonData: term,
                        headers: { 'Content-Type': 'application/json; charset=utf-8' },
                        success: function (a) {
                            grid.getStore().load();
                            win.close();
                        },
                        failure: function (error) {

                        }
                    });
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

    return win;
}

