import { Category } from '@/components/categories/columns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { FormEventHandler } from 'react';

interface EditCategoryPageProps {
    auth: { user: any };
    category: Category;
}

export default function EditCategory({ auth, category }: EditCategoryPageProps) {
    const { data, setData, put, processing, errors } = useForm({
        nama: category.nama || '',
        deskripsi: category.deskripsi || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/admin/categories/${category.id}`);
    };

    return (
        <AppLayout>
            <Head title="Edit Kategori" />

            <div className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild className="border-slate-200">
                        <Link href="/admin/campaigns?tab=categories">
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Edit Kategori</h1>
                        <p className="text-slate-600 mt-1">Update informasi kategori</p>
                    </div>
                </div>

                <form onSubmit={submit} className="max-w-2xl space-y-6">
                    <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="nama" className="text-slate-700">
                                Nama Kategori *
                            </Label>
                            <Input
                                id="nama"
                                value={data.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                                className="bg-white border-slate-200 focus:border-slate-900"
                                placeholder="Contoh: Konservasi Laut"
                            />
                            {errors.nama && (
                                <p className="text-sm text-red-600">{errors.nama}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="deskripsi" className="text-slate-700">
                                Deskripsi
                            </Label>
                            <Textarea
                                id="deskripsi"
                                value={data.deskripsi}
                                onChange={(e) => setData('deskripsi', e.target.value)}
                                className="bg-white border-slate-200 focus:border-slate-900"
                                placeholder="Jelaskan kategori ini..."
                            />
                            {errors.deskripsi && (
                                <p className="text-sm text-red-600">{errors.deskripsi}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            asChild
                            className="border-slate-200"
                        >
                            <Link href="/admin/campaigns?tab=categories">Batal</Link>
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-slate-900 hover:bg-slate-800"
                        >
                            {processing ? 'Menyimpan...' : 'Update Kategori'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
