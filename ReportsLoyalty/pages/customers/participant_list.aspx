<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="participant_list.aspx.cs" Inherits="ReportsLoyalty.pages.customers.participant_list" %>
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
                <rsweb:ReportViewer ID="ReportViewerExtraPoints" runat="server"
                    Font-Names="Verdana"
                    Font-Size="8pt"
                    WaitMessageFont-Names="Verdana"
                    WaitMessageFont-Size="14pt"
                    Width="100%"                     
                    BorderWidth="0px"
                    ZoomMode="FullPage"
                    ShowPrintButton="False"
                    ShowRefreshButton="False" AsyncRendering="False"  SizeToReportContent="True">
                    <LocalReport ReportPath="reports\customers\participant_list.rdlc">
                        <DataSources>
                            <rsweb:ReportDataSource DataSourceId="sds_customers_list" Name="ds_campaign_customers" />
                        </DataSources>
                    </LocalReport>
                </rsweb:ReportViewer>
            </div>
        </div>
        <asp:ScriptManager ID="ScriptManager2" runat="server">
        </asp:ScriptManager>

        <asp:SqlDataSource ID="sds_customers_list" runat="server" ConnectionString="<%$ ConnectionStrings:crm_wizard_connect_string %>" 
            SelectCommand="" SelectCommandType="Text">
        </asp:SqlDataSource>
    </form>
</body>
</html>
