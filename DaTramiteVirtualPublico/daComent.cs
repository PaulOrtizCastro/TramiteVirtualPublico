using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Oracle.DataAccess.Client;
using System.Data;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico.DataBaseHelpers;
using Mincetur.Administracion.GeneralesUtil.EnGeneralesUtil;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;


namespace Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico
{
    public class daComent : daBase
    {
        public coResultadoDB mantenimiento(enComent objEn)
        {
            coResultadoDB objCoResultadoDB = null;

            OracleParameter[] arrParameters = new OracleParameter[] {
                new OracleParameter("X_ID_EXPE",validarNulo(objEn.ID_EXPE)),           
                new OracleParameter("X_ID_MOVI",validarNulo(objEn.ID_MOVI)),           
                new OracleParameter("X_ID_COMENT",validarNulo(objEn.ID_COMENT)),           
                new OracleParameter("X_FEC_COMENT",validarNulo(objEn.FEC_COMENT)),           
                new OracleParameter("X_DES_OBS",validarNulo(objEn.DES_COMENT)),           
                new OracleParameter("X_FEC_INI",validarNulo(objEn.FEC_INI)),                                
                new OracleParameter("X_ID_USU",validarNulo(objEn.ID_USU)),
                new OracleParameter("X_ID_SIS",validarNulo(objEn.ID_SIS)),                                     
                new OracleParameter("X_IP",validarNulo(objEn.IP)),           
                new OracleParameter("X_OPR",validarNulo(objEn.OPR)),           
                new OracleParameter("X_ERROR", OracleDbType.RefCursor, direction: System.Data.ParameterDirection.InputOutput)                
            };
            using (daUDml objDaUDml = new daUDml())
            {
                objCoResultadoDB = objDaUDml.ejecutarDml(arrParameters, "INSDBA.PKG_TDOMANT.PRC_TDO2COMENT");
            }
            return objCoResultadoDB;
        }
    }
}
