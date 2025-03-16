import {Link} from "@inertiajs/react";


const Layout = ({children}) => {
    return (
        <>
            <header>
                <nav>
                    <Link href="/">Home</Link>
                    <Link href="/create">Create</Link>
                </nav>
            </header>
            <main>
                {children}
            </main>

        </>
    );
};

export default Layout;
