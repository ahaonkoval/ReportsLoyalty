﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="extra_point_articul_rating.aspx.cs" Inherits="ReportsLoyalty.pages.extra_point_articul_rating" %>
<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=12.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div style="margin:0; padding:0; height:100%">
            <div style="margin:0; padding:0; height:100%">
                <rsweb:ReportViewer ID="ReportViewerExtraPoints" runat="server" Width="100%" Height="1000px" AsyncRendering="False" Font-Names="Verdana" Font-Size="8pt" WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt">
                    <LocalReport ReportPath="reports\extra_points\rep_trade_with_extra_points.rdlc">
                        <DataSources>
                            <rsweb:ReportDataSource DataSourceId="sds_report" Name="ds_get_trade_with_extra_points" />
                        </DataSources>
                    </LocalReport>
                </rsweb:ReportViewer>
            </div>
        </div>
        <asp:ScriptManager ID="ScriptManager2" runat="server">
        </asp:ScriptManager>

        <asp:SqlDataSource ID="sds_report" runat="server" ConnectionString="<%$ ConnectionStrings:crm_wizard_connect_string %>" 
            SelectCommand="p_get_sale_with_extra_points" SelectCommandType="StoredProcedure">
        </asp:SqlDataSource>
    </form>
</body>
</html>
