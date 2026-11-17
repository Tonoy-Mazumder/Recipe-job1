

function MealCard({ recipe, isBookmarked, onToggleBookmark }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition hover:shadow-lg hover:ring-teal-200">
      {/* রেসিপির ছবি + ক্যাটাগরি ব্যাজ */}
      <div className="relative">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="h-48 w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-teal-800 shadow-sm">
          {recipe.strCategory || 'General'}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <h3 className="text-lg font-bold leading-snug text-slate-800">{recipe.strMeal}</h3>

        <div className="mt-5 flex items-center justify-between">
          <a
            href={recipe.strSource || recipe.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-teal-700 underline-offset-4 hover:underline"
          >
            View Details
          </a>
          <button
            onClick={() => onToggleBookmark(recipe)}
            className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer ${
              isBookmarked
                ? 'bg-slate-100 text-slate-700 ring-1 ring-slate-300 hover:bg-slate-200 focus-visible:ring-slate-400'
                : 'bg-orange-500 text-white hover:bg-orange-600 focus-visible:ring-orange-300'
            }`}
          >
            {isBookmarked ? 'Remove' : '+ Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MealCard;