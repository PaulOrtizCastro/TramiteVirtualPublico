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

namespace Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.servicioGeneralesUbigeo {
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
    [System.Web.Services.WebServiceBindingAttribute(Name="BasicHttpBinding_IWCFGeneralesUbigeo", Namespace="http://tempuri.org/")]
    public partial class WCFGeneralesUbigeo : System.Web.Services.Protocols.SoapHttpClientProtocol {
        
        private System.Threading.SendOrPostCallback listarDepartamentoOperationCompleted;
        
        private System.Threading.SendOrPostCallback listarProvinciaOperationCompleted;
        
        private System.Threading.SendOrPostCallback listarUbigeoOperationCompleted;
        
        private bool useDefaultCredentialsSetExplicitly;
        
        /// <remarks/>
        public WCFGeneralesUbigeo() {
            this.Url = global::Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.Properties.Settings.Default.Utilitarios_servicioGeneralesUbigeo_WCFGeneralesUbigeo;
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
        public event listarDepartamentoCompletedEventHandler listarDepartamentoCompleted;
        
        /// <remarks/>
        public event listarProvinciaCompletedEventHandler listarProvinciaCompleted;
        
        /// <remarks/>
        public event listarUbigeoCompletedEventHandler listarUbigeoCompleted;
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/IWCFGeneralesUbigeo/listarDepartamento", RequestNamespace="http://tempuri.org/", ResponseNamespace="http://tempuri.org/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        [return: System.Xml.Serialization.XmlArrayAttribute(IsNullable=true)]
        [return: System.Xml.Serialization.XmlArrayItemAttribute(Namespace="http://schemas.datacontract.org/2004/07/Mincetur.Administracion.GeneralesUtil.EnG" +
            "eneralesUtil")]
        public enUbigeoDepa[] listarDepartamento([System.Xml.Serialization.XmlElementAttribute(IsNullable=true)] enUbigeoDepa oEnUbigeoDepa) {
            object[] results = this.Invoke("listarDepartamento", new object[] {
                        oEnUbigeoDepa});
            return ((enUbigeoDepa[])(results[0]));
        }
        
        /// <remarks/>
        public void listarDepartamentoAsync(enUbigeoDepa oEnUbigeoDepa) {
            this.listarDepartamentoAsync(oEnUbigeoDepa, null);
        }
        
        /// <remarks/>
        public void listarDepartamentoAsync(enUbigeoDepa oEnUbigeoDepa, object userState) {
            if ((this.listarDepartamentoOperationCompleted == null)) {
                this.listarDepartamentoOperationCompleted = new System.Threading.SendOrPostCallback(this.OnlistarDepartamentoOperationCompleted);
            }
            this.InvokeAsync("listarDepartamento", new object[] {
                        oEnUbigeoDepa}, this.listarDepartamentoOperationCompleted, userState);
        }
        
        private void OnlistarDepartamentoOperationCompleted(object arg) {
            if ((this.listarDepartamentoCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.listarDepartamentoCompleted(this, new listarDepartamentoCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/IWCFGeneralesUbigeo/listarProvincia", RequestNamespace="http://tempuri.org/", ResponseNamespace="http://tempuri.org/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        [return: System.Xml.Serialization.XmlArrayAttribute(IsNullable=true)]
        [return: System.Xml.Serialization.XmlArrayItemAttribute(Namespace="http://schemas.datacontract.org/2004/07/Mincetur.Administracion.GeneralesUtil.EnG" +
            "eneralesUtil")]
        public enUbigeoProv[] listarProvincia([System.Xml.Serialization.XmlElementAttribute(IsNullable=true)] enUbigeoProv oEnUbigeoProv) {
            object[] results = this.Invoke("listarProvincia", new object[] {
                        oEnUbigeoProv});
            return ((enUbigeoProv[])(results[0]));
        }
        
        /// <remarks/>
        public void listarProvinciaAsync(enUbigeoProv oEnUbigeoProv) {
            this.listarProvinciaAsync(oEnUbigeoProv, null);
        }
        
        /// <remarks/>
        public void listarProvinciaAsync(enUbigeoProv oEnUbigeoProv, object userState) {
            if ((this.listarProvinciaOperationCompleted == null)) {
                this.listarProvinciaOperationCompleted = new System.Threading.SendOrPostCallback(this.OnlistarProvinciaOperationCompleted);
            }
            this.InvokeAsync("listarProvincia", new object[] {
                        oEnUbigeoProv}, this.listarProvinciaOperationCompleted, userState);
        }
        
        private void OnlistarProvinciaOperationCompleted(object arg) {
            if ((this.listarProvinciaCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.listarProvinciaCompleted(this, new listarProvinciaCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/IWCFGeneralesUbigeo/listarUbigeo", RequestNamespace="http://tempuri.org/", ResponseNamespace="http://tempuri.org/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        [return: System.Xml.Serialization.XmlArrayAttribute(IsNullable=true)]
        [return: System.Xml.Serialization.XmlArrayItemAttribute(Namespace="http://schemas.datacontract.org/2004/07/Mincetur.Administracion.GeneralesUtil.EnG" +
            "eneralesUtil")]
        public enUbigeo[] listarUbigeo([System.Xml.Serialization.XmlElementAttribute(IsNullable=true)] enUbigeo oEnUbigeo) {
            object[] results = this.Invoke("listarUbigeo", new object[] {
                        oEnUbigeo});
            return ((enUbigeo[])(results[0]));
        }
        
        /// <remarks/>
        public void listarUbigeoAsync(enUbigeo oEnUbigeo) {
            this.listarUbigeoAsync(oEnUbigeo, null);
        }
        
        /// <remarks/>
        public void listarUbigeoAsync(enUbigeo oEnUbigeo, object userState) {
            if ((this.listarUbigeoOperationCompleted == null)) {
                this.listarUbigeoOperationCompleted = new System.Threading.SendOrPostCallback(this.OnlistarUbigeoOperationCompleted);
            }
            this.InvokeAsync("listarUbigeo", new object[] {
                        oEnUbigeo}, this.listarUbigeoOperationCompleted, userState);
        }
        
        private void OnlistarUbigeoOperationCompleted(object arg) {
            if ((this.listarUbigeoCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.listarUbigeoCompleted(this, new listarUbigeoCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
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
    public partial class enUbigeoDepa {
        
        private string dES_DEPAField;
        
        private System.DateTime fEC_CREAField;
        
        private bool fEC_CREAFieldSpecified;
        
        private System.DateTime fEC_MODIField;
        
        private bool fEC_MODIFieldSpecified;
        
        private int fLG_ESTField;
        
        private bool fLG_ESTFieldSpecified;
        
        private int iD_DDNField;
        
        private bool iD_DDNFieldSpecified;
        
        private string iD_UBI_DEPAField;
        
        private int oPRField;
        
        private bool oPRFieldSpecified;
        
        private int uSU_CREAField;
        
        private bool uSU_CREAFieldSpecified;
        
        private int uSU_MODIField;
        
        private bool uSU_MODIFieldSpecified;
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string DES_DEPA {
            get {
                return this.dES_DEPAField;
            }
            set {
                this.dES_DEPAField = value;
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
        public int ID_DDN {
            get {
                return this.iD_DDNField;
            }
            set {
                this.iD_DDNField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool ID_DDNSpecified {
            get {
                return this.iD_DDNFieldSpecified;
            }
            set {
                this.iD_DDNFieldSpecified = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string ID_UBI_DEPA {
            get {
                return this.iD_UBI_DEPAField;
            }
            set {
                this.iD_UBI_DEPAField = value;
            }
        }
        
        /// <remarks/>
        public int OPR {
            get {
                return this.oPRField;
            }
            set {
                this.oPRField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool OPRSpecified {
            get {
                return this.oPRFieldSpecified;
            }
            set {
                this.oPRFieldSpecified = value;
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
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.8.9032.0")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(Namespace="http://schemas.datacontract.org/2004/07/Mincetur.Administracion.GeneralesUtil.EnG" +
        "eneralesUtil")]
    public partial class enUbigeo {
        
        private string cOD_UBIGEOField;
        
        private string dES_DEPAField;
        
        private string dES_DISTField;
        
        private string dES_PROVField;
        
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
        
        private int iD_UBIGEOField;
        
        private bool iD_UBIGEOFieldSpecified;
        
        private int nUM_NIVELField;
        
        private bool nUM_NIVELFieldSpecified;
        
        private int oPRField;
        
        private bool oPRFieldSpecified;
        
        private int uSU_CREAField;
        
        private bool uSU_CREAFieldSpecified;
        
        private int uSU_MODIField;
        
        private bool uSU_MODIFieldSpecified;
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string COD_UBIGEO {
            get {
                return this.cOD_UBIGEOField;
            }
            set {
                this.cOD_UBIGEOField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string DES_DEPA {
            get {
                return this.dES_DEPAField;
            }
            set {
                this.dES_DEPAField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string DES_DIST {
            get {
                return this.dES_DISTField;
            }
            set {
                this.dES_DISTField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string DES_PROV {
            get {
                return this.dES_PROVField;
            }
            set {
                this.dES_PROVField = value;
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
        public int ID_UBIGEO {
            get {
                return this.iD_UBIGEOField;
            }
            set {
                this.iD_UBIGEOField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool ID_UBIGEOSpecified {
            get {
                return this.iD_UBIGEOFieldSpecified;
            }
            set {
                this.iD_UBIGEOFieldSpecified = value;
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
        public int OPR {
            get {
                return this.oPRField;
            }
            set {
                this.oPRField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool OPRSpecified {
            get {
                return this.oPRFieldSpecified;
            }
            set {
                this.oPRFieldSpecified = value;
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
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.8.9032.0")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(Namespace="http://schemas.datacontract.org/2004/07/Mincetur.Administracion.GeneralesUtil.EnG" +
        "eneralesUtil")]
    public partial class enUbigeoProv {
        
        private string dES_PROVField;
        
        private System.DateTime fEC_CREAField;
        
        private bool fEC_CREAFieldSpecified;
        
        private System.DateTime fEC_MODIField;
        
        private bool fEC_MODIFieldSpecified;
        
        private int fLG_ESTField;
        
        private bool fLG_ESTFieldSpecified;
        
        private string iD_UBI_DEPAField;
        
        private string iD_UBI_PROVField;
        
        private int oPRField;
        
        private bool oPRFieldSpecified;
        
        private int uSU_CREAField;
        
        private bool uSU_CREAFieldSpecified;
        
        private int uSU_MODIField;
        
        private bool uSU_MODIFieldSpecified;
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string DES_PROV {
            get {
                return this.dES_PROVField;
            }
            set {
                this.dES_PROVField = value;
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
        public string ID_UBI_DEPA {
            get {
                return this.iD_UBI_DEPAField;
            }
            set {
                this.iD_UBI_DEPAField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string ID_UBI_PROV {
            get {
                return this.iD_UBI_PROVField;
            }
            set {
                this.iD_UBI_PROVField = value;
            }
        }
        
        /// <remarks/>
        public int OPR {
            get {
                return this.oPRField;
            }
            set {
                this.oPRField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool OPRSpecified {
            get {
                return this.oPRFieldSpecified;
            }
            set {
                this.oPRFieldSpecified = value;
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
    public delegate void listarDepartamentoCompletedEventHandler(object sender, listarDepartamentoCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.8.9032.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class listarDepartamentoCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal listarDepartamentoCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public enUbigeoDepa[] Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((enUbigeoDepa[])(this.results[0]));
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.8.9032.0")]
    public delegate void listarProvinciaCompletedEventHandler(object sender, listarProvinciaCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.8.9032.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class listarProvinciaCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal listarProvinciaCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public enUbigeoProv[] Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((enUbigeoProv[])(this.results[0]));
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.8.9032.0")]
    public delegate void listarUbigeoCompletedEventHandler(object sender, listarUbigeoCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.8.9032.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class listarUbigeoCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal listarUbigeoCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public enUbigeo[] Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((enUbigeo[])(this.results[0]));
            }
        }
    }
}

#pragma warning restore 1591