
var win_campaign_details = null;

var win_campaign_details_show = function (record) {

    if (win_campaign_details == null) {
        var property = getPropertyGrid(record);
        win_campaign_details = getWndCampaignDetails(property);
    } else {
        setPropertyGridData(record);
    }
    win_campaign_details.show();
}

var getPropertyGrid = function (record) {

    var data = record.getData();

    var st_depart = dict.getCmpGrpByLevel(0, 'st_depart')

    var grid = Ext.create('Ext.grid.property.Grid', {
        //title: 'Кампания: ' + record.get('name'),
        id: 'property_grd',
        width: 565,
        readOnly: true,
        renderTo: Ext.getBody(),
        groupingConfig: {
            groupHeaderTpl: 'Settings: {name}',
            disabled: false
        },

        sourceConfig: {
            name: {
                displayName: '(Назва кампанії)',
                editor: {
                    xtype: 'textfield'
                }
            },
            date_start: {
                displayName: 'Дата початку'
            },
            date_end: {
                displayName: 'Дата кінця'
            },
            is_run: {
                displayName: 'В роботі',
                editor: {
                    xtype: 'combobox',
                    store: dict.getStoreTrueFalse(),
                    forceSelection: true,
                    allowBlank: false,
                    displayField: 'name',
                    valueField: 'id',
                    editable: false
                },
                renderer: function (v) {
                    if (v)
                        return Ext.String.format('<span style="color: Green;">{0}</span>', 'Так');
                    else
                        return Ext.String.format('<span style="color: Red;">{0}</span>', 'Ні');
                }
            },
            group_id_0: {
                displayName: 'ВІДДІЛ',
                editor: {
                    xtype: 'combobox',
                    store: st_depart,
                    forceSelection: true,
                    allowBlank: false,
                    displayField: 'name',
                    valueField: 'fgroup_id',
                    id: 'cmbCmpEditGrp',
                    editable: false
                },
                renderer: function (value) {
                    if (value == null) return value;
                    var cmb = Ext.getCmp('cmbCmpEditGrp');
                    if (cmb != null) {
                        var store = Ext.getCmp('cmbCmpEditGrp').getStore();
                        var data = store.getData();
                        var rec = data.filterBy('fgroup_id', value)
                        value = rec.items[0].get('name')
                    }
                    return value;
                }
            },
            group_id_2: {
                displayName: 'ГРУПА(групи)',
                editor: {
                    xtype: 'tagfield',
                    store: dict.getCmpGrpByLevel(2, 'st_depart'),
                    allowBlank: false,
                    displayField: 'name',
                    valueField: 'fgroup_id',
                    id: 'cmbCmpEditGrp_2'
                }
                //renderer: function (value) {
                //    if (value == null) return value;
                //    var cmb = Ext.getCmp('cmbCmpEditGrp_2');
                //    if (cmb != null) {
                //    }
                //}
            },
            type_id: {
                displayName: 'Тип МК',
                editor: {
                    xtype: 'combobox',
                    store: dict.getStoreCampaignTypes(),
                    displayField: 'name',
                    valueField: 'id',
                    editable: false
                },
                renderer: function (value) {
                    return value;
                }
            },
            margin_markets: {
                displayName: 'Маржа по маркетам',
                type: 'float'
            },
            margin_lavel_0: {
                displayName: 'Маржа по відділу',
                type: 'number'
            },
            margin_lavel_1: {
                displayName: 'Маржа по департаменту',
                type: 'number'
            }
            ,
            margin_lavel_2: {
                displayName: 'Маржа по групі',
                type: 'number'
            },
            margin_lavel_3: {
                displayName: 'Маржа по підгрупі',
                type: 'number'
            }
        }
    });
    grid.columns[0].width = 200;
    grid.columns[0].setText('Назва');
    grid.columns[1].setText('Значення');
    setPropertyGridData(record);
    return grid;
}

var getWndCampaignDetails = function (property) {
    win = Ext.create('Ext.Window', {
        id: 'win_campaign_details',
        title: 'Настройки кампании',
        width: 800,
        height: 600,
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
                property
            ]
        }],
        buttons: [{
            xtype: 'button',
            text: 'Зберегти',
            listeners: {
                'click': function () {
                    var property_grd = Ext.getCmp('property_grd');
                    var store = property_grd.getStore();
                    var data = store.getData();
                    var o = {
                        name: data.get('name').data.value,
                        date_start: data.get('date_start').data.value,
                        date_end: data.get('date_end').data.value,
                        is_run: data.get('is_run').data.value,
                        group_id_0: data.get('group_id_0').data.value,
                        group_id_2: data.get('group_id_2').data.value,
                        type_id: data.get('type_id').data.value,
                        margin_markets: data.get('margin_markets').data.value,
                        margin_lavel_0: data.get('margin_lavel_0').data.value,
                        margin_lavel_1: data.get('margin_lavel_1').data.value,
                        margin_lavel_2: data.get('margin_lavel_2').data.value,
                        margin_lavel_3: data.get('margin_lavel_3').data.value
                    };
                  
                    Ext.Ajax.request({
                        url: 'api/campaign/SetCampaignData',
                        method: 'POST',
                        params: { callType: 'setData'},
                        jsonData: o,
                        headers: { 'Content-Type': 'application/json; charset=utf-8' },
                        success: function (a) {

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
                    var wnd = Ext.getCmp('win_campaign_details');
                    wnd.hide();
                }
            }
        }]
    });

    return win;
}

