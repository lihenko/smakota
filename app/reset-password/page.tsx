// app/reset-password/page.tsx

import ResetPasswordClient from './ResetPasswordClient';

export const dynamic = 'force-dynamic'; // щоб не кешувалось

export default function ResetPasswordPage() {
  return <ResetPasswordClient />;
}
