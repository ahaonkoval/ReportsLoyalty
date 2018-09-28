namespace WinTest
{
    partial class frmLoadFile
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.label1 = new System.Windows.Forms.Label();
            this.txtCampaignId = new System.Windows.Forms.TextBox();
            this.btnLoadExcel = new System.Windows.Forms.Button();
            this.btnLoadCsv = new System.Windows.Forms.Button();
            this.grdExcelStatus = new System.Windows.Forms.DataGridView();
            this.cmbListNames = new System.Windows.Forms.ComboBox();
            this.statusStrip1 = new System.Windows.Forms.StatusStrip();
            this.tsStatus = new System.Windows.Forms.ToolStripStatusLabel();
            this.tsProgress = new System.Windows.Forms.ToolStripProgressBar();
            this.btnStart = new System.Windows.Forms.Button();
            this.bWorker = new System.ComponentModel.BackgroundWorker();
            this.bWorkerCSV = new System.ComponentModel.BackgroundWorker();
            this.lblFileName = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.lblCSVFile = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.grdExcelStatus)).BeginInit();
            this.statusStrip1.SuspendLayout();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(6, 7);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(22, 15);
            this.label1.TabIndex = 8;
            this.label1.Text = "ID:";
            // 
            // txtCampaignId
            // 
            this.txtCampaignId.Location = new System.Drawing.Point(35, 3);
            this.txtCampaignId.Name = "txtCampaignId";
            this.txtCampaignId.Size = new System.Drawing.Size(116, 23);
            this.txtCampaignId.TabIndex = 7;
            // 
            // btnLoadExcel
            // 
            this.btnLoadExcel.Location = new System.Drawing.Point(157, 1);
            this.btnLoadExcel.Name = "btnLoadExcel";
            this.btnLoadExcel.Size = new System.Drawing.Size(147, 27);
            this.btnLoadExcel.TabIndex = 9;
            this.btnLoadExcel.Text = "Файл Excel";
            this.btnLoadExcel.UseVisualStyleBackColor = true;
            this.btnLoadExcel.Click += new System.EventHandler(this.btnLoadExcel_Click);
            // 
            // btnLoadCsv
            // 
            this.btnLoadCsv.Location = new System.Drawing.Point(157, 34);
            this.btnLoadCsv.Name = "btnLoadCsv";
            this.btnLoadCsv.Size = new System.Drawing.Size(147, 27);
            this.btnLoadCsv.TabIndex = 10;
            this.btnLoadCsv.Text = "Завантажити файл CSV";
            this.btnLoadCsv.UseVisualStyleBackColor = true;
            this.btnLoadCsv.Click += new System.EventHandler(this.btnLoadCsv_Click);
            // 
            // grdExcelStatus
            // 
            this.grdExcelStatus.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.grdExcelStatus.Location = new System.Drawing.Point(9, 114);
            this.grdExcelStatus.Name = "grdExcelStatus";
            this.grdExcelStatus.Size = new System.Drawing.Size(893, 548);
            this.grdExcelStatus.TabIndex = 11;
            // 
            // cmbListNames
            // 
            this.cmbListNames.FormattingEnabled = true;
            this.cmbListNames.Location = new System.Drawing.Point(35, 84);
            this.cmbListNames.Name = "cmbListNames";
            this.cmbListNames.Size = new System.Drawing.Size(355, 23);
            this.cmbListNames.TabIndex = 12;
            this.cmbListNames.SelectedIndexChanged += new System.EventHandler(this.cmbListNames_SelectedIndexChanged);
            // 
            // statusStrip1
            // 
            this.statusStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.tsStatus,
            this.tsProgress});
            this.statusStrip1.Location = new System.Drawing.Point(0, 665);
            this.statusStrip1.Name = "statusStrip1";
            this.statusStrip1.Size = new System.Drawing.Size(911, 22);
            this.statusStrip1.TabIndex = 13;
            this.statusStrip1.Text = "statusStrip1";
            // 
            // tsStatus
            // 
            this.tsStatus.Name = "tsStatus";
            this.tsStatus.Size = new System.Drawing.Size(91, 17);
            this.tsStatus.Text = "Завантаження: ";
            // 
            // tsProgress
            // 
            this.tsProgress.Name = "tsProgress";
            this.tsProgress.Size = new System.Drawing.Size(800, 16);
            // 
            // btnStart
            // 
            this.btnStart.Location = new System.Drawing.Point(396, 84);
            this.btnStart.Name = "btnStart";
            this.btnStart.Size = new System.Drawing.Size(186, 23);
            this.btnStart.TabIndex = 14;
            this.btnStart.Text = "Розпочати завантаження";
            this.btnStart.UseVisualStyleBackColor = true;
            this.btnStart.Click += new System.EventHandler(this.btnStart_Click);
            // 
            // bWorker
            // 
            this.bWorker.WorkerReportsProgress = true;
            this.bWorker.WorkerSupportsCancellation = true;
            this.bWorker.DoWork += new System.ComponentModel.DoWorkEventHandler(this.bWorker_DoWork);
            this.bWorker.ProgressChanged += new System.ComponentModel.ProgressChangedEventHandler(this.bWorker_ProgressChanged);
            this.bWorker.RunWorkerCompleted += new System.ComponentModel.RunWorkerCompletedEventHandler(this.bWorker_RunWorkerCompleted);
            // 
            // bWorkerCSV
            // 
            this.bWorkerCSV.WorkerReportsProgress = true;
            this.bWorkerCSV.WorkerSupportsCancellation = true;
            this.bWorkerCSV.DoWork += new System.ComponentModel.DoWorkEventHandler(this.bWorkerCSV_DoWork);
            this.bWorkerCSV.ProgressChanged += new System.ComponentModel.ProgressChangedEventHandler(this.bWorkerCSV_ProgressChanged);
            this.bWorkerCSV.RunWorkerCompleted += new System.ComponentModel.RunWorkerCompletedEventHandler(this.bWorkerCSV_RunWorkerCompleted);
            // 
            // lblFileName
            // 
            this.lblFileName.AutoSize = true;
            this.lblFileName.Location = new System.Drawing.Point(308, 6);
            this.lblFileName.Name = "lblFileName";
            this.lblFileName.Size = new System.Drawing.Size(16, 15);
            this.lblFileName.TabIndex = 15;
            this.lblFileName.Text = "...";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(29, 67);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(145, 15);
            this.label2.TabIndex = 16;
            this.label2.Text = "Закладка в ексель файлі";
            // 
            // lblCSVFile
            // 
            this.lblCSVFile.AutoSize = true;
            this.lblCSVFile.Location = new System.Drawing.Point(308, 40);
            this.lblCSVFile.Name = "lblCSVFile";
            this.lblCSVFile.Size = new System.Drawing.Size(16, 15);
            this.lblCSVFile.TabIndex = 17;
            this.lblCSVFile.Text = "...";
            // 
            // frmLoadFile
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(911, 687);
            this.Controls.Add(this.lblCSVFile);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.lblFileName);
            this.Controls.Add(this.btnLoadCsv);
            this.Controls.Add(this.btnStart);
            this.Controls.Add(this.statusStrip1);
            this.Controls.Add(this.cmbListNames);
            this.Controls.Add(this.grdExcelStatus);
            this.Controls.Add(this.btnLoadExcel);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.txtCampaignId);
            this.Font = new System.Drawing.Font("Calibri", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.Name = "frmLoadFile";
            this.Text = "Завантаження...";
            ((System.ComponentModel.ISupportInitialize)(this.grdExcelStatus)).EndInit();
            this.statusStrip1.ResumeLayout(false);
            this.statusStrip1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox txtCampaignId;
        private System.Windows.Forms.Button btnLoadExcel;
        private System.Windows.Forms.Button btnLoadCsv;
        private System.Windows.Forms.DataGridView grdExcelStatus;
        private System.Windows.Forms.ComboBox cmbListNames;
        private System.Windows.Forms.StatusStrip statusStrip1;
        private System.Windows.Forms.ToolStripStatusLabel tsStatus;
        private System.Windows.Forms.ToolStripProgressBar tsProgress;
        private System.Windows.Forms.Button btnStart;
        private System.ComponentModel.BackgroundWorker bWorker;
        private System.ComponentModel.BackgroundWorker bWorkerCSV;
        private System.Windows.Forms.Label lblFileName;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label lblCSVFile;
    }
}