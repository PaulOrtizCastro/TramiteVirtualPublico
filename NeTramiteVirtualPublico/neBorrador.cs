using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico
{
    public class neBorrador : coHBase
    {
        public coResultadoDB traeCorrelativoBorrador(enBorrador objEnBorrador)
        {
            
            coResultadoDB objCoResultadoDb = new coResultadoDB()
            {
                ID_TIPO = 2,
                DES_ERROR = "No es documento digital"
            };

            using (daTrazabilidad objDaTrazabilidad = new daTrazabilidad())
            {
                string value = objDaTrazabilidad.traeCorrelativoBorrador(objEnBorrador);

                if (value.Contains("|"))
                    objCoResultadoDb = new coResultadoDB()
                    {
                        ID_TIPO = 0,
                        DES_ERROR = "Es documento digital",
                        VALOR = value.Split('|')[0],
                        VALOR1 = value.Split('|')[1]
                    };
                else objCoResultadoDb = new coResultadoDB()
                {
                    ID_TIPO = 1,
                    DES_ERROR = value.ToString()
                };
            }
            return objCoResultadoDb;
        }
    }
}
