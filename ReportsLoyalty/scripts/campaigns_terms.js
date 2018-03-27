
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
    }]
});

var store_campaigns_terms = function (campaign_id) {
    return Ext.create('Ext.data.JsonStore', {
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
};

var createColumns_terms = function (finish, start) {

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
            flex: 1
            //width: 90
        }, {
            dataIndex: 'ShortComment',            
            text: 'Короткий комментар',
            //flex: 1
            visible: false
        }
    ];

    return columns.slice(start || 0, finish);
};

var grid_campaigns_terms = function (campaign_id) {

    var store = store_campaigns_terms(campaign_id);

    return Ext.create('Ext.grid.Panel', {
        id: 'grid_campaign_terms',
        stateful: true,
        stateId: 'stateful-filter-grid',
        border: false,
        store: store,
        columns: createColumns_terms(2),
        plugins: 'gridfilters',
        loadMask: true,
        selModel: {
            mode: 'SINGLE'
        },
        multiSelect: true,
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
            }
        },
        viewConfig: {
            stripeRows: false,
            getRowClass: function (record) {
                //return record.get('is_run') == true ? 'child-row' : 'adult-row';
                //return record.get('is_run') == true ? 'x-grid-row-run' : 'x-grid-row';
            }
        },
        listeners: {
            selectionchange: function (view, selections, options) {
                if (selections.length > 0) {
                    var record = selections[0].getData();
                    Ext.getCmp('current_campaign_terms_details').setHtml(
                        '<textarea class="boxsizingBorder">' + record.Description + '</textarea>');
                    Ext.getCmp('current_campaign_terms_short').setHtml(
                        '<textarea rows="4" cols="50">' + record.ShortComment + '</textarea>'
                        );
                } else {
                    Ext.getCmp('current_campaign_terms_details').setHtml('');
                    Ext.getCmp('current_campaign_terms_short').setHtml('');
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
    })
};

var get_campaigns_terms = function winCustomers(campaign_id) {
    win_campaigns_terms = Ext.create('Ext.Window', {
        //id: 'win_customers',
        title: 'Умови проходження кампанії',
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
            xtype: 'panel',
            height: 1
        }, {
            xtype: 'panel',
            border: false,
            flex: 1,
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [{
                xtype: 'panel',
                border: true,
                width: 400,
                layout: 'fit',
                padding: 5,
                items: [
                    grid_campaigns_terms(campaign_id)]
            }, {
                xtype: 'panel',
                border: false,
                flex: 1,
                layout: {
                    type: 'vbox',
                    pack: 'start',
                    align: 'stretch'
                },
                padding: 5,
                items: [{
                    xtype: 'panel',
                    autoScroll: false,
                    title: 'Короткий коментар: ',
                    id: 'current_campaign_terms_short',
                    height: 100
                },
                {
                    id: 'current_campaign_terms_details',
                    xtype: 'panel',//'textareafield',
                    title: 'Детальний опис:',
                    //grow: true,
                    //name: 'terms',
                    anchor: '100%',
                    readOnly: true,
                    autoScroll:false,
                    flex: 1
                }]
            }

            ]
        }],
        buttons: [{
            xtype: 'button',
            text: 'Додати',
            listeners: {
                'click': function () {
                    get_win_add_terms(campaign_id);
                }
            }
        }, {
            xtype: 'button',
            text: 'Закрити',
            scope: this,
            listeners: {
                'click': function () {
                    win_campaigns_terms.close();
                }
            }
        }]
    });

    win_campaigns_terms.show();

    Ext.getCmp('current_campaign_terms_details').setHtml('');
    Ext.getCmp('current_campaign_terms_short').setHtml('');
   
};

var get_win_add_terms = function (campaign_id) {
    win_add_terms = Ext.create('Ext.Window', {
        title: 'Додати умову',
        width: 800,
        height: 600,
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
                    //anchor: '100%',
                    layout: 'anchor',
                    height: 60,
                    padding: 5,
                    items: [{
                        id: 'campaign_terms_short',
                        xtype: 'textareafield',
                        anchor: '100%',
                        fieldLabel: 'Умови (коротко):'
                    }]
                }, {
                    xtype: 'panel',
                    border: false,
                    flex: 1,
                    layout: 'fit',
                    padding: 5,
                    items: [
                         {
                             id: 'campaign_terms_details',
                            xtype: 'textareafield',
                            fieldLabel: 'Детальний опис:',
                            grow: true,
                            name: 'terms',
                            anchor: '100%'
                         }
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
                        campaign_terms_short: Ext.getCmp('campaign_terms_short').getValue(),
                        campaign_terms_details: Ext.getCmp('campaign_terms_details').getValue()
                    }

                    Ext.Ajax.request({
                        url: 'api/term',
                        method: 'POST',
                        params: { callType: 'setData' },
                        jsonData: term,
                        headers: { 'Content-Type': 'application/json; charset=utf-8' },
                        success: function (a) {
                            //grid_campaigns_terms.getStore().load();
                            Ext.getCmp('grid_campaign_terms').getStore().load();
                            Ext.getCmp('campaign_terms_short').setValue('');
                            Ext.getCmp('campaign_terms_details').setValue('');
                            win_add_terms.close();
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
                    win_add_terms.close();
                }
            }
        }]
    })
    win_add_terms.show();
}

