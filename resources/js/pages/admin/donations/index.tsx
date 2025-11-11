import { DonationDataTable } from "@/components/donations/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { PageProps } from "@/types";
import { Donation, DonationStats } from "@/types/donation";
import { Head, Link } from "@inertiajs/react";
import {
    Banknote,
    ChevronLeft,
    ChevronRight,
    Clock,
    TrendingUp,
    Users,
} from "lucide-react";

interface Campaign {
  id: number;
  judul: string;
}

interface Props extends PageProps {
  donations: {
    data: Donation[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  stats: DonationStats;
  campaigns: Campaign[];
  filters: {
    search?: string;
    status?: string;
    campaign_id?: number;
    date_from?: string;
    date_to?: string;
  };
}

export default function DonationIndex({
  auth,
  donations,
  stats,
  campaigns,
  filters,
}: Props) {
  return (
    <AppLayout>
      <Head title="Semua Donasi" />

      <div className="space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Semua Donasi</h1>
          <p className="text-slate-600 mt-1">
            Kelola dan pantau semua transaksi donasi
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total Donasi Berhasil
              </CardTitle>
              <Banknote className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {(stats?.total_donations || 0).toLocaleString("id-ID")}
              </div>
              <p className="text-xs text-slate-500 mt-1">Transaksi berhasil</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total Dana Terkumpul
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                Rp {(stats?.total_amount || 0).toLocaleString("id-ID")}
              </div>
              <p className="text-xs text-slate-500 mt-1">Dari semua kampanye</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total Donatur
              </CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {(stats?.total_donors || 0).toLocaleString("id-ID")}
              </div>
              <p className="text-xs text-slate-500 mt-1">Donatur unik</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Donasi Pending
              </CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {(stats?.pending_donations || 0).toLocaleString("id-ID")}
              </div>
              <p className="text-xs text-slate-500 mt-1">Menunggu pembayaran</p>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Daftar Donasi</CardTitle>
          </CardHeader>
          <CardContent>
            <DonationDataTable
              data={donations?.data || []}
              campaigns={campaigns || []}
              filters={filters}
            />

            {/* Pagination */}
            {donations && donations.last_page > 1 && (
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200">
                <div className="text-sm text-slate-600">
                  Menampilkan {donations.data.length} dari {donations.total}{" "}
                  donasi
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/donations?page=${donations.current_page - 1}`}
                    preserveState
                    preserveScroll
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={donations.current_page === 1}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                  </Link>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: donations.last_page }, (_, i) => (
                      <Link
                        key={i + 1}
                        href={`/admin/donations?page=${i + 1}`}
                        preserveState
                        preserveScroll
                      >
                        <Button
                          variant={
                            donations.current_page === i + 1
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          className={
                            donations.current_page === i + 1
                              ? "bg-slate-900 hover:bg-slate-800"
                              : ""
                          }
                        >
                          {i + 1}
                        </Button>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={`/admin/donations?page=${donations.current_page + 1}`}
                    preserveState
                    preserveScroll
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={
                        donations.current_page === donations.last_page
                      }
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
