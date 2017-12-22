
function WinCampaignDetails() {

    this.record = null,

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
            //allowBlank: false,
            displayField: 'name',
            valueField: 'fgroup_id',
            //reference: 'name',
            //filterPickList: true,
            //queryMode: 'local',
            //publishes: 'value',
            id: 'cmbCmpEditGrp_2',
            //listeners: {
            //    activate: function (ctrl, event, eOpts) {
            //        ctrl.setStore(this.StGroups);
            //    }
            //}
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
                 //format: 'd.m.Y',
                 //renderer: function (v) {
                 //    //return new Date(v).getDay();
                 //    var d = new Date(v),
                 //        month = '' + (d.getMonth() + 1),
                 //        day = '' + d.getDate(),
                 //        year = d.getFullYear();

                 //    if (month.length < 2) month = '0' + month;
                 //    if (day.length < 2) day = '0' + day;

                 //    return [year, month, day].join('-');
                 //}
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
                     id: 'cmbCmpEditGrp',
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
                 //editor: {
                 //    xtype: 'tagfield',
                 //    store: this.getStGroups(),//this.StGroups,
                 //    //allowBlank: false,
                 //    displayField: 'name',
                 //    valueField: 'fgroup_id',
                 //    //reference: 'name',
                 //    //filterPickList: true,
                 //    //queryMode: 'local',
                 //    //publishes: 'value',
                 //    id: 'cmbCmpEditGrp_2',
                 //    //listeners: {
                 //    //    activate: function (ctrl, event, eOpts) {
                 //    //        ctrl.setStore(this.StGroups);
                 //    //    }
                 //    //}
                 //},
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
             //margin_markets: {
             //    displayName: 'Маржа по маркетам',
             //    //type: 'numberfield',
             //    //decimalPrecision: 2
             //    editor: {
             //        xtype: 'numberfield',
             //        decimalPrecision: 3
             //    }
             //},
             //margin_lavel_0: {
             //    displayName: 'Маржа по відділу',
             //    editor: {
             //        xtype: 'numberfield',
             //        decimalPrecision: 3
             //    }
             //},
             //margin_lavel_1: {
             //    displayName: 'Маржа по департаменту',
             //    editor: {
             //        xtype: 'numberfield',
             //        decimalPrecision: 3
             //    }
             //}
             //,
             //margin_lavel_2: {
             //    displayName: 'Маржа по групі',
             //    editor: {
             //        xtype: 'numberfield',
             //        decimalPrecision: 3
             //    }
             //},
             //margin_lavel_3: {
             //    displayName: 'Маржа по підгрупі',
             //    editor: {
             //        xtype: 'numberfield',
             //        decimalPrecision: 3
             //    }
             //}
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
                var source = {};

                source['name'] = rec.get('name');
                source['date_start'] = new Date(date_start);//Ext.Date.parse(date_start, 'm/d/Y')//date_start;
                source['date_end'] = new Date(date_end);//date_end;
                source['is_run'] = is_run_value;//record.get('is_run');
                //source['margin_markets'] = rec.get('margin_markets');
                //source['margin_lavel_0'] = rec.get('margin_lavel_0');
                //source['margin_lavel_1'] = rec.get('margin_lavel_1');
                //source['margin_lavel_2'] = rec.get('margin_lavel_2');
                //source['margin_lavel_3'] = rec.get('margin_lavel_3');
                source['group_id_0'] = rec.get('group_id_0');
                source['group_id_2'] = fgroup_ids;
                source['type_id'] = rec.get('type_id');

                grid.setSource(source);
                win.show();                                                                  // <-- показываем окно
            }
        });
    },

    this.setPropertyGridDataNewCampaign = function () {
        var grid = this.Grid;
        var win = this.win;
        var source = {};
        source['name'] = '';
        source['date_start'] = new Date();
        source['date_end'] = new Date();
        source['is_run'] = 0;
        //source['margin_markets'] = 0;
        //source['margin_lavel_0'] = 0;
        //source['margin_lavel_1'] = 0;
        //source['margin_lavel_2'] = 0;
        //source['margin_lavel_3'] = 0;
        source['group_id_0'] = '';
        source['group_id_2'] = '';
        source['type_id'] = null;

        grid.setSource(source);
        win.show();
    },
    /* --------------------------------------------------------------------------------------------------------------------------------------------------- */   
    this.win = Ext.create('Ext.Window', {
        id: 'win_campaign_details',
        title: 'Налаштування кампанії',
        width: 700,
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
        buttons: [{
            xtype: 'button',
            text: 'Зберегти',
            listeners: {
                'click': function () {
                    var property_grd = Ext.getCmp('property_grd');
                    var store = property_grd.getStore();
                    var data = store.getData();
                    var record = winCd.record;

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
                                    campaign_id: -1,
                                    name: data.get('name').data.value,
                                    date_start: data.get('date_start').data.value,
                                    date_end: data.get('date_end').data.value,
                                    is_run: data.get('is_run').data.value,
                                    group_id_0: data.get('group_id_0').data.value,
                                    group_id_2: data.get('group_id_2').data.value.toString(),
                                    type_id: data.get('type_id').data.value == null ? 0 : data.get('type_id').data.value
                                    //margin_markets: data.get('margin_markets').data.value,
                                    //margin_lavel_0: data.get('margin_lavel_0').data.value,
                                    //margin_lavel_1: data.get('margin_lavel_1').data.value,
                                    //margin_lavel_2: data.get('margin_lavel_2').data.value,
                                    //margin_lavel_3: data.get('margin_lavel_3').data.value
                                };

                                Ext.Ajax.request({
                                    url: 'api/campaign/SetCampaignData',
                                    method: 'POST',
                                    params: { callType: 'setData' },
                                    jsonData: o,
                                    headers: { 'Content-Type': 'application/json; charset=utf-8' },
                                    success: function (a) {
                                        if (a.responseText > 0) {
                                            //----<<<<------------------------------------------------
                                            var store_campaign_mk = Ext.getStore('store_campaign_mk');
                                            store_campaign_mk.add({

                                                /* --Б--*/
                                                id: a.responseText,
                                                is_run: data.get('is_run').data.value,
                                                type_id: data.get('type_id').data.value,
                                                name: data.get('name').data.value,
                                                date_start: data.get('date_start').data.value,
                                                date_end: data.get('date_end').data.value,
                                                group_id_0: data.get('group_id_0').data.value,
                                                group_id_2: data.get('group_id_2').data.value.toString()
                                                //margin_lavel_0: data.get('margin_lavel_0').data.value,
                                                //margin_lavel_1: data.get('margin_lavel_1').data.value,
                                                //margin_lavel_2: data.get('margin_lavel_2').data.value,
                                                //margin_lavel_3: data.get('margin_lavel_3').data.value
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
                            campaign_id: record.get('id'),
                            name: data.get('name').data.value,
                            date_start: data.get('date_start').data.value,
                            date_end: data.get('date_end').data.value,
                            is_run: data.get('is_run').data.value,
                            group_id_0: data.get('group_id_0').data.value,
                            group_id_2: data.get('group_id_2').data.value.toString(),
                            type_id: data.get('type_id').data.value == null ? 0 : data.get('type_id').data.value,
                            //margin_markets: data.get('margin_markets').data.value,
                            //margin_lavel_0: data.get('margin_lavel_0').data.value,
                            //margin_lavel_1: data.get('margin_lavel_1').data.value,
                            //margin_lavel_2: data.get('margin_lavel_2').data.value,
                            //margin_lavel_3: data.get('margin_lavel_3').data.value
                        };
                        Ext.Ajax.request({
                            url: 'api/campaign/SetCampaignData',
                            method: 'POST',
                            params: { callType: 'setData' },
                            jsonData: o,
                            headers: { 'Content-Type': 'application/json; charset=utf-8' },
                            success: function (a) {
                                if (a.responseText > 0) {
                                    //----<<<<------------------------------------------------
                                    winCd.record.set('name', data.get('name').data.value);
                                    winCd.record.set('date_start', data.get('date_start').data.value);
                                    winCd.record.set('date_end', data.get('date_end').data.value);
                                    winCd.record.set('is_run', data.get('is_run').data.value);
                                    winCd.record.set('group_id_0', data.get('group_id_0').data.value);
                                    winCd.record.set('type_id', data.get('type_id').data.value);

                                    //winCd.record.set('margin_markets', data.get('margin_markets').data.value);
                                    //winCd.record.set('margin_lavel_0', data.get('margin_lavel_0').data.value);
                                    //winCd.record.set('margin_lavel_1', data.get('margin_lavel_1').data.value);
                                    //winCd.record.set('margin_lavel_2', data.get('margin_lavel_2').data.value);
                                    //winCd.record.set('margin_lavel_3', data.get('margin_lavel_3').data.value);

                                    winCd.record.commit();
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
    }),

    this.Show = function (record) {
        if (record != null) {
            this.setPropertyGridData(record);
        } else {
            this.record = null;
            this.setPropertyGridDataNewCampaign();
        }
    }
};

var winCd = new WinCampaignDetails();

//var setPropertyGridData = function (record) {

//};