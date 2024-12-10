// 

import { createClient } from "@supabase/supabase-js";

  const url = process.env.NEXT_PUBLIC_SECRET_API_URL
  const key = process.env.NEXT_PUBLIC_AUTH_SECRET_API_KEY ? process.env.NEXT_PUBLIC_AUTH_SECRET_API_KEY : "null"
const supabase = createClient(url ? url : 'http://no.url.com', key);

export default supabase;