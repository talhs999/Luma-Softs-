const { createClient } = require('@supabase/supabase-js');

const supabaseAdmin = createClient(
  'https://wydrxumwpfgpkugyyrrw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5ZHJ4dW13cGZncGt1Z3l5cnJ3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDc2ODA2NCwiZXhwIjoyMDk2MzQ0MDY0fQ.M4OtvFuJj9sgFD7n7timSdr1eUzMxGxneym30OrsnJU'
);

async function createAdmin() {
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: 'admin@lumasofts.com',
    password: 'LumaAdmin123!',
    email_confirm: true
  });

  if (error) {
    console.error('Error creating user:', error.message);
  } else {
    console.log('Admin user created successfully:', data.user.email);
  }
}

createAdmin();
