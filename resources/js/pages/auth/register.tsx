import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useLanguage } from '@/contexts/LanguageContext';
import AuthLayout from '@/layouts/auth-layout';

function RegisterContent() {
    const { t } = useLanguage();
    return (
        <AuthLayout
            title={t('auth.register.title')}
            description={t('auth.register.description')}
        >
            <Head title={t('auth.register.title')} />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="text-blue-900 dark:text-blue-100">
                                    {t('auth.register.name')}
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder={t('auth.register.name.placeholder')}
                                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 dark:border-blue-800"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-blue-900 dark:text-blue-100">
                                    {t('auth.register.email')}
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder={t('auth.register.email.placeholder')}
                                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 dark:border-blue-800"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password" className="text-blue-900 dark:text-blue-100">
                                    {t('auth.register.password')}
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder={t('auth.register.password.placeholder')}
                                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 dark:border-blue-800"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation" className="text-blue-900 dark:text-blue-100">
                                    {t('auth.register.passwordConfirm')}
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder={t('auth.register.passwordConfirm.placeholder')}
                                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 dark:border-blue-800"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold shadow-lg shadow-blue-500/30 transition-all"
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                {t('auth.register.button')}
                            </Button>
                        </div>

                        <div className="text-center text-sm text-blue-600 dark:text-blue-400">
                            {t('auth.register.hasAccount')}{' '}
                            <TextLink 
                                href={login()} 
                                tabIndex={6}
                                className="font-semibold text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                            >
                                {t('auth.register.loginHere')}
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}

export default function Register() {
    return <RegisterContent />;
}
