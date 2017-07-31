/// <reference path="D:\develops\ReportsLoyalty\ReportsLoyalty\pages/BirthDayUPL.aspx" />

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

                                var url = 'pages/extra_points/extra_point_indicators.aspx?'

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

                                    var url = 'pages/personal_offers/daily_personal_offers.aspx?'

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
///////////////////////////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////
var showParticipantBySex = function () {
    var center = Ext.getCmp('pnlCenter');

    tab = center.add({
        title: 'ЕКСТРА БАЛИ',
        extend: 'Ext.panel.Panel',
        closable: true,
        layout: 'fit',
        items: [{
            xtype: 'box',
            autoEl: {
                tag: 'iframe',
                src: 'pages/sale_with_extra_point.aspx',
            },
        }]
    });

    center.setActiveTab(tab);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
var showBasicIndicators = function () {
    var center = Ext.getCmp('pnlCenter');

    var p_personal_offers = Ext.getCmp('p_basic_indicators');
    if (p_personal_offers != null) return;

    tab = center.add({
        id: 'p_basic_indicators',
        title: 'Загальні показники',
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
                        id: 'dtDST_start_basic_indicators',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        minDate: new Date(),
                        width: 110
                    }, {
                        xtype: 'label',
                        text: 'Дата кінця:'
                    }, {
                        id: 'dtDST_end_basic_indicators',
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
                        id: 'cmb_markets_basic_indicators',
                        xtype: 'combobox',
                        width: 250,
                        store: dict.getStoreMarkets(),
                        queryMode: 'local',
                        displayField: 'market_name',
                        valueField: 'id',
                        renderTo: Ext.getBody()
                    }, {
                        xtype: 'button',
                        width: 100,
                        text: 'Показати',
                        handler: function () {

                            var url = 'pages/basic_indicators.aspx?'

                            var dtStart = Ext.getCmp('dtDST_start_basic_indicators');
                            var date_start = dtStart.getValue();
                            if (date_start == null) {
                                url = url + '&date_start=' + date_start
                            } else {
                                date_start = date_start.toLocaleDateString();
                                url = url + '&date_start=' + date_start
                            }

                            var dtEnd = Ext.getCmp('dtDST_end_basic_indicators');
                            var date_end = dtEnd.getValue();
                            if (date_end == null) {
                                url = url + '&date_end=' + date_end
                            } else {
                                date_end = date_end.toLocaleDateString();
                                url = url + '&date_end=' + date_end
                            }

                            var cmbMarkets = Ext.getCmp('cmb_markets_basic_indicators');
                            var market_id = cmbMarkets.getValue();
                            if (market_id == null) market_id = 0;
                            url = url + '&market_id=' + market_id;

                            var report_box = Ext.getCmp('rep_box_basic_indicators');
                            if (report_box != null) {
                                Ext.getCmp('p_rep_conteiner_basic_indicators').remove(report_box);
                            }

                            //url = url + '&height=' + (center.getWidth() - 30)

                            dynamicPanel = new Ext.Component({
                                id: 'rep_box_basic_indicators',
                                xtype: 'box',
                                layout: 'fit',
                                showMask: true,
                                autoEl: {
                                    tag: 'iframe',
                                    src: url
                                }
                            });
                            Ext.getCmp('p_rep_conteiner_basic_indicators').add(dynamicPanel);
                        }
                    }]
                }
            }, {
                xtype: 'panel',
                layout: 'fit',
                id: 'p_rep_conteiner_basic_indicators',
                flex: 1
            }]
        }
    });

    center.setActiveTab(tab);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
var showProfileParticipant = function () {
    var center = Ext.getCmp('pnlCenter');

    var p_personal_offers = Ext.getCmp('p_profile_participant');
    if (p_personal_offers != null) return;

    tab = center.add({
        id: 'p_profile_participant',
        title: 'Профіль учасників',
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
                        id: 'dtDST_start_profile_participant',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        minDate: new Date(),
                        width: 110
                    }, {
                        xtype: 'label',
                        text: 'Дата кінця:'
                    }, {
                        id: 'dtDST_end_profile_participant',
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
                        id: 'cmb_markets_profile_participant',
                        xtype: 'combobox',
                        width: 250,
                        store: dict.getStoreMarkets(),
                        queryMode: 'local',
                        displayField: 'market_name',
                        valueField: 'id',
                        renderTo: Ext.getBody()
                    }, {
                        xtype: 'button',
                        width: 100,
                        text: 'Показати',
                        handler: function () {

                            var url = 'pages/profile_participant/profile_participant.aspx?'

                            var dtStart = Ext.getCmp('dtDST_start_profile_participant');
                            var date_start = dtStart.getValue();
                            if (date_start == null) {
                                url = url + '&date_start=' + date_start
                            } else {
                                date_start = date_start.toLocaleDateString();
                                url = url + '&date_start=' + date_start
                            }

                            var dtEnd = Ext.getCmp('dtDST_end_profile_participant');
                            var date_end = dtEnd.getValue();
                            if (date_end == null) {
                                url = url + '&date_end=' + date_end
                            } else {
                                date_end = date_end.toLocaleDateString();
                                url = url + '&date_end=' + date_end
                            }

                            var cmbMarkets = Ext.getCmp('cmb_markets_profile_participant');
                            var market_id = cmbMarkets.getValue();
                            if (market_id == null) market_id = 0;
                            url = url + '&market_id=' + market_id;

                            var report_box = Ext.getCmp('rep_box_profile_participant');
                            if (report_box != null) {
                                Ext.getCmp('p_rep_conteiner_profile_participant').remove(report_box);
                            }

                            //url = url + '&height=' + (center.getWidth() - 30)

                            dynamicPanel = new Ext.Component({
                                id: 'rep_box_profile_participant',
                                xtype: 'box',
                                layout: 'fit',
                                showMask: true,
                                autoEl: {
                                    tag: 'iframe',
                                    src: url
                                }
                            });
                            Ext.getCmp('p_rep_conteiner_profile_participant').add(dynamicPanel);
                        }
                    }]
                }
            }, {
                xtype: 'panel',
                layout: 'fit',
                id: 'p_rep_conteiner_profile_participant',
                flex: 1
            }]
        }
    });

    center.setActiveTab(tab);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
var showUplByDay = function () {
    var center = Ext.getCmp('pnlCenter');

    var p_personal_offers = Ext.getCmp('p_upl_byday');
    if (p_personal_offers != null) return;

    tab = center.add({
        id: 'p_upl_byday',
        title: 'Розподіл УПЛ по кількості днів з покупками',
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
                        id: 'dtDST_start_upl_byday',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        minDate: new Date(),
                        value: "23/07/2016",
                        width: 110
                    }, {
                        xtype: 'label',
                        text: 'Дата кінця:'
                    }, {
                        id: 'dtDST_end_upl_byday',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        //minDate: new Date(),
                        value: new Date(),
                        width: 110
                    }, {
                        xtype: 'tbseparator'
                    }, {
                        xtype: 'label',
                        text: 'Магазин:'
                    }, {
                        id: 'cmb_markets_upl_byday',
                        xtype: 'combobox',
                        width: 250,
                        store: dict.getStoreMarkets(),
                        queryMode: 'local',
                        displayField: 'market_name',
                        valueField: 'id',
                        renderTo: Ext.getBody()
                    }, {
                        xtype: 'button',
                        width: 100,
                        text: 'Показати',
                        handler: function () {

                            var url = 'pages/upl_byday/upl_trade_byday.aspx?'

                            var dtStart = Ext.getCmp('dtDST_start_upl_byday');
                            var date_start = dtStart.getValue();
                            if (date_start == null) {
                                url = url + '&date_start=' + date_start
                            } else {
                                date_start = date_start.toLocaleDateString();
                                url = url + '&date_start=' + date_start
                            }

                            var dtEnd = Ext.getCmp('dtDST_end_upl_byday');
                            var date_end = dtEnd.getValue();
                            if (date_end == null) {
                                url = url + '&date_end=' + date_end
                            } else {
                                date_end = date_end.toLocaleDateString();
                                url = url + '&date_end=' + date_end
                            }

                            var cmbMarkets = Ext.getCmp('cmb_markets_upl_byday');
                            var market_id = cmbMarkets.getValue();
                            if (market_id == null) market_id = 0;
                            url = url + '&market_id=' + market_id;

                            var report_box = Ext.getCmp('rep_box_upl_byday');
                            if (report_box != null) {
                                Ext.getCmp('p_rep_conteiner_upl_byday').remove(report_box);
                            }

                            //url = url + '&height=' + (center.getWidth() - 30)

                            dynamicPanel = new Ext.Component({
                                id: 'rep_box_upl_byday',
                                xtype: 'box',
                                layout: 'fit',
                                showMask: true,
                                autoEl: {
                                    tag: 'iframe',
                                    src: url
                                }
                            });
                            Ext.getCmp('p_rep_conteiner_upl_byday').add(dynamicPanel);
                        }
                    }]
                }
            }, {
                xtype: 'panel',
                layout: 'fit',
                id: 'p_rep_conteiner_upl_byday',
                flex: 1
            }]
        }
    });

    center.setActiveTab(tab);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
var showUplVisit = function () {
    var center = Ext.getCmp('pnlCenter');

    var p_personal_offers = Ext.getCmp('p_upl_visit');
    if (p_personal_offers != null) return;

    tab = center.add({
        id: 'p_upl_visit',
        title: 'Розподіл УПЛ по кількості днів з покупками',
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
                        id: 'dtDST_start_upl_visit',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        minDate: new Date(),
                        value: "23/07/2016",
                        width: 110
                    }, {
                        xtype: 'label',
                        text: 'Дата кінця:'
                    }, {
                        id: 'dtDST_end_upl_visit',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        //minDate: new Date(),
                        value: new Date(),
                        width: 110
                    }, {
                        xtype: 'tbseparator'
                    }, {
                        xtype: 'label',
                        text: 'Магазин:'
                    }, {
                        id: 'cmb_markets_upl_visit',
                        xtype: 'combobox',
                        width: 250,
                        store: dict.getStoreMarkets(),
                        queryMode: 'local',
                        displayField: 'market_name',
                        valueField: 'id',
                        renderTo: Ext.getBody()
                    }, {
                        xtype: 'button',
                        width: 100,
                        text: 'Показати',
                        handler: function () {

                            var url = 'pages/upl_visits/upl_visits.aspx?'

                            var dtStart = Ext.getCmp('dtDST_start_upl_visit');
                            var date_start = dtStart.getValue();
                            if (date_start == null) {
                                url = url + '&date_start=' + date_start
                            } else {
                                date_start = date_start.toLocaleDateString();
                                url = url + '&date_start=' + date_start
                            }

                            var dtEnd = Ext.getCmp('dtDST_end_upl_visit');
                            var date_end = dtEnd.getValue();
                            if (date_end == null) {
                                url = url + '&date_end=' + date_end
                            } else {
                                date_end = date_end.toLocaleDateString();
                                url = url + '&date_end=' + date_end
                            }

                            var cmbMarkets = Ext.getCmp('cmb_markets_upl_visit');
                            var market_id = cmbMarkets.getValue();
                            if (market_id == null) market_id = 0;
                            url = url + '&market_id=' + market_id;

                            var report_box = Ext.getCmp('rep_box_upl_visit');
                            if (report_box != null) {
                                Ext.getCmp('p_rep_conteiner_upl_visit').remove(report_box);
                            }

                            //url = url + '&height=' + (center.getWidth() - 30)

                            dynamicPanel = new Ext.Component({
                                id: 'rep_box_upl_visit',
                                xtype: 'box',
                                layout: 'fit',
                                showMask: true,
                                autoEl: {
                                    tag: 'iframe',
                                    src: url
                                }
                            });
                            Ext.getCmp('p_rep_conteiner_upl_visit').add(dynamicPanel);
                        }
                    }]
                }
            }, {
                xtype: 'panel',
                layout: 'fit',
                id: 'p_rep_conteiner_upl_visit',
                flex: 1
            }]
        }
    });

    center.setActiveTab(tab);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
var showUplSUM = function () {
    var center = Ext.getCmp('pnlCenter');

    var p_personal_offers = Ext.getCmp('p_upl_sum');
    if (p_personal_offers != null) return;

    tab = center.add({
        id: 'p_upl_sum',
        title: 'Розподіл УПЛ по кількості днів з покупками',
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
                        id: 'dtDST_start_upl_sum',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        minDate: new Date(),
                        value: "23/07/2016",
                        width: 110
                    }, {
                        xtype: 'label',
                        text: 'Дата кінця:'
                    }, {
                        id: 'dtDST_end_upl_sum',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        //minDate: new Date(),
                        value: new Date(),
                        width: 110
                    }, {
                        xtype: 'tbseparator'
                    }, {
                        xtype: 'label',
                        text: 'Магазин:'
                    }, {
                        id: 'cmb_markets_upl_sum',
                        xtype: 'combobox',
                        width: 250,
                        store: dict.getStoreMarkets(),
                        queryMode: 'local',
                        displayField: 'market_name',
                        valueField: 'id',
                        renderTo: Ext.getBody()
                    }, {
                        xtype: 'button',
                        width: 100,
                        text: 'Показати',
                        handler: function () {

                            var url = 'pages/upl_sum/upl_sum.aspx?'

                            var dtStart = Ext.getCmp('dtDST_start_upl_sum');
                            var date_start = dtStart.getValue();
                            if (date_start == null) {
                                url = url + '&date_start=' + date_start
                            } else {
                                date_start = date_start.toLocaleDateString();
                                url = url + '&date_start=' + date_start
                            }

                            var dtEnd = Ext.getCmp('dtDST_end_upl_sum');
                            var date_end = dtEnd.getValue();
                            if (date_end == null) {
                                url = url + '&date_end=' + date_end
                            } else {
                                date_end = date_end.toLocaleDateString();
                                url = url + '&date_end=' + date_end
                            }

                            var cmbMarkets = Ext.getCmp('cmb_markets_upl_sum');
                            var market_id = cmbMarkets.getValue();
                            if (market_id == null) market_id = 0;
                            url = url + '&market_id=' + market_id;

                            var report_box = Ext.getCmp('rep_box_upl_sum');
                            if (report_box != null) {
                                Ext.getCmp('p_rep_conteiner_upl_sum').remove(report_box);
                            }

                            //url = url + '&height=' + (center.getWidth() - 30)

                            dynamicPanel = new Ext.Component({
                                id: 'rep_box_upl_sum',
                                xtype: 'box',
                                layout: 'fit',
                                showMask: true,
                                autoEl: {
                                    tag: 'iframe',
                                    src: url
                                }
                            });
                            Ext.getCmp('p_rep_conteiner_upl_sum').add(dynamicPanel);
                        }
                    }]
                }
            }, {
                xtype: 'panel',
                layout: 'fit',
                id: 'p_rep_conteiner_upl_sum',
                flex: 1
            }]
        }
    });

    center.setActiveTab(tab);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
var showProgramIndicators = function () {
    var center = Ext.getCmp('pnlCenter');

    var p_personal_offers = Ext.getCmp('p_program_indicators');
    if (p_personal_offers != null) return;

    tab = center.add({
        id: 'p_program_indicators',
        title: 'Середні показники програми',
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
                        id: 'dtDST_start_program_indicators',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        minDate: new Date(),
                        value: "23/07/2016",
                        width: 110
                    }, {
                        xtype: 'label',
                        text: 'Дата кінця:'
                    }, {
                        id: 'dtDST_end_program_indicators',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        //minDate: new Date(),
                        value: new Date(),
                        width: 110
                    }, {
                        xtype: 'tbseparator'
                    }, {
                        xtype: 'label',
                        text: 'Магазин:'
                    }, {
                        id: 'cmb_markets_program_indicators',
                        xtype: 'combobox',
                        width: 250,
                        store: dict.getStoreMarkets(),
                        queryMode: 'local',
                        displayField: 'market_name',
                        valueField: 'id',
                        renderTo: Ext.getBody()
                    }, {
                        xtype: 'button',
                        width: 100,
                        text: 'Показати',
                        handler: function () {

                            var url = 'pages/program_indicators/page_program_indicators.aspx?'

                            var dtStart = Ext.getCmp('dtDST_start_program_indicators');
                            var date_start = dtStart.getValue();
                            if (date_start == null) {
                                url = url + '&date_start=' + date_start
                            } else {
                                date_start = date_start.toLocaleDateString();
                                url = url + '&date_start=' + date_start
                            }

                            var dtEnd = Ext.getCmp('dtDST_end_program_indicators');
                            var date_end = dtEnd.getValue();
                            if (date_end == null) {
                                url = url + '&date_end=' + date_end
                            } else {
                                date_end = date_end.toLocaleDateString();
                                url = url + '&date_end=' + date_end
                            }

                            var cmbMarkets = Ext.getCmp('cmb_markets_program_indicators');
                            var market_id = cmbMarkets.getValue();
                            if (market_id == null) market_id = 0;
                            url = url + '&market_id=' + market_id;

                            var report_box = Ext.getCmp('rep_box_program_indicators');
                            if (report_box != null) {
                                Ext.getCmp('p_rep_conteiner_program_indicators').remove(report_box);
                            }

                            //url = url + '&height=' + (center.getWidth() - 30)

                            dynamicPanel = new Ext.Component({
                                id: 'rep_box_program_indicators',
                                xtype: 'box',
                                layout: 'fit',
                                showMask: true,
                                autoEl: {
                                    tag: 'iframe',
                                    src: url
                                }
                            });
                            Ext.getCmp('p_rep_conteiner_program_indicators').add(dynamicPanel);
                        }
                    }]
                }
            }, {
                xtype: 'panel',
                layout: 'fit',
                id: 'p_rep_conteiner_program_indicators',
                flex: 1
            }]
        }
    });

    center.setActiveTab(tab);
}
/* ------------------------------------------------------------------------------------------------------*/
var showCountersDocsAndSell = function () {
    var center = Ext.getCmp('pnlCenter');

    var p_personal_offers = Ext.getCmp('p_counters_docs_and_sell');
    if (p_personal_offers != null) return;

    tab = center.add({
        id: 'p_counters_docs_and_sell',
        title: 'Прохідність',
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
                        id: 'dtDST_start_counters_docs',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        minDate: new Date(),
                        value: "23/07/2016",
                        width: 110
                    }, {
                        xtype: 'label',
                        text: 'Дата кінця:'
                    }, {
                        id: 'dtDST_end_counters_docs',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        //minDate: new Date(),
                        value: new Date(),
                        width: 110
                    }, {
                        xtype: 'tbseparator'
                    }, {
                        xtype: 'label',
                        text: 'Магазин:'
                    }, {
                        id: 'cmb_markets_counters_docs',
                        xtype: 'combobox',
                        width: 250,
                        store: dict.getStoreMarkets(),
                        queryMode: 'local',
                        displayField: 'market_name',
                        valueField: 'id',
                        renderTo: Ext.getBody()
                    }, {
                        xtype: 'button',
                        width: 100,
                        text: 'Показати',
                        handler: function () {

                            var url = 'pages/CountersDocsAndSell.aspx?'

                            var dtStart = Ext.getCmp('dtDST_start_counters_docs');
                            var date_start = dtStart.getValue();
                            if (date_start == null) {
                                url = url + '&date_start=' + date_start
                            } else {
                                date_start = date_start.toLocaleDateString();
                                url = url + '&date_start=' + date_start
                            }

                            var dtEnd = Ext.getCmp('dtDST_end_counters_docs');
                            var date_end = dtEnd.getValue();
                            if (date_end == null) {
                                url = url + '&date_end=' + date_end
                            } else {
                                date_end = date_end.toLocaleDateString();
                                url = url + '&date_end=' + date_end
                            }

                            var cmbMarkets = Ext.getCmp('cmb_markets_counters_docs');
                            var market_id = cmbMarkets.getValue();
                            if (market_id == null) market_id = 0;
                            url = url + '&market_id=' + market_id;

                            var report_box = Ext.getCmp('rep_box_counters_docs');
                            if (report_box != null) {
                                Ext.getCmp('p_rep_conteiner_counters_docs').remove(report_box);
                            }

                            //url = url + '&height=' + (center.getWidth() - 30)

                            dynamicPanel = new Ext.Component({
                                id: 'rep_box_counters_docs',
                                xtype: 'box',
                                layout: 'fit',
                                showMask: true,
                                autoEl: {
                                    tag: 'iframe',
                                    src: url
                                }
                            });
                            Ext.getCmp('p_rep_conteiner_counters_docs').add(dynamicPanel);
                        }
                    }]
                }
            }, {
                xtype: 'panel',
                layout: 'fit',
                id: 'p_rep_conteiner_counters_docs',
                flex: 1
            }]
        }
    });

    center.setActiveTab(tab);
}