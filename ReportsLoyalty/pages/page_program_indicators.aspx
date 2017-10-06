<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="page_program_indicators.aspx.cs" Inherits="ReportsLoyalty.pages.program_indicators.page_program_indicators" %>
<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=12.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div style="margin: 0; padding: 0; height: 100%">
            <div style="margin: 0; padding: 0; height: 100%">
                <rsweb:ReportViewer ID="ReportViewer1" runat="server"
                    Font-Names="Verdana"
                    Font-Size="8pt"
                    WaitMessageFont-Names="Verdana"
                    WaitMessageFont-Size="14pt"
                    Width="100%"
                    BorderWidth="0px"
                    ZoomMode="FullPage"
                    ShowPrintButton="False"
                    ShowRefreshButton="False" AsyncRendering="False" SizeToReportContent="True">
                    <LocalReport ReportPath="reports\program_indicators\rep_program_indicators.rdlc">
                        <DataSources>
                            <rsweb:ReportDataSource DataSourceId="sds_program_indicators" Name="ds_program_indicators" />

                        </DataSources>
                    </LocalReport>
                </rsweb:ReportViewer>
            </div>
        </div>
        <asp:ScriptManager ID="ScriptManager2" runat="server">
        </asp:ScriptManager>
        <%--<asp:SqlDataSource ID="SqlDataSource1" runat="server"></asp:SqlDataSource>--%>
        <asp:SqlDataSource ID="sds_program_indicators" runat="server" ConnectionString="<%$ ConnectionStrings:crm_wizard_connect_string %>"
            SelectCommand="SELECT * FROM rep.t_get_program_indicators(@date_start, @date_end, @market_id) a
                    ORDER BY a.market">
        </asp:SqlDataSource>
    </form>
</body>
</html>
