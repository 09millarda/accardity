using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data.Sql
{
    internal class SqlBaseContext
    {
        public readonly InstabuyDbContext Context;

        public SqlBaseContext(InstabuyDbContext context)
        {
            Context = context;
        }
    }
}
