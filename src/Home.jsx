import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MealCard from './components/MealCard';
import Cart from './components/MyCart';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activePage, setActivePage] = useState('home'); // 'home' or 'cart'

  // LocalStorage থেকে কার্টের ডেটা লোড করা
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('recipeBookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  // কার্ট আপডেট হলে LocalStorage-এ সেভ করা
  useEffect(() => {
    localStorage.setItem('recipeBookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // API থেকে ডেটা আনার কমন ফাংশন
  const fetchRecipes = (query) => {
    setLoading(true);
    setError('');
    setRecipes([]);

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.meals) {
          setRecipes(data.meals);
        } else {
          setError('No recipes found. Try searching for something else!');
        }
      })
      .catch(() => {
        setLoading(false);
        setError('Failed to fetch recipes. Check your internet connection.');
      });
  };

  // পেজ প্রথমবার লোড হলে ডিফল্ট ডেটা ('chicken') দেখাবে
  useEffect(() => {
    fetchRecipes('chicken');
  }, []);

  // সার্চ বাটনে ক্লিক করলে কল হবে
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    fetchRecipes(searchTerm);
  };

  // কার্টে অ্যাড বা রিমুভ করার ফাংশন
  const toggleBookmark = (recipe) => {
    const isBookmarked = bookmarks.some((item) => item.idMeal === recipe.idMeal);
    if (isBookmarked) {
      setBookmarks(bookmarks.filter((item) => item.idMeal !== recipe.idMeal));
    } else {
      setBookmarks([...bookmarks, recipe]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12 font-sans">
      {/* Navbar Component */}
      <Navbar
        cartCount={bookmarks.length}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* পেজ সুইচিং: Home নাকি Cart */}
      {activePage === 'cart' ? (
        <Cart
          bookmarks={bookmarks}
          onToggleBookmark={toggleBookmark}
          setActivePage={setActivePage}
        />
      ) : (
        <>
          {/* সার্চ সেকশন: পুরো প্রস্থ জুড়ে টিল রঙের ব্যানার */}
          <section className="bg-teal-700 px-6 py-12 sm:py-16">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                What are you cooking today?
              </h1>
              <p className="mt-3 text-teal-100">
                Search thousands of recipes and save your favorites.
              </p>

              {/* Search Form */}
              <form
                onSubmit={handleSearch}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="text"
                  placeholder="Search for a recipe (e.g., beef, pasta, cake)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 rounded-xl bg-white px-5 py-3.5 text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-4 focus:ring-teal-400/50"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-orange-500 px-8 py-3.5 font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-300 cursor-pointer"
                >
                  Search
                </button>
              </form>
            </div>
          </section>

          {/* রেজাল্ট সেকশন */}
          <div className="mx-auto mt-10 max-w-5xl px-6">
            {/* Loading & Error Messages */}
            {loading && (
              <div className="flex items-center justify-center gap-3 py-16 text-lg text-slate-600">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-teal-600 border-t-transparent" />
                Loading recipes...
              </div>
            )}
            {error && (
              <p className="mx-auto max-w-md rounded-xl bg-orange-50 px-5 py-4 text-center text-orange-700 ring-1 ring-orange-200">
                {error}
              </p>
            )}

            {/* পাওয়া রেসিপির সংখ্যা */}
            {recipes.length > 0 && (
              <p className="mb-5 text-sm font-medium text-slate-500">
                {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} found
              </p>
            )}

            {/* Recipe Grid using MealCard Component */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {recipes.map((recipe) => {
                const isBookmarked = bookmarks.some((item) => item.idMeal === recipe.idMeal);
                return (
                  <MealCard
                    key={recipe.idMeal}
                    recipe={recipe}
                    isBookmarked={isBookmarked}
                    onToggleBookmark={toggleBookmark}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;