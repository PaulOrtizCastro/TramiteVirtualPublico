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

namespace Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.servicioGenerales.DocCmsConsulta {
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
    [System.Web.Services.WebServiceBindingAttribute(Name="BasicHttpBinding_IWCFGeneralesDocCmsConsulta", Namespace="http://tempuri.org/")]
    [System.Xml.Serialization.XmlIncludeAttribute(typeof(Resultado))]
    public partial class WCFGeneralesDocCmsConsulta : System.Web.Services.Protocols.SoapHttpClientProtocol {
        
        private System.Threading.SendOrPostCallback descargaOperationCompleted;
        
        private bool useDefaultCredentialsSetExplicitly;
        
        /// <remarks/>
        public WCFGeneralesDocCmsConsulta() {
            this.Url = global::Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.Properties.Settings.Default.Utilitarios_servicioGenerales_DocCmsConsulta_WCFGeneralesDocCmsConsulta;
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
        public event descargaCompletedEventHandler descargaCompleted;
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/IWCFGeneralesDocCmsConsulta/descarga", RequestNamespace="http://tempuri.org/", ResponseNamespace="http://tempuri.org/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        [return: System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public ResultadoDocCms descarga([System.Xml.Serialization.XmlElementAttribute(IsNullable=true)] DocCmsDescarga model) {
            object[] results = this.Invoke("descarga", new object[] {
                        model});
            return ((ResultadoDocCms)(results[0]));
        }
        
        /// <remarks/>
        public void descargaAsync(DocCmsDescarga model) {
            this.descargaAsync(model, null);
        }
        
        /// <remarks/>
        public void descargaAsync(DocCmsDescarga model, object userState) {
            if ((this.descargaOperationCompleted == null)) {
                this.descargaOperationCompleted = new System.Threading.SendOrPostCallback(this.OndescargaOperationCompleted);
            }
            this.InvokeAsync("descarga", new object[] {
                        model}, this.descargaOperationCompleted, userState);
        }
        
        private void OndescargaOperationCompleted(object arg) {
            if ((this.descargaCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.descargaCompleted(this, new descargaCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
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
    [System.Xml.Serialization.XmlTypeAttribute(Namespace="http://schemas.datacontract.org/2004/07/Mincetur.Administracion.GeneralesUtil.Ser" +
        "vicioWebDocCms.Models")]
    public partial class DocCmsDescarga {
        
        private int idDocCmsField;
        
        private string datoField;
        
        private int idUsuField;
        
        private int idSisField;
        
        private string ipAccesoField;
        
        /// <remarks/>
        public int IdDocCms {
            get {
                return this.idDocCmsField;
            }
            set {
                this.idDocCmsField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string Dato {
            get {
                return this.datoField;
            }
            set {
                this.datoField = value;
            }
        }
        
        /// <remarks/>
        public int IdUsu {
            get {
                return this.idUsuField;
            }
            set {
                this.idUsuField = value;
            }
        }
        
        /// <remarks/>
        public int IdSis {
            get {
                return this.idSisField;
            }
            set {
                this.idSisField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string IpAcceso {
            get {
                return this.ipAccesoField;
            }
            set {
                this.ipAccesoField = value;
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.8.9032.0")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(Namespace="http://schemas.datacontract.org/2004/07/Mincetur.Administracion.GeneralesUtil.Ser" +
        "vicioWebDocCms.Models")]
    public partial class DocCms {
        
        private long idDocCmsField;
        
        private int idSisField;
        
        private string desNomField;
        
        private string desNomAbrField;
        
        private string desExtensionField;
        
        private int idTipoDocuField;
        
        private int numSizeArchivoField;
        
        private string desRutaField;
        
        private byte[] archivoField;
        
        private byte[] archivoBase64Field;
        
        private System.DateTime fecDocCmsField;
        
        private string codPinField;
        
        private string codCmsField;
        
        private int idDocField;
        
        private int idUsuField;
        
        private string ipAccesoField;
        
        /// <remarks/>
        public long IdDocCms {
            get {
                return this.idDocCmsField;
            }
            set {
                this.idDocCmsField = value;
            }
        }
        
        /// <remarks/>
        public int IdSis {
            get {
                return this.idSisField;
            }
            set {
                this.idSisField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string DesNom {
            get {
                return this.desNomField;
            }
            set {
                this.desNomField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string DesNomAbr {
            get {
                return this.desNomAbrField;
            }
            set {
                this.desNomAbrField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string DesExtension {
            get {
                return this.desExtensionField;
            }
            set {
                this.desExtensionField = value;
            }
        }
        
        /// <remarks/>
        public int IdTipoDocu {
            get {
                return this.idTipoDocuField;
            }
            set {
                this.idTipoDocuField = value;
            }
        }
        
        /// <remarks/>
        public int NumSizeArchivo {
            get {
                return this.numSizeArchivoField;
            }
            set {
                this.numSizeArchivoField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string DesRuta {
            get {
                return this.desRutaField;
            }
            set {
                this.desRutaField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(DataType="base64Binary", IsNullable=true)]
        public byte[] Archivo {
            get {
                return this.archivoField;
            }
            set {
                this.archivoField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(DataType="base64Binary", IsNullable=true)]
        public byte[] ArchivoBase64 {
            get {
                return this.archivoBase64Field;
            }
            set {
                this.archivoBase64Field = value;
            }
        }
        
        /// <remarks/>
        public System.DateTime FecDocCms {
            get {
                return this.fecDocCmsField;
            }
            set {
                this.fecDocCmsField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string CodPin {
            get {
                return this.codPinField;
            }
            set {
                this.codPinField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string CodCms {
            get {
                return this.codCmsField;
            }
            set {
                this.codCmsField = value;
            }
        }
        
        /// <remarks/>
        public int IdDoc {
            get {
                return this.idDocField;
            }
            set {
                this.idDocField = value;
            }
        }
        
        /// <remarks/>
        public int IdUsu {
            get {
                return this.idUsuField;
            }
            set {
                this.idUsuField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string IpAcceso {
            get {
                return this.ipAccesoField;
            }
            set {
                this.ipAccesoField = value;
            }
        }
    }
    
    /// <remarks/>
    [System.Xml.Serialization.XmlIncludeAttribute(typeof(ResultadoDocCms))]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.8.9032.0")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(Namespace="http://schemas.datacontract.org/2004/07/Mincetur.Administracion.GeneralesUtil.Ser" +
        "vicioWebDocCms.Models")]
    public partial class Resultado {
        
        private int idTipoField;
        
        private string desErrorField;
        
        private string valorField;
        
        private string valor1Field;
        
        /// <remarks/>
        public int IdTipo {
            get {
                return this.idTipoField;
            }
            set {
                this.idTipoField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string DesError {
            get {
                return this.desErrorField;
            }
            set {
                this.desErrorField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string Valor {
            get {
                return this.valorField;
            }
            set {
                this.valorField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public string Valor1 {
            get {
                return this.valor1Field;
            }
            set {
                this.valor1Field = value;
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.8.9032.0")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(Namespace="http://schemas.datacontract.org/2004/07/Mincetur.Administracion.GeneralesUtil.Ser" +
        "vicioWebDocCms.Models")]
    public partial class ResultadoDocCms : Resultado {
        
        private DocCms docCmsField;
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)]
        public DocCms DocCms {
            get {
                return this.docCmsField;
            }
            set {
                this.docCmsField = value;
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.8.9032.0")]
    public delegate void descargaCompletedEventHandler(object sender, descargaCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.8.9032.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class descargaCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal descargaCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public ResultadoDocCms Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((ResultadoDocCms)(this.results[0]));
            }
        }
    }
}

#pragma warning restore 1591