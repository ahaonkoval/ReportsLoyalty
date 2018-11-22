<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="tpt.aspx.cs" Inherits="ReportsLoyalty.tpt" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">

<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title> Пеервірочна сторінка </title>
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
    <script type="text/javascript" src="scripts/campaign_wizard.js"></script>

    <script src="scripts/jslib/raphael-min.js"></script>
    <script src="scripts/charts/morris.js-0.5.1/morris.js"></script>
    <link rel="stylesheet" href="scripts/charts/morris.js-0.5.1/morris.css"/>

    <link rel="stylesheet" type="text/css" href="Content/report.css"/>    
    <link rel="stylesheet" type="text/css" href="scripts/jslib/ext/classic/theme-crisp/resources/theme-crisp-all.css" />
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <script> 
        Ext.onReady(function () {
            getWinCmpSettWizard(685).show();
        });
        
    </script>
    </div>
    </form>
</body>
</html>
