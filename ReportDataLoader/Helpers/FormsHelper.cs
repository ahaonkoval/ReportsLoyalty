using System.Windows.Forms;

namespace WinLoader.Helpers
{
    public static class FormsHelper
    {
        public static void SetEnabled(Form current, bool Enabled)
        {
            foreach (Control c in current.Controls)
            {
                c.Enabled = Enabled;
            }
        }
    }
}
