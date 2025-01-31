using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico
{
    public abstract class coHBase : IDisposable
    {
        public int ID_SIS { get; set; }
        public int OPR { get; set; }
        public string STR_OPR { get; set; }
        public string DATO { get; set; }
        public string FLG_EST { set; get; }

        public int USU_CREA { get; set; }
        public DateTime FEC_CREA { get; set; }
        public int USU_MODI { get; set; }
        public DateTime FEC_MODI { get; set; }
        public string IP { set; get; }
        public int ID_USU { get; set; }



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

        //public bool esValorNull(object obj)
        //{            
        //    if (obj is string) {

        //    }
        //    else if ((obj) is int | (obj) is Int64 | (obj) is Int16 | (obj) is uint) {

        //    }
        //    else if ((obj) is double | (obj) is decimal) {

        //    }
        //    else if ((obj) is DateTime) {

        //    } else {

        //    }
        //}
    }
}
