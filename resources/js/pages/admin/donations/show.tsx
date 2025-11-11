import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { PageProps } from "@/types";
import { Donation } from "@/types/donation";
import { Head, Link } from "@inertiajs/react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
    ArrowLeft,
    Building,
    Calendar,
    CreditCard,
    DollarSign,
    FileText,
    MessageSquare,
    User,
} from "lucide-react";

interface Props extends PageProps {
  donation: Donation;
}

export default function DonationShow({ auth, donation }: Props) {
	const getStatusBadge = (status: string) => {
		const variants: Record<string, { label: string; className: string }> = {
			berhasil: { label: 'Berhasil', className: 'bg-green-50 text-green-700 border-green-200' },
			pending: { label: 'Pending', className: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
			gagal: { label: 'Gagal', className: 'bg-red-50 text-red-700 border-red-200' },
		};

		const variant = variants[status] || variants.pending;

		return (
			<Badge variant="outline" className={variant.className}>
				{variant.label}
			</Badge>
		);
	};

	return (
		<AppLayout>
			<Head title={`Detail Donasi - ${donation.order_id ?? donation.id_transaksi ?? donation.id}`} />

			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<Link href="/admin/donations">
							<Button variant="ghost" size="sm" className="mb-2">
								<ArrowLeft className="h-4 w-4 mr-2" />
								Kembali
							</Button>
						</Link>
						<h1 className="text-3xl font-bold text-slate-900">Detail Donasi</h1>
						<p className="text-slate-600 mt-1">Informasi lengkap transaksi donasi</p>
					</div>
					{getStatusBadge(donation.status)}
				</div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Transaction Details */}
            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Informasi Transaksi
                </CardTitle>
              </CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="text-sm font-medium text-slate-600">Order ID / ID Transaksi</label>
							<p className="font-mono text-sm bg-slate-50 px-3 py-2 rounded-md mt-1">
								{donation.order_id ?? donation.id_transaksi ?? '-'}
							</p>
						</div>
						<div>
							<label className="text-sm font-medium text-slate-600">Tanggal Donasi</label>
							<p className="text-slate-900 mt-1 flex items-center gap-2">
								<Calendar className="h-4 w-4 text-slate-500" />
								{format(new Date(donation.created_at), 'dd MMMM yyyy, HH:mm', {
									locale: id,
								})}
							</p>
						</div>
					</div>

					<div>
						<label className="text-sm font-medium text-slate-600">Metode Pembayaran</label>
						<p className="text-slate-900 mt-1 flex items-center gap-2">
							<CreditCard className="h-4 w-4 text-slate-500" />
							{donation.metode_pembayaran || '-'}
						</p>
					</div>

					{(donation.pesan || donation.pesan_dukungan) && (
						<div>
							<label className="text-sm font-medium text-slate-600 flex items-center gap-2">
								<MessageSquare className="h-4 w-4" />
								Pesan
							</label>
							<p className="text-slate-900 mt-1 bg-slate-50 p-3 rounded-md">
								{donation.pesan || donation.pesan_dukungan}
							</p>
						</div>
					)}
				</CardContent>
            </Card>

            {/* Donor Info */}
            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informasi Donatur
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
					<div>
						<label className="text-sm font-medium text-slate-600">Nama</label>
						<div className="flex items-center gap-2 mt-1">
							<p className="text-slate-900 font-medium">
								{donation.is_anonim ? 'Anonim' : donation.nama_donatur || donation.user?.name || 'Guest'}
							</p>
							{donation.is_anonim && (
								<Badge variant="secondary" className="text-xs">
									Anonim
								</Badge>
							)}
						</div>
					</div>

					{!donation.is_anonim && (donation.email_donatur || donation.user) && (
						<div>
							<label className="text-sm font-medium text-slate-600">Email</label>
							<p className="text-slate-900 mt-1">{donation.email_donatur || donation.user?.email}</p>
						</div>
					)}
				</CardContent>
            </Card>

            {/* Campaign Info */}
            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Informasi Kampanye
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {donation.kampanye?.gambar_utama && (
                  <img
                    src={`/storage/${donation.kampanye.gambar_utama}`}
                    alt={donation.kampanye.judul}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Judul Kampanye
                  </label>
                  <p className="text-slate-900 font-medium mt-1">
                    {donation.kampanye?.judul || "-"}
                  </p>
                </div>
                {donation.kampanye?.kategori && (
                  <div>
                    <label className="text-sm font-medium text-slate-600">
                      Kategori
                    </label>
                    <p className="text-slate-900 mt-1">
                      <Badge variant="outline" className="bg-slate-50">
                        {donation.kampanye.kategori.nama}
                      </Badge>
                    </p>
                  </div>
                )}
                <Link href={`/admin/campaigns/${donation.kampanye?.id}`}>
                  <Button variant="outline" size="sm" className="mt-2">
                    Lihat Detail Kampanye
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Payment Summary */}
          <div className="space-y-6">
            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Ringkasan Pembayaran
                </CardTitle>
              </CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-3">
						<div className="flex justify-between">
							<span className="text-slate-600">Jumlah Donasi</span>
							<span className="font-medium text-slate-900">Rp {donation.jumlah.toLocaleString('id-ID')}</span>
						</div>
						<div className="pt-3 border-t border-slate-200">
							<div className="flex justify-between">
								<span className="font-semibold text-slate-900">Total Donasi</span>
								<span className="font-bold text-lg text-slate-900">Rp {donation.jumlah.toLocaleString('id-ID')}</span>
							</div>
						</div>
					</div>

					<div className="pt-4 border-t border-slate-200">
						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span className="text-slate-600">Status</span>
								{getStatusBadge(donation.status)}
							</div>
							<div className="flex justify-between text-sm">
								<span className="text-slate-600">ID Transaksi</span>
								<span className="font-mono text-xs text-slate-900">#{donation.id}</span>
							</div>
						</div>
					</div>
				</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
