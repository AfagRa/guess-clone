const CategoryGrid = () => {
    const categories = [
        {
            title: "Matching Sets",
            img: "https://img.guess.com/image/upload/q_auto,f_auto,dpr_auto,w_1280,c_limit/v1/NA/Asset/North%20America/E-Commerce/Guess/Bug%20Number/10774/G_Site_Home_ContentCenter_July_10774_05",
            link: "category/women",
        },
        {
            title: "What We Love",
            img: "https://img.guess.com/image/upload/q_auto,f_auto,dpr_auto,w_1280,c_limit/v1/NA/Asset/North%20America/E-Commerce/Guess/Bug%20Number/10774/G_Site_Home_ContentCenter_July_10774_06",
            link: "category/women",
        },
        {
            title: "Essentials",
            img: "https://img.guess.com/image/upload/q_auto,f_auto,dpr_auto,w_1280,c_limit/v1/NA/Asset/North%20America/E-Commerce/Guess/Bug%20Number/10774/G_Site_Home_ContentCenter_July_10774_07",
            link: "category/women",
        },
        {
            title: "Marciano",
            img: "https://img.guess.com/image/upload/q_auto,f_auto,dpr_auto,w_1280,c_limit/v1/NA/Asset/North%20America/E-Commerce/Guess/Bug%20Number/10774/G_Site_Home_ContentCenter_July_10774_08",
            link: "category/women",
        },
    ];

    return (
        <section className="text-center mb-20">
            <h2 className="text-2xl sm:text-4xl md:text-5xl mt-15 mb-10">
                Define Your Summer Look
            </h2>

            <div className="w-full">
                <div className="grid grid-cols-2 md:grid-cols-4 max-md:gap-y-3 items-center justify-center overflow-y-hidden">
                {categories.map((cat, i) => (
                    <div
                    key={i}
                    onClick={() => (window.location.href = cat.link)}
                    className="group cursor-pointer"
                    >
                    <div className="relative overflow-hidden aspect-[4/5] mb-3">
                        <img
                        src={cat.img}
                        alt={cat.title.toLowerCase()}
                        className="w-full h-full object-cover"
                        />
                    </div>
                    <h3 className="my-3 md:my-5 text-center text-md sm:text-xl md:text-lg lg:text-xl text-light hover:underline decoration-1 underline-offset-8">
                        {cat.title}
                    </h3>
                    </div>
                ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;
