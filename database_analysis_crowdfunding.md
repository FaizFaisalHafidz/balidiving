# ANALISIS DATABASE CROWDFUNDING - BORN TO GIVE (SIMPLIFIED CORE)

## ROLES & PERMISSIONS STRUCTURE (Spatie Permission)

### Default Roles
```php
// Roles yang akan di-seed
$roles = [
    'super-admin' => 'Super Administrator',
    'admin' => 'Administrator', 
    'fundraiser' => 'Penggalang Dana',
    'donor' => 'Donatur'
];
```

### Permission Structure (Core Only)
```php
// Campaign Permissions
'campaign.create' => 'Membuat kampanye',
'campaign.read' => 'Melihat kampanye',
'campaign.update' => 'Mengupdate kampanye',
'campaign.delete' => 'Menghapus kampanye',
'campaign.approve' => 'Menyetujui kampanye',
'campaign.reject' => 'Menolak kampanye',

// User Management Permissions
'user.create' => 'Membuat pengguna',
'user.read' => 'Melihat pengguna', 
'user.update' => 'Mengupdate pengguna',
'user.delete' => 'Menghapus pengguna',
'user.verify' => 'Memverifikasi pengguna',

// Donation Permissions
'donation.create' => 'Membuat donasi',
'donation.read' => 'Melihat donasi',
'donation.update' => 'Mengupdate donasi',

// Withdrawal Permissions
'withdrawal.create' => 'Mengajukan penarikan',
'withdrawal.read' => 'Melihat penarikan',
'withdrawal.approve' => 'Menyetujui penarikan',
'withdrawal.reject' => 'Menolak penarikan',
```

### Role-Permission Assignments
```php
// Super Admin - All permissions
'super-admin' => ['*'],

// Admin - Most permissions except super admin functions
'admin' => [
    'campaign.*',
    'user.*',  
    'donation.*',
    'withdrawal.*',
],

// Fundraiser - Campaign and own profile management
'fundraiser' => [
    'campaign.create',
    'campaign.read', 
    'campaign.update', // own campaigns only
    'withdrawal.create',
    'withdrawal.read', // own withdrawals only
],

// Donor - Basic read permissions and donation
'donor' => [
    'campaign.read',
    'donation.create',
    'donation.read', // own donations only
]
```

## Struktur Database Core - Hanya Tabel Penting

### 1. TABEL USERS & PROFILES

#### A. Tabel `users` (Users - Default Laravel)
```sql
-- Menggunakan tabel users default Laravel
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);

-- Extension table untuk informasi tambahan pengguna (simplified)
CREATE TABLE profil_pengguna (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    nomor_telepon VARCHAR(20) NULL,
    alamat TEXT NULL,
    foto_profil VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

#### B. Spatie Permission Tables (Auto-generated)
```sql
-- roles table
CREATE TABLE roles (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    guard_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    UNIQUE KEY roles_name_guard_name_unique (name, guard_name)
);

-- permissions table  
CREATE TABLE permissions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    guard_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    UNIQUE KEY permissions_name_guard_name_unique (name, guard_name)
);

-- model_has_permissions table
CREATE TABLE model_has_permissions (
    permission_id BIGINT UNSIGNED NOT NULL,
    model_type VARCHAR(255) NOT NULL,
    model_id BIGINT UNSIGNED NOT NULL,
    INDEX model_has_permissions_model_id_model_type_index (model_id, model_type),
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (permission_id, model_id, model_type)
);

-- model_has_roles table
CREATE TABLE model_has_roles (
    role_id BIGINT UNSIGNED NOT NULL,
    model_type VARCHAR(255) NOT NULL,
    model_id BIGINT UNSIGNED NOT NULL,
    INDEX model_has_roles_model_id_model_type_index (model_id, model_type),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, model_id, model_type)
);

-- role_has_permissions table
CREATE TABLE role_has_permissions (
    permission_id BIGINT UNSIGNED NOT NULL,
    role_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (permission_id, role_id)
);
```

#### C. Tabel `profil_fundraiser` (Fundraiser Verification - Simplified)
```sql
CREATE TABLE profil_fundraiser (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    nomor_rekening VARCHAR(30) NOT NULL,
    nama_bank VARCHAR(50) NOT NULL,
    nama_pemilik_rekening VARCHAR(100) NOT NULL,
    status_verifikasi ENUM('pending', 'terverifikasi', 'ditolak') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 2. TABEL CAMPAIGNS

#### A. Tabel `kategori_kampanye` (Campaign Categories - Simplified)
```sql
CREATE TABLE kategori_kampanye (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(50) NOT NULL UNIQUE,
    deskripsi TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### B. Tabel `kampanye` (Campaigns - Simplified)
```sql
CREATE TABLE kampanye (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    kategori_id BIGINT UNSIGNED NOT NULL,
    judul VARCHAR(200) NOT NULL,
    slug VARCHAR(220) UNIQUE NOT NULL,
    deskripsi TEXT NOT NULL,
    target_dana DECIMAL(15,2) NOT NULL,
    dana_terkumpul DECIMAL(15,2) DEFAULT 0.00,
    tanggal_mulai DATE NOT NULL,
    tanggal_berakhir DATE NOT NULL,
    gambar_utama VARCHAR(255) NOT NULL,
    status ENUM('draft', 'aktif', 'selesai', 'ditolak') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (kategori_id) REFERENCES kategori_kampanye(id) ON DELETE RESTRICT,
    INDEX idx_status (status),
    INDEX idx_tanggal_berakhir (tanggal_berakhir)
);
```

### 3. TABEL DONATIONS & WITHDRAWALS

#### A. Tabel `donasi` (Donations - Simplified)
```sql
CREATE TABLE donasi (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NULL,
    kampanye_id BIGINT UNSIGNED NOT NULL,
    jumlah DECIMAL(15,2) NOT NULL,
    metode_pembayaran ENUM('transfer_bank', 'ewallet') NOT NULL,
    id_transaksi VARCHAR(100) UNIQUE NOT NULL,
    status ENUM('pending', 'berhasil', 'gagal') DEFAULT 'pending',
    nama_donatur VARCHAR(100) NULL,
    email_donatur VARCHAR(100) NULL,
    pesan_dukungan TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (kampanye_id) REFERENCES kampanye(id) ON DELETE CASCADE,
    INDEX idx_status (status),
    INDEX idx_kampanye_status (kampanye_id, status)
);
```

#### B. Tabel `penarikan_dana` (Withdrawals - Simplified)
```sql
CREATE TABLE penarikan_dana (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    kampanye_id BIGINT UNSIGNED NOT NULL,
    jumlah_diminta DECIMAL(15,2) NOT NULL,
    nama_bank VARCHAR(50) NOT NULL,
    nomor_rekening VARCHAR(30) NOT NULL,
    nama_pemilik_rekening VARCHAR(100) NOT NULL,
    status ENUM('pending', 'disetujui', 'selesai', 'ditolak') DEFAULT 'pending',
    catatan TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (kampanye_id) REFERENCES kampanye(id) ON DELETE CASCADE,
    INDEX idx_status (status)
);
```

### 4. TABEL BASIC INTERACTIONS

#### A. Tabel `komentar` (Comments - Simplified)
```sql
CREATE TABLE komentar (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NULL,
    kampanye_id BIGINT UNSIGNED NOT NULL,
    nama_komentator VARCHAR(100) NULL,
    isi_komentar TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (kampanye_id) REFERENCES kampanye(id) ON DELETE CASCADE
);
```

### 4. BASIC INDEXING STRATEGY

### Essential Performance Indexes
```sql
-- Campaign search & filtering
CREATE INDEX idx_kampanye_pencarian ON kampanye(status, tanggal_berakhir);
CREATE INDEX idx_kampanye_kategori ON kampanye(kategori_id, status);

-- Donation tracking
CREATE INDEX idx_donasi_kampanye ON donasi(kampanye_id);
CREATE INDEX idx_donasi_status ON donasi(status);
```

## DATA SEEDING (Core Only)

### 1. Kategori Kampanye Default
```sql
INSERT INTO kategori_kampanye (nama, deskripsi) VALUES
('Kesehatan', 'Bantuan untuk pengobatan dan kesehatan'),
('Pendidikan', 'Bantuan untuk biaya sekolah dan pendidikan'),
('Bencana Alam', 'Bantuan untuk korban bencana alam'),
('Sosial', 'Bantuan untuk kegiatan sosial dan kemanusiaan'),
('Lingkungan', 'Kampanye pelestarian lingkungan');
```

### 2. Default Admin User
```sql
-- Akan dibuat melalui seeder Laravel
-- Default admin: admin@bornto-give.com
-- Default password: password (akan di-hash)
```

## PACKAGES YANG DIBUTUHKAN (Minimal untuk Skripsi)

### Core Laravel Packages
```bash
# Role & Permission Management
composer require spatie/laravel-permission

# Sluggable URLs
composer require cviebrock/eloquent-sluggable

# Payment Gateway (Optional - bisa pakai dummy)
composer require midtrans/midtrans-php
```

### Frontend Packages (Minimal)
```json
{
  "dependencies": {
    "@inertiajs/react": "^1.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0", 
    "@headlessui/react": "^1.0.0",
    "@heroicons/react": "^2.0.0",
    "react-hook-form": "^7.0.0",
    "framer-motion": "^10.0.0"
  }
}
```

## ESTIMATED STORAGE (Very Simplified)

### Small Scale (100 campaigns, 1K users)
- Total size: ~50-100MB
- Daily growth: ~1-5MB

### Medium Scale (500 campaigns, 5K users)
- Total size: ~200-500MB
- Daily growth: ~10-20MB

## SUMMARY

Database ini telah disederhanakan maksimal untuk kebutuhan skripsi:

### Tabel Core (6 tabel saja):
1. **users** - Default Laravel users table
2. **profil_pengguna** - Basic user profiles (hanya telepon, alamat, foto)
3. **profil_fundraiser** - Simple fundraiser data (hanya rekening bank)
4. **kategori_kampanye** - Campaign categories (hanya nama & deskripsi)
5. **kampanye** - Main campaigns (field minimum yang diperlukan)
6. **donasi** - Simple donations tracking
7. **penarikan_dana** - Basic withdrawal requests
8. **komentar** - Simple campaign comments

### Tabel Spatie Permission (5 tabel):
- roles, permissions, model_has_roles, model_has_permissions, role_has_permissions

**Total: 13 tabel** untuk skripsi yang sangat sederhana namun fungsional.

### Fitur Core untuk Skripsi:
- ✅ User registration & login
- ✅ Role management (admin, fundraiser, donor)
- ✅ Campaign creation & listing
- ✅ Basic donation system
- ✅ Fund withdrawal system
- ✅ Simple commenting

### Yang Disederhanakan:
- ✅ Profil pengguna minimal (no tanggal lahir, jenis kelamin, dll)
- ✅ Fundraiser verification sederhana (no KTP, foto KTP)
- ✅ Kampanye minimal (no galeri, lokasi, approval workflow)
- ✅ Donasi sederhana (no biaya admin, provider detail)
- ✅ Penarikan dana basic (no approval workflow detail)
- ✅ Komentar flat (no nested replies, moderation)
- ❌ Notifikasi system (dihapus)
- ❌ Campaign updates (dihapus)

Struktur ini sangat cocok untuk skripsi karena:
- **Sederhana** tapi tetap fungsional
- **Mudah diimplementasi** dalam waktu terbatas
- **Bisa dikembangkan** setelah lulus
- **Memenuhi requirement** crowdfunding platform