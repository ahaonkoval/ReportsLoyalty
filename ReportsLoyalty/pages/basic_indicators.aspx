<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="basic_indicators.aspx.cs" Inherits="ReportsLoyalty.pages.basic_indicators" %>
<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=12.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div style="margin: 0; padding: 0; height: 100%">
            <div style="margin: 0; padding: 0; height: 100%">
                <rsweb:ReportViewer ID="ReportViewerExtraPoints" runat="server"
                    Font-Names="Verdana"
                    Font-Size="8pt"
                    WaitMessageFont-Names="Verdana"
                    WaitMessageFont-Size="14pt"
                    Width="100%"
                    BorderWidth="0px"
                    ZoomMode="FullPage"
                    ShowPrintButton="False"
                    ShowRefreshButton="False" AsyncRendering="False" SizeToReportContent="True">
                    <LocalReport ReportPath="reports\basic_indicators\basic_indicators.rdlc">
                        <DataSources>
                            <rsweb:ReportDataSource DataSourceId="sds_basic_indicators" Name="ds_basic_indicators" />
                        </DataSources>
                    </LocalReport>
                </rsweb:ReportViewer>
            </div>
        </div>
        <asp:ScriptManager ID="ScriptManager2" runat="server">
        </asp:ScriptManager>

        <asp:SqlDataSource ID="sds_basic_indicators" runat="server" ConnectionString="<%$ ConnectionStrings:crm_wizard_connect_string %>"
            SelectCommand="SELECT market_name, program_day, count_doc, sale_tc, count_doc_with_card, sale_tc_with_card, count_get_card, count_fill_profil, state_bonuses, used_bonuses FROM rep.t_get_basic_indicators(@market_id) AS a ORDER BY market_name, program_day">
            <SelectParameters>
                <asp:Parameter Name="market_id" />
            </SelectParameters>
        </asp:SqlDataSource>

    </form>
</body>
</html>
