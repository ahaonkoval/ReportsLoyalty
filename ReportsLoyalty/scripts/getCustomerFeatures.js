
var getWinCrmCustomerId = function () {

    var findstore = Ext.create('Ext.data.JsonStore', {
        model: Ext.define('ModelFindCrmCustomers', {
            extend: 'Ext.data.Model',
            idProperty: 'findvalue',
            fields: [{
                name: 'findvalue',
                type: 'string'
            }, {
                name: 'crm_customer_id',
                type: 'string'
            }]
        }),
        autoLoad: false,
        idProperty: 'findvalue',
        remoteSort: false,
        sorters: [{
            property: 'findvalue',
            direction: 'ASC'
        }],
        pageSize: 10000
    });

    var grid = Ext.create('Ext.grid.Panel', {
        stateful: true,
        //stateId: 'stateful-filter-grid',
        border: true,
        flex: 1,
        store: findstore,
        columns: [
            { dataIndex: 'findvalue', text: 'Значення', width: 200 },
            { dataIndex: 'crm_customer_id', text: 'crm_customer_id', width: 100 }
        ],
        loadMask: true,
        dockedItems: [Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            store: findstore
        })],
        emptyText: 'Записів більше нема',
        listeners: {
            'rowdblclick': function (grid, record, e) {

            },
            'paste': function (event, element, options) {

            }
        },
        //viewConfig: {
        //    stripeRows: false,
        //    getRowClass: function (record) {
        //        return record.get('is_run') == true ? 'x-grid-row-run' : 'x-grid-row';
        //    }
        //}
    });

    var fcard = new Ext.form.field.Checkbox({
        boxLabel: 'Номер карти', name: 'cbcard', checked: true, width: 100,
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpt) {
                //console.log(ctrl);
                if (newValue == true && oldValue == false) {
                    fphone.setValue(false);
                }
            }
        }
    });
    var fphone = new Ext.form.field.Checkbox({
        boxLabel: 'Телефон', name: 'cbphone',
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpt) {
                //console.log(ctrl);
                if (newValue == true && oldValue == false) {
                    fcard.setValue(false);
                }
            }
        }
    });

    var FindCheckboxGroup = new Ext.form.CheckboxGroup({
        xtype: 'checkboxgroup',
        itemCls: 'x-check-group-alt',
        vertical: false,
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpt) {
            }
        },
        items: [fcard, fphone]
    });

    var getCrmCustomerId = function (type_id, item) {
        var value = item.findvalue;
        $.ajax({
            url: 'api/find/',
            type: 'get',
            data: {
                Customer: item.findvalue,
                CustomerFeature: FindCheckboxGroup.getChecked()[0].name
            },
            success: function (crm_customer_id) {

                findstore.each(function (record, idx) {
                    if (record.get('findvalue') == value) {
                        record.set('crm_customer_id', crm_customer_id);
                        record.commit();
                    }
                });

            }
        });
    };

    var WinCrmCustomerId = Ext.create('Ext.Window', {
        title: 'Отримати crm_customer_id',
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
                xtype: 'panel',
                height: 40,
                border: false,
                margin: 5,
                html: 'Потрібно скопіювати колонку в Excel (Ctrl+C) <br> і скопіювати сюди (Ctrl+V)'
            },
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
                        flexflex: 1,
                        border: false,
                        items: [
                            FindCheckboxGroup
                        ]
                    }, 
                    {
                        xtype: 'button',
                        margin: 5,
                        text: 'Шукати',
                        handler: function () {

                            var lst = findstore.getData().getRange();
                            for (var pit in lst) {
                                var item = lst[pit].data;//.articul;
                                //customer = customer.replace(/\r|\n/g, '');

                                getCrmCustomerId(1, item);
                            }


                        }
                    },
                    {
                        xtype: 'button',
                        margin: 5,
                        text: 'Скачати',
                        handler: function () {

                            let csvDataCsv = "data:text/csv;charset=utf-8,";

                            findstore.data.items.forEach(function (item, index, array) {

                                let row = item.data.findvalue.toString() + ';' + item.data.crm_customer_id;
                                csvDataCsv += row + "\r\n";

                            });

                            var encodedUri = encodeURI(csvDataCsv);
                            var link = document.createElement("a");
                            link.setAttribute("href", encodedUri);
                            link.setAttribute("download", "crm_customer_id.csv");
                            document.body.appendChild(link); 

                            link.click();
                        }
                    }
                ]
            },
            grid
        ],
        listeners: {
            hide: function (ctrl, eOpts) {
                //if (Filler != null) {
                //    if (Filler != undefined) {
                //        Filler.hide();
                //    }
                //}
            }
        }
    });

    var fillerWinCrmCustomerId = {

        isShow: false,
        Store: findstore,
        Win: WinCrmCustomerId,
        Grid: grid,
        CampaignId: -1,
        show: function (campaign_id) {
            this.isShow = true;

            this.CampaignId = campaign_id;

            this.Store.removeAll();
            this.Win.show();
        },
        hide: function () {
            this.isShow = false;
        }

    };

    return fillerWinCrmCustomerId;
};

var fWinCrmCustomerId = getWinCrmCustomerId();