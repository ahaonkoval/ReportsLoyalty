/**
 * 
 * @param {*} sectionCaption назва відділу
 * @param {*} panelDepartments парель назви департаментів
 * @param {*} panelGroupLavel3 панель груп третього рівня
 */
function StructureConteiner(sectionCaption, panelDepartments, panelGroupLavel3) {

    this.sectionCaption = sectionCaption;
    this.panelDepartments = panelDepartments;
    this.panelGroupLavel3 = panelGroupLavel3;

    this.Fill = function (id) {
        var caption = this.sectionCaption;
        var depart = this.panelDepartments;
        var groupLavel3 = this.panelGroupLavel3;
        $.ajax({
            url: 'api/campaign/GetCampaignSectionName/' + id,
            type: 'get',
            success: function (Name) {
                caption.setValue(Name);
            }
        });
        /*
        
        */
        $.ajax({
            url: 'api/campaign/GetCampaignDepartments/' + id,
            type: 'get',
            success: function (data) {

                var itemsProcessed = 0;
                var htmlcnt = '<div><ul>';
                data.forEach(function (item, index, array) {
                    if (htmlcnt == '<ul>') {
                        htmlcnt = '<li>' + item.Name + '</li>';
                    } else {
                        htmlcnt = htmlcnt + ' <li>' + item.Name + '</li>';
                    }

                    itemsProcessed++;
                    if (itemsProcessed === array.length) {
                        htmlcnt = htmlcnt + '</ul></div>';
                        depart.setHtml(htmlcnt);
                    }

                });
            }
        });
        /*

        */
        $.ajax({
            url: 'api/campaign/GetCampaignGroupLaval3/' + id,
            type: 'get',
            success: function (data) {

                var itemsProcessed = 0;
                var htmlcnt = '<div><ul>';
                data.forEach(function (item, index, array) {
                    if (htmlcnt == '<ul>') {
                        htmlcnt = '<li>' + item.Name + '</li>';
                    } else {
                        htmlcnt = htmlcnt + ' <li>' + item.Name + '</li>';
                    }

                    itemsProcessed++;
                    if (itemsProcessed === array.length) {
                        htmlcnt = htmlcnt + '</ul></div>';

                        groupLavel3.setHtml(htmlcnt);
                    }

                });

            }
        });
    }
}
/**
 * 
 */
function WinCampaignDetails() {
    /**
     * 
     */
    this.record = null,
        /**
         * завантажена стрінка кампаній з батьквського вікна
         */
        this.storeListCampaigns = null,
        /**
         * панель з кнопками завантаження УПЛ
         */
        this.panelBtnCustomersAdd = Ext.create('Ext.panel.Panel', {
            layout: 'fit'
        }),
        /**
         * Парель з таблицею УПЛ
         */
        this.panelCustomers = Ext.create('Ext.panel.Panel', {
            layout: 'fit'
        }),
        /**
         * Панель з кнопками управління завантаження УПЛ
         */
        this.panelBtnDownloadCustomers = Ext.create('Ext.panel.Panel', {
            layout: 'fit'
        }),
        /**
         * Панель з таблицею артикулів
         */
        this.panelArticuls = Ext.create('Ext.panel.Panel', {
            layout: 'fit'
        }),

        this.panelBtnUploadArticuls = Ext.create('Ext.panel.Panel', {
            layout: 'fit'
        }),
        // Типи капмпаній, довідник, выд цього залежить де ы як буде выдображений звіт
        this.StoreCampaignTypes = dict.getStoreCampaignTypes(),
        this.getStoreCampaignTypes = function () {
            return this.StoreCampaignTypes;
        },

        this.SectionCaption = Ext.create('Ext.form.field.Text', {
            readOnly: false
        }),

        this.campaignName = Ext.create('Ext.form.field.Text', {
            padding: 2,
            fieldLabel: 'Назва кампанії:',
            labelWidth: 109,
            readOnly: false
        }),

        this.btnRefresh = Ext.create('Ext.Button', {
            text: 'Налаштувати',
            tooltip: 'Оновити дані про відділ, департаменти, групи...',
            scope: this,
            handler: function (event, toolEl, panel) {
                var struct = new StructureConteiner(
                    this.SectionCaption,
                    this.PanelDepartments,
                    this.PanelGroupLavel3
                );

                getWinCmpSettWizard(this.record.get('id'),
                    struct
                ).show();
            }
        }),

        this.PanelSection = Ext.create('Ext.panel.Panel', {
            xtype: 'panel',
            padding: 3,
            title: 'ВІДДІЛ:',
            tooltip: 'Get Help',
            layout: 'fit',
            height: 75,
            items: [
                this.SectionCaption
            ],
            tools: [
                this.btnRefresh
            ]
        }),
        /* --<-------------------------------------------------------------------------*/
        this.PanelDepartments = Ext.create('Ext.panel.Panel', {
            xtype: 'panel',
            padding: 3,
            title: 'Департаменти:',
            flex: 2,
            autoScroll: true
        }),

        this.PanelGroupLavel3 = Ext.create('Ext.panel.Panel', {
            xtype: 'panel',
            padding: 3,
            title: 'Групи третього рівня:',
            flex: 3,
            autoScroll: true
        }),
        /*
         *  Завантаження збережених налаштувань выдділв кампанії 
         */
        this.FillSetting = function (record) {
            var rec = this.record;

            var sectionCaption = this.SectionCaption;
            var Departments = this.PanelDepartments;
            var GroupLavel3 = this.PanelGroupLavel3;

            $.ajax({
                url: 'api/campaign/GetCampaignSectionName/' + rec.get('id'),
                type: 'get',
                success: function (Name) {
                    sectionCaption.setValue(Name);
                }
            });
            /*
            
            */
            $.ajax({
                url: 'api/campaign/GetCampaignDepartments/' + rec.get('id'),
                type: 'get',
                success: function (data) {

                    if (data.length == 0) {
                        Departments.setHtml('');
                        return;
                    }

                    var itemsProcessed = 0;
                    var htmlcnt = '<div><ul>';
                    data.forEach(function (item, index, array) {
                        if (htmlcnt == '<ul>') {
                            htmlcnt = '<li>' + item.Name + '</li>';
                        } else {
                            htmlcnt = htmlcnt + ' <li>' + item.Name + '</li>';
                        }

                        itemsProcessed++;
                        if (itemsProcessed === array.length) {
                            htmlcnt = htmlcnt + '</ul></div>';
                            Departments.setHtml(htmlcnt);
                        }

                    });
                }
            });
            /*
    
            */
            $.ajax({
                url: 'api/campaign/GetCampaignGroupLaval3/' + rec.get('id'),
                type: 'get',
                success: function (data) {

                    if (data.length == 0) {
                        GroupLavel3.setHtml('');
                        return;
                    }

                    var itemsProcessed = 0;
                    var htmlcnt = '<div><ul>';
                    data.forEach(function (item, index, array) {
                        if (htmlcnt == '<ul>') {
                            htmlcnt = '<li>' + item.Name + '</li>';
                        } else {
                            htmlcnt = htmlcnt + ' <li>' + item.Name + '</li>';
                        }

                        itemsProcessed++;
                        if (itemsProcessed === array.length) {
                            htmlcnt = htmlcnt + '</ul></div>';

                            GroupLavel3.setHtml(htmlcnt);
                        }

                    });

                }
            });
        },
        /* ------------------------------------------------------------------------------------------------- */
        this.Grid = Ext.create('Ext.grid.property.Grid', {
            //title: 'Кампания: ' + record.get('name'),
            id: 'property_grd',
            width: 350,
            readOnly: true,
            padding: 3,
            border: true,
            sortableColumns: false,
            //renderTo: Ext.getBody(),
            groupingConfig: {
                groupHeaderTpl: 'Settings: {name}',
                disabled: false
            },

            sourceConfig: {
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
                        store: dict.getStoreTrueFalse(),//this.StTrueFalse,
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
                type_id: {
                    displayName: 'Тип МК',
                    editor: {
                        xtype: 'combobox',
                        store: dict.getStoreCampaignTypes(), //this.StCampaignTypes,
                        displayField: 'name',
                        valueField: 'id',
                        editable: false
                    },
                    renderer: function (value) {
                        if (value > 0) {
                            /*
                                закольцовуємо для того щоб добути довідник
                                колись треба переробити на завантаження всіх довідників, а потім вже відкриття вікон
                            */
                            var store = winCd.getStoreCampaignTypes(); //

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
                potamusDocName: {
                    displayName: 'Номер документу (Потамус)',
                    editor: {
                        xtype: 'textfield'
                    }
                },
                is_global: {
                    displayName: 'Глобальна акція',
                    editor: {
                        xtype: 'combobox',
                        store: dict.getStoreTrueFalse(),//this.StTrueFalse,
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
                }

            }
        }),

        this.setPropertyGridData = function (record) {

            this.record = record;
            var grid = this.Grid;
            var win = this.win;
            var rec = record;
            var campaignName = this.campaignName

            grid.columns[0].width = 180;
            grid.columns[0].setText('Назва властивості');
            grid.columns[1].setText('Значення');
            /*
                костиль
            */
            var name = rec.get('Name');
            if (name == undefined)
                name = rec.get('name');
            /* - - - */
            campaignName.setValue(name);

            $.ajax({
                url: 'api/campaign/GetGroupsIdsById/' + rec.get('id'),
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
                    var date_send = rec.get('date_send');
                    var source = {};

                    source['date_start'] = new Date(date_start);//Ext.Date.parse(date_start, 'm/d/Y')//date_start;
                    source['date_end'] = new Date(date_end);//date_end;
                    source['is_run'] = is_run_value;//record.get('is_run');
                    source['type_id'] = rec.get('type_id');
                    source['mailing_id'] = rec.get('mailing_id');
                    source['date_send'] = date_send;//new Date(date_send);
                    source['is_global'] = rec.get('is_global');

                    grid.setSource(source);
                    win.show();                                                                  // <-- показываем окно
                }
            });
            /*
            
            */
            this.FillSetting(record);
        },
        /**
         * 
         */
        this.setPropertyGridDataNewCampaign = function () {
            var grid = this.Grid;
            var win = this.win;
            var campaignName = this.campaignName
            var source = {};
            grid.columns[0].width = 180;
            grid.columns[0].setText('Назва властивості');
            grid.columns[1].setText('Значення');

            source['date_start'] = new Date();
            source['date_end'] = new Date();
            source['is_run'] = 0;

            source['type_id'] = null;
            source['mailing_id'] = '';
            source['date_send'] = null;

            this.SectionCaption.setValue('');
            campaignName.setValue('');

            grid.setSource(source);
            win.show();
        },
        /*
        *
        */
        this.BtnsProperties = Ext.create('Ext.button.Split', {
            //renderTo: Ext.getBody(),
            text: '...УПРАВЛІННЯ...',
            handler: function () {
            },
            menu: new Ext.menu.Menu({
                items: [
                    {
                        text: 'Сховати кампанію',
                        listeners: {
                            'click': function (ctrl) {
                                var property_grd = Ext.getCmp('property_grd');
                                var store = property_grd.getStore();

                                var record = winCd.record;//ctrl.scope.record;
                                var storeList = winCd.storeListCampaigns;
                                var campaignName = winCd.campaignName

                                Ext.Msg.confirm(
                                    "Увага!",
                                    Ext.String.format("Сховати кампанію '{0}'?",
                                        record.get('name')),
                                    function (txtGet) {
                                        if (txtGet === "yes") {
                                            var o = {
                                                campaign_id: record.get('id'),
                                                name: campaignName.getValue(),
                                                date_start: record.get('date_start'),
                                                date_end: record.get('date_end'),
                                                is_run: record.get('is_run') == true ? 1 : 0,
                                                type_id: record.get('type_id') == null ? 0 : record.get('type_id'),
                                                mailing_id: record.get('mailing_id'),
                                                date_send: record.get('date_send')
                                            };
                                            Ext.Ajax.request({
                                                url: 'api/campaign/SetCampaignData/' + record.get('id'),
                                                method: 'POST',
                                                params: { callType: 'SetHide' },
                                                jsonData: o,
                                                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                                                success: function (respons) {
                                                    storeList.load();
                                                    storeList.load();
                                                    storeList.load();
                                                    winCd.win.hide();
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
                        text: 'ПЕРЕРАХУНОК',
                        listeners: {
                            'click': function (ctrl) {
                                var rec = winCd.record;
                                /* Перевірка на те щоб не запустити два перерахунка паралельно */
                                $.ajax({
                                    url: 'api/start/getstart/0',
                                    type: 'get',
                                    data: {
                                        TypeRequest: 10,
                                        cData: ''
                                    },
                                    success: function (state) {
                                        var st = Ext.decode(state);

                                        if (st.Status == '2') {
                                            /* Вибір дати на перерахунок */
                                            winStartCalcualted(rec.get('id'));
                                        } else {
                                            Ext.MessageBox.alert('Увага!', 'Перераховується: ' + st.CampaignName + ' (' + st.CampaignId + ')', null);
                                        }

                                    }
                                });
                            }
                        }
                    }, {
                        text: 'Прибрати тестову групу',
                        listeners: {
                            'click': function (ctrl) {
                                var rec = winCd.record;
                                $.ajax({
                                    url: 'api/customer/ClearControlGrpup/' + rec.get('id'),
                                    type: 'get',
                                    success: function (message) {
                                        if (message != '') {
                                            Ext.MessageBox.alert('Увага! Виникла помилка!', message, null);
                                        } else {
                                            Ext.MessageBox.alert('Увага!', 'Трохи зачекати і контрольна група видалиться...', 
                                                function () {
                                                    var rec = winCd.record;
                                                    /*
                                                        Можливо прийдеться колись навести взагалы красоту
                                                    */
                                                    var getRowState = setInterval(function () { getRowClearingDatate(rec) }, 5000);
                                                    function getRowClearingDatate(rec) {
                                                        var id = rec.get('id');
                                                    }
                                                    /* так щоб очікувався статус по видаленню контпрольної групи*/
                                                }
                                            );
                                        }
                                    }
                                });
                            }
                        }
                    }

                ]
            })
        }),
        /*
        */
        this.showActualityButton = function (pageId) {
            // winCd -<-- зацикливание
            winCd.panelBtnDownloadCustomers.setVisible(false);
            winCd.panelBtnCustomersAdd.setVisible(false);
            winCd.panelBtnUploadArticuls.setVisible(false);

            switch (pageId) {
                case 1:
                    winCd.panelBtnDownloadCustomers.setVisible(true);
                    winCd.panelBtnCustomersAdd.setVisible(true);
                    break;
                case 2:
                    winCd.panelBtnUploadArticuls.setVisible(true);
                    break;
            }
        },

        this.win = Ext.create('Ext.Window', {

            title: 'Налаштування кампанії',
            width: '95%',
            height: '90%',
            modal: true,
            closable: true,
            scope: this.record,
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'start',
            },
            items: [
                {
                    xtype: 'panel',
                    height: 33,
                    layout: 'card',
                    items: [
                        this.campaignName
                    ]
                },
                {
                    xtype: 'panel',
                    flex: 1,
                    border: false,
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            layout: {
                                type: 'vbox',
                                align: 'stretch',
                                pack: 'start',
                            },
                            items: [
                                this.Grid,
                                this.PanelSection,
                                this.PanelDepartments,
                                this.PanelGroupLavel3
                            ]
                        },
                        {
                            flex: 1,
                            xtype: 'tabpanel', // TabPanel itself has no title
                            activeTab: 0,
                            items: [
                                {
                                    xtype: 'panel',
                                    title: 'Учасники',
                                    layout: 'fit',
                                    items: [
                                        this.panelCustomers
                                    ],
                                    listeners: {
                                        activate: function (self) {
                                            winCd.showActualityButton(1);
                                        }
                                    }
                                }, {
                                    xtype: 'panel',
                                    title: 'Артикули',
                                    layout: 'fit',
                                    items: [
                                        this.panelArticuls
                                    ],
                                    listeners: {
                                        activate: function (self) {
                                            winCd.showActualityButton(2);
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }, {
                    height: 1
                }
            ],
            buttons: [{
                xtype: 'panel',
                items: [
                    this.BtnsProperties
                ]
            },
                '->',
            this.panelBtnUploadArticuls,
            this.panelBtnDownloadCustomers,
            this.panelBtnCustomersAdd,
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
                        var campaignName = winCd.campaignName;
                        var o = {
                            campaign_id:    record.get('id'),
                            name:           campaignName.getValue(),
                            date_start:     data.get('date_start').data.value,
                            date_end:       data.get('date_end').data.value,
                            is_run:         data.get('is_run').data.value,
                            type_id:        data.get('type_id').data.value == null ? 0 : data.get('type_id').data.value,
                            mailing_id:     data.get('mailing_id').data.value.toString(),
                            date_send:      data.get('date_send').data.value,
                            is_global:      data.get('is_global').data.value,
                        };
                        Ext.Ajax.request({
                            url: 'api/campaign/SetCampaignData/0',
                            method: 'POST',
                            params: { callType: 'SetCampaignData' },
                            jsonData: o,
                            headers: { 'Content-Type': 'application/json; charset=utf-8' },
                            success: function (a) {
                                if (a.responseText > 0) {
                                    //----<<<<------------------------------------------------
                                    record.set('date_start', data.get('date_start').data.value);
                                    record.set('date_end', data.get('date_end').data.value);
                                    record.set('is_run', data.get('is_run').data.value);
                                    record.set('type_id', data.get('type_id').data.value);
                                    record.set('mailing_id', data.get('mailing_id').data.value);
                                    record.set('date_send', data.get('date_send').data.value);
                                    record.set('is_global', data.get('is_global').data.value);

                                    record.commit();
                                    //----<<<<------------------------------------------------
                                    winCd.storeListCampaigns.reload();
                                    //----<<<<------------------------------------------------
                                    winCd.win.hide();
                                }
                            },
                            failure: function (error) {

                            }
                        });
                    }
                }
            },
            {
                xtype: 'button',
                text: 'Закрити',
                //scope: this,
                listeners: {
                    'click': function () {
                        winCd.win.hide()
                    }
                }
            }],
            listeners: {
                activate: function (ctrl, prms) {
                    //console.log(prms);
                }
            }
        }),

        /**
         * 
         * @param {*} record 
         */
        this.Show = function (record) {

            if (record != null) {
                this.setPropertyGridData(record);
            } else {
                this.record = null;
                this.setPropertyGridDataNewCampaign();
            }

        }
    /**
     * Переробити
     */
    this.Show = function (record, store) {
        /**
         * Завантаження УПЛ кампаныъ
         */
        var grid = getGridCustomers(record.get('id'));
        this.panelCustomers.items.clear()
        this.panelCustomers.items.add(grid);
        /**
         * Завантаждення кнопок управління вивантаження УПЛ
         */
        this.panelBtnDownloadCustomers.items.clear();
        this.panelBtnDownloadCustomers.items.add(getBtnDownloadCustomers(record.get('id')));
        /**
         * Кнопки завантаження УПЛ
         */
        this.panelBtnCustomersAdd.items.clear();
        this.panelBtnCustomersAdd.items.add(getBtnCustomersAdd(record.get('id'), this.win))
        /**
         * Завантаження артикулів капнанії
         */
        this.panelArticuls.items.clear();
        var gridArticuls = getGridArticuls(record.get('id'));
        gridArticuls.getStore().load();
        this.panelArticuls.items.add(gridArticuls);
        /**
         * 
         */
        var storeArticuls = gridArticuls.getStore();
        this.panelBtnUploadArticuls.items.clear();
        this.panelBtnUploadArticuls.items.add(
            getBtnUploadArticulse(record.get('id'))//, storeArticuls
            
            );

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
/**
 * Вікно запуску перерахунку кампанії
 * @param {*} campaignId 
 */
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

    var isDeliveryStatus = Ext.create('Ext.form.Checkbox', {
        value: false,
        fieldLabel: 'Враховуючи доставку',
        boxLabelAlign: 'after',
        value: true,
        listeners: {
            'change': function (cmp, newValue, oldValue, eOpts) {
                store.loadPage(1, {
                    params: {
                        isRun: newValue,
                        TypeId: comboBox.getValue()
                    }
                });
            }
        }
    });
    /*
        Вікно перерахунку кампанії
    */
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
            items: [grid]
        }, buttons: [
            isDeliveryStatus,
            {
                xtype: 'button',
                text: 'Перерахувати',
                scope: grid,
                listeners: {
                    'click': function (ctrl) {
                        var sell = ctrl.scope.getSelection();
                        if (sell.length > 0) {
                            current_data = ctrl.scope.getSelection()[0].get('Name');

                            $.ajax({
                                url: 'api/start/getstart/' + campaignId,
                                type: 'get',
                                data: {
                                    TypeRequest: 1,
                                    cData: current_data,
                                    isDelyvery: isDeliveryStatus.getValue()
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
};

