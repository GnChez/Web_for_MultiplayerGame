import Link from 'next/link';

export default function Page() {
    return (
        <div>
            <h1>Hello, Next.js!</h1>
            <Link legacyBehavior href="/about"> 
                <a>About</a>
            </Link>
        </div>
    );
}