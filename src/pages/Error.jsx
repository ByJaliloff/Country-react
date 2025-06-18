import { Link } from "react-router-dom";

function Error() {
    return (
        <div>
            <main className="grid min-h-full place-items-center bg-[#E5E7EB] text-black dark:bg-[#282c3a] dark:text-white transition-colors duration-300 px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-violet-600">404</p>
                    <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-violet-600 sm:text-7xl">Səhifə tapılmadı</h1>
                    <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-white">
                        Üzr istəyirik, axtardığınız səhifə mövcud deyil.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/countries"
                            className="relative group px-4 py-2 text-sm font-semibold bg-white text-violet-600 border border-violet-600 dark:text-white dark:bg-violet-600 rounded-md overflow-hidden"
                        >
                            <span className="absolute bottom-0 left-0 h-0.5 w-0 dark:bg-white bg-violet-600 group-hover:w-full transition-all duration-300 ease-out"></span>
                            <span className="relative z-10">Ana səhifə</span>
                        </Link>

                        <a
                            href="#"
                            className="text-sm font-semibold text-gray-900 dark:text-white"
                        >
                            Dəstəyə yazın <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Error;
