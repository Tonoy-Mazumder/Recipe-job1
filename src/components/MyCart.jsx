import React from 'react';
import MealCard from './MealCard';

function Cart({ bookmarks, onToggleBookmark, setActivePage }) {
  return (
    <div className="mx-auto mt-10 max-w-5xl px-6">
      {/* শিরোনাম + Home-এ ফেরার বাটন */}
      <div className="mb-8 flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          Your saved recipes
          <span className="ml-3 inline-flex min-w-7 items-center justify-center rounded-full bg-teal-100 px-2.5 py-0.5 align-middle text-sm font-semibold text-teal-800">
            {bookmarks.length}
          </span>
        </h2>
        <button
          onClick={() => setActivePage('home')}
          className="self-start text-sm font-semibold text-teal-700 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 cursor-pointer sm:self-auto"
        >
          ← Back to Home
        </button>
      </div>

      {bookmarks.length === 0 ? (
        // কার্ট খালি থাকলে এই বক্স দেখাবে
        <div className="rounded-2xl bg-white px-6 py-16 text-center ring-1 ring-dashed ring-slate-300">
          <p className="mb-1 text-lg font-semibold text-slate-700">Your cart is empty</p>
          <p className="mb-6 text-sm text-slate-500">
            Save recipes you like and they will show up here.
          </p>
          <button
            onClick={() => setActivePage('home')}
            className="rounded-xl bg-orange-500 px-6 py-2.5 font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-300 cursor-pointer"
          >
            Browse recipes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {bookmarks.map((recipe) => (
            <MealCard
              key={recipe.idMeal}
              recipe={recipe}
              isBookmarked={true}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;