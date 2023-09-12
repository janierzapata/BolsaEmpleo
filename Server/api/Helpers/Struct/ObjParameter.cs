using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers.Struct
{
    public struct ObjParameter
    {
        public string ParameterName { get; set; }
        public Object ParameterValue { get; set; }

        public ObjParameter(string parameterName, Object parameterValue)
        {
            ParameterName = parameterName;
            ParameterValue = parameterValue;
        }
    }
}