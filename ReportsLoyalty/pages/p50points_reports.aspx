<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="p50points_reports.aspx.cs" Inherits="ReportsLoyalty.pages.p_50points_reports" %>
<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=12.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<script type="text/javascript" src="/scripts/jslib/ext/ext-all.js"></script>
<script type="text/javascript" src="/scripts/jslib/jquery-3.1.1.min.js"></script>
    <title></title>
</head>
<body>

    <script>
        //alert();
        //var ws = Ext.getCmp('win_show_pause');
        //ws.hide();
    </script>

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
                    <LocalReport ReportPath="reports\50points_report.rdlc">
                        <DataSources>
                            <rsweb:ReportDataSource DataSourceId="sds50points_reports" Name="dt_50points_report" />
                        </DataSources>
                    </LocalReport>
                </rsweb:ReportViewer>
            </div>
        </div>
        <asp:ScriptManager ID="ScriptManager2" runat="server">
        </asp:ScriptManager>

        <asp:SqlDataSource ID="sds50points_reports" runat="server" ConnectionString="<%$ ConnectionStrings:crm_wizard_connect_string %>" 
            SelectCommand="SELECT        
                                market_name, 
                                qty_proposal, 
                                qty_participant, 
                                sm_obert, 
                                avg_doc_sm, 
                                bonus_sm_free, 
                                bonus_used
                           FROM rep.t_get_50points_report(@campaign_id, @d_start, @d_end, @ctrl_group) AS a" SelectCommandType="Text">
        </asp:SqlDataSource>
    </form>
</body>
</html>
