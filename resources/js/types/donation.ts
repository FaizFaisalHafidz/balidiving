export interface Donation {
  id: number;
  order_id: string | null;
  id_transaksi: string | null;
  user_id: number | null;
  kampanye_id: number;
  jumlah: number;
  metode_pembayaran: string | null;
  status: 'pending' | 'berhasil' | 'gagal';
  nama_donatur: string | null;
  email_donatur: string | null;
  no_telepon_donatur: string | null;
  pesan: string | null;
  pesan_dukungan: string | null;
  is_anonim: boolean;
  snap_token: string | null;
  created_at: string;
  updated_at: string;
  
  // Relations
  user?: {
    id: number;
    name: string;
    email: string;
  };
  
  kampanye?: {
    id: number;
    judul: string;
    slug: string;
    gambar_utama?: string;
    kategori?: {
      id: number;
      nama: string;
    };
  };
}

export interface DonationStats {
  total_donations: number;
  total_amount: number;
  total_donors: number;
  pending_donations: number;
}
