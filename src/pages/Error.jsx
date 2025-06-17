

function Error() {
    return (
        <div>
            <main className="grid min-h-full place-items-center bg-[#E5E7EB] text-black dark:bg-[#1e1e2f] dark:text-white transition-colors duration-300 px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-violet-600">404</p>
                    <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-violet-600 sm:text-7xl">Page not found</h1>
                    <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Sorry, we couldn’t find the page you’re looking for.</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a href="#" className="rounded-md bg-violet-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">Go back home</a>
                        <a href="#" className="text-sm font-semibold text-gray-900 dark:text-white">Contact support <span aria-hidden="true">&rarr;</span></a>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Error