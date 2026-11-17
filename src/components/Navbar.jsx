import React from 'react';

function Navbar({ cartCount, activePage, setActivePage }) {
  return (
    // নিচে কোনো মার্জিন নেই, যাতে Home পেজের টিল ব্যানার নেভবারের সাথে লেগে থাকে
    <nav className="border-b border-slate-200 bg-white px-6 py-3.5">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        {/* Logo / Title */}
        <h1
          onClick={() => setActivePage('home')}
          className="cursor-pointer text-xl font-bold tracking-tight text-teal-800 sm:text-2xl"
        >
          Recipe<span className="text-orange-500">Finder</span>
        </h1>

        {/* Navigation Links */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePage('home')}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 cursor-pointer ${
              activePage === 'home'
                ? 'bg-teal-700 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => setActivePage('cart')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 cursor-pointer ${
              activePage === 'cart'
                ? 'bg-teal-700 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Cart
            {/* কার্টের সংখ্যা */}
            <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-orange-500 px-1.5 py-0.5 text-xs font-bold text-white">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;