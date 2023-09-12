using Microsoft.VisualBasic;

namespace Api.Helpers.Struct
{
    public struct Response
    {
        public string msg { get; set; }
        public object data { get; set; }

        public Response(string msg, object data)
        {
            this.msg = msg;
            this.data = data;
        }

    }
}
