﻿using System;
using System.Windows.Forms;
using SoftLineApi;

namespace WinTest
{
    public partial class TestRequestForm : Form
    {
        public TestRequestForm()
        {
            InitializeComponent();
        }

        private void btnRequest_Click(object sender, EventArgs e)
        {
            Api api = new Api();

            string message = api.Request("1461886");

            MessageBox.Show(message);
        }
    }
}
