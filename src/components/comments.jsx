const Comment = ({img, children, fullname}) => {
    return (
        <div>

            <div class="bg-white dark:bg-gray-700 text-black dark:text-gray-200 p-4 antialiased flex max-w-lg">
                <img class="rounded-full h-8 w-8 mr-2 mt-1 " src={img} />
                <div>
                    <div class="bg-gray-100 dark:bg-gray-800 rounded-3xl px-4 pt-2 pb-2.5">
                        <div class="font-semibold text-sm leading-relaxed">{fullname}</div>
                        <div class="text-normal leading-snug md:leading-normal">
                            {children}
                        </div>
                    </div>
                    <div class="text-sm ml-4 mt-0.5 text-gray-500 dark:text-gray-400">Date</div>
                </div>

            </div>
        </div>
    )
}

export default Comment