
function WinUploadStatus() {
    /* Store ------------------------------------------------------------------------------------------------- */
    this.StUPLControl = dict.getStoreUPLControlData(),
    this.getStUPLControl = function () {
        return this.StUPLControl;
    }
    /* GridCustomers ------------------------------------------------------------------------------------------------- */
    this.GridCustomers = Ext.create('Ext.grid.property.Grid', {
        id: 'property_grd_upc',
        width: 565,
        readOnly: true,
        sourceConfig: {
            Customers_qty: {
                displayName: 'На сьогодні',
                group: 'Customers'
            },
            Diff_customers_qty: {
                displayName: 'Різниця з попереднім днем',
                group: 'Customers'
            },
            is_alert_customers_qty: {
                displayName: 'Увага'
            }
        }
    }),
    /* GridCards ------------------------------------------------------------------------------------------------- */
    this.GridCards = Ext.create('Ext.grid.property.Grid', {
        id: 'property_grd_cards',
        width: 565,
        readOnly: true,
        sourceConfig: {
            card_issued_qty: {
                displayName: 'На сьогодні1',
                group: 'Customers'
            },
            diff_card_issued_qty: {
                displayName: 'Різниця з попереднім днем',
                group: 'Customers'
            },
            is_alert_card_issued_qty: {
                displayName: 'Увага'
            }
        }
    }),

    /* GridCasses ------------------------------------------------------------------------------------------------- */
    this.GridCasses = Ext.create('Ext.grid.property.Grid', {
        id: 'property_grd_casses',
        width: 565,
        readOnly: true,
        sourceConfig: {
            knk_qty: {
                displayName: 'На сьогодні1',
                group: 'Customers'
            },
            diff_knk_qty: {
                displayName: 'Різниця з попереднім днем',
                group: 'Customers'
            },
            is_alert_knk_qty: {
                displayName: 'Увага'
            }
        }
    }),

    /* GridRetail ------------------------------------------------------------------------------------------------- */
    this.GridRetail = Ext.create('Ext.grid.property.Grid', {
        id: 'property_grd_retail',
        width: 565,
        readOnly: true,
        sourceConfig: {
            rrz_qty: {
                displayName: 'На сьогодні1',
                group: 'Customers'
            },
            diff_rrz_qty: {
                displayName: 'Різниця з попереднім днем',
                group: 'Customers'
            },
            is_alert_rrz_qty: {
                displayName: 'Увага'
            }
        }
    }),

    /* GridRecordsMovement ------------------------------------------------------------------------------------------------- */
    this.GridRecordsMovement = Ext.create('Ext.grid.property.Grid', {
        id: 'property_grd_retail',
        width: 565,
        readOnly: true,
        sourceConfig: {
            qty_sell_record_qty: {
                displayName: 'На сьогодні1',
                group: 'Customers'
            },
            diff_qty_sell_record_qty: {
                displayName: 'Різниця з попереднім днем',
                group: 'Customers'
            },
            is_alert_qty_sell_record_qty: {
                displayName: 'Увага'
            }
        }
    }),
    /* GridDocCount ------------------------------------------------------------------------------------------------- */
    this.GridDocCount = Ext.create('Ext.grid.property.Grid', {
        id: 'property_grd_retail',
        width: 565,
        readOnly: true,
        sourceConfig: {
            qty_doc: {
                displayName: 'На сьогодні1',
                group: 'Customers'
            },
            diff_qty_doc: {
                displayName: 'Різниця з попереднім днем',
                group: 'Customers'
            },
            is_alert_qty_doc: {
                displayName: 'Увага'
            }
        }
    }),

    this.setPropertyGridData = function () {
        var grid_customers = this.GridCustomers;
        var grid_cards = this.GridCards;
        var grid_casses = this.GridCasses;
        var grid_retail = this.GridRetail;
        var grid_record_movement = this.GridRecordsMovement;
        var grid_doc_count = this.GridDocCount;

        var win = this.win;

        grid_customers.columns[0].width = 200;
        grid_customers.columns[0].setText('Назва');
        grid_customers.columns[1].setText('Значення');

        grid_cards.columns[0].width = 200;
        grid_cards.columns[0].setText('Назва');
        grid_cards.columns[1].setText('Значення');

        grid_casses.columns[0].width = 200;
        grid_casses.columns[0].setText('Назва');
        grid_casses.columns[1].setText('Значення');

        grid_retail.columns[0].width = 200;
        grid_retail.columns[0].setText('Назва');
        grid_retail.columns[1].setText('Значення');

        grid_record_movement.columns[0].width = 200;
        grid_record_movement.columns[0].setText('Назва');
        grid_record_movement.columns[1].setText('Значення');

        grid_doc_count.columns[0].width = 200;
        grid_doc_count.columns[0].setText('Назва');
        grid_doc_count.columns[1].setText('Значення');

        $.ajax({
            url: 'api/dict/GetUploadControlData/0',
            type: 'get',
            success: function (o) {
                if (o.length > 0) {
                    var src_customers = {};
                    src_customers['Customers_qty'] = o[0].Customers_qty;
                    src_customers['Diff_customers_qty'] = o[0].Diff_customers_qty;
                    src_customers['is_alert_customers_qty'] = o[0].is_alert_customers_qty;
                    grid_customers.setSource(src_customers);

                    var src_cards = {};
                    src_cards['card_issued_qty'] = o[0].card_issued_qty;
                    src_cards['diff_card_issued_qty'] = o[0].diff_card_issued_qty;
                    src_cards['is_alert_card_issued_qty'] = o[0].is_alert_card_issued_qty;
                    grid_cards.setSource(src_cards);

                    var src_casses = {};
                    src_casses['knk_qty'] = o[0].knk_qty;
                    src_casses['diff_knk_qty'] = o[0].diff_knk_qty;
                    src_casses['is_alert_knk_qty'] = o[0].is_alert_knk_qty;
                    grid_casses.setSource(src_casses);

                    var src_retail = {};
                    src_retail['rrz_qty'] = o[0].rrz_qty;
                    src_retail['diff_rrz_qty'] = o[0].diff_rrz_qty;
                    src_retail['is_alert_rrz_qty'] = o[0].is_alert_rrz_qty;
                    grid_retail.setSource(src_retail);

                    var src_rec_movement = {};
                    src_rec_movement['qty_sell_record_qty'] = o[0].qty_sell_record_qty;
                    src_rec_movement['diff_qty_sell_record_qty'] = o[0].diff_qty_sell_record_qty;
                    src_rec_movement['is_alert_qty_sell_record_qty'] = o[0].is_alert_qty_sell_record_qty;
                    grid_record_movement.setSource(src_rec_movement);

                    var src_doc_count = {};
                    src_doc_count['qty_doc'] = o[0].qty_doc;
                    src_doc_count['diff_qty_doc'] = o[0].diff_qty_doc;
                    src_doc_count['is_alert_qty_doc'] = o[0].is_alert_qty_doc;
                    grid_doc_count.setSource(src_doc_count);

                    win.show();
                } else {
                    Ext.Msg.alert('Увага!', 'Дані або не завантажені або не перераховані.');
                }
            }
        });
        
    },
    /* ==================================== WINDOWS ================================== */
    this.win = Ext.create('Ext.Window', {
        id: 'win_upload_control',
        title: 'Статус завантаження данних',
        width: 700,
        height: 410,
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
                layout: 'accordion',
                items: [{
                    xtype: 'panel',
                    title:'Учасники',
                    border: false,
                    flex: 1,
                    layout: 'fit',
                    items: [
                        this.GridCustomers
                    ]
                }, {
                    xtype: 'panel',
                    title: 'Картки',
                    border: false,
                    flex: 1,
                    layout: 'fit',
                    items: [
                        this.GridCards
                    ]
                }, {
                    xtype: 'panel',
                    title: 'Касові накладні',
                    border: false,
                    flex: 1,
                    layout: 'fit',
                    items: [
                        this.GridCasses
                    ]
                }, {
                    xtype: 'panel',
                    title: 'Роздрібні накладні',
                    border: false,
                    flex: 1,
                    layout: 'fit',
                    items: [
                        this.GridRetail
                    ]
                }, {
                    xtype: 'panel',
                    title: 'Записів в чеках',
                    border: false,
                    flex: 1,
                    layout: 'fit',
                    items: [
                        this.GridRecordsMovement
                    ]
                }, {
                    xtype: 'panel',
                    title: 'Кількість документів',
                    border: false,
                    flex: 1,
                    layout: 'fit',
                    items: [
                        this.GridDocCount
                    ]
                }]
            }
        ],
        buttons: [, {
            xtype: 'button',
            text: 'Закрити',
            scope: this,
            listeners: {
                'click': function () {
                    var wnd = Ext.getCmp('win_upload_control');
                    wnd.hide();
                }
            }
        }]
    }),

    this.Show = function () {
        this.setPropertyGridData();
    }
};

var winUploadStatus = new WinUploadStatus();