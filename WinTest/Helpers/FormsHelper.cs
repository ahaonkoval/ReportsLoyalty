using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
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
