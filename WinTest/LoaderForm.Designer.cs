namespace WinTest
{
    partial class LoaderForm
    {
        /// <summary>
        /// Обязательная переменная конструктора.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Освободить все используемые ресурсы.
        /// </summary>
        /// <param name="disposing">истинно, если управляемый ресурс должен быть удален; иначе ложно.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Код, автоматически созданный конструктором форм Windows

        /// <summary>
        /// Требуемый метод для поддержки конструктора — не изменяйте 
        /// содержимое этого метода с помощью редактора кода.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.menuStrip = new System.Windows.Forms.MenuStrip();
            this.fileMenu = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator5 = new System.Windows.Forms.ToolStripSeparator();
            this.завантажитиСтатусиЗAPIToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.завантажитиСтатусиЗФайлаToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator1 = new System.Windows.Forms.ToolStripSeparator();
            this.exitToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.вигрузкиToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.menuGetData = new System.Windows.Forms.ToolStripMenuItem();
            this.mcChangeStructure = new System.Windows.Forms.ToolStripMenuItem();
            this.statusStrip = new System.Windows.Forms.StatusStrip();
            this.toolStripStatusLabel = new System.Windows.Forms.ToolStripStatusLabel();
            this.toolTip = new System.Windows.Forms.ToolTip(this.components);
            this.mcTestDownload = new System.Windows.Forms.ToolStripMenuItem();
            this.menuStrip.SuspendLayout();
            this.statusStrip.SuspendLayout();
            this.SuspendLayout();
            // 
            // menuStrip
            // 
            this.menuStrip.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.fileMenu,
            this.вигрузкиToolStripMenuItem});
            this.menuStrip.Location = new System.Drawing.Point(0, 0);
            this.menuStrip.Name = "menuStrip";
            this.menuStrip.Size = new System.Drawing.Size(1127, 24);
            this.menuStrip.TabIndex = 0;
            this.menuStrip.Text = "MenuStrip";
            // 
            // fileMenu
            // 
            this.fileMenu.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.toolStripSeparator5,
            this.завантажитиСтатусиЗAPIToolStripMenuItem,
            this.завантажитиСтатусиЗФайлаToolStripMenuItem,
            this.toolStripSeparator1,
            this.exitToolStripMenuItem});
            this.fileMenu.ImageTransparentColor = System.Drawing.SystemColors.ActiveBorder;
            this.fileMenu.Name = "fileMenu";
            this.fileMenu.Size = new System.Drawing.Size(97, 20);
            this.fileMenu.Text = "&Завантаження";
            // 
            // toolStripSeparator5
            // 
            this.toolStripSeparator5.Name = "toolStripSeparator5";
            this.toolStripSeparator5.Size = new System.Drawing.Size(232, 6);
            // 
            // завантажитиСтатусиЗAPIToolStripMenuItem
            // 
            this.завантажитиСтатусиЗAPIToolStripMenuItem.Name = "завантажитиСтатусиЗAPIToolStripMenuItem";
            this.завантажитиСтатусиЗAPIToolStripMenuItem.Size = new System.Drawing.Size(235, 22);
            this.завантажитиСтатусиЗAPIToolStripMenuItem.Text = "Завантажити статуси з API";
            this.завантажитиСтатусиЗAPIToolStripMenuItem.Click += new System.EventHandler(this.завантажитиСтатусиЗAPIToolStripMenuItem_Click);
            // 
            // завантажитиСтатусиЗФайлаToolStripMenuItem
            // 
            this.завантажитиСтатусиЗФайлаToolStripMenuItem.Name = "завантажитиСтатусиЗФайлаToolStripMenuItem";
            this.завантажитиСтатусиЗФайлаToolStripMenuItem.Size = new System.Drawing.Size(235, 22);
            this.завантажитиСтатусиЗФайлаToolStripMenuItem.Text = "Завантажити статуси з файла";
            this.завантажитиСтатусиЗФайлаToolStripMenuItem.Click += new System.EventHandler(this.завантажитиСтатусиЗФайлаToolStripMenuItem_Click);
            // 
            // toolStripSeparator1
            // 
            this.toolStripSeparator1.Name = "toolStripSeparator1";
            this.toolStripSeparator1.Size = new System.Drawing.Size(232, 6);
            // 
            // exitToolStripMenuItem
            // 
            this.exitToolStripMenuItem.Name = "exitToolStripMenuItem";
            this.exitToolStripMenuItem.Size = new System.Drawing.Size(235, 22);
            this.exitToolStripMenuItem.Text = "В&ыход";
            this.exitToolStripMenuItem.Click += new System.EventHandler(this.ExitToolsStripMenuItem_Click);
            // 
            // вигрузкиToolStripMenuItem
            // 
            this.вигрузкиToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.menuGetData,
            this.mcChangeStructure,
            this.mcTestDownload});
            this.вигрузкиToolStripMenuItem.Name = "вигрузкиToolStripMenuItem";
            this.вигрузкиToolStripMenuItem.Size = new System.Drawing.Size(69, 20);
            this.вигрузкиToolStripMenuItem.Text = "Вигрузки";
            // 
            // menuGetData
            // 
            this.menuGetData.Name = "menuGetData";
            this.menuGetData.Size = new System.Drawing.Size(221, 22);
            this.menuGetData.Text = "Чеки з Умовами";
            this.menuGetData.Click += new System.EventHandler(this.menuGetData_Click);
            // 
            // mcChangeStructure
            // 
            this.mcChangeStructure.Name = "mcChangeStructure";
            this.mcChangeStructure.Size = new System.Drawing.Size(221, 22);
            this.mcChangeStructure.Text = "Зміна структури по візитах";
            this.mcChangeStructure.Click += new System.EventHandler(this.mcChangeStructure_Click);
            // 
            // statusStrip
            // 
            this.statusStrip.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.toolStripStatusLabel});
            this.statusStrip.Location = new System.Drawing.Point(0, 876);
            this.statusStrip.Name = "statusStrip";
            this.statusStrip.Size = new System.Drawing.Size(1127, 22);
            this.statusStrip.TabIndex = 2;
            this.statusStrip.Text = "StatusStrip";
            // 
            // toolStripStatusLabel
            // 
            this.toolStripStatusLabel.Name = "toolStripStatusLabel";
            this.toolStripStatusLabel.Size = new System.Drawing.Size(66, 17);
            this.toolStripStatusLabel.Text = "Состояние";
            // 
            // mcTestDownload
            // 
            this.mcTestDownload.Name = "mcTestDownload";
            this.mcTestDownload.Size = new System.Drawing.Size(221, 22);
            this.mcTestDownload.Text = "Тест";
            this.mcTestDownload.Click += new System.EventHandler(this.mcTestDownload_Click);
            // 
            // LoaderForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1127, 898);
            this.Controls.Add(this.statusStrip);
            this.Controls.Add(this.menuStrip);
            this.IsMdiContainer = true;
            this.MainMenuStrip = this.menuStrip;
            this.Name = "LoaderForm";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Заванатжувач";
            this.menuStrip.ResumeLayout(false);
            this.menuStrip.PerformLayout();
            this.statusStrip.ResumeLayout(false);
            this.statusStrip.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }
        #endregion


        private System.Windows.Forms.MenuStrip menuStrip;
        private System.Windows.Forms.StatusStrip statusStrip;
        private System.Windows.Forms.ToolStripSeparator toolStripSeparator5;
        private System.Windows.Forms.ToolStripStatusLabel toolStripStatusLabel;
        private System.Windows.Forms.ToolStripMenuItem fileMenu;
        private System.Windows.Forms.ToolStripMenuItem exitToolStripMenuItem;
        private System.Windows.Forms.ToolTip toolTip;
        private System.Windows.Forms.ToolStripMenuItem завантажитиСтатусиЗAPIToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem завантажитиСтатусиЗФайлаToolStripMenuItem;
        private System.Windows.Forms.ToolStripSeparator toolStripSeparator1;
        private System.Windows.Forms.ToolStripMenuItem вигрузкиToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem menuGetData;
        private System.Windows.Forms.ToolStripMenuItem mcChangeStructure;
        private System.Windows.Forms.ToolStripMenuItem mcTestDownload;
    }
}



