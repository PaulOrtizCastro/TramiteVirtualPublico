using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico
{
    public abstract class enBase : IDisposable
    {
        // Para detectar llamadas redundantes
        private bool disposedValue = false;
        // IDisposable
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposedValue)
            {
                if (disposing)
                {
                    // TODO: Liberar recursos administrados cuando se llamen explícitamente
                }

                // TODO: Liberar recursos no administrados compartidos
            }
            this.disposedValue = true;
        }
        #region IDisposable Support
        // C# agregó este código para implementar correctamente el modelo descartable.
        public void Dispose()
        {
            // No cambie este código. Coloque el código de limpieza en Dispose (disposing que se dispone como Boolean).
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        #endregion

        public long USU_CREA { set; get; }
        public string IP_CREA { set; get; }
        public int USU_MODI { set; get; }
        public DateTime FEC_CREA { set; get; }
        public DateTime FEC_MODI { set; get; }
        public string IP_MODI { set; get; }
        public int FLG_EST { set; get; }
        public string OPR { set; get; }
        public int ID_USU { set; get; }
        public int ID_SIS { set; get; }
        public string IP { set; get; }
        public string DES_ERROR { set; get; }
        public int ID_ERROR { set; get; }
        public string Message { set; get; }
        public string DATO { set; get; }
        public bool Success { set; get; }
        public int ID_ANO_PROC { get; set; }
        public int ID_TIP_DOC { get; set; }
        public int ID_SUB { get; set; }
        public string ID_SUBOFI { get; set; }
        public int ID_ESTADO { get; set; }
        public string NUM_DOC { get; set; }
        public string DES_COMENT { get; set; }
        public string DES_OBS { get; set; }
        public DateTime FEC_INI { set; get; }
        public DateTime FEC_FIN { set; get; }
        public string COD_LOG { get; set; }
        public DateTime FEC_VIGE { set; get; }
        public DateTime FEC_REG { set; get; }
        
        
        
    }
}
