using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico
{
    public abstract class neBase : IDisposable
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
    }
}
