// production — publishable/anon key საჯაროდ ცნობადი გასაღებია (client-side-ზეა განკუთვნილი),
// რეალურ დაცვას Supabase-ის RLS policy-ები აკეთებს, არა ამ ფაილის საიდუმლოება.
export const environment = {
  production: true,
  supabaseUrl: 'https://lrjkplclilntjhvrujze.supabase.co',
  supabaseAnonKey: 'sb_publishable_lGRecPN1yl2sSkuTG2AYZg_AUNTgbOp'
};
