﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Este código fue generado por una herramienta.
//     Versión de runtime:4.0.30319.42000
//
//     Los cambios en este archivo podrían causar un comportamiento incorrecto y se perderán si
//     se vuelve a generar el código.
// </auto-generated>
//------------------------------------------------------------------------------

// 
// Microsoft.VSDesigner generó automáticamente este código fuente, versión=4.0.30319.42000.
// 
#pragma warning disable 1591

namespace Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.soap.servicioGestorSeguridadLogError {
    using System;
    using System.Web.Services;
    using System.Diagnostics;
    using System.Web.Services.Protocols;
    using System.Xml.Serialization;
    using System.ComponentModel;
    
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.8.9032.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Web.Services.WebServiceBindingAttribute(Name="BasicHttpBinding_IWCFSeguridadLog", Namespace="http://tempuri.org/")]
    [System.Xml.Serialization.XmlIncludeAttribute(typeof(coHBase))]
    public partial class WCFSeguridadLog : System.Web.Services.Protocols.SoapHttpClientProtocol {
        
        private System.Threading.SendOrPostCallback logOperationCompleted;
        
        private bool useDefaultCredentialsSetExplicitly;
        
        /// <remarks/>
        public WCFSeguridadLog() {
            this.Url = global::Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.Properties.Settings.Default.Utilitarios_soap_servicioGestorSeguridadLogError_WCFSeguridadLog;
            if ((this.IsLocalFileSystemWebService(this.Url) == true)) {
                this.UseDefaultCredentials = true;
                this.useDefaultCredentialsSetExplicitly = false;
            }
            else {
                this.useDefaultCredentialsSetExplicitly = true;
            }
        }
        
        public new string Url {
            get {
                return base.Url;
            }
            set {
                if ((((this.IsLocalFileSystemWebService(base.Url) == true) 
                            && (this.useDefaultCredentialsSetExplicitly == false)) 
                            && (this.IsLocalFileSystemWebService(value) == false))) {
                    base.UseDefaultCredentials = false;
                }
                base.Url = value;
            }
        }
        
        public new bool UseDefaultCredentials {
            get {
                return base.UseDefaultCredentials;
            }
            set {
                base.UseDefaultCredentials = value;
                this.useDefaultCredentialsSetExplicitly = true;
            }
        }
        
        /// <remarks/>
        public event logCompletedEventHandler logCompleted;
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/IWCFSeguridadLog/log", RequestNamespace="http://tempuri.org/", ResponseNamespace="http://tempuri.org/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        [return: System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public coResultadoDB log([System.Xml.Serialization.XmlElementAttribute(IsNullable=true)] enLogError oEnLogError) {
            object[] results = this.Invoke("log", new object[] {
                        oEnLogError});
            return ((coResultadoDB)(results[0]));
        }
        
        /// <remarks/>
        public void logAsync(enLogError oEnLogError) {
            this.logAsync(oEnLogError, null);
        }
        
        /// <remarks/>
        public void logAsync(enLogError oEnLogError, object userState) {
            if ((this.logOperationCompleted == null)) {
                this.logOperationCompleted = new System.Threading.SendOrPostCallback(this.OnlogOperationCompleted);
            }
            this.InvokeAsync("log", new object[] {
                        oEnLogError}, this.logOperationCompleted, userState);
        }
        
        private void OnlogOperationCompleted(object arg) {
            if ((this.logCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.logCompleted(this, new logCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        public new void CancelAsync(object userState) {
            base.CancelAsync(userState);
        }
        
        private bool IsLocalFileSystemWebService(string url) {
            if (((url == null) 
                        || (url == string.Empty))) {
                return false;
            }
            System.Uri wsUri = new System.Uri(url);
            if (((wsUri.Port >= 1024) 
                        && (string.Compare(wsUri.Host, "localHost", System.StringComparison.OrdinalIgnoreCase) == 0))) {
                return true;
            }
            return false;
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.8.9032.0")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(Namespace="http://schemas.datacontract.org/2004/07/Mincetur.Administracion.Seguridad.EnSegur" +
        "idad")]
    public partial class enLogError : coHBase {
        
        private string cOD_FUENTEField;
        
        private string cOD_LOGField;
        
        private string dES_ERRORField;
        
        private string dES_ESQField;
        
        private string dES_FUENTEField;
        
        private string dES_PAGINAOBJETOField;
        
        private string dES_PREFIJOField;
        
        private string dES_SISField;
        
        private System.DateTime fEC_CREAField;
        
        private bool fEC_CREAFieldSpecified;
        
        private System.DateTime fEC_FINField;
        
        private bool fEC_FINFieldSpecified;
        
        private int iD_LOGERRORField;
        
        private bool iD_LOGERRORFieldSpecified;
        
        private int iD_SISField;
        
        private bool iD_SISFieldSpecified;
        
        private string iP_CREAField;
        
        private string nOM_USUField;
        
        private string oPRField;
        
        private int uSU_CREAField;
        
        private bool uSU_CREAFieldSpecified;
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string COD_FUENTE {
            get {
                return this.cOD_FUENTEField;
            }
            set {
                this.cOD_FUENTEField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string COD_LOG {
            get {
                return this.cOD_LOGField;
            }
            set {
                this.cOD_LOGField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string DES_ERROR {
            get {
                return this.dES_ERRORField;
            }
            set {
                this.dES_ERRORField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string DES_ESQ {
            get {
                return this.dES_ESQField;
            }
            set {
                this.dES_ESQField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string DES_FUENTE {
            get {
                return this.dES_FUENTEField;
            }
            set {
                this.dES_FUENTEField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string DES_PAGINAOBJETO {
            get {
                return this.dES_PAGINAOBJETOField;
            }
            set {
                this.dES_PAGINAOBJETOField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string DES_PREFIJO {
            get {
                return this.dES_PREFIJOField;
            }
            set {
                this.dES_PREFIJOField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string DES_SIS {
            get {
                return this.dES_SISField;
            }
            set {
                this.dES_SISField = value;
            }
        }
        
        /// <remarks/>
        public System.DateTime FEC_CREA {
            get {
                return this.fEC_CREAField;
            }
            set {
                this.fEC_CREAField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool FEC_CREASpecified {
            get {
                return this.fEC_CREAFieldSpecified;
            }
            set {
                this.fEC_CREAFieldSpecified = value;
            }
        }
        
        /// <remarks/>
        public System.DateTime FEC_FIN {
            get {
                return this.fEC_FINField;
            }
            set {
                this.fEC_FINField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool FEC_FINSpecified {
            get {
                return this.fEC_FINFieldSpecified;
            }
            set {
                this.fEC_FINFieldSpecified = value;
            }
        }
        
        /// <remarks/>
        public int ID_LOGERROR {
            get {
                return this.iD_LOGERRORField;
            }
            set {
                this.iD_LOGERRORField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool ID_LOGERRORSpecified {
            get {
                return this.iD_LOGERRORFieldSpecified;
            }
            set {
                this.iD_LOGERRORFieldSpecified = value;
            }
        }
        
        /// <remarks/>
        public int ID_SIS {
            get {
                return this.iD_SISField;
            }
            set {
                this.iD_SISField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool ID_SISSpecified {
            get {
                return this.iD_SISFieldSpecified;
            }
            set {
                this.iD_SISFieldSpecified = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string IP_CREA {
            get {
                return this.iP_CREAField;
            }
            set {
                this.iP_CREAField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string NOM_USU {
            get {
                return this.nOM_USUField;
            }
            set {
                this.nOM_USUField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string OPR {
            get {
                return this.oPRField;
            }
            set {
                this.oPRField = value;
            }
        }
        
        /// <remarks/>
        public int USU_CREA {
            get {
                return this.uSU_CREAField;
            }
            set {
                this.uSU_CREAField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool USU_CREASpecified {
            get {
                return this.uSU_CREAFieldSpecified;
            }
            set {
                this.uSU_CREAFieldSpecified = value;
            }
        }
    }
    
    /// <remarks/>
    [System.Xml.Serialization.XmlIncludeAttribute(typeof(enLogError))]
    [System.Xml.Serialization.XmlIncludeAttribute(typeof(coResultadoDB))]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.8.9032.0")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(Namespace="http://schemas.datacontract.org/2004/07/Mincetur.Administracion.Seguridad.CoSegur" +
        "idad")]
    public partial class coHBase {
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.8.9032.0")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(Namespace="http://schemas.datacontract.org/2004/07/Mincetur.Administracion.Seguridad.CoSegur" +
        "idad")]
    public partial class coResultadoDB : coHBase {
        
        private string dES_ERRORField;
        
        private string iD_ERRORField;
        
        private int iD_TIPOField;
        
        private bool iD_TIPOFieldSpecified;
        
        private int vALORField;
        
        private bool vALORFieldSpecified;
        
        private int vALOR1Field;
        
        private bool vALOR1FieldSpecified;
        
        private int vALOR10Field;
        
        private bool vALOR10FieldSpecified;
        
        private int vALOR2Field;
        
        private bool vALOR2FieldSpecified;
        
        private int vALOR3Field;
        
        private bool vALOR3FieldSpecified;
        
        private int vALOR4Field;
        
        private bool vALOR4FieldSpecified;
        
        private int vALOR5Field;
        
        private bool vALOR5FieldSpecified;
        
        private int vALOR6Field;
        
        private bool vALOR6FieldSpecified;
        
        private int vALOR7Field;
        
        private bool vALOR7FieldSpecified;
        
        private int vALOR8Field;
        
        private bool vALOR8FieldSpecified;
        
        private int vALOR9Field;
        
        private bool vALOR9FieldSpecified;
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string DES_ERROR {
            get {
                return this.dES_ERRORField;
            }
            set {
                this.dES_ERRORField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string ID_ERROR {
            get {
                return this.iD_ERRORField;
            }
            set {
                this.iD_ERRORField = value;
            }
        }
        
        /// <remarks/>
        public int ID_TIPO {
            get {
                return this.iD_TIPOField;
            }
            set {
                this.iD_TIPOField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool ID_TIPOSpecified {
            get {
                return this.iD_TIPOFieldSpecified;
            }
            set {
                this.iD_TIPOFieldSpecified = value;
            }
        }
        
        /// <remarks/>
        public int VALOR {
            get {
                return this.vALORField;
            }
            set {
                this.vALORField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool VALORSpecified {
            get {
                return this.vALORFieldSpecified;
            }
            set {
                this.vALORFieldSpecified = value;
            }
        }
        
        /// <remarks/>
        public int VALOR1 {
            get {
                return this.vALOR1Field;
            }
            set {
                this.vALOR1Field = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool VALOR1Specified {
            get {
                return this.vALOR1FieldSpecified;
            }
            set {
                this.vALOR1FieldSpecified = value;
            }
        }
        
        /// <remarks/>
        public int VALOR10 {
            get {
                return this.vALOR10Field;
            }
            set {
                this.vALOR10Field = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool VALOR10Specified {
            get {
                return this.vALOR10FieldSpecified;
            }
            set {
                this.vALOR10FieldSpecified = value;
            }
        }
        
        /// <remarks/>
        public int VALOR2 {
            get {
                return this.vALOR2Field;
            }
            set {
                this.vALOR2Field = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool VALOR2Specified {
            get {
                return this.vALOR2FieldSpecified;
            }
            set {
                this.vALOR2FieldSpecified = value;
            }
        }
        
        /// <remarks/>
        public int VALOR3 {
            get {
                return this.vALOR3Field;
            }
            set {
                this.vALOR3Field = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool VALOR3Specified {
            get {
                return this.vALOR3FieldSpecified;
            }
            set {
                this.vALOR3FieldSpecified = value;
            }
        }
        
        /// <remarks/>
        public int VALOR4 {
            get {
                return this.vALOR4Field;
            }
            set {
                this.vALOR4Field = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool VALOR4Specified {
            get {
                return this.vALOR4FieldSpecified;
            }
            set {
                this.vALOR4FieldSpecified = value;
            }
        }
        
        /// <remarks/>
        public int VALOR5 {
            get {
                return this.vALOR5Field;
            }
            set {
                this.vALOR5Field = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool VALOR5Specified {
            get {
                return this.vALOR5FieldSpecified;
            }
            set {
                this.vALOR5FieldSpecified = value;
            }
        }
        
        /// <remarks/>
        public int VALOR6 {
            get {
                return this.vALOR6Field;
            }
            set {
                this.vALOR6Field = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool VALOR6Specified {
            get {
                return this.vALOR6FieldSpecified;
            }
            set {
                this.vALOR6FieldSpecified = value;
            }
        }
        
        /// <remarks/>
        public int VALOR7 {
            get {
                return this.vALOR7Field;
            }
            set {
                this.vALOR7Field = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool VALOR7Specified {
            get {
                return this.vALOR7FieldSpecified;
            }
            set {
                this.vALOR7FieldSpecified = value;
            }
        }
        
        /// <remarks/>
        public int VALOR8 {
            get {
                return this.vALOR8Field;
            }
            set {
                this.vALOR8Field = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool VALOR8Specified {
            get {
                return this.vALOR8FieldSpecified;
            }
            set {
                this.vALOR8FieldSpecified = value;
            }
        }
        
        /// <remarks/>
        public int VALOR9 {
            get {
                return this.vALOR9Field;
            }
            set {
                this.vALOR9Field = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool VALOR9Specified {
            get {
                return this.vALOR9FieldSpecified;
            }
            set {
                this.vALOR9FieldSpecified = value;
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.8.9032.0")]
    public delegate void logCompletedEventHandler(object sender, logCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.8.9032.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class logCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal logCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public coResultadoDB Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((coResultadoDB)(this.results[0]));
            }
        }
    }
}

#pragma warning restore 1591