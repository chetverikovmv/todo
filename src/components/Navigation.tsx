import { Link } from "react-router-dom";

export function Navigation() {
    return (
        <div className="bg-gray-500">
            <div className="container mx-auto max-w-lg">
                <nav className="h-[50px] flex justify-between px-5 bg-gray-500 items-center text-white">
                    <span className="font-bold">TODO</span>

                    <span>
                        <Link className="mr-3 hover:underline" to="/">Main</Link>
                        <Link className="hover:underline" to="/about">About</Link>
                    </span>
                </nav>
            </div>
        </div>
    )
}