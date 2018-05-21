/// <reference path="D:\develops\ReportsLoyalty\ReportsLoyalty\pages/BirthDayUPL.aspx" />

var getCampaignListModel = function () {

}

var showExtraPoints = function () {
    var center = Ext.getCmp('pnlCenter');

    var p_extra_points = Ext.getCmp('p_extra_points');
    if (p_extra_points != null) return;

    var comboBox = Ext.create('Ext.form.ComboBox', {
        fieldLabel: 'Магазин',
        store: dict.getStoreMarkets(),
        multiSelect: true,
        queryMode: 'local',
        valueField: 'ShortName',
        displayField: 'MarketName',
        width: 300,
        labelWidth: 50,
        emptyText: 'Всі',
        itemCls: 'make-bold',
        renderTo: Ext.getBody(),
        tpl: Ext.create('Ext.XTemplate',
            '<tpl for=".">',
                '<div class="x-boundlist-item">{MarketName}</div>',
            '</tpl>'
        ),
        displayTpl: Ext.create('Ext.XTemplate',
            '<tpl for=".">',
                '{ShortName};',
            '</tpl>'
        ),
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpts) {
                if (newValue.indexOf('all') > -1 && oldValue.indexOf('all') == -1) {
                    ctrl.setValue(['all'])
                } else {
                    if (oldValue != null) {
                        if (newValue.indexOf('all') > -1 && oldValue.indexOf('all') > -1)
                            ctrl.setValue([]);
                    }
                }
            }
        }

    });

    var panel_allocation = Ext.create('Ext.panel.Panel', {
        layout: 'fit',
        //id: 'p_rep_conteiner_extra_points_ratig'
    });

    var panel_basic = Ext.create('Ext.panel.Panel', {
        layout: 'fit',        
        //id: 'p_rep_conteiner_extra_points_ratig'
    });

    var panel_rating = Ext.create('Ext.panel.Panel', {
        layout: 'fit',
        //id: 'p_rep_conteiner_extra_points_ratig'
    });

    //var panel_purveyor = Ext.create('Ext.panel.Panel', {
    //    layout: 'fit',
    //    //id: 'p_rep_conteiner_extra_points_ratig'
    //});

    var tbReports = Ext.create('Ext.TabPanel', {
        height:400,
        layout: 'fit',
        border:true,
        items: [
            {
                title: 'Основні показники',
                layout: 'fit',
                items: [
                    panel_basic
                    //{
                    //xtype: 'panel',
                    //layout: 'fit',
                    //id: 'p_rep_conteiner_extra_points'
                    //}
                ]
            },
            {
                title: 'Розподіл УПЛ',
                layout: 'fit',
                items: [panel_allocation]
                //    [{
                //    xtype: 'panel',
                //    layout: 'fit',
                //    id: 'p_rep_conteiner_extra_points'
                //}]
            },
            {
                title: 'Рейтинг артикулів',
                layout: 'fit',
                items: [panel_rating]
            },
            //{
            //    title: 'Звіт для постачальника',
            //    layout: 'fit',
            //    items: [
            //        panel_purveyor
            //    ]
            //}
        ]

    });

    var tab = center.add({
        id: 'p_extra_points',
        title: 'ЕКСТРА-БАЛИ',
        extend: 'Ext.panel.Panel',
        closable: true,
        layout: 'fit',
        items: [
            {
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                    pack: 'start'
                },
                items: [
                    {
                        xtype: 'panel',
                        height: 36,
                        items: {
                            xtype: 'toolbar',
                            height: 35,
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Акції'
                                }, {
                                    id: 'cmbCampaigns',
                                    xtype: 'combobox',
                                    width: 550,
                                    store: dict.getStoreCampaigns(1),//st_campaign_extra_points,
                                    queryMode: 'local',
                                    valueField: 'Id',
                                    displayField: 'Name',
                                    //tpl: "<tpl for=\".\"><div class=\"x-combo-list-item\">{name}</div></tpl>",
                                    renderTo: Ext.getBody(),
                                    listeners: {
                                        scope: this,
                                        change: function (ctrl, newValue, oldValue, eOpts) {
                                        }
                                    }
                                }, {
                                    xtype: 'tbseparator'
                                }, {
                                    xtype: 'label',
                                    text: 'На дату:'
                                }, {
                                    id: 'dtDateState',
                                    format: "d/m/Y",
                                    xtype: 'datefield',
                                    width: 110,
                                    listeners: {
                                        scope: this,
                                        expand: function (field, eOpts) {
                                            var dtDateState = Ext.getCmp('dtDateState');
                                            var cmbCampaigns = Ext.getCmp('cmbCampaigns');
                                            if (cmbCampaigns != null) {
                                                if (cmbCampaigns.getValue() != null)
                                                    getDisabledDatesById(cmbCampaigns.getValue(), dtDateState);
                                            }
                                        }
                                    }
                                }, {
                                    xtype: 'tbseparator'
                                }
                                //{
                                //    id: 'cmbMarkets',
                                //    xtype: 'combobox',
                                //    width: 250,
                                //    store: dict.getStoreMarkets(),//st_dict_markets,
                                //    queryMode: 'local',
                                //    displayField: 'market_name',
                                //    valueField: 'id',
                                //    renderTo: Ext.getBody()
                                //},
                                , comboBox,
                                //{
                                //    xtype: 'combobox',
                                //    //width: '400',
                                //    ////triggerAction: 'all',
                                //    //valueField: 'id',
                                //    //displayField: 'market_name',
                                //    //editable: false, 
                                //    //multiSelect: true,
                                //    //value: [1],
                                //    //mode: 'remote',
                                //    fieldLabel: 'My Dropdown',
                                //    name: 'type',
                                //    allowBlank: false,
                                //    editable: false,
                                //    // This is the option required for "select"-style behaviour
                                //    triggerAction: 'all',
                                //    typeAhead: false,
                                //    mode: 'local',
                                //    width: 120,
                                //    listWidth: 120,
                                //    hiddenName: 'my_dropdown',
                                //    store: dict.getStoreMarkets(),//st_dict_markets,
                                //    readOnly: true
                                //},
                                {
                                    xtype: 'button',
                                    width: 100,
                                    text: 'Показати',
                                    handler: function () {

                                        var url = 'pages/extra_point_indicators.aspx?'

                                        var cmbCampaigns = Ext.getCmp('cmbCampaigns');
                                        var campaign_id = cmbCampaigns.getValue();
                                        if (campaign_id == null) {
                                            Ext.Msg.alert('Увага', 'Акція не вибрана', Ext.emptyFn);
                                            return;
                                        }
                                        url = url + 'campaign_id=' + campaign_id;

                                        var dtDateState = Ext.getCmp('dtDateState');
                                        var date_st = dtDateState.getValue();
                                        if (date_st == null) {
                                            url = url + '&date_st=' + date_st
                                        } else {
                                            date_st = date_st.toLocaleDateString();
                                            url = url + '&date_st=' + date_st
                                        }

                                        //var cmbMarkets = Ext.getCmp('cmbMarkets');
                                        var market_id = comboBox.getValue();
                                        if (market_id == null) market_id = 0;
                                        url = url + '&market_id=' + market_id;

                                        var report_box = Ext.getCmp('rep_box_extra_points');
                                        if (report_box != null) {
                                            //Ext.getCmp('p_rep_conteiner_extra_points').remove(report_box);
                                            panel_basic.remove(report_box);
                                        }

                                        //url = url + '&height=' + (center.getWidth() - 30)
                                        //extra_point_customers_allocated

                                        var url_rtg = 'pages/extra_point_articul_rating.aspx?campaign_id=' + campaign_id + '&market_id=' + market_id + '&date_st=' + date_st;
                                        var url_alloc = 'pages/extra_point_customers_allocated.aspx?campaign_id=' + campaign_id + '&market_id=' + market_id + '&date_st=' + date_st;

                                        var dp_basic = new Ext.Component({
                                            id: 'rep_box_extra_points',
                                            xtype: 'box',
                                            layout: 'fit',
                                            showMask: true,
                                            autoEl: {
                                                tag: 'iframe',
                                                src: url
                                            }
                                        });
                                        panel_basic.add(dp_basic);

                                        panel_rating.remove(Ext.getCmp('rep_box_extra_points_rating'));

                                        var dp_rating = new Ext.Component({
                                            id: 'rep_box_extra_points_rating',
                                            xtype: 'box',
                                            //layout: 'fit',
                                            showMask: true,
                                            autoEl: {
                                                tag: 'iframe',
                                                src: url_rtg
                                            }
                                        });
                                        panel_rating.add(dp_rating);

                                        panel_allocation.remove(Ext.getCmp('rep_box_extra_points_allocated'));
                                        var dp_allocated = new Ext.Component({
                                            id: 'rep_box_extra_points_allocated',
                                            xtype: 'box',
                                            //layout: 'fit',
                                            showMask: true,
                                            autoEl: {
                                                tag: 'iframe',
                                                src: url_alloc
                                            }
                                        });

                                        panel_allocation.add(dp_allocated);
                                    }
                                }
                            ]
                        }
                    },
                    //tbReports
                    {
                        xtype: 'panel',
                        border: true,
                        layout: 'fit',
                        //id: 'p_rep_conteiner_extra_points',
                        flex: 1,
                        items: [
                            tbReports
                        ]
                    }
                ]

            },
        ]
    });

    center.setActiveTab(tab);
}

var showPersonalOffers = function () {
    var center = Ext.getCmp('pnlCenter');

    var p_personal_offers = Ext.getCmp('p_personal_offers');
    if (p_personal_offers != null) return;

    var comboBox = Ext.create('Ext.form.ComboBox', {
        fieldLabel: 'Магазин',
        store: dict.getStoreMarkets(),
        multiSelect: true,
        queryMode: 'local',
        valueField: 'ShortName',
        displayField: 'MarketName',
        width: 300,
        labelWidth: 50,
        emptyText: 'Всі',
        itemCls: 'make-bold',
        renderTo: Ext.getBody(),
        tpl: Ext.create('Ext.XTemplate',
            '<tpl for=".">',
                '<div class="x-boundlist-item">{MarketName}</div>',
            '</tpl>'
        ),
        displayTpl: Ext.create('Ext.XTemplate',
            '<tpl for=".">',
                '{ShortName};',
            '</tpl>'
        ),
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpts) {
                if (newValue.indexOf('all') > -1 && oldValue.indexOf('all') == -1) {
                    ctrl.setValue(['all'])
                } else {
                    if (oldValue != null) {
                        if (newValue.indexOf('all') > -1 && oldValue.indexOf('all') > -1)
                            ctrl.setValue([]);
                    }
                }
            }
        }

    });

    tab = center.add({
        id: 'p_personal_offers',
        title: 'Персональні пропозиції',
        extend: 'Ext.panel.Panel',
        closable: true,
        layout: 'fit',
        items: {
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                    pack: 'start'
                },
                items: [{
                    xtype: 'panel',
                    height: 36,
                    items: {
                        xtype: 'toolbar',
                        height: 35,
                        items: [{
                                xtype: 'label',
                                text: 'Акції'
                            }, {
                                id: 'cmbCampaigns_personal_offers',
                                xtype: 'combobox',
                                width: 420,
                                store: dict.getStoreCampaigns(2),//st_campaign_extra_points,
                                queryMode: 'local',
                                displayField: 'Name',
                                valueField: 'Id',
                                renderTo: Ext.getBody()
                            }, {
                                xtype: 'tbseparator'
                            }, {
                                xtype: 'label',
                                text: 'На дату:'
                            }, {
                                id: 'dtDateState_personal_offers',
                                xtype: 'datefield',
                                format: "d/m/Y",
                                minDate: new Date(),
                                width: 100,
                                listeners: {
                                    scope: this,
                                    expand: function (field, eOpts) {
                                        //var dtDateState = Ext.getCmp('dtDateState_personal_offers');
                                        var cmbCampaigns = Ext.getCmp('cmbCampaigns_personal_offers');
                                        if (cmbCampaigns != null) {
                                            if (cmbCampaigns.getValue() != null) {
                                                getDisabledDatesById(
                                                    Ext.getCmp('cmbCampaigns_personal_offers').getValue(),
                                                    Ext.getCmp('dtDateState_personal_offers'));
                                            }
                                        }
                                    }
                                }
                            }, {
                                xtype: 'tbseparator'
                            },
                            comboBox,
                            //{
                            //    xtype: 'label',
                            //    text: 'Магазин:'
                            //}, {
                            //    id: 'cmbMarkets_personal_offers',
                            //    xtype: 'combobox',
                            //    width: 200,
                            //    store: dict.getStoreMarkets(),//st_dict_markets,
                            //    queryMode: 'local',
                            //    displayField: 'market_name',
                            //    valueField: 'id',
                            //    renderTo: Ext.getBody()
                            //},
                            {
                                xtype: 'label',
                                text: 'Контрольна група:'
                            }, {
                                xtype: 'checkboxfield',
                                id: 'ch_control_group_personal_offers',
                                name : 'salami'
                            }, {
                                xtype: 'button',
                                width: 100,
                                text: 'Показати',
                                handler: function () {

                                    var url = 'pages/daily_personal_offers.aspx?'

                                    var cmbCampaigns = Ext.getCmp('cmbCampaigns_personal_offers');
                                    var campaign_id = cmbCampaigns.getValue();
                                    if (campaign_id == null) {
                                        Ext.Msg.alert('Увага', 'Акція не вибрана', Ext.emptyFn);
                                        return;
                                    }
                                    url = url + 'campaign_id=' + campaign_id;

                                    var dtDateState = Ext.getCmp('dtDateState_personal_offers');
                                    var date_st = dtDateState.getValue();
                                    if (date_st == null) {
                                        url = url + '&date_st=' + date_st
                                    } else {
                                        date_st = date_st.toLocaleDateString();
                                        date_st = date_st.replace("[\\x00-\\x1F]", "");
                                        url = url + '&date_st=' + date_st
                                    }

                                    //var cmbMarkets = Ext.getCmp('cmbMarkets_personal_offers');
                                    var market_id = comboBox.getValue(); //cmbMarkets.getValue();
                                    if (market_id == null) market_id = 0;
                                    url = url + '&market_id=' + market_id;

                                    var control_group = Ext.getCmp('ch_control_group_personal_offers');
                                    var ctrl = control_group.getValue();
                                    if (ctrl == null) {
                                        ctrl = true;
                                    } 
                                    url = url + '&ctrl=' + ctrl;

                                    var report_box = Ext.getCmp('rep_box_personal_offers');
                                    if (report_box != null) {
                                        Ext.getCmp('p_rep_conteiner_personal_offers').remove(report_box);
                                    }

                                    //url = url + '&height=' + (center.getWidth() - 30)

                                    dynamicPanel = new Ext.Component({
                                        id: 'rep_box_personal_offers',
                                        xtype: 'box',
                                        layout: 'fit',
                                        showMask: true,
                                        autoEl: {
                                            tag: 'iframe',
                                            src: url
                                        }
                                    });
                                    Ext.getCmp('p_rep_conteiner_personal_offers').add(dynamicPanel);
                                }
                            }]
                    }
                }, {
                    xtype: 'panel',
                    layout: 'fit',
                    id: 'p_rep_conteiner_personal_offers',
                    flex: 1
                }]
            }
        //[
        //{
        //    xtype: 'box',
        //    autoEl: {
        //        tag: 'iframe',
        //        src: 'pages/personal_offers/daily_personal_offers.aspx',
        //    }
        //}
        //]
    });

    center.setActiveTab(tab);
}

var showBirthDayUPL = function () {
    var center = Ext.getCmp('pnlCenter');
    var p_birth_day_upl = Ext.getCmp('p_birth_day_upl');
    if (p_birth_day_upl != null) return;

    var comboBox = Ext.create('Ext.form.ComboBox', {
        fieldLabel: 'Магазин',
        store: dict.getStoreMarkets(),
        multiSelect: true,
        queryMode: 'local',
        valueField: 'ShortName',
        displayField: 'MarketName',
        width: 300,
        labelWidth: 50,
        emptyText: 'Всі',
        itemCls: 'make-bold',
        renderTo: Ext.getBody(),
        tpl: Ext.create('Ext.XTemplate',
            '<tpl for=".">',
                '<div class="x-boundlist-item">{MarketName}</div>',
            '</tpl>'
        ),
        displayTpl: Ext.create('Ext.XTemplate',
            '<tpl for=".">',
                '{ShortName};',
            '</tpl>'
        ),
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpts) {
                if (newValue.indexOf('all') > -1 && oldValue.indexOf('all') == -1) {
                    ctrl.setValue(['all'])
                } else {
                    if (oldValue != null) {
                        if (newValue.indexOf('all') > -1 && oldValue.indexOf('all') > -1)
                            ctrl.setValue([]);
                    }
                }
            }
        }

    });

    tab = center.add({
        id: 'p_birth_day_upl',
        title: 'МК "До дня народження УПЛ"',
        extend: 'Ext.panel.Panel',
        closable: true,
        layout: 'fit',
        items: {
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'start'
            },
            items: [{
                xtype: 'panel',
                height: 36,
                items: {
                    xtype: 'toolbar',
                    height: 35,
                    items: [{
                        xtype: 'label',
                        text: 'Дата початку:'
                    }, {
                        id: 'dtDST_BirthDayUPL_Start',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        minDate: new Date(),
                        width: 110
                    }, {
                        xtype: 'label',
                        text: 'Дата кінця:'
                    }, {
                        id: 'dtDST_BirthDayUPL_End',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        minDate: new Date(),
                        width: 110
                    }, {
                        xtype: 'tbseparator'
                    }, comboBox,
                    //{
                    //    xtype: 'label',
                    //    text: 'Магазин:'
                    //}, {
                    //    id: 'cmbMarkets_BirthDayUPL',
                    //    xtype: 'combobox',
                    //    width: 250,
                    //    store: dict.getStoreMarkets(),
                    //    queryMode: 'local',
                    //    displayField: 'market_name',
                    //    valueField: 'id',
                    //    renderTo: Ext.getBody()
                    //},
                    {
                        xtype: 'tbseparator'
                    }, {
                        xtype: 'label',
                        text: 'По маркету:'
                    }, {
                        xtype: 'checkboxfield',
                        id: 'ch_inMarketBirthDayUPL',
                        name: 'inMarketBirthDayUPL'
                    }, {
                        xtype: 'tbseparator'
                    }, {
                        xtype: 'button',
                        width: 100,
                        text: 'Показати',
                        handler: function () {

                            var url = 'pages/BirthDayUPL.aspx?'

                            var dtStart = Ext.getCmp('dtDST_BirthDayUPL_Start');
                            var date_start = dtStart.getValue();
                            if (date_start == null) {
                                url = url + '&date_start=' + date_start
                            } else {
                                date_start = date_start.toLocaleDateString();
                                url = url + '&date_start=' + date_start
                            }

                            var dtEnd = Ext.getCmp('dtDST_BirthDayUPL_End');
                            var date_end = dtEnd.getValue();
                            if (date_end == null) {
                                url = url + '&date_end=' + date_end
                            } else {
                                date_end = date_end.toLocaleDateString();
                                url = url + '&date_end=' + date_end
                            }

                            //var cmbMarkets = Ext.getCmp('cmbMarkets_BirthDayUPL');
                            var market_id = comboBox.getValue();
                            if (market_id == null) market_id = 0;
                            url = url + '&market_id=' + market_id;

                            var inmarket = Ext.getCmp('ch_inMarketBirthDayUPL');
                            var im = inmarket.getValue();
                            if (im == null) {
                                im = true;
                            }
                            url = url + '&im=' + im;

                            var report_box = Ext.getCmp('rep_box_BirthDayUPL');
                            if (report_box != null) {
                                Ext.getCmp('p_rep_conteiner_BirthDayUPL').remove(report_box);
                            }

                            //url = url + '&height=' + (center.getWidth() - 30)

                            dynamicPanel = new Ext.Component({
                                id: 'rep_box_BirthDayUPL',
                                xtype: 'box',
                                layout: 'fit',
                                showMask: true,
                                autoEl: {
                                    tag: 'iframe',
                                    src: url
                                }
                            });
                            Ext.getCmp('p_rep_conteiner_BirthDayUPL').add(dynamicPanel);
                        }
                    }]
                }
            }, {
                xtype: 'panel',
                layout: 'fit',
                id: 'p_rep_conteiner_BirthDayUPL',
                flex: 1
            }]
        }
    });

    center.setActiveTab(tab);
}

var showBirthDayChildrenUPL = function () {
    var center = Ext.getCmp('pnlCenter');
    var p_birth_day_upl = Ext.getCmp('p_birth_day_children_upl');
    if (p_birth_day_upl != null) return;

    var comboBox = Ext.create('Ext.form.ComboBox', {
        fieldLabel: 'Магазин',
        store: dict.getStoreMarkets(),
        multiSelect: true,
        queryMode: 'local',
        valueField: 'ShortName',
        displayField: 'MarketName',
        width: 300,
        labelWidth: 50,
        emptyText: 'Всі',
        itemCls: 'make-bold',
        renderTo: Ext.getBody(),
        tpl: Ext.create('Ext.XTemplate',
            '<tpl for=".">',
                '<div class="x-boundlist-item">{MarketName}</div>',
            '</tpl>'
        ),
        displayTpl: Ext.create('Ext.XTemplate',
            '<tpl for=".">',
                '{ShortName};',
            '</tpl>'
        ),
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpts) {
                if (newValue.indexOf('all') > -1 && oldValue.indexOf('all') == -1) {
                    ctrl.setValue(['all'])
                } else {
                    if (oldValue != null) {
                        if (newValue.indexOf('all') > -1 && oldValue.indexOf('all') > -1)
                            ctrl.setValue([]);
                    }
                }
            }
        }

    });

    tab = center.add({
        id: 'p_birth_day_children_upl',
        title: 'МК "До дня народження ДІТЕЙ УПЛ"',
        extend: 'Ext.panel.Panel',
        closable: true,
        layout: 'fit',
        items: {
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'start'
            },
            items: [{
                xtype: 'panel',
                height: 36,
                items: {
                    xtype: 'toolbar',
                    height: 35,
                    items: [{
                        xtype: 'label',
                        text: 'Дата початку:'
                    }, {
                        id: 'dtDST_BirthDayChildrenUPL_Start',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        minDate: new Date(),
                        width: 110
                    }, {
                        xtype: 'label',
                        text: 'Дата кінця:'
                    }, {
                        id: 'dtDST_BirthDayChildrenUPL_End',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        minDate: new Date(),
                        width: 110
                    }, {
                        xtype: 'tbseparator'
                    }, {
                        xtype: 'label',
                        text: 'Магазин:'
                    },
                    //{
                    //    id: 'cmbMarkets_BirthDayChildrenUPL',
                    //    xtype: 'combobox',
                    //    width: 250,
                    //    store: dict.getStoreMarkets(),
                    //    queryMode: 'local',
                    //    displayField: 'market_name',
                    //    valueField: 'id',
                    //    renderTo: Ext.getBody()
                    //}, {
                    //    xtype: 'tbseparator'
                    //},
                    comboBox,
                    {
                        xtype: 'label',
                        text: 'По маркету:'
                    }, {
                        xtype: 'checkboxfield',
                        id: 'ch_inMarketBirthDayChildrenUPL',
                        name: 'inMarketBirthDayUPL'
                    },
                    {
                        xtype: 'tbseparator'
                    }, {
                        xtype: 'button',
                        width: 100,
                        text: 'Показати',
                        handler: function () {

                            var url = 'pages/BirthDayChildrenUPL.aspx?'

                            var dtStart = Ext.getCmp('dtDST_BirthDayChildrenUPL_Start');
                            var date_start = dtStart.getValue();
                            if (date_start == null) {
                                url = url + '&date_start=' + date_start
                            } else {
                                date_start = date_start.toLocaleDateString();
                                url = url + '&date_start=' + date_start
                            }

                            var dtEnd = Ext.getCmp('dtDST_BirthDayChildrenUPL_End');
                            var date_end = dtEnd.getValue();
                            if (date_end == null) {
                                url = url + '&date_end=' + date_end
                            } else {
                                date_end = date_end.toLocaleDateString();
                                url = url + '&date_end=' + date_end
                            }

                            var cmbMarkets = Ext.getCmp('cmbMarkets_BirthDayChildrenUPL');
                            var market_id = comboBox.getValue(); //cmbMarkets.getValue();
                            if (market_id == null) market_id = 0;
                            url = url + '&market_id=' + market_id;

                            var inmarket = Ext.getCmp('ch_inMarketBirthDayChildrenUPL');
                            var im = inmarket.getValue();
                            if (im == null) {
                                im = true;
                            }
                            url = url + '&im=' + im;

                            var report_box = Ext.getCmp('rep_box_BirthDayChildrenUPL');
                            if (report_box != null) {
                                Ext.getCmp('p_rep_conteiner_BirthDayChildrenUPL').remove(report_box);
                            }

                            //url = url + '&height=' + (center.getWidth() - 30)

                            dynamicPanel = new Ext.Component({
                                id: 'rep_box_BirthDayChildrenUPL',
                                xtype: 'box',
                                layout: 'fit',
                                showMask: true,
                                autoEl: {
                                    tag: 'iframe',
                                    src: url
                                }
                            });
                            Ext.getCmp('p_rep_conteiner_BirthDayChildrenUPL').add(dynamicPanel);
                        }
                    }]
                }
            }, {
                xtype: 'panel',
                layout: 'fit',
                id: 'p_rep_conteiner_BirthDayChildrenUPL',
                flex: 1
            }]
        }
        //[
        //{
        //    xtype: 'box',
        //    autoEl: {
        //        tag: 'iframe',
        //        src: 'pages/personal_offers/daily_personal_offers.aspx',
        //    }
        //}
        //]
    });

    center.setActiveTab(tab);
}

var show50pointsReport = function () {
    var center = Ext.getCmp('pnlCenter');
    var p_birth_day_upl = Ext.getCmp('p_birth_day_children_upl');
    if (p_birth_day_upl != null) return;

    tab = center.add({
        id: 'p_50points_reports',
        title: 'Результати акцій "50 і більше балів"',
        extend: 'Ext.panel.Panel',
        closable: true,
        layout: 'fit',
        items: {
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'start'
            },
            items: [{
                xtype: 'panel',
                height:38,
                items: {
                    xtype: 'toolbar',
                    height: 36,
                    items: [{
                        xtype: 'label',
                        text: 'Магазин:'
                    }, {
                        id: 'cmbMarkets_50points',
                        xtype: 'combobox',
                        width: 250,
                        store: dict.getStoreMarkets(),
                        queryMode: 'local',
                        displayField: 'MarketName',
                        valueField: 'Id',
                        renderTo: Ext.getBody()
                    }, {
                        xtype: 'tbseparator'
                    },
                    //{
                    //    xtype: 'label',
                    //    text: 'По мережі:'
                    //}, {
                    //    xtype: 'checkboxfield',
                    //    id: 'ch_inMarket50points',
                    //    name: 'inMarket50points'
                    //},
                    {
                        xtype: 'label',
                        text: 'По контрольній групі:'
                    }, {
                        xtype: 'checkboxfield',
                        id: 'ch_ctrl_group_50points',
                        name: 'ch_ctrl_group_50points'
                    }, {
                        xtype: 'tbseparator'
                    }, {
                        xtype: 'button',
                        width: 100,
                        text: 'Показати',
                        handler: function () {

                            var hi = Ext.getCmp('h_p50p_campaign_id');
                            var id = hi.getValue();
                            if (id == "") return;
                            //alert(id);

                            var url = 'pages/p50points_reports.aspx?'
                            url = url + 'campaign_id=' + id;

                            var cmbMarkets = Ext.getCmp('cmbMarkets_50points');
                            var market_id = cmbMarkets.getValue();
                            if (market_id == null) market_id = 0;
                            url = url + '&market_id=' + market_id;

                            //var inmarket = Ext.getCmp('ch_inMarket50points');
                            //var im = inmarket.getValue();
                            //if (im == null) {
                            //    im = true;
                            //}
                            //url = url + '&im=' + im;

                            var control_group = Ext.getCmp('ch_ctrl_group_50points');
                            var ctrl = control_group.getValue();
                            if (ctrl == null) {
                                ctrl = true;
                            }
                            url = url + '&ctrl=' + ctrl;

                            var report_box = Ext.getCmp('rep_box_50points');
                            if (report_box != null) {
                                Ext.getCmp('p_rep_conteiner_50points').remove(report_box);
                            }

                            //url = url + '&height=' + (center.getWidth() - 30)

                            //var ws = Ext.getCmp('win_show_pause');
                            //ws.show();

                            dynamicPanel = new Ext.Component({
                                id: 'rep_box_50points',
                                xtype: 'box',
                                layout: 'fit',
                                showMask: true,
                                border: false,
                                autoEl: {
                                    tag: 'iframe',
                                    src: url,
                                    scripts: true
                                    //success: function () { alert(); }
                                }
                            });

                            Ext.getCmp('p_rep_conteiner_50points').add(dynamicPanel);
                        }
                    }]
                }
            },
            {
                xtype: 'panel',
                flex: 1,
                //layout: 'fit',
                //height: 100,
                border: false,
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'panel',
                    width: 400,
                    title: "Кампанії типу '50 і більше балів'",
                    layout: 'fit',
                    border: false,
                    items: 
                        [
                            { xtype: 'hiddenfield', id: 'h_p50p_campaign_id', border: false, },
                            {
                                xtype: 'panel',
                                border: false,
                                items: get50PointsGrid()
                            },
                        ]
                }, {
                    xtype: 'panel',
                    layout: 'fit',
                    id: 'p_rep_conteiner_50points',
                    flex: 1
                   }]
            }, {
                xtype: 'panel', height: 20
            }
        ]}
    });
}