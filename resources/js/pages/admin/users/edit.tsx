import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { FormEventHandler } from 'react';

interface Props {
    user: {
        id: number;
        name: string;
        email: string;
        email_verified_at: string | null;
        roles: { name: string }[];
    };
    roles: { id: number; name: string }[];
    userRoles: string[];
}

export default function Edit({ user, roles, userRoles }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        roles: userRoles,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/admin/users/${user.id}`);
    };

    const handleRoleToggle = (roleName: string) => {
        setData(
            'roles',
            data.roles.includes(roleName)
                ? data.roles.filter((r) => r !== roleName)
                : [...data.roles, roleName]
        );
    };

    return (
        <AppLayout>
            <Head title={`Edit ${user.name}`} />

            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="bg-slate-900 hover:bg-slate-800 text-white border-slate-700 shadow-md"
                    >
                        <Link href="/admin/users">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Edit Pengguna</h1>
                        <p className="text-slate-400 mt-1">
                            Update informasi untuk {user.name}
                        </p>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-md">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-slate-200">
                                Nama Lengkap
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                                placeholder="Masukkan nama lengkap"
                                required
                            />
                            {errors.name && (
                                <p className="text-sm text-red-400">{errors.name}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-200">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                                placeholder="user@example.com"
                                required
                            />
                            {errors.email && (
                                <p className="text-sm text-red-400">{errors.email}</p>
                            )}
                        </div>

                        {/* Password (Optional) */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-slate-200">
                                Password Baru (Opsional)
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                                placeholder="Kosongkan jika tidak ingin mengubah"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-400">{errors.password}</p>
                            )}
                        </div>

                        {/* Password Confirmation */}
                        {data.password && (
                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation" className="text-slate-200">
                                    Konfirmasi Password Baru
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData('password_confirmation', e.target.value)
                                    }
                                    className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                                    placeholder="Ulangi password baru"
                                />
                                {errors.password_confirmation && (
                                    <p className="text-sm text-red-400">
                                        {errors.password_confirmation}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Roles */}
                        <div className="space-y-3">
                            <Label className="text-slate-200">Role</Label>
                            <div className="space-y-3">
                                {roles.map((role) => (
                                    <div key={role.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`role-${role.id}`}
                                            checked={data.roles.includes(role.name)}
                                            onCheckedChange={() => handleRoleToggle(role.name)}
                                            className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                        />
                                        <label
                                            htmlFor={`role-${role.id}`}
                                            className="text-sm font-medium text-slate-300 cursor-pointer"
                                        >
                                            {role.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.roles && (
                                <p className="text-sm text-red-400">{errors.roles}</p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4 pt-4">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-700"
                            >
                                {processing ? 'Menyimpan...' : 'Update Pengguna'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                asChild
                                className="bg-transparent hover:bg-slate-800 text-white border-slate-700"
                            >
                                <Link href="/admin/users">Batal</Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
