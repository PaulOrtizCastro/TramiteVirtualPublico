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

namespace Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.soap.ServicioGeneralUtil.Estorg {
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
    [System.Web.Services.WebServiceBindingAttribute(Name="BasicHttpBinding_IWCFGeneralesEstorg", Namespace="http://tempuri.org/")]
    public partial class WCFGeneralesEstorg : System.Web.Services.Protocols.SoapHttpClientProtocol {
        
        private System.Threading.SendOrPostCallback listarEstorgOperationCompleted;
        
        private bool useDefaultCredentialsSetExplicitly;
        
        /// <remarks/>
        public WCFGeneralesEstorg() {
            this.Url = global::Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.Properties.Settings.Default.Utilitarios_soap_ServicioGeneralUtil_Estorg_WCFGeneralesEstorg;
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
        public event listarEstorgCompletedEventHandler listarEstorgCompleted;
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/IWCFGeneralesEstorg/listarEstorg", RequestNamespace="http://tempuri.org/", ResponseNamespace="http://tempuri.org/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        [return: System.Xml.Serialization.XmlArrayAttribute(IsNullable=true)]
        [return: System.Xml.Serialization.XmlArrayItemAttribute(Namespace="http://schemas.datacontract.org/2004/07/Mincetur.Administracion.GeneralesUtil.EnG" +
            "eneralesUtil")]
        public enEstorg[] listarEstorg([System.Xml.Serialization.XmlElementAttribute(IsNullable=true)] enEstorg oEnEstorg) {
            object[] results = this.Invoke("listarEstorg", new object[] {
                        oEnEstorg});
            return ((enEstorg[])(results[0]));
        }
        
        /// <remarks/>
        public void listarEstorgAsync(enEstorg oEnEstorg) {
            this.listarEstorgAsync(oEnEstorg, null);
        }
        
        /// <remarks/>
        public void listarEstorgAsync(enEstorg oEnEstorg, object userState) {
            if ((this.listarEstorgOperationCompleted == null)) {
                this.listarEstorgOperationCompleted = new System.Threading.SendOrPostCallback(this.OnlistarEstorgOperationCompleted);
            }
            this.InvokeAsync("listarEstorg", new object[] {
                        oEnEstorg}, this.listarEstorgOperationCompleted, userState);
        }
        
        private void OnlistarEstorgOperationCompleted(object arg) {
            if ((this.listarEstorgCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.listarEstorgCompleted(this, new listarEstorgCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
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
    [System.Xml.Serialization.XmlTypeAttribute(Namespace="http://schemas.datacontract.org/2004/07/Mincetur.Administracion.GeneralesUtil.EnG" +
        "eneralesUtil")]
    public partial class enEstorg {
        
        private string aBR_SUBOFIField;
        
        private string dES_SUBOFIField;
        
        private System.DateTime fEC_CREAField;
        
        private bool fEC_CREAFieldSpecified;
        
        private System.DateTime fEC_FINField;
        
        private bool fEC_FINFieldSpecified;
        
        private System.DateTime fEC_INIField;
        
        private bool fEC_INIFieldSpecified;
        
        private System.DateTime fEC_MODIField;
        
        private bool fEC_MODIFieldSpecified;
        
        private int fLG_ESTField;
        
        private bool fLG_ESTFieldSpecified;
        
        private string iD_OFICONCField;
        
        private int iD_SUBField;
        
        private bool iD_SUBFieldSpecified;
        
        private string iD_SUBOFIField;
        
        private int nUM_NIVELField;
        
        private bool nUM_NIVELFieldSpecified;
        
        private string oPRField;
        
        private int uSU_CREAField;
        
        private bool uSU_CREAFieldSpecified;
        
        private int uSU_MODIField;
        
        private bool uSU_MODIFieldSpecified;
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string ABR_SUBOFI {
            get {
                return this.aBR_SUBOFIField;
            }
            set {
                this.aBR_SUBOFIField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string DES_SUBOFI {
            get {
                return this.dES_SUBOFIField;
            }
            set {
                this.dES_SUBOFIField = value;
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
        public System.DateTime FEC_INI {
            get {
                return this.fEC_INIField;
            }
            set {
                this.fEC_INIField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool FEC_INISpecified {
            get {
                return this.fEC_INIFieldSpecified;
            }
            set {
                this.fEC_INIFieldSpecified = value;
            }
        }
        
        /// <remarks/>
        public System.DateTime FEC_MODI {
            get {
                return this.fEC_MODIField;
            }
            set {
                this.fEC_MODIField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool FEC_MODISpecified {
            get {
                return this.fEC_MODIFieldSpecified;
            }
            set {
                this.fEC_MODIFieldSpecified = value;
            }
        }
        
        /// <remarks/>
        public int FLG_EST {
            get {
                return this.fLG_ESTField;
            }
            set {
                this.fLG_ESTField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool FLG_ESTSpecified {
            get {
                return this.fLG_ESTFieldSpecified;
            }
            set {
                this.fLG_ESTFieldSpecified = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string ID_OFICONC {
            get {
                return this.iD_OFICONCField;
            }
            set {
                this.iD_OFICONCField = value;
            }
        }
        
        /// <remarks/>
        public int ID_SUB {
            get {
                return this.iD_SUBField;
            }
            set {
                this.iD_SUBField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool ID_SUBSpecified {
            get {
                return this.iD_SUBFieldSpecified;
            }
            set {
                this.iD_SUBFieldSpecified = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string ID_SUBOFI {
            get {
                return this.iD_SUBOFIField;
            }
            set {
                this.iD_SUBOFIField = value;
            }
        }
        
        /// <remarks/>
        public int NUM_NIVEL {
            get {
                return this.nUM_NIVELField;
            }
            set {
                this.nUM_NIVELField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool NUM_NIVELSpecified {
            get {
                return this.nUM_NIVELFieldSpecified;
            }
            set {
                this.nUM_NIVELFieldSpecified = value;
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
        
        /// <remarks/>
        public int USU_MODI {
            get {
                return this.uSU_MODIField;
            }
            set {
                this.uSU_MODIField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool USU_MODISpecified {
            get {
                return this.uSU_MODIFieldSpecified;
            }
            set {
                this.uSU_MODIFieldSpecified = value;
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.8.9032.0")]
    public delegate void listarEstorgCompletedEventHandler(object sender, listarEstorgCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.8.9032.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class listarEstorgCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal listarEstorgCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public enEstorg[] Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((enEstorg[])(this.results[0]));
            }
        }
    }
}

#pragma warning restore 1591