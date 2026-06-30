import { Navigate, Route, Routes } from 'react-router-dom'
import { isSupabaseConfigured } from '@/lib/supabase'
import { AdminAuthProvider, RequireAdmin } from './AdminAuth'
import { AdminLayout } from './AdminLayout'
import { AdminLogin } from './AdminLogin'
import { AdminSetupNeeded } from './AdminShell'
import { AdminDashboard } from './pages/AdminDashboard'
import { AdminInbox } from './pages/AdminInbox'
import { AdminLeadDetail } from './pages/AdminLeadDetail'
import { AdminCustomers } from './pages/AdminCustomers'
import { AdminCustomerDetail } from './pages/AdminCustomerDetail'
import { AdminCustomerForm } from './pages/AdminCustomerForm'
import { AdminQuotes } from './pages/AdminQuotes'
import { AdminQuoteForm } from './pages/AdminQuoteForm'
import { AdminQuoteDetail } from './pages/AdminQuoteDetail'
import { AdminQuotePrint } from './pages/AdminQuotePrint'
import { AdminInvoices } from './pages/AdminInvoices'
import { AdminInvoiceForm } from './pages/AdminInvoiceForm'
import { AdminInvoiceDetail } from './pages/AdminInvoiceDetail'
import { AdminInvoicePrint } from './pages/AdminInvoicePrint'
import { AdminSettings } from './pages/AdminSettings'

/**
 * Admin panel router. Mounted (lazy) only for /admin/* paths, so the public site
 * never bundles Supabase. Login is public; everything else lives behind
 * RequireAdmin inside the sidebar shell (AdminLayout).
 */
export default function AdminApp() {
  // Friendly screen instead of a crash when the env vars are not set yet.
  if (!isSupabaseConfigured) return <AdminSetupNeeded />

  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<RequireAdmin />}>
          {/* Print views live outside the sidebar shell so the PDF is clean. */}
          <Route path="/admin/offertes/:id/print" element={<AdminQuotePrint />} />
          <Route path="/admin/facturen/:id/print" element={<AdminInvoicePrint />} />
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/inbox" element={<AdminInbox />} />
            <Route path="/admin/inbox/:id" element={<AdminLeadDetail />} />
            <Route path="/admin/klanten" element={<AdminCustomers />} />
            <Route path="/admin/klanten/nieuw" element={<AdminCustomerForm mode="create" />} />
            <Route path="/admin/klanten/:id" element={<AdminCustomerDetail />} />
            <Route path="/admin/klanten/:id/bewerken" element={<AdminCustomerForm mode="edit" />} />
            <Route path="/admin/offertes" element={<AdminQuotes />} />
            <Route path="/admin/offertes/nieuw" element={<AdminQuoteForm mode="create" />} />
            <Route path="/admin/offertes/:id" element={<AdminQuoteDetail />} />
            <Route path="/admin/offertes/:id/bewerken" element={<AdminQuoteForm mode="edit" />} />
            <Route path="/admin/instellingen" element={<AdminSettings />} />
            <Route path="/admin/facturen" element={<AdminInvoices />} />
            <Route path="/admin/facturen/nieuw" element={<AdminInvoiceForm mode="create" />} />
            <Route path="/admin/facturen/:id" element={<AdminInvoiceDetail />} />
            <Route path="/admin/facturen/:id/bewerken" element={<AdminInvoiceForm mode="edit" />} />
          </Route>
        </Route>
        <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminAuthProvider>
  )
}
