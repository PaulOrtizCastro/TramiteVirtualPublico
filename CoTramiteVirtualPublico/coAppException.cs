using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico
{
    public class coAppException : ApplicationException
    {
        public coAppException() : base() { }
        public coAppException(string message) : base(message) { }
        public coAppException(string message, Exception inner) : base(message, inner) { }
    }
}
