namespace WinTest
{
    partial class TestRequestForm
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
            this.lstStatus = new System.Windows.Forms.ListBox();
            this.btnRequestNew = new System.Windows.Forms.Button();
            this.backgroundWorker1 = new System.ComponentModel.BackgroundWorker();
            this.SuspendLayout();
            // 
            // lstStatus
            // 
            this.lstStatus.FormattingEnabled = true;
            this.lstStatus.ItemHeight = 15;
            this.lstStatus.Location = new System.Drawing.Point(12, 12);
            this.lstStatus.Name = "lstStatus";
            this.lstStatus.Size = new System.Drawing.Size(343, 274);
            this.lstStatus.TabIndex = 1;
            // 
            // btnRequestNew
            // 
            this.btnRequestNew.Location = new System.Drawing.Point(12, 294);
            this.btnRequestNew.Name = "btnRequestNew";
            this.btnRequestNew.Size = new System.Drawing.Size(343, 27);
            this.btnRequestNew.TabIndex = 4;
            this.btnRequestNew.Text = "Request";
            this.btnRequestNew.UseVisualStyleBackColor = true;
            this.btnRequestNew.Click += new System.EventHandler(this.btnRequestNew_Click);
            // 
            // backgroundWorker1
            // 
            this.backgroundWorker1.DoWork += new System.ComponentModel.DoWorkEventHandler(this.backgroundWorker1_DoWork);
            // 
            // TestRequestForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(367, 333);
            this.Controls.Add(this.btnRequestNew);
            this.Controls.Add(this.lstStatus);
            this.Font = new System.Drawing.Font("Calibri", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.Name = "TestRequestForm";
            this.Text = "TestRequestForm";
            this.ResumeLayout(false);

        }

        #endregion
        private System.Windows.Forms.ListBox lstStatus;
        private System.Windows.Forms.Button btnRequestNew;
        private System.ComponentModel.BackgroundWorker backgroundWorker1;
    }
}

