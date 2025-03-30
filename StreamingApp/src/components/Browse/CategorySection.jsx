import CategoryCard from './CategoryCard';

function CategorySection({ title, categories, onSelect }) {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-2xl font-bold flex items-center">
          <span className="inline-block w-1.5 h-6 bg-purple-500 rounded-sm mr-2"></span>
          {title}
        </h2>
        <button className="text-purple-400 hover:text-purple-300 flex items-center group">
          <span>View All</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map(category => (
          <CategoryCard key={category.id} category={category} onClick={onSelect} />
        ))}
      </div>
    </div>
  );
}

export default CategorySection;
