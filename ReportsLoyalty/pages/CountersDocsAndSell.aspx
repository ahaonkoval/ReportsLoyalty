<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CountersDocsAndSell.aspx.cs" Inherits="ReportsLoyalty.pages.CountersDocsAndSell" %>
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
                <rsweb:ReportViewer ID="ReportViewer" runat="server"
                    Font-Names="Verdana"
                    Font-Size="8pt"
                    WaitMessageFont-Names="Verdana"
                    WaitMessageFont-Size="14pt"
                    Width="100%"                     
                    BorderWidth="0px"
                    ZoomMode="FullPage"
                    ShowPrintButton="False"
                    ShowRefreshButton="False" AsyncRendering="False"  SizeToReportContent="True">
                    <LocalReport ReportPath="reports\CountersDocsAndSell.rdlc">
                        <DataSources>
                            <rsweb:ReportDataSource DataSourceId="sds_counters_docs_bydate" Name="ds_get_counters_docs_bydate" />
                        </DataSources>
                    </LocalReport>
                </rsweb:ReportViewer>
            </div>
        </div>
        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>

        <asp:SqlDataSource ID="sds_counters_docs_bydate" runat="server" ConnectionString="<%$ ConnectionStrings:crm_wizard_connect_string %>" 
            SelectCommand="rep.p_get_counters_docs_bydate" SelectCommandType="StoredProcedure">
        </asp:SqlDataSource>

    </form>
</body>
</html>
