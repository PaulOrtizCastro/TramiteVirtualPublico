using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json;
namespace Mincetur.Administracion.AplGestionDoc.WebGestionDoc.resource.clases
{
    public class customDateConvertor : DateTimeConverterBase
    {
        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            if (reader.Value is DateTime)
                return DateTime.Parse(reader.Value.ToString());
            else return reader.Value;
        }
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            if (value is DateTime)
            {
                if (DateTime.Equals(value, DateTime.MinValue))
                {
                    writer.WriteValue(string.Empty);
                }
                else
                {
                    DateTime dt = DateTime.Parse(value.ToString());
                    if (dt.TimeOfDay.Equals(new TimeSpan(0, 0, 0)))
                    {
                        writer.WriteValue(dt.ToShortDateString());
                    }
                    else
                    {
                        writer.WriteValue(value);
                    }
                }
            }
        }
    }
}