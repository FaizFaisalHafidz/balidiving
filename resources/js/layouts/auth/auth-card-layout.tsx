import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { Waves } from 'lucide-react';
import { type PropsWithChildren } from 'react';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50 dark:from-blue-950 dark:via-teal-950 dark:to-cyan-950 p-6 md:p-10 relative overflow-hidden">
            {/* Ocean Wave Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="wave" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                <path d="M0 50 Q 25 25, 50 50 T 100 50" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#wave)" />
                    </svg>
                </div>
            </div>

            <div className="flex w-full max-w-md flex-col gap-6 relative z-10">
                {/* Logo Section */}
                <Link
                    href={home()}
                    className="flex flex-col items-center gap-3 self-center"
                >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 shadow-lg shadow-blue-500/30 transition-transform hover:scale-105">
                        <Waves className="size-8 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-400 dark:to-teal-400 bg-clip-text text-transparent">
                            Born to Give
                        </h1>
                        <p className="text-sm text-blue-600/70 dark:text-blue-400/70 font-medium">
                            Ocean Conservation Platform
                        </p>
                    </div>
                </Link>

                <div className="flex flex-col gap-6">
                    <Card className="rounded-2xl border-blue-100 dark:border-blue-900 shadow-xl shadow-blue-500/10 backdrop-blur-sm bg-white/80 dark:bg-gray-950/80">
                        <CardHeader className="px-10 pt-8 pb-0 text-center">
                            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-400 dark:to-teal-400 bg-clip-text text-transparent">
                                {title}
                            </CardTitle>
                            <CardDescription className="text-blue-600/70 dark:text-blue-400/70 mt-2">
                                {description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="px-10 py-8">
                            {children}
                        </CardContent>
                    </Card>
                </div>

                {/* Footer Text */}
                <div className="text-center text-xs text-blue-600/60 dark:text-blue-400/60">
                    <p>🌊 Together we protect our oceans 🌊</p>
                </div>
            </div>
        </div>
    );
}
