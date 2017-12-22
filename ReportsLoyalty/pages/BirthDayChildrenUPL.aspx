<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="BirthDayChildrenUPL.aspx.cs" Inherits="ReportsLoyalty.pages.BirthDayChildrenUPL" %>
<%@ Register assembly="Microsoft.ReportViewer.WebForms, Version=12.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" namespace="Microsoft.Reporting.WebForms" tagprefix="rsweb" %>

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
                <rsweb:ReportViewer ID="ReportViewerBirthDayChildrenUPL" runat="server"
                    Font-Names="Verdana"
                    Font-Size="8pt"
                    WaitMessageFont-Names="Verdana"
                    WaitMessageFont-Size="14pt"
                    Width="100%"                     
                    BorderWidth="0px"
                    ZoomMode="FullPage"
                    ShowPrintButton="False"
                    ShowRefreshButton="False" AsyncRendering="False"  SizeToReportContent="True">
                    <LocalReport ReportPath="reports\BirthDayUPL\BirthDayChildrenUPL.rdlc">
                        <DataSources>
                            <rsweb:ReportDataSource DataSourceId="sds_BirthDayUPL" Name="ds_birth_day_mk_expected_effect" />
                            <rsweb:ReportDataSource DataSourceId="sds_discount" Name="ds_birth_day_mk_discount" />
                            <rsweb:ReportDataSource DataSourceId="sds_distanse" Name="ds_birth_day_mk_distanse" />
                            <rsweb:ReportDataSource DataSourceId="sds_Rating" Name="ds_birth_day_mk_trade_rating" />
                        </DataSources>
                    </LocalReport>
                </rsweb:ReportViewer>
            </div>
        </div>
        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>

        <asp:SqlDataSource ID="sds_BirthDayUPL" runat="server" ConnectionString="<%$ ConnectionStrings:crm_wizard_connect_string %>" 
            SelectCommand="rep.get_customers_birth_day_markmo_response" SelectCommandType="StoredProcedure">
        </asp:SqlDataSource>

        <asp:SqlDataSource ID="sds_Rating" runat="server" ConnectionString="<%$ ConnectionStrings:crm_wizard_connect_string %>" 
            SelectCommand="" SelectCommandType="StoredProcedure">
        </asp:SqlDataSource>

        <asp:SqlDataSource ID="sds_discount" runat="server" ConnectionString="<%$ ConnectionStrings:crm_wizard_connect_string %>" 
            SelectCommand="" SelectCommandType="StoredProcedure">
        </asp:SqlDataSource>

        <asp:SqlDataSource ID="sds_distanse" runat="server" ConnectionString="<%$ ConnectionStrings:crm_wizard_connect_string %>" 
            SelectCommand="" SelectCommandType="StoredProcedure">
        </asp:SqlDataSource>
    </form>
</body>
</html>
