<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="reportmap.aspx.cs" Inherits="ReportsLoyalty.reportmap" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <script type="text/javascript" src="scripts/ext/ext-all.js"></script>
    <script type="text/javascript" src="scripts/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="codejs/show.js"></script>
    <script type="text/javascript" src="codejs/dict.js"></script>
    <script type="text/javascript" src="codejs/requests.js"></script>
    <script type="text/javascript" src="codejs/frm_campaigns_edit.js"></script>
    <script type="text/javascript" src="codejs/win_campaign_details.js"></script>
    <script type="text/javascript" src="codejs/win_upload_status.js"></script>

    <link rel="stylesheet" type="text/css" href="Content/report.css"/>
    <link rel="stylesheet" type="text/css" href="scripts/ext/classic/theme-crisp/resources/theme-crisp-all.css" />
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
                                text: 'Управление активностями',
                                formBind: true,
                                listeners: {
                                    click: function () {
                                        //win_campaigns.show();
                                        win_campaigns_show();
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
                            //    html: '<a href="#" onclick="" class="menu_is_not_run">МК "До дня народження УПЛ (по дням)"</a>',
                            //    margin: '2 2 2 10'
                            //},
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
                            }
                            ]
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
                                    html: '<a href="#" onclick="showBasicIndicators();" class="menu_is_run">Загальні показники</a>',
                                    margin: '2 2 2 10'
                                }, {
                                    xtype: 'panel',
                                    border: false,
                                    name: 'name',
                                    html: '<a href="#" onclick="showProfileParticipant();" class="menu_is_run">Профіль учасників</a>',
                                    margin: '2 2 2 10'
                                }, {
                                    xtype: 'panel',
                                    border: false,
                                    name: 'name',
                                    html: '<a href="#" onclick="showUplByDay();" class="menu_is_run">Розподіл УПЛ по кількості днів з покупками</a>',
                                    margin: '2 2 2 10'
                                }, {
                                    xtype: 'panel',
                                    border: false,
                                    name: 'name',
                                    html: '<a href="#" onclick="showUplVisit();" class="menu_is_run">Карти по візитам</a>',
                                    margin: '2 2 2 10'
                                }, {
                                    xtype: 'panel',
                                    border: false,
                                    name: 'name',
                                    html: '<a href="#" onclick="showUplSUM();" class="menu_is_run">Карти по сумі</a>',
                                    margin: '2 2 2 10'
                                }, {
                                    xtype: 'panel',
                                    border: false,
                                    name: 'name',
                                    html: '<a href="#" onclick="showProgramIndicators();" class="menu_is_run">Середні показники програми</a>',
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
