import { LanguageProvider } from '@/contexts/LanguageContext';
import AuthLayoutTemplate from '@/layouts/auth/auth-card-layout';

export default function AuthLayout({
    children,
    title,
    description,
    ...props
}: {
    children: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <LanguageProvider>
            <AuthLayoutTemplate title={title} description={description} {...props}>
                {children}
            </AuthLayoutTemplate>
        </LanguageProvider>
    );
}
