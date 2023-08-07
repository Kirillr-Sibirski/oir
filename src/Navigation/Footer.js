export default function Footer() {
  return (  
    <footer class="bg-white rounded-lg shadow dark:bg-[#050401] m-4">
        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div class="sm:flex sm:items-center sm:justify-between">
                <a class="flex items-center mb-4 sm:mb-0">
                    <span class="self-center text-base font-semibold whitespace-nowrap dark:text-[#fffaff]">Made with love during Superhack 2023.</span>
                </a>
                <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <a href="mailto:kirill.rybkov@outlook.com" class="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">Ⓚ 2023 <a class="hover:underline">OIR</a>. All Rights Reversed.</span>
        </div>
    </footer>
  )
}
