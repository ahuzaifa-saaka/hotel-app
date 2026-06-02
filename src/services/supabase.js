import {createClient} from "@supabase/supabase-js";
const supabaseUrl = "https://nvcjbkkyhsafwtozpxqj.supabase.co";
const supabaseKey = "sb_publishable_7COdhVt4wC7N-PwQmyyePg_cyLzE8lj";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
