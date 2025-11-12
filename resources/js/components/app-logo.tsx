
export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-full overflow-hidden bg-white shadow-md">
                <img 
                    src="/images/logo-atb.jpeg" 
                    alt="Adopt the Blue"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-400 dark:to-teal-400 bg-clip-text text-transparent">
                    Adopt the Blue
                </span>
                <span className="truncate text-xs text-blue-600/70 dark:text-blue-400/70">
                    Ocean Conservation
                </span>
            </div>
        </>
    );
}
