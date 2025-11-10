import { Waves } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 shadow-md shadow-blue-500/30">
                <Waves className="size-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-400 dark:to-teal-400 bg-clip-text text-transparent">
                    Born to Give
                </span>
                <span className="truncate text-xs text-blue-600/70 dark:text-blue-400/70">
                    Ocean Conservation
                </span>
            </div>
        </>
    );
}
