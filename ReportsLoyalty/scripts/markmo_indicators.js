﻿/// <reference path="D:\develops\ReportsLoyalty\ReportsLoyalty\pages/BirthDayUPL.aspx" />

var getCampaignListModel = function () {

}

var showExtraPoints = function () {
    var center = Ext.getCmp('pnlCenter');

    var p_extra_points = Ext.getCmp('p_extra_points');
    if (p_extra_points != null) return;

    //var a = getDisabledDatesById(46);
    tab = center.add({
        id:'p_extra_points',
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
                            width: 350,
                            store: dict.getStoreCampaigns(1),//st_campaign_extra_points,
                            queryMode: 'local',
                            valueField: 'id',
                            displayField: 'name',
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
                        }, {
                            xtype: 'label',
                            text: 'Магазин:'
                        }, {
                            id: 'cmbMarkets',
                            xtype: 'combobox',
                            width: 250,
                            store: dict.getStoreMarkets(),//st_dict_markets,
                            queryMode: 'local',
                            displayField: 'market_name',
                            valueField: 'id',
                            renderTo: Ext.getBody()
                        }, {
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

                                var cmbMarkets = Ext.getCmp('cmbMarkets');
                                var market_id = cmbMarkets.getValue();
                                if (market_id == null) market_id = 0;
                                url = url + '&market_id=' + market_id;

                                var report_box = Ext.getCmp('rep_box_extra_points');
                                if (report_box != null) {
                                    Ext.getCmp('p_rep_conteiner_extra_points').remove(report_box);
                                }

                                url = url + '&height=' + (center.getWidth() - 30)

                                dynamicPanel = new Ext.Component({
                                    id: 'rep_box_extra_points',
                                    xtype: 'box',
                                    layout: 'fit',
                                    showMask: true,
                                    autoEl: {
                                        tag: 'iframe',
                                        src: url
                                    }
                                });
                                Ext.getCmp('p_rep_conteiner_extra_points').add(dynamicPanel);
                            }
                        }
                    ]
                }
            },
            {
                xtype: 'panel',
                layout: 'fit',
                id: 'p_rep_conteiner_extra_points',
                flex: 1
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
                                displayField: 'name',
                                valueField: 'id',
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
                            }, {
                                xtype: 'label',
                                text: 'Магазин:'
                            }, {
                                id: 'cmbMarkets_personal_offers',
                                xtype: 'combobox',
                                width: 200,
                                store: dict.getStoreMarkets(),//st_dict_markets,
                                queryMode: 'local',
                                displayField: 'market_name',
                                valueField: 'id',
                                renderTo: Ext.getBody()
                            }, {
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

                                    var cmbMarkets = Ext.getCmp('cmbMarkets_personal_offers');
                                    var market_id = cmbMarkets.getValue();
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
                    }, {
                        xtype: 'label',
                        text: 'Магазин:'
                    }, {
                        id: 'cmbMarkets_BirthDayUPL',
                        xtype: 'combobox',
                        width: 250,
                        store: dict.getStoreMarkets(),
                        queryMode: 'local',
                        displayField: 'market_name',
                        valueField: 'id',
                        renderTo: Ext.getBody()
                    }, {
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

                            var cmbMarkets = Ext.getCmp('cmbMarkets_BirthDayUPL');
                            var market_id = cmbMarkets.getValue();
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
                    }, {
                        id: 'cmbMarkets_BirthDayChildrenUPL',
                        xtype: 'combobox',
                        width: 250,
                        store: dict.getStoreMarkets(),
                        queryMode: 'local',
                        displayField: 'market_name',
                        valueField: 'id',
                        renderTo: Ext.getBody()
                    }, {
                        xtype: 'tbseparator'
                    }, {
                        xtype: 'label',
                        text: 'По маркету:'
                    }, {
                        xtype: 'checkboxfield',
                        id: 'ch_inMarketBirthDayChildrenUPL',
                        name: 'inMarketBirthDayUPL'
                    }, {
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
                            var market_id = cmbMarkets.getValue();
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
                height: 36,
                items: {
                    xtype: 'toolbar',
                    height: 35,
                    items: [{
                        xtype: 'label',
                        text: 'Магазин:'
                    }, {
                        id: 'cmbMarkets_50points',
                        xtype: 'combobox',
                        width: 250,
                        store: dict.getStoreMarkets(),
                        queryMode: 'local',
                        displayField: 'market_name',
                        valueField: 'id',
                        renderTo: Ext.getBody()
                    }, {
                        xtype: 'tbseparator'
                    }, {
                        xtype: 'label',
                        text: 'По маркету:'
                    }, {
                        xtype: 'checkboxfield',
                        id: 'ch_inMarket50points',
                        name: 'inMarket50points'
                    }, {
                        xtype: 'tbseparator'
                    }, {
                        xtype: 'button',
                        width: 100,
                        text: 'Показати',
                        handler: function () {

                            var url = 'pages/BirthDayChildrenUPL.aspx?'

                            var cmbMarkets = Ext.getCmp('cmbMarkets_BirthDayChildrenUPL');
                            var market_id = cmbMarkets.getValue();
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

    });
}