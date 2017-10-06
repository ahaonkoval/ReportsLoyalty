<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="ReportsLoyalty.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <script type="text/javascript" src="scripts/jslib/ext/ext-all.js"></script>
    <script type="text/javascript" src="scripts/jslib/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="scripts/buttons.js"></script>
    <script type="text/javascript" src="scripts/requests.js"></script>
    <link rel="stylesheet" type="text/css" href="scripts/jslib/ext/classic/theme-crisp/resources/theme-crisp-all.css" />
    <%--<style type="text/css">
    #unlicensed
    {
        display: none;
    }
</style>--%>
</head>
<body>
    <script>

        Ext.onReady(function () {
            var viewport = Ext.create('Ext.container.Viewport', {
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                items: {
                    xtype: 'form',
                    reference: 'form',
                    title: 'Авторизация...',
                    width: 290,
                    height:150,
                    border: true,
                    items: [{
                        border: false,
                        bodyStyle: 'padding: 10px;',
                        items: [{
                            xtype: 'textfield',
                            name: 'username',
                            id: 'txtusername',
                            fieldLabel: 'Пользователь:',
                            allowBlank: false
                        }, {
                            xtype: 'textfield',
                            name: 'password',
                            inputType: 'password',
                            id: 'txtpassword',
                            fieldLabel: 'Пароль:',
                            allowBlank: false,
                            listeners: {
                                keyup: {
                                    element: 'el',
                                    fn: function (ctrl, e, eOpts) {
                                        if (ctrl.keyCode == 13) {
                                            login();
                                        }                                        
                                    }
                                }
                            }
                        }],
                        buttons: [ btnLogOut ]
                    }]
                }
            });

            window.viewport = viewport;

        });
    </script>
    <form runat="server">
    </form>
</body>
</html>
