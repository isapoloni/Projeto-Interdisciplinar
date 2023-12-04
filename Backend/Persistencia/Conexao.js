import mysql from "mysql2/promise";

export default async function Conectar() {
  if (global.conexao && global.conexao.status != "disconnected") {
    return global.conexao;
  }
  const conexao = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "new",
  });
  global.conexao = conexao;
  return conexao;
}

// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = "https://anvomrnnzbaiicmtsusg.supabase.co";
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFudm9tcm5uemJhaWljbXRzdXNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODcxMTMyMywiZXhwIjoyMDE0Mjg3MzIzfQ.Mbc3OZ_ms8fuouMrpJZ7StbH8ENPNivH3w_TKL-SEoQ";

// const conexao = createClient(supabaseUrl, supabaseKey);

// export default conexao;
