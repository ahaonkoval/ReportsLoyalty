

function WinCampaignDetails() {

    this.record = null,

    this.storeListCampaigns = null;

    // довідеик (так/ні)
    this.StTrueFalse = dict.getStoreTrueFalse(),
    this.getStTrueFalse = function () {
        return this.StTrueFalse;
    },

    // перелік відділів
    this.StOTD = dict.getCmpGrpByLevel(0),
    this.getStOTD = function () {
        return this.StOTD;
    },

    // перелік ВСІХ департаментів, потрібно для завантаження до вибіру відділу
    this.StDepartments = dict.getCmpGrpByLevel(1),
    this.getStDepartments = function () {
        return this.StDepartments;
    },

    // перелік груп рівня 2 --<-- зараз поки не буде використовуватись
    this.StGroups = dict.getCmpGrpByLevel(2),
    this.getStGroups = function () {
        return this.StGroups;
    },
    this.setStGroups = function (store) {
        this.StGroups = store;
    }

    // Типи капмпаній, довідник, выд цього залежить де ы як буде выдображений звіт
    this.StCampaignTypes = dict.getStoreCampaignTypes(),
    this.getStCampaignTypes = function () {
        return this.StCampaignTypes;
    },

    this.TagGroups = Ext.create(
        {
            xtype: 'tagfield',
            store: this.getStDepartments(),
            displayField: 'name',
            valueField: 'fgroup_id',
            id: 'cmbCmpEditGrp_2'
        }
    ),

    /* ------------------------------------------------------------------------------------------------- */
    this.Grid = Ext.create('Ext.grid.property.Grid', {
         //title: 'Кампания: ' + record.get('name'),
         id: 'property_grd',
         width: 565,
         readOnly: true,
         sortableColumns: false,
         //renderTo: Ext.getBody(),
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
                 displayName: 'Дата початку',
                 renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                 editor: {
                     xtype: 'datefield',
                     format: 'd.m.Y'
                 }
             },
             date_end: {
                 displayName: 'Дата кінця',
                 renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                 editor: {
                     xtype: 'datefield',
                     format: 'd.m.Y'
                 }
             },
             is_run: {
                 displayName: 'В роботі',
                 editor: {
                     xtype: 'combobox',
                     store: this.StTrueFalse,
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
                     store: this.StOTD,
                     forceSelection: true,
                     allowBlank: false,
                     displayField: 'name',
                     valueField: 'fgroup_id',
                     //id: 'cmbCmpEditGrp',
                     editable: false,
                     listeners: {
                         change: function (ctrl, newValue, oldValue, eOpts) {
                             var store = dict.getDepartmentsListByOtdId(newValue);
                             winCd.TagGroups.setStore(store);
                             winCd.setStGroups(store);
                         }
                     }
                 },
                 renderer: function (value) {
                     if (value == null || value == 0) {
                         return '';
                     }
                     else {
                         var store = winCd.getStOTD();
                         var data = store.getData();
                         var rec = data.filterBy('fgroup_id', value);
                         value = rec.items[0].get('name');
                         return value
                     }
                 }
             },
             group_id_2: {
                 displayName: 'ДЕПАРТАМЕНТ', ///'ГРУПА(групи)',/
                 editor: this.TagGroups,
                 renderer: function (value) {
                     var returned = '';
                     if (value != '') {
                         var store = winCd.TagGroups.getStore();//winCd.getStGroups();
                         var data = store.getData();
                         var gps = value.toString().split(',');

                         for (var i = 0; i <= gps.length - 1; i++) {

                             var rec = data.filterBy('fgroup_id', gps[i]);
                             if (rec.length > 0) {
                                 if (returned.length == 0) {
                                     returned = returned + rec.items[0].get('name');
                                 } else {
                                     returned = returned + ', ' + rec.items[0].get('name');
                                 }
                             }
                         }
                         value = returned;
                     } else {
                         return '';
                     }
                     return value;
                 }
             },
             type_id: {
                 displayName: 'Тип МК',
                 editor: {
                     xtype: 'combobox',
                     store: this.StCampaignTypes,//dict.getStoreCampaignTypes(),
                     displayField: 'name',
                     valueField: 'id',
                     editable: false
                 },
                 renderer: function (value) {
                     if (value > 0) {
                         var store = winCd.getStCampaignTypes();
                         var data = store.getData();
                         var rec = data.filterBy('id', value);
                         value = rec.items[0].get('name');
                         return value;
                     } else {
                         return '';
                     }
                 }
             },
             mailing_id: {
                 displayName: 'ИД розсилки Софтлайн',
                 editor: {
                     xtype: 'textfield'
                 }
             },
             date_send: {
                 displayName: 'Дата відправки повідомлень',
                 renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                 editor: {
                     xtype: 'datefield',
                     format: 'd.m.Y'
                 }
             },
             //mailing_idsc: {
             //    displayName: 'ИД розсилок',
             //    editor: {
             //        xtype: 'customeditorfield'
             //    },
             //    renderer: function (value) {
             //        return '';
             //    }
             //},
         }
    }),

    this.setPropertyGridData = function (record) {

        this.record = record;
        var grid = this.Grid;
        var win = this.win;
        var rec = record;

        grid.columns[0].width = 200;
        grid.columns[0].setText('Назва');
        grid.columns[1].setText('Значення');

        $.ajax({
            url: 'api/dict/GetGroupsIdsById/' + rec.get('id'),
            type: 'get',
            success: function (fgroup_ids) {

                var is_run = rec.get('is_run') == null ? false : rec.get('is_run');
                var is_run_value = 0
                switch (is_run) {
                    case true: is_run_value = 1; break;
                    case false: is_run_value = 0; break;
                }
                var date_start = rec.get('date_start') == '' ? new Date() : rec.get('date_start');
                var date_end = rec.get('date_end') == '' ? new Date() : rec.get('date_end');
                //var date_send = rec.get('date_send') == '' ? new Date() : rec.get('date_send');
                var date_send = rec.get('date_send');
                var source = {};

                //source['mailing_idsc'] = rec.get('mailing_id');
                source['name']          = rec.get('name');
                source['date_start']    = new Date(date_start);//Ext.Date.parse(date_start, 'm/d/Y')//date_start;
                source['date_end']      = new Date(date_end);//date_end;
                source['is_run']        = is_run_value;//record.get('is_run');
                source['group_id_0']    = rec.get('group_id_0');
                source['group_id_2']    = fgroup_ids;
                source['type_id']       = rec.get('type_id');
                source['mailing_id']    = rec.get('mailing_id');
                source['date_send']     = date_send;//new Date(date_send);

                grid.setSource(source);
                win.show();                                                                  // <-- показываем окно
            }
        });
    },

    this.setPropertyGridDataNewCampaign = function () {
        var grid = this.Grid;
        var win = this.win;
        var source = {};
        //source['mailing_idsc'] = '';
        source['name']          = '';
        source['date_start']    = new Date();
        source['date_end']      = new Date();
        source['is_run']        = 0;
        source['group_id_0']    = '';
        source['group_id_2']    = '';
        source['type_id']       = null;
        source['mailing_id']    = '';
        source['date_send']     = null;

        grid.setSource(source);
        win.show();
    },
    /* --------------------------------------------------------------------------------------------------------------------------------------------------- */   
    this.win = Ext.create('Ext.Window', {
        id: 'win_campaign_details',
        title: 'Налаштування кампанії',
        width: 600,
        height: 410,
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
                this.Grid
            ]
        }],
        buttons: [
            {
                xtype: 'button',
                text: 'Сховати кампанію',
                scope: this,
                listeners: {
                    'click': function (ctrl) {

                        var property_grd = Ext.getCmp('property_grd');
                        var store = property_grd.getStore();
                        var record = ctrl.scope.record;
                        var storeList = ctrl.scope.storeListCampaigns;

                        Ext.Msg.confirm(
                            "Увага!",
                            Ext.String.format("Сховати кампанію '{0}'?",
                            record.get('name')),
                            function (txtGet) {
                                if (txtGet === "yes") {
                                    var o = {
                                        campaign_id: record.get('id'),
                                        name: record.get('name'),
                                        date_start: record.get('date_start'),
                                        date_end: record.get('date_end'),
                                        is_run: record.get('is_run') == true ? 1 : 0,
                                        group_id_0: record.get('group_id_0'),
                                        group_id_2: record.get('group_id_2'),
                                        type_id: record.get('type_id') == null ? 0 : record.get('type_id'),
                                        mailing_id: record.get('mailing_id'),
                                        date_send: record.get('date_send')
                                    };
                                    Ext.Ajax.request({
                                        url: 'api/campaign/SetCampaignData',
                                        method: 'POST',
                                        params: { callType: 'SetHide' },
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
                }
            },
            {
                xtype: 'button',
                text: 'Перерахувати',
                scope: this,
                listeners: {
                    'click': function (ctrl) {
                        var rec = ctrl.scope.record;

                        $.ajax({
                            url: 'api/start/0',
                            type: 'get',
                            data: {
                                TypeRequest: 10,
                                cData: ''
                            },
                            success: function (state) {
                                var st = Ext.decode(state);

                                if (st.Status == '2') {
                                    winStartCalcualted(rec.get('id'));
                                } else {
                                    Ext.MessageBox.alert('Увага!', 'Перераховується: ' + st.CampaignName + ' (' + st.CampaignId + ')', null);
                                }

                            }
                        });

                        
                    }
                }
            },
            '->',
            {
            xtype: 'button',
            text: 'Зберегти',
            scope: this,
            listeners: {
                'click': function (ctrl) {
                    var property_grd = Ext.getCmp('property_grd');
                    var store = property_grd.getStore();
                    var data = store.getData();
                    var record = ctrl.scope.record;

                    if (record == null) {
                        if (data.get('name').data.value.length == 0) {
                            Ext.Msg.alert("Увага!", "Назву кампанії не вказано!"); return;
                        }
                        Ext.Msg.confirm("Увага!",
                            Ext.String.format("Створити нову кампанію '{0}'?", data.get('name').data.value), function (btnText) {
                            if (btnText === "no") {                                
                            }
                            else if (btnText === "yes") {
                                var o = {
                                    campaign_id     : -1,
                                    name            : data.get('name').data.value,
                                    date_start      : data.get('date_start').data.value,
                                    date_end        : data.get('date_end').data.value,
                                    is_run          : data.get('is_run').data.value,
                                    group_id_0      : data.get('group_id_0').data.value,
                                    group_id_2      : data.get('group_id_2').data.value.toString(),
                                    type_id         : data.get('type_id').data.value == null ? 0 : data.get('type_id').data.value,
                                    mailing_id      : data.get('mailing_id').data.value.toString(),
                                    date_send       : data.get('date_send').data.value
                                };

                                Ext.Ajax.request({
                                    url: 'api/campaign/SetCampaignData',
                                    method: 'POST',
                                    params: { callType: 'SetCampaignData' },
                                    jsonData: o,
                                    headers: { 'Content-Type': 'application/json; charset=utf-8' },
                                    success: function (a) {
                                        if (a.responseText > 0) {
                                            //----<<<<------------------------------------------------
                                            var store_campaign_mk = Ext.getStore('store_campaign_mk');
                                            store_campaign_mk.add({

                                                /* --Б--*/
                                                id          : a.responseText,
                                                is_run      : data.get('is_run').data.value,
                                                type_id     : data.get('type_id').data.value,
                                                name        : data.get('name').data.value,
                                                date_start  : data.get('date_start').data.value,
                                                date_end    : data.get('date_end').data.value,
                                                group_id_0  : data.get('group_id_0').data.value,
                                                group_id_2  : data.get('group_id_2').data.value.toString(),
                                                mailing_id  : data.get('mailing_id').data.value.toString(),
                                                date_send   : data.get('date_send').data.value
                                            });
                                            //----<<<<------------------------------------------------                                            
                                            var wnd = Ext.getCmp('win_campaign_details');
                                            wnd.hide();
                                        }
                                    },
                                    failure: function (error) {

                                    }
                                });
                            }
                        }, this);
                    } else {
                        var o = {
                            campaign_id : record.get('id'),
                            name        : data.get('name').data.value,
                            date_start  : data.get('date_start').data.value,
                            date_end    : data.get('date_end').data.value,
                            is_run      : data.get('is_run').data.value,
                            group_id_0  : data.get('group_id_0').data.value,
                            group_id_2  : data.get('group_id_2').data.value.toString(),
                            type_id     : data.get('type_id').data.value == null ? 0 : data.get('type_id').data.value,
                            mailing_id  : data.get('mailing_id').data.value.toString(),
                            date_send   : data.get('date_send').data.value
                        };
                        Ext.Ajax.request({
                            url: 'api/campaign/SetCampaignData',
                            method: 'POST',
                            params: { callType: 'SetCampaignData' },
                            jsonData: o,
                            headers: { 'Content-Type': 'application/json; charset=utf-8' },
                            success: function (a) {
                                if (a.responseText > 0) {
                                    //----<<<<------------------------------------------------
                                    record.set('name', data.get('name').data.value);
                                    record.set('date_start', data.get('date_start').data.value);
                                    record.set('date_end', data.get('date_end').data.value);
                                    record.set('is_run', data.get('is_run').data.value);
                                    record.set('group_id_0', data.get('group_id_0').data.value);
                                    record.set('type_id', data.get('type_id').data.value);
                                    record.set('mailing_id', data.get('mailing_id').data.value);
                                    record.set('date_send', data.get('date_send').data.value);
                                    record.commit();
                                    //----<<<<------------------------------------------------
                                    var wnd = Ext.getCmp('win_campaign_details');
                                    wnd.hide();
                                }
                            },
                            failure: function (error) {

                            }
                        });
                    }
                }
            }
        },
        {
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
    }),

    this.Show = function (record) {
        if (record != null) {
            this.setPropertyGridData(record);
        } else {
            this.record = null;
            this.setPropertyGridDataNewCampaign();
        }
    }
    this.Show = function (record, store) {
        if (store != null)
            this.storeListCampaigns = store;

        if (record != null) {
            this.setPropertyGridData(record);
        } else {
            this.record = null;
            this.setPropertyGridDataNewCampaign();
        }
    }
};

var winCd = new WinCampaignDetails();

function winStartCalcualted(campaignId) {
    // 'api/dict/GetDisabledDates/' + id,
    var store = Ext.create('Ext.data.JsonStore', {
        //id: 'store_campaign_mk',
        autoLoad: true,
        // store configs
        autoDestroy: true,
        model: Ext.define('DatesModels', {
            extend: 'Ext.data.Model',
            fields: [{
                name: 'Name',
                type: 'string'
            }, {
                name: 'IsCalculated',
                type: 'boolean'
            }, {
                name: 'Value',
                type: 'date'
            }]
        }),
        proxy: {
            type: 'ajax',
            url: ('api/dict/GetCampaignDates/' + campaignId),
            reader: {
                type: 'json',
                root: 'data',
                idProperty: 'Name',
                totalProperty: 'total'
            }
        },
        remoteSort: true,
        //sorters: [{
        //    property: 'Value',
        //    direction: 'DESC'
        //}],
        pageSize: 250
    });

    var grid = Ext.create('Ext.grid.Panel', {
        stateful: true,
        stateId: 'stateful-filter-grid',
        border: false,
        store: store,
        columns: [{
            dataIndex: 'Name',
            text: 'Дати кампанії',
            filterable: false,
            width: 150
        }, {
            xtype: 'checkcolumn',
            dataIndex: 'IsCalculated',
            text: 'Перераховано',
            filterable: false,
            width: 150, processEvent: function () { return false; }
        }],
        plugins: 'gridfilters',
        loadMask: true,
        emptyText: 'Записів більше нема',
    });

    var win = Ext.create('Ext.Window', {
        title: 'Перерахунок кампанії (оберіть дату)',
        width: 400,
        height: 300,
        modal: true,
        closable: true,
        layout: {
            type: 'fit',
        },
        items: {
            xtype: 'panel',
            autoScroll: true,
            items: [ grid ]
        }, buttons: [
            {
                xtype: 'button',
                text: 'Перерахувати',
                scope: grid,
                listeners: {
                    'click': function (ctrl) {
                        var sell = ctrl.scope.getSelection();
                        if (sell.length > 0)
                        {
                            current_data = ctrl.scope.getSelection()[0].get('Name');
                            $.ajax({
                                url: 'api/Start/' + campaignId,
                                type: 'get',
                                data: {
                                    TypeRequest:1, 
                                    cData: current_data
                                },
                                success: function (a) {
                                    //alert(a);
                                }
                            });
                            win.hide();
                        } else {
                            Ext.MessageBox.alert('Увага!', 'Не вкзана дата!', null);
                        }
                    }
                }
            }
        ]
    });

    win.show();
}



//var setPropertyGridData = function (record) {
//this.storeListCampaigns
//};

//Ext.define('CustomEditorField', {
//    extend: 'Ext.form.field.Picker',
//    alias: 'widget.customeditorfield',
//    editable: false,
//    hideTrigger: true,
//    pickerOffset: [0, 0],
//    listeners: {
//        focus: function (fld, e, opts) {
//            fld.expand();
//        }
//    },
//    cancelEdit: function () {
//        var me = this;
//        me.fireEvent('blur');
//        me.collapse();
//    },
//    applyValues: function () {
//        var me = this,
//            form = me.picker,
//            vals = form.getForm().getValues();
//        // set the value of the editable field        
//        me.setValue(Ext.encode(vals));
//        me.fireEvent('blur');
//        me.collapse();
//    },
//    createPicker: function () {
//        var me = this,
//            format = Ext.String.format;
//        return Ext.create('Ext.form.Panel', {
//            title: 'ИД розсилок Софртайн',
//            bodypadding: 5,
//            pickerField: me,
//            ownerCt: me.ownerCt,
//            renderTo: document.body,
//            floating: true,
//            bodyPadding: 8,
//            items: [
//                {
//                    xtype: 'textfield',
//                    fieldLabel: '№ 1',
//                    labelAlign: 'top',
//                    anchor: '100%',
//                    name: 'id_1'
//                },
//                {
//                    xtype: 'textfield',
//                    fieldLabel: '№ 2',
//                    labelAlign: 'top',
//                    anchor: '100%',
//                    name: 'id_2'
//                },
//                {
//                    xtype: 'textfield',
//                    fieldLabel: '№ 3',
//                    labelAlign: 'top',
//                    anchor: '100%',
//                    name: 'id_3'
//                }
//            ],
//            dockedItems: [
//                {
//                    xtype: 'toolbar',
//                    dock: 'bottom',
//                    items: [
//                        {
//                            xtype: 'button',
//                            name: 'cancel',
//                            text: 'Cancel',
//                            //iconCls: 'cancelicon',
//                            handler: function (btn, e, opts) {
//                                me.cancelEdit();
//                            }
//                        },
//                        '->',
//                        {
//                            xtype: 'button',
//                            name: 'save',
//                            text: 'Save',
//                            //iconCls: 'accepticon',
//                            handler: function (btn, e, opts) {
//                                me.applyValues();
//                            }
//                        }
//                    ]
//                }
//            ],
//            listeners: {
//                afterrender: function (panel, opts) {
//                    var vl = me.getValue();
//                    if (vl.length != 0) {
//                        panel.getForm().setValues(
//                            Ext.decode(me.getValue())
//                        );
//                    } else {
//                        panel.getForm().setValues(Ext.decode('{"id_1":"","id_2":"","id_3":""}'));
//                    }
//                },
//                activate: function (ctrl, eOpts) {
//                    //alert();
//                }
//            }
//        })
//    }
//});

//{
//    xtype: 'button',
//    text: 'Отримати статуси',
//    scope: this,
//    listeners: {
//        'click': function (ctrl) {
//            var property_grd = Ext.getCmp('property_grd');
//            var store = property_grd.getStore();
//            var record = ctrl.scope.record;
//            var storeList = ctrl.scope.storeListCampaigns;

//            Ext.Msg.confirm(
//                "Увага!",
//                Ext.String.format("Сховати кампанію '{0}'?",
//                record.get('name')),
//                function (txtGet) {
//                    if (txtGet === "yes") {
//                        var o = {
//                            CampaignId: record.get('id'),
//                            Name: record.get('name')
//                        };
//                        Ext.Ajax.request({
//                            url: 'api/campaign/SetCampaignData',
//                            method: 'POST',
//                            params: { callType: 'SetStartRequesStatus' },
//                            jsonData: o,
//                            headers: { 'Content-Type': 'application/json; charset=utf-8' },
//                            success: function (respons) {
//                                var wnd = Ext.getCmp('win_campaign_details');
//                                wnd.hide();
//                                storeList.load();
//                                //store.load();

//                            },
//                            failure: function (error) {

//                            }
//                        });

//                    }
//                });
//        }
//    }
//},