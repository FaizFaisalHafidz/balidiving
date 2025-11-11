import { Campaign, columns as campaignColumns } from '@/components/campaigns/columns';
import { DataTable as CampaignDataTable } from '@/components/campaigns/data-table';
import { Category, columns as categoryColumns } from '@/components/categories/columns';
import { DataTable as CategoryDataTable } from '@/components/categories/data-table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { BookOpen, Calendar, FolderHeart, Plus, Target, TrendingUp } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface CampaignsPageProps extends PageProps {
    campaigns: {
        data: Campaign[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: any[];
    };
    categories: Category[];
    stats: {
        total_campaigns: number;
        active_campaigns: number;
        total_raised: number;
        target_reached: number;
    };
    categoryStats: {
        total_categories: number;
        categories_with_campaigns: number;
    };
    filters: {
        search: string;
        kategori_id: string;
        status: string;
    };
}

export default function Index({
    auth,
    campaigns,
    categories,
    stats,
    categoryStats,
    filters,
}: CampaignsPageProps) {
    useEffect(() => {
        const flash = (window as any).flash;
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, []);

    return (
        <AppLayout user={auth.user}>
            <Head title="Kelola Kampanye & Kategori" />

            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Kelola Kampanye & Kategori
                        </h1>
                        <p className="text-slate-600 mt-1">
                            Kelola semua kampanye donasi dan kategorinya
                        </p>
                    </div>
                </div>

                <Tabs defaultValue="campaigns" className="space-y-6">
                    <TabsList className="bg-slate-100 p-1">
                        <TabsTrigger
                            value="campaigns"
                            className="data-[state=active]:bg-white data-[state=active]:text-slate-900"
                        >
                            <FolderHeart className="w-4 h-4 mr-2" />
                            Kampanye
                        </TabsTrigger>
                        <TabsTrigger
                            value="categories"
                            className="data-[state=active]:bg-white data-[state=active]:text-slate-900"
                        >
                            <BookOpen className="w-4 h-4 mr-2" />
                            Kategori
                        </TabsTrigger>
                    </TabsList>

                    {/* Campaigns Tab */}
                    <TabsContent value="campaigns" className="space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white rounded-lg border border-slate-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600">
                                            Total Kampanye
                                        </p>
                                        <p className="text-2xl font-bold text-slate-900 mt-2">
                                            {stats?.total_campaigns || 0}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-slate-100 rounded-lg">
                                        <FolderHeart className="w-6 h-6 text-slate-600" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg border border-slate-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600">
                                            Kampanye Aktif
                                        </p>
                                        <p className="text-2xl font-bold text-slate-900 mt-2">
                                            {stats?.active_campaigns || 0}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-green-100 rounded-lg">
                                        <Calendar className="w-6 h-6 text-green-600" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg border border-slate-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600">
                                            Total Terkumpul
                                        </p>
                                        <p className="text-2xl font-bold text-slate-900 mt-2">
                                            ${(stats?.total_raised || 0).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-blue-100 rounded-lg">
                                        <TrendingUp className="w-6 h-6 text-blue-600" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg border border-slate-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600">
                                            Target Tercapai
                                        </p>
                                        <p className="text-2xl font-bold text-slate-900 mt-2">
                                            {stats?.target_reached || 0}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-purple-100 rounded-lg">
                                        <Target className="w-6 h-6 text-purple-600" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Create Button */}
                        <div className="flex justify-end">
                            <Button asChild className="bg-slate-900 hover:bg-slate-800">
                                <Link href="/admin/campaigns/create">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Buat Kampanye Baru
                                </Link>
                            </Button>
                        </div>

                        {/* Campaigns Data Table */}
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <CampaignDataTable
                                columns={campaignColumns}
                                data={campaigns?.data || []}
                                categories={categories || []}
                                filters={filters}
                            />
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between bg-white rounded-lg border border-slate-200 p-4">
                            <p className="text-sm text-slate-600">
                                Halaman {campaigns?.current_page || 1} dari {campaigns?.last_page || 1} (
                                {campaigns?.total || 0} total kampanye)
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    asChild
                                    disabled={campaigns?.current_page === 1}
                                    className="border-slate-200 hover:bg-slate-100"
                                >
                                    <Link
                                        href={`/admin/campaigns?page=${(campaigns?.current_page || 1) - 1}`}
                                        preserveState
                                    >
                                        Previous
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    asChild
                                    disabled={campaigns?.current_page === campaigns?.last_page}
                                    className="border-slate-200 hover:bg-slate-100"
                                >
                                    <Link
                                        href={`/admin/campaigns?page=${(campaigns?.current_page || 1) + 1}`}
                                        preserveState
                                    >
                                        Next
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Categories Tab */}
                    <TabsContent value="categories" className="space-y-6">
                        {/* Category Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-lg border border-slate-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600">
                                            Total Kategori
                                        </p>
                                        <p className="text-2xl font-bold text-slate-900 mt-2">
                                            {categoryStats?.total_categories || 0}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-slate-100 rounded-lg">
                                        <BookOpen className="w-6 h-6 text-slate-600" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg border border-slate-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600">
                                            Kategori Terpakai
                                        </p>
                                        <p className="text-2xl font-bold text-slate-900 mt-2">
                                            {categoryStats?.categories_with_campaigns || 0}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-green-100 rounded-lg">
                                        <FolderHeart className="w-6 h-6 text-green-600" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Create Category Button */}
                        <div className="flex justify-end">
                            <Button asChild className="bg-slate-900 hover:bg-slate-800">
                                <Link href="/admin/categories/create">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Tambah Kategori
                                </Link>
                            </Button>
                        </div>

                        {/* Categories Data Table */}
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <CategoryDataTable columns={categoryColumns} data={categories || []} />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
