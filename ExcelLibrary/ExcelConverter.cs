using Excel;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MicrosoftExcel = Microsoft.Office.Interop.Excel;

namespace ExcelLibrary
{
    public class ExcelConverter: IDisposable
    {
        public FileInfo ExcelFile { get; set; }

        public MicrosoftExcel.Application ExcelApplication;
        public MicrosoftExcel.Window ExcelWindow;
        private MicrosoftExcel.Range ExcelCells;

        private MicrosoftExcel.Sheets ExcelSheets;
        private MicrosoftExcel.Worksheet ExcelWorksheet;

        public DataSet ExcelDataSet { get; set; }

        public bool IsTrueLoad {get; set; }

        //public DataTable REESTR { get { return this.ExcelDataSet.Tables["РЕЕСТР"]; } }

        #region Constructor
        public ExcelConverter(FileInfo excelFile)
        {
            this.ExcelFile = excelFile;
            this.IsTrueLoad = CreateDataSet();
        }

        public ExcelConverter(string filepath)
        {
            this.ExcelFile = new FileInfo(filepath);
            this.IsTrueLoad = CreateDataSet();
        }
        #endregion

        #region Private
        bool CreateDataSet()
        {
            if (File.Exists(ExcelFile.FullName))
            {
                try
                {
                    FileStream stream = File.Open(ExcelFile.FullName, FileMode.Open, FileAccess.Read);

                    IExcelDataReader excelReaderXml = ExcelReaderFactory.CreateOpenXmlReader(stream);
                    excelReaderXml.IsFirstRowAsColumnNames = true;
                    this.ExcelDataSet = excelReaderXml.AsDataSet();

                    if (ExcelDataSet == null)
                    {
                        stream = File.Open(ExcelFile.FullName, FileMode.Open, FileAccess.Read);
                        IExcelDataReader excelReaderBinary = ExcelReaderFactory.CreateBinaryReader(stream);
                        excelReaderBinary.IsFirstRowAsColumnNames = true;
                        this.ExcelDataSet = excelReaderBinary.AsDataSet();                        
                    }
                    return true;
                }
                catch
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        #endregion

        #region Public

        #endregion

        #region Static
        #endregion

        public void Dispose()
        {
            //Dispose(true);
            // This object will be cleaned up by the Dispose method. 
            // Therefore, you should call GC.SupressFinalize to 
            // take this object off the finalization queue 
            // and prevent finalization code for this object 
            // from executing a second time.
            SetNull();
            GC.SuppressFinalize(this);
        }

        void SetNull()
        {
            ExcelDataSet = null;
            ExcelApplication = null;
            ExcelWindow = null;
            ExcelCells = null;

        }
    }
}
