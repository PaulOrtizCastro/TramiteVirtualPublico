using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mincetur.SG.OI.Publico.App_Code
{
    public class constante
    {
        public static string mapPath(String cadena, String archivo)
        {
            return System.IO.Path.Combine(HttpRuntime.AppDomainAppPath, cadena.Replace("/", "\\"), archivo);
        }
        
    }
}