<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="reportmap.aspx.cs" Inherits="ReportsLoyalty.reportmap" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <script type="text/javascript" src="scripts/jslib/ext/ext-all.js"></script>
    <script type="text/javascript" src="scripts/jslib/jquery-3.1.1.min.js"></script>

    <%--<script type="text/javascript" src="scripts/jslib/Phone.js"></script>--%>
<%--    <script type="text/javascript" src="scripts/jslib/jquery.maskedinput-1.2.2.min.js"></script>--%>
<%--    <script type="text/javascript" src="scripts/jslib/phoneField.js"></script>--%>

    <script type="text/javascript" src="scripts/markmo_indicators.js"></script>
    <script type="text/javascript" src="scripts/dict.js"></script>

    <script type="text/javascript" src="scripts/articuls.js"></script>

    <script type="text/javascript" src="scripts/stop_list.js"></script>

    <script type="text/javascript" src="scripts/requests.js"></script>
    <script type="text/javascript" src="scripts/campaigns.js"></script>
    <script type="text/javascript" src="scripts/campaign_details.js"></script>
    <script type="text/javascript" src="scripts/campaigns_terms.js"></script>
    <script type="text/javascript" src="scripts/upload_status.js"></script>
    <script type="text/javascript" src="scripts/customers.js"></script>    
    <script type="text/javascript" src="scripts/pl_indicators.js"></script>
    <script type="text/javascript" src="scripts/p50points_reports.js"></script>

    <link rel="stylesheet" type="text/css" href="Content/report.css"/>
    <link rel="stylesheet" type="text/css" href="scripts/jslib/ext/classic/theme-crisp/resources/theme-crisp-all.css" />
</head>
<body>
    
    <script>        

        var checker = setInterval(function () { checkauth() }, 5000);

        function checkauth() {
            $.ajax({
                url: 'api/login/check/1',
                type: 'get',
                success: function (a) {
                    if (a != true) {
                        window.location.href = "login.aspx"
                    }
                }
            });
        }

        Ext.onReady(function () {

            Ext.create('Ext.window.Window', {
                title: 'Hello',
                id: 'win_show_pause',
                modal: true,
                height: 200,
                width: 400,
                layout: 'fit',
                items: {  // Let's put an empty grid in just to illustrate fit layout
                    xtype: 'grid',
                    border: false,
                    columns: [{ header: 'World' }],                 // One header just for show. There's no data,
                    store: Ext.create('Ext.data.ArrayStore', {}) // A dummy empty data store
                }
            });

            var viewport = Ext.create('Ext.container.Viewport', {

                layout: 'border',
                items: [{
                    region: 'north',
                    border: false,
                    margin: '0 0 5 0',
                    items: {
                        xtype: 'panel',
                        border: false,
                        height: 35,
                        buttons: [
                            //{
                            //    text: 'Перевірка завантаження',
                            //    formBind: true,
                            //    listeners: {
                            //        click: function () {
                            //            winUploadStatus.Show();
                            //        }
                            //    }
                            //},
                            {
                                text: 'Stop list',
                                formBind: true,
                                listeners: {
                                    click: function (ctrl) {
                                        getWinStopList().show();
                                        //alert(ctrl);
                                    }
                                }
                            },
                            {
                                text: 'Управление активностями',
                                formBind: true,
                                listeners: {
                                    click: function () {
                                        //win_campaigns.show();
                                        //win_campaigns_show();
                                        getWinCampaigns().show();
                                    }
                                }
                            },
                            {
                                text: 'Вийти',
                                formBind: true,
                                listeners: {
                                    click: function () {
                                        $.ajax({
                                            url: 'api/login/logout/1',
                                            type: 'get',
                                            success: function (a) {
                                                if (a == 'true') {
                                                    window.location.href = "login.aspx";
                                                }
                                            }
                                        });
                                    }
                                }
                            }

                        ]
                    }
                }, {
                    region: 'west',
                    collapsible: true,
                    title: 'Навігація',
                    width: 300,
                    items: {
                        extend: 'Ext.panel.Panel',
                        layout: 'accordion',
                        items: [{
                            xtype: 'panel',
                            title: 'Маркетингові кампанії',
                            items: [{
                                xtype: 'panel',
                                border: false,
                                name: 'name',
                                html: '<a href="#" onclick="showExtraPoints();" class="menu_is_run">Екстра-Бали</a>',
                                margin: '2 2 2 10'
                            }, {
                                xtype: 'panel',
                                border: false,
                                name: 'name',
                                html: '<a href="#" onclick="showPersonalOffers();" class="menu_is_run">Персональні пропозиції</a>',
                                margin: '2 2 2 10'
                            }, {
                                xtype: 'panel',
                                border: false,
                                name: 'name',
                                html: '<a href="#" onclick="showBirthDayUPL();" class="menu_is_run">МК До дня народження УПЛ</a>',
                                margin: '2 2 2 10'
                            },
                            //{
                            //    xtype: 'panel',
                            //    border: false,
                            //    name: 'name',
                            //    html: '<a href="#" onclick="showBirthDayChildrenUPL();" class="menu_is_run">МК До дня народження ДІТЕЙ УПЛ"</a>',
                            //    margin: '2 2 2 10'
                            //},
                            {
                                xtype: 'panel',
                                border: false,
                                name: 'name',
                                html: '<a href="#" onclick="showBirthDayChildrenUPL();" class="menu_is_run">МК "До дня народження ДІТЕЙ УПЛ"</a>',
                                margin: '2 2 2 10'
                            },
                            {
                                xtype: 'panel',
                                border: false,
                                name: 'name',
                                html: '<a href="#" onclick="show50pointsReport();" class="menu_is_run">Результати акцій "50 і більше балів"</a>',
                                margin: '2 2 2 10'
                            }]
                        //    {
                        //        xtype: 'panel',
                        //        border: false,
                        //        name: 'name',
                        //        html: '<a href="#" onclick="showParticipantBySex();">Тестова сторінка екстра-бали</a>',
                        //        margin: '2 2 2 10',
                        //        visible: false
                        //}
                        },
                        {
                            xtype: 'panel',
                            title: 'Показники програми лояльності',
                            items: [
                                {
                                    xtype: 'panel',
                                    border: false,
                                    name: 'name',
                                    html: '<a href="#" onclick="" class="menu_is_not_run">Загальні показники</a>', //showBasicIndicators();
                                    margin: '2 2 2 10'
                                }, {
                                    xtype: 'panel',
                                    border: false,
                                    name: 'name',
                                    html: '<a href="#" onclick="" class="menu_is_not_run">Профіль учасників</a>', //showProfileParticipant();
                                    margin: '2 2 2 10'
                                }, {
                                    xtype: 'panel',
                                    border: false,
                                    name: 'name',
                                    html: '<a href="#" onclick="" class="menu_is_not_run">Розподіл УПЛ по кількості днів з покупками</a>', //showUplByDay();
                                    margin: '2 2 2 10'
                                }, {
                                    xtype: 'panel',
                                    border: false,
                                    name: 'name',
                                    html: '<a href="#" onclick="" class="menu_is_not_run">Карти по візитам</a>', //showUplVisit();
                                    margin: '2 2 2 10'
                                }, {
                                    xtype: 'panel',
                                    border: false,
                                    name: 'name',
                                    html: '<a href="#" onclick="" class="menu_is_not_run">Карти по сумі</a>', //showUplSUM();
                                    margin: '2 2 2 10'
                                }, {
                                    xtype: 'panel',
                                    border: false,
                                    name: 'name',
                                    html: '<a href="#" onclick="" class="menu_is_not_run">Середні показники програми</a>', //showProgramIndicators();
                                    margin: '2 2 2 10'
                                }, {
                                    xtype: 'panel',
                                    border: false,
                                    name: 'name',
                                    html: '<a href="#" onclick="showCountersDocsAndSell();" class="menu_is_run">Прохідність</a>',
                                    margin: '2 2 2 10'
                                }
                            ]
                        }]
                    }
                    // could use a TreePanel or AccordionLayout for navigational items
                },
                //{
                //    region: 'south',
                //    title: 'South Panel',
                //    collapsible: true,
                //    html: 'Information goes here',
                //    split: true,
                //    height: 100,
                //    minHeight: 100
                //},
                //{
                //    region: 'east',
                //    title: 'East Panel',
                //    collapsible: true,
                //    split: true,
                //    width: 150,
                //    visible:false
                //}
                , {
                    region: 'center',
                    id: 'pnlCenter',
                    name: 'pnlCenter',
                    xtype: 'tabpanel', // TabPanel itself has no title
                    activeTab: 0      // First tab active by default
                    //items:
                    //    {
                            //extend: 'Ext.panel.Panel',
                            //layout: 'fit',
                            //items: [{
                            //    xtype: 'box',
                            //    autoEl: {
                            //        tag: 'iframe',
                            //        src: 'pages/page_count_customers_by_gender_is_profile.aspx',
                            //    },
                            //}]
                    //    }
                    //{
                    //    title: 'Default Tab',
                    //    html: 'The first tab\'s content. Others may be added dynamically'
                    //}
                }]
                //{
                //    xtype: 'form',
                //    reference: 'form',
                //    title: 'Редагування списку обзвона участників...',
                //    width: 1200,
                //    height: 550,
                //    border: true,
                //    layout: {
                //        type: 'vbox',
                //        align: 'stretch',
                //        pack: 'start'
                //    },
                //    items: [
                //        {
                //            xtype: 'panel',
                //            border: false,
                //            height: 20
                //            //items: [
                //            //    getSelectStatus()
                //            //]
                //        },
                //        {
                //            xtype: 'panel',
                //            border: false,
                //            buttons: [
                //                {
                //                    text: 'LogOut',
                //                    formBind: true,
                //                    listeners: {
                //                        click: function () {
                //                            $.ajax({
                //                                url: 'api/login/logout/1',
                //                                type: 'get',
                //                                success: function (a) {
                //                                    if (a == 'true') {
                //                                        window.location.href = "login.aspx";
                //                                    }
                //                                }
                //                            });
                //                        }
                //                    }
                //                }

                //            ]
                //            //items: [
                //            //    getGridEdit()]
                //        }
                //    ]
                //}

            });
        });
    </script>
    <%--    <form id="form1" runat="server">
    <div>
        
    </div>
    </form>--%>
</body>
</html>
