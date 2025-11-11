import { Category } from '@/components/categories/columns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface CreateCampaignPageProps extends PageProps {
    categories: Category[];
}

export default function Create({ auth, categories }: CreateCampaignPageProps) {
    const { data, setData, post, processing, errors } = useForm({
        judul: '',
        deskripsi: '',
        kategori_id: '',
        target_dana: '',
        tanggal_mulai: '',
        tanggal_berakhir: '',
        gambar_utama: null as File | null,
        status: 'aktif',
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('gambar_utama', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData('gambar_utama', null);
        setImagePreview(null);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.campaigns.store'));
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Buat Kampanye Baru" />

            <div className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild className="border-slate-200">
                        <Link href="/admin/campaigns">
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Buat Kampanye Baru</h1>
                        <p className="text-slate-600 mt-1">Tambahkan kampanye donasi baru</p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="judul" className="text-slate-700">
                                Judul Kampanye *
                            </Label>
                            <Input
                                id="judul"
                                value={data.judul}
                                onChange={(e) => setData('judul', e.target.value)}
                                className="bg-white border-slate-200 focus:border-slate-900"
                                placeholder="Masukkan judul kampanye"
                            />
                            {errors.judul && (
                                <p className="text-sm text-red-600">{errors.judul}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="deskripsi" className="text-slate-700">
                                Deskripsi *
                            </Label>
                            <Textarea
                                id="deskripsi"
                                value={data.deskripsi}
                                onChange={(e) => setData('deskripsi', e.target.value)}
                                className="bg-white border-slate-200 focus:border-slate-900 min-h-[200px]"
                                placeholder="Jelaskan detail kampanye donasi..."
                            />
                            {errors.deskripsi && (
                                <p className="text-sm text-red-600">{errors.deskripsi}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="kategori_id" className="text-slate-700">
                                    Kategori *
                                </Label>
                                <Select
                                    value={data.kategori_id}
                                    onValueChange={(value) => setData('kategori_id', value)}
                                >
                                    <SelectTrigger className="bg-white border-slate-200">
                                        <SelectValue placeholder="Pilih kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category.id}
                                                value={category.id.toString()}
                                            >
                                                {category.nama}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.kategori_id && (
                                    <p className="text-sm text-red-600">{errors.kategori_id}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="target_dana" className="text-slate-700">
                                    Target Dana (USD) *
                                </Label>
                                <Input
                                    id="target_dana"
                                    type="number"
                                    step="0.01"
                                    value={data.target_dana}
                                    onChange={(e) => setData('target_dana', e.target.value)}
                                    className="bg-white border-slate-200 focus:border-slate-900"
                                    placeholder="10000.00"
                                />
                                {errors.target_dana && (
                                    <p className="text-sm text-red-600">{errors.target_dana}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="tanggal_mulai" className="text-slate-700">
                                    Tanggal Mulai *
                                </Label>
                                <Input
                                    id="tanggal_mulai"
                                    type="date"
                                    value={data.tanggal_mulai}
                                    onChange={(e) => setData('tanggal_mulai', e.target.value)}
                                    className="bg-white border-slate-200 focus:border-slate-900"
                                />
                                {errors.tanggal_mulai && (
                                    <p className="text-sm text-red-600">{errors.tanggal_mulai}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tanggal_berakhir" className="text-slate-700">
                                    Tanggal Berakhir *
                                </Label>
                                <Input
                                    id="tanggal_berakhir"
                                    type="date"
                                    value={data.tanggal_berakhir}
                                    onChange={(e) => setData('tanggal_berakhir', e.target.value)}
                                    className="bg-white border-slate-200 focus:border-slate-900"
                                />
                                {errors.tanggal_berakhir && (
                                    <p className="text-sm text-red-600">
                                        {errors.tanggal_berakhir}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status" className="text-slate-700">
                                Status *
                            </Label>
                            <Select
                                value={data.status}
                                onValueChange={(value) => setData('status', value)}
                            >
                                <SelectTrigger className="bg-white border-slate-200">
                                    <SelectValue placeholder="Pilih status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="aktif">Aktif</SelectItem>
                                    <SelectItem value="nonaktif">Non-aktif</SelectItem>
                                    <SelectItem value="selesai">Selesai</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && (
                                <p className="text-sm text-red-600">{errors.status}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-slate-700">Gambar Utama *</Label>
                            {!imagePreview ? (
                                <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center hover:border-slate-300 transition-colors">
                                    <input
                                        type="file"
                                        id="gambar_utama"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="gambar_utama"
                                        className="cursor-pointer flex flex-col items-center"
                                    >
                                        <Upload className="w-12 h-12 text-slate-400 mb-4" />
                                        <p className="text-slate-600 font-medium mb-1">
                                            Klik untuk upload gambar
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            PNG, JPG, JPEG hingga 2MB
                                        </p>
                                    </label>
                                </div>
                            ) : (
                                <div className="relative rounded-lg overflow-hidden border border-slate-200">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-64 object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                            {errors.gambar_utama && (
                                <p className="text-sm text-red-600">{errors.gambar_utama}</p>
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
                            <Link href="/admin/campaigns">Batal</Link>
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-slate-900 hover:bg-slate-800"
                        >
                            {processing ? 'Menyimpan...' : 'Buat Kampanye'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
