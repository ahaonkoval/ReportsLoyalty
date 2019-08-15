using System;
using System.Windows.Forms;

namespace WinTest
{
    public partial class LoaderForm : Form
    {
        private int childFormNumber = 0;

        private string ConnectionString
        {
            get
            {
                return "data source=10.7.131.218;initial catalog=crm_wizard;persist security info=True;user id=crm_wizard;password=andre2013;multipleactiveresultsets=True;connect timeout=1200000000";
            }
        }

        public LoaderForm()
        {
            InitializeComponent();
        }

        private void ShowNewForm(object sender, EventArgs e)
        {
            Form childForm = new Form();
            childForm.MdiParent = this;
            childForm.Text = "Окно " + childFormNumber++;
            childForm.Show();
        }

        private void OpenFile(object sender, EventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            openFileDialog.InitialDirectory = Environment.GetFolderPath(Environment.SpecialFolder.Personal);
            openFileDialog.Filter = "Текстовые файлы (*.txt)|*.txt|Все файлы (*.*)|*.*";
            if (openFileDialog.ShowDialog(this) == DialogResult.OK)
            {
                string FileName = openFileDialog.FileName;
            }
        }

        private void SaveAsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            SaveFileDialog saveFileDialog = new SaveFileDialog();
            saveFileDialog.InitialDirectory = Environment.GetFolderPath(Environment.SpecialFolder.Personal);
            saveFileDialog.Filter = "Текстовые файлы (*.txt)|*.txt|Все файлы (*.*)|*.*";
            if (saveFileDialog.ShowDialog(this) == DialogResult.OK)
            {
                string FileName = saveFileDialog.FileName;
            }
        }

        private void ExitToolsStripMenuItem_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void завантажитиСтатусиЗAPIToolStripMenuItem_Click(object sender, EventArgs e)
        {
            DownloadSoftLineStatusForm frm = new DownloadSoftLineStatusForm();
            frm.MdiParent = this;
            frm.Show();
        }

        private void завантажитиСтатусиЗФайлаToolStripMenuItem_Click(object sender, EventArgs e)
        {
            frmLoadFileSoftLine frm = new WinTest.frmLoadFileSoftLine();
            frm.MdiParent = this;
            frm.Show();
        }

        private void menuGetData_Click(object sender, EventArgs e)
        {
            frmGetData frm = new frmGetData(ConnectionString);
            frm.MdiParent = this;
            frm.Show();
        }

        private void mcChangeStructure_Click(object sender, EventArgs e)
        {
            WinLoader.FrmChangingStructure frmChangingStructure = new WinLoader.FrmChangingStructure(ConnectionString);
            frmChangingStructure.MdiParent = this;
            frmChangingStructure.Show();
        }

        private void mcTestDownload_Click(object sender, EventArgs e)
        {
            WinLoader.FrmTestDownload frm = new WinLoader.FrmTestDownload(ConnectionString);
            frm.MdiParent = this;
            frm.Show();
        }

        private void mLoadStatusGms_Click(object sender, EventArgs e)
        {
            frmLoadFileGMS fLoadFileGMS = new frmLoadFileGMS();
            fLoadFileGMS.MdiParent = this;
            fLoadFileGMS.Show();
        }

        private void mntSell_Click(object sender, EventArgs e)
        {
            frmGetDataFlowers frmDataFlowers = new frmGetDataFlowers(ConnectionString);
            frmDataFlowers.MdiParent = this;
            frmDataFlowers.Show();
        }

        private void mLoadStatusSoftlineNew_Click(object sender, EventArgs e)
        {
            frmLoadFileSoftLineOtherFormat frm = new frmLoadFileSoftLineOtherFormat();
            frm.MdiParent = this;
            frm.Show();
        }
    }
}
