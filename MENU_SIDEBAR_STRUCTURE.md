# MENU SIDEBAR BORN TO GIVE - PER ROLE

## 📋 Menu Structure Overview

Sistem menggunakan **Role-Based Menu Access Control** dengan 4 role utama:
1. **Super Admin** - Full Access
2. **Admin** - Most Access (tanpa pengaturan sistem)
3. **Fundraiser** - Campaign & Donation Management
4. **Donor** - Browse & Donation History

---

## 🔐 ROLE: SUPER ADMIN (Full Access)

**Total Menu: 11 items**

### Dashboard & Analytics
- ✅ **Dashboard** - Overview sistem lengkap
  - Statistik total users, campaigns, donations
  - Grafik donasi per bulan
  - Campaign aktif & menunggu approval
  - Recent activities

### User Management
- ✅ **Manajemen Pengguna**
  - CRUD semua user (admin, fundraiser, donor)
  - Assign/revoke roles
  - Activate/deactivate accounts
  - View user activity logs

- ✅ **Verifikasi Fundraiser**
  - List semua pengajuan verifikasi fundraiser
  - Approve/reject dengan catatan
  - View dokumen KTP & rekening bank
  - Riwayat verifikasi

### Campaign Management
- ✅ **Kelola Kampanye**
  - View semua kampanye (draft, aktif, selesai, ditolak)
  - Edit/delete any campaign
  - Force complete campaign
  - View campaign analytics

- ✅ **Approval Kampanye**
  - Queue kampanye yang pending approval
  - Approve/reject dengan feedback
  - Request revision dari fundraiser
  - Batch approval

- ✅ **Kelola Kategori**
  - CRUD kategori kampanye
  - Set kategori icon & color
  - Manage kategori visibility
  - Reorder kategori

### Financial Management
- ✅ **Semua Donasi**
  - View all donations (berhasil, pending, gagal)
  - Export donation reports
  - Refund management
  - Payment gateway monitoring

- ✅ **Penarikan Dana**
  - Approve/reject withdrawal requests
  - View withdrawal history
  - Set withdrawal limits
  - Bank transfer management

### Content Moderation
- ✅ **Moderasi Komentar**
  - View all comments
  - Hide/unhide inappropriate comments
  - Ban users from commenting
  - Comment reports

### Reports & Settings
- ✅ **Laporan & Statistik**
  - Financial reports (daily, monthly, yearly)
  - User growth statistics
  - Campaign performance analytics
  - Export reports (PDF, Excel)

- ✅ **Pengaturan Sistem**
  - Platform settings (commission rate, etc)
  - Payment gateway configuration
  - Email templates
  - System maintenance mode

---

## 👨‍💼 ROLE: ADMIN (Most Access)

**Total Menu: 10 items**

Sama seperti Super Admin, **KECUALI**:
- ❌ **Pengaturan Sistem** (tidak ada akses)

Menu yang ada:
- ✅ Dashboard
- ✅ Manajemen Pengguna
- ✅ Verifikasi Fundraiser
- ✅ Kelola Kampanye
- ✅ Approval Kampanye
- ✅ Kelola Kategori
- ✅ Semua Donasi
- ✅ Penarikan Dana
- ✅ Moderasi Komentar
- ✅ Laporan & Statistik

**Differences:**
- Tidak bisa mengubah pengaturan sistem
- Tidak bisa manage super admin accounts
- Tidak bisa configure payment gateways

---

## 💼 ROLE: FUNDRAISER (Penggalang Dana)

**Total Menu: 8 items**

### Dashboard
- ✅ **Dashboard**
  - Total dana terkumpul
  - Campaign aktif saya
  - Donasi terbaru
  - Pending withdrawals

### Campaign Management
- ✅ **Kampanye Saya**
  - List kampanye yang saya buat
  - View status (draft, pending, aktif, selesai)
  - Edit draft/pending campaigns
  - View campaign analytics

- ✅ **Buat Kampanye Baru**
  - Form create campaign
  - Upload gambar & dokumen
  - Set target & deadline
  - Submit untuk approval

### Donation & Withdrawal
- ✅ **Donasi Masuk**
  - List donasi ke kampanye saya
  - View donor information (jika tidak anonim)
  - Filter by campaign
  - Export donor list

- ✅ **Penarikan Dana**
  - Request withdrawal
  - View withdrawal history
  - Track withdrawal status
  - Manage bank accounts

### Engagement
- ✅ **Komentar & Dukungan**
  - View comments di kampanye saya
  - Reply to comments
  - Moderate comments (hide inappropriate)
  - Thank you messages to donors

- ✅ **Statistik Kampanye**
  - Campaign performance metrics
  - Donation trends
  - Donor demographics
  - Share statistics

### Profile
- ✅ **Profil Fundraiser**
  - Edit profile information
  - Update bank account details
  - Upload verification documents
  - View verification status

---

## ❤️ ROLE: DONOR (Donatur)

**Total Menu: 6 items**

### Dashboard
- ✅ **Dashboard**
  - Total donasi saya
  - Impact created
  - Active campaigns I support
  - Donation statistics

### Browse & Discover
- ✅ **Jelajah Kampanye**
  - Browse all active campaigns
  - Filter by kategori
  - Search campaigns
  - Sort by trending, newest, ending soon

### Donation Management
- ✅ **Riwayat Donasi**
  - All my donations
  - Payment status tracking
  - Download receipts
  - Request refund (jika applicable)

- ✅ **Kampanye Favorit**
  - Saved/bookmarked campaigns
  - Get notifications on updates
  - Quick donate to favorites
  - Share favorites

### Certificates & Profile
- ✅ **Sertifikat Donasi**
  - Download donation certificates (PDF)
  - Share certificates on social media
  - Certificate gallery
  - Tax deduction documents

- ✅ **Profil Saya**
  - Edit personal information
  - Manage donation preferences
  - Privacy settings
  - View public profile

---

## 📌 Menu Footer (All Roles)

Menu yang muncul di footer sidebar untuk **semua role**:

- ✅ **Tentang Born to Give**
  - About us page
  - Mission & vision
  - Team information
  - Contact us

- ✅ **Panduan Pengguna**
  - How to donate
  - How to create campaign (fundraiser)
  - FAQ
  - Video tutorials

---

## 🎨 Icon Mapping

| Menu Item | Icon | Lucide React |
|-----------|------|--------------|
| Dashboard | 📊 | LayoutDashboard |
| Manajemen Pengguna | 👥 | Users |
| Verifikasi Fundraiser | ✓ | BadgeCheck |
| Kelola Kampanye | 📁 | FolderHeart |
| Approval Kampanye | 📄 | FileText |
| Kelola Kategori | 📚 | BookOpen |
| Semua Donasi | 🤝 | HandHeart |
| Penarikan Dana | 💰 | Wallet |
| Moderasi Komentar | 💬 | MessageSquare |
| Laporan & Statistik | 📈 | TrendingUp |
| Pengaturan Sistem | ⚙️ | Settings |
| Kampanye Favorit | ❤️ | Heart |

---

## 🔄 Menu Access Logic

```typescript
// Priority order (first match wins)
if (roles.includes('super-admin')) {
    // Full 11 menu items
} else if (roles.includes('admin')) {
    // 10 menu items (no system settings)
} else if (roles.includes('fundraiser')) {
    // 8 menu items (campaign focused)
} else if (roles.includes('donor')) {
    // 6 menu items (browse & donation focused)
}
```

**Notes:**
- Users can only have ONE primary role
- Menu items are dynamically rendered based on role
- Unauthorized routes return 403 Forbidden
- Icons use Lucide React library

---

## 🚀 Implementation Status

✅ **AppSidebar Component** - Created with role-based menu
✅ **Role Structure** - Defined in database seeder
✅ **Permission System** - Spatie Permission implemented

**Next Steps:**
1. Create route files for each role section
2. Create controllers for each menu item
3. Create views/pages for each route
4. Implement middleware for route protection
5. Add breadcrumb navigation
