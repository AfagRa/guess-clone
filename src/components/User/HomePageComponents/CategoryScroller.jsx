import SimpleBar from 'simplebar-react';

const CategoryScroller = ({ categories }) => {
  return (
    <section>
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-4xl md:text-5xl mt-6 mb-10">Made for Brighter Days</h2>

        <SimpleBar autoHide={false} forceVisible="x" className="w-full pt-0 px-[5%] pb-[1%]" >
          <div className="flex gap-8 justify-start w-max pb-10">
            {categories.map((category, index) => (
              <button key={index}
                onClick={() => window.location.href = category.path}
                className="py-3 px-4 w-40 sm:w-55 lg:w-70 border rounded-full text-sm sm:text-base md:text-lg whitespace-nowrap justify-center items-center cursor-pointer"
              >
                {category.name}
              </button>
            ))}
          </div>
        </SimpleBar>
      </div>
    </section>
  );
};

export default CategoryScroller;
