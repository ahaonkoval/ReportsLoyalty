namespace WinTest
{
    partial class frmLoadFileGMS
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
            this.btnStart = new System.Windows.Forms.Button();
            this.bWorker = new System.ComponentModel.BackgroundWorker();
            this.bWorkerCSV = new System.ComponentModel.BackgroundWorker();
            this.lblFileName = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.lblCSVFile = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.panel2 = new System.Windows.Forms.Panel();
            this.panel3 = new System.Windows.Forms.Panel();
            this.tsProgress = new System.Windows.Forms.ProgressBar();
            this.panel4 = new System.Windows.Forms.Panel();
            this.cShort = new System.Windows.Forms.CheckBox();
            ((System.ComponentModel.ISupportInitialize)(this.grdExcelStatus)).BeginInit();
            this.panel2.SuspendLayout();
            this.panel3.SuspendLayout();
            this.panel4.SuspendLayout();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(6, 17);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(22, 15);
            this.label1.TabIndex = 8;
            this.label1.Text = "ID:";
            // 
            // txtCampaignId
            // 
            this.txtCampaignId.Location = new System.Drawing.Point(35, 13);
            this.txtCampaignId.Name = "txtCampaignId";
            this.txtCampaignId.Size = new System.Drawing.Size(116, 23);
            this.txtCampaignId.TabIndex = 7;
            // 
            // btnLoadExcel
            // 
            this.btnLoadExcel.Location = new System.Drawing.Point(157, 11);
            this.btnLoadExcel.Name = "btnLoadExcel";
            this.btnLoadExcel.Size = new System.Drawing.Size(147, 27);
            this.btnLoadExcel.TabIndex = 9;
            this.btnLoadExcel.Text = "Файл Excel";
            this.btnLoadExcel.UseVisualStyleBackColor = true;
            this.btnLoadExcel.Click += new System.EventHandler(this.btnLoadExcel_Click);
            // 
            // btnLoadCsv
            // 
            this.btnLoadCsv.Location = new System.Drawing.Point(641, 38);
            this.btnLoadCsv.Name = "btnLoadCsv";
            this.btnLoadCsv.Size = new System.Drawing.Size(147, 27);
            this.btnLoadCsv.TabIndex = 10;
            this.btnLoadCsv.Text = "Завантажити файл CSV";
            this.btnLoadCsv.UseVisualStyleBackColor = true;
            this.btnLoadCsv.Visible = false;
            this.btnLoadCsv.Click += new System.EventHandler(this.btnLoadCsv_Click);
            // 
            // grdExcelStatus
            // 
            this.grdExcelStatus.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.grdExcelStatus.Dock = System.Windows.Forms.DockStyle.Fill;
            this.grdExcelStatus.Location = new System.Drawing.Point(0, 136);
            this.grdExcelStatus.Name = "grdExcelStatus";
            this.grdExcelStatus.Size = new System.Drawing.Size(929, 566);
            this.grdExcelStatus.TabIndex = 11;
            // 
            // cmbListNames
            // 
            this.cmbListNames.FormattingEnabled = true;
            this.cmbListNames.Location = new System.Drawing.Point(35, 94);
            this.cmbListNames.Name = "cmbListNames";
            this.cmbListNames.Size = new System.Drawing.Size(355, 23);
            this.cmbListNames.TabIndex = 12;
            this.cmbListNames.SelectedIndexChanged += new System.EventHandler(this.cmbListNames_SelectedIndexChanged);
            // 
            // btnStart
            // 
            this.btnStart.Location = new System.Drawing.Point(396, 94);
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
            //this.bWorkerCSV.WorkerReportsProgress = true;
            //this.bWorkerCSV.WorkerSupportsCancellation = true;
            //this.bWorkerCSV.DoWork += new System.ComponentModel.DoWorkEventHandler(this.bWorkerCSV_DoWork);
            //this.bWorkerCSV.ProgressChanged += new System.ComponentModel.ProgressChangedEventHandler(this.bWorkerCSV_ProgressChanged);
            //this.bWorkerCSV.RunWorkerCompleted += new System.ComponentModel.RunWorkerCompletedEventHandler(this.bWorkerCSV_RunWorkerCompleted);
            // 
            // lblFileName
            // 
            this.lblFileName.AutoSize = true;
            this.lblFileName.Location = new System.Drawing.Point(308, 16);
            this.lblFileName.Name = "lblFileName";
            this.lblFileName.Size = new System.Drawing.Size(16, 15);
            this.lblFileName.TabIndex = 15;
            this.lblFileName.Text = "...";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(29, 77);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(145, 15);
            this.label2.TabIndex = 16;
            this.label2.Text = "Закладка в ексель файлі";
            // 
            // lblCSVFile
            // 
            this.lblCSVFile.AutoSize = true;
            this.lblCSVFile.Location = new System.Drawing.Point(794, 44);
            this.lblCSVFile.Name = "lblCSVFile";
            this.lblCSVFile.Size = new System.Drawing.Size(16, 15);
            this.lblCSVFile.TabIndex = 17;
            this.lblCSVFile.Text = "...";
            this.lblCSVFile.Visible = false;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(600, 98);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(125, 15);
            this.label3.TabIndex = 18;
            this.label3.Text = "Кількість записів: {0}";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(767, 98);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(84, 15);
            this.label4.TabIndex = 20;
            this.label4.Text = "Завантажено:";
            // 
            // panel2
            // 
            this.panel2.Controls.Add(this.cShort);
            this.panel2.Controls.Add(this.txtCampaignId);
            this.panel2.Controls.Add(this.label4);
            this.panel2.Controls.Add(this.label1);
            this.panel2.Controls.Add(this.btnLoadExcel);
            this.panel2.Controls.Add(this.label3);
            this.panel2.Controls.Add(this.cmbListNames);
            this.panel2.Controls.Add(this.lblCSVFile);
            this.panel2.Controls.Add(this.btnStart);
            this.panel2.Controls.Add(this.label2);
            this.panel2.Controls.Add(this.btnLoadCsv);
            this.panel2.Controls.Add(this.lblFileName);
            this.panel2.Dock = System.Windows.Forms.DockStyle.Top;
            this.panel2.Location = new System.Drawing.Point(0, 0);
            this.panel2.Name = "panel2";
            this.panel2.Size = new System.Drawing.Size(929, 136);
            this.panel2.TabIndex = 21;
            // 
            // panel3
            // 
            this.panel3.Controls.Add(this.tsProgress);
            this.panel3.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.panel3.Location = new System.Drawing.Point(0, 702);
            this.panel3.Name = "panel3";
            this.panel3.Size = new System.Drawing.Size(929, 25);
            this.panel3.TabIndex = 22;
            // 
            // tsProgress
            // 
            this.tsProgress.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tsProgress.Location = new System.Drawing.Point(0, 0);
            this.tsProgress.Name = "tsProgress";
            this.tsProgress.Size = new System.Drawing.Size(929, 25);
            this.tsProgress.TabIndex = 0;
            // 
            // panel4
            // 
            this.panel4.Controls.Add(this.grdExcelStatus);
            this.panel4.Controls.Add(this.panel3);
            this.panel4.Controls.Add(this.panel2);
            this.panel4.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel4.Location = new System.Drawing.Point(0, 0);
            this.panel4.Name = "panel4";
            this.panel4.Size = new System.Drawing.Size(929, 727);
            this.panel4.TabIndex = 23;
            // 
            // cShort
            // 
            this.cShort.AutoSize = true;
            this.cShort.Checked = true;
            this.cShort.CheckState = System.Windows.Forms.CheckState.Checked;
            this.cShort.Location = new System.Drawing.Point(35, 47);
            this.cShort.Name = "cShort";
            this.cShort.Size = new System.Drawing.Size(125, 19);
            this.cShort.TabIndex = 21;
            this.cShort.Text = "Короткий формат";
            this.cShort.UseVisualStyleBackColor = true;
            // 
            // frmLoadFileGMS
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(929, 727);
            this.Controls.Add(this.panel4);
            this.Font = new System.Drawing.Font("Calibri", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.Name = "frmLoadFileGMS";
            this.Text = "Завантаження статусів доставки GMS";
            ((System.ComponentModel.ISupportInitialize)(this.grdExcelStatus)).EndInit();
            this.panel2.ResumeLayout(false);
            this.panel2.PerformLayout();
            this.panel3.ResumeLayout(false);
            this.panel4.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox txtCampaignId;
        private System.Windows.Forms.Button btnLoadExcel;
        private System.Windows.Forms.Button btnLoadCsv;
        private System.Windows.Forms.DataGridView grdExcelStatus;
        private System.Windows.Forms.ComboBox cmbListNames;
        private System.Windows.Forms.Button btnStart;
        private System.ComponentModel.BackgroundWorker bWorker;
        private System.ComponentModel.BackgroundWorker bWorkerCSV;
        private System.Windows.Forms.Label lblFileName;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label lblCSVFile;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Panel panel2;
        private System.Windows.Forms.Panel panel3;
        private System.Windows.Forms.ProgressBar tsProgress;
        private System.Windows.Forms.Panel panel4;
        private System.Windows.Forms.CheckBox cShort;
    }
}