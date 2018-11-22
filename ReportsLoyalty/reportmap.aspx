<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="reportmap.aspx.cs" Inherits="ReportsLoyalty.reportmap" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <script type="text/javascript" src="scripts/jslib/ext/ext-all.js"></script>
    <script type="text/javascript" src="scripts/jslib/jquery-3.1.1.min.js"></script>

    <script type="text/javascript" src="scripts/markmo_indicators.js"></script>
    <script type="text/javascript" src="scripts/dict.js"></script>

    <script type="text/javascript" src="scripts/articuls.js"></script>
    <script type="text/javascript" src="scripts/stop_list.js"></script>

    <script type="text/javascript" src="scripts/requests.js"></script>
    <script type="text/javascript" src="scripts/campaigns.js"></script>
    <script type="text/javascript" src="scripts/campaign_settings.js"></script>
    <script type="text/javascript" src="scripts/campaigns_terms.js"></script>
    <script type="text/javascript" src="scripts/upload_status.js"></script>
    <script type="text/javascript" src="scripts/customers.js"></script>    
    <script type="text/javascript" src="scripts/pl_indicators.js"></script>
    <script type="text/javascript" src="scripts/p50points_reports.js"></script>

    <script type="text/javascript" src="scripts/PersonalInteractiv.js"></script>

    <script type="text/javascript" src="scripts/CmpSettWzd.js"></script>

    <%--<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>--%>
    <%--<script src="http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.2/raphael-min.js"></script>--%>
    <script src="scripts/jslib/raphael-min.js"></script>
    <script src="scripts/charts/morris.js-0.5.1/morris.js"></script>
    <%--<script src="http://cdnjs.cloudflare.com/ajax/libs/prettify/r224/prettify.min.js"></script>--%>
    <%--<script src="lib/example.js"></script>--%>

<%--    <link rel="stylesheet" href="lib/example.css"/>--%>
    <%--<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/prettify/r224/prettify.min.css"/>--%>
    <link rel="stylesheet" href="scripts/charts/morris.js-0.5.1/morris.css"/>

    <link rel="stylesheet" type="text/css" href="Content/report.css"/>    
    <link rel="stylesheet" type="text/css" href="scripts/jslib/ext/classic/theme-crisp/resources/theme-crisp-all.css" />
</head>
<body>
    
    <script>        

        var dsField = Ext.create({
            xtype: 'displayfield',
            name: 'displayfield1',
            margin: 5,
            fieldLabel: 'Останні дії:',
            value: ''
        });

        var checker = setInterval(function () { checkauth() }, 5000);       
        function checkauth() {
            $.ajax({
                url: 'api/login/check/1',
                type: 'get',
                success: function (a) {
                    if (a != true) {
                        window.location.href = "login.aspx"
                    } else {

                    }
                }
            });
        }

        var getState = setInterval(function () { getST() }, 5000);
        function getST() {
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
                        dsField.setValue('Перераховано: ' + st.CampaignName);
                    }
                    if (st.Status == '1') {
                        dsField.setValue('ПЕРЕРАХОВУЄТЬСЯ: ' + st.CampaignName);
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
            /* Кнопка управлкеня кампаниями */
            var buttonSplit = Ext.create('Ext.button.Split', {
                renderTo: Ext.getBody(),
                text: 'Управління активностями',
                menu: new Ext.menu.Menu({
                    items: [
                        {
                            text: 'Управління Stop List',
                            formBind: true,
                            listeners: {
                                click: function (ctrl) {
                                    getWinStopList().show();
                                }
                            }
                        },
                        {
                            text: 'Управление активностями',
                            formBind: true,
                            listeners: {
                                click: function () {
                                    getWinCampaigns().show();
                                }
                            }
                        }
                    ]
                })
            });
            /* Кнопка запуска отчетов персональных предложений */
            var buttonPersonal = Ext.create('Ext.button.Split', {
                renderTo: Ext.getBody(),
                text: 'Персональні пропозиції',
                width: 290,
                menu: new Ext.menu.Menu({
                    items: [
                        {
                            text: 'Перегляд',
                            width: 280,
                            formBind: true,
                            listeners: {
                                click: function (ctrl) {
                                    showPersonalInteractiv();
                                }
                            }
                        },
                        {
                            text: 'Друковати звіт',
                            formBind: true,
                            listeners: {
                                click: function () {
                                    showPersonalOffers('daily_personal_offers.aspx', 'all');
                                }
                            }
                        }, {
                            text: 'Друковати звіт (Детально)',
                            formBind: true,
                            listeners: {
                                click: function () {
                                    showPersonalOffers('daily_personal_offers_details.aspx', 'dt');
                                }
                            }
                        }
                    ]
                })
            });            

            var gridDownloadStatus = Ext.create('Ext.grid.Panel', {
                stateful: true,
                stateId: 'stateful-filter-grid',
                border: false,
                store: dict.getStoreDownloadStatusTables(),
                columns: [
                    {
                        dataIndex: 'Number',
                        text: '№',
                        width:40
                    }, {
                        dataIndex: 'title',
                        text: 'Назва таблиці',
                        width: 150
                    },
                    {
                        dataIndex: 'DownloadStatus',
                        text: 'Завантажено',
                        width: 80
                    },
                    {
                        dataIndex: 'Created',
                        text: 'Дата завантаження',
                        xtype: 'datecolumn',
                        //format: 'd.m.Y'
                        format: 'Y-m-d H:i:s.u',
                        width: 150
                    }
                ],
                loadMask: true,
                //dockedItems: [Ext.create('Ext.toolbar.Paging', {
                //    dock: 'bottom',
                //    store: dict.getStoreDownloadStatusTables()
                //})],
                emptyText: 'Записів більше нема',
                listeners: {
                    'rowdblclick': function (grid, record, e) {
                        /* открываєм окно редактирования */
                        //Ext.Msg.confirm("Увага!", "Завантажити УПЛ з таблиці '" + record.get('name') + "'", function (btnText) {
                        //    if (btnText === "no") {

                        //    }
                        //    else if (btnText === "yes") {
                        //        StartFillCampaign(record, cmpId);
                        //        win.hide();
                        //    }
                        //}, this);
                    }
                },
                viewConfig: {
                    stripeRows: false,
                    getRowClass: function (record) {

                        var status = record.get('DownloadStatus');

                        if (status == 'ні') {

                            //if (record.get('is_run') == true) {
                            return 'x-grid-row-alert';
                            //}

                            //if (record.get('is_run') == false)
                            //    return 'x-grid-row';
                            //return record.get('is_run') == true ? 'x-grid-row-run' : 'x-grid-row';

                            //if (record.get('is_start_get_status') == 1) {
                            //    return 'x-grid-row-getting-status';
                            //} else {
                            //    return css;
                            //}

                        }
                        //else {
                        //    if (record.get('is_start_get_status') == 3) {
                        //        return 'x-grid-row-block';
                        //    }
                        //}
                    }
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
                            buttonSplit,
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
                            },
                            buttonPersonal,
                            {
                                xtype: 'panel',
                                border: false,
                                name: 'name',
                                html: '<a href="#" onclick="showBirthDayUPL();" class="menu_is_run">МК До дня народження УПЛ</a>',
                                margin: '2 2 2 10'
                            },
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
                            }
                            ]
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
                },
                {
                    region: 'south',
                    //title: 'South Panel',
                    collapsible: false,
                    //html: 'Information goes here',
                    split: true,
                    height: 40,
                    minHeight: 40,
                    header: false,
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: '33.3%'
                        },
                        {
                            xtype: 'panel',
                            width: '33.3%'
                        },
                        {
                            xtype: 'panel',
                            width: '33.3%',
                            items: [
                                dsField
                            ]
                        }
                    ]
                },
                //{
                //    region: 'east',
                //    title: 'East Panel',
                //    collapsible: true,
                //    split: true,
                //    width: 150,
                //    visible:false
                //}
                {
                    region: 'center',
                    id: 'pnlCenter',
                    name: 'pnlCenter',
                    xtype: 'tabpanel', // TabPanel itself has no title
                    activeTab: 0,      // First tab active by default
                    items: [
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                pack: 'start',
                                align: 'stretch'
                            },
                            title: 'Статус завантаження',
                            items: [
                                {
                                    xtype: 'panel',
                                    //border:false,
                                    layout: 'fit',
                                    width:450,
                                    items: [
                                        gridDownloadStatus
                                    ]
                                }, {
                                    flex: 1,
                                    border: false
                                }, {
                                    flex: 2,
                                    border: false
                                }
                            ]
                        }
                    ]                                            
                }]

            });
        });
    </script>
    <%--    <form id="form1" runat="server">
    <div>
        
    </div>
    </form>--%>
</body>
</html>
