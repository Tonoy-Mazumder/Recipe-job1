import { Outlet } from "react-router-dom";

const HomeLayout = () => {
    return (
        <div className="min-h-screen bg-indigo-50">
            {/* পেজের মেইন কন্টেন্ট এখানে দেখাবে */}
            <main>
                <Outlet></Outlet>
            </main>
        </div>
    );
};

export default HomeLayout;