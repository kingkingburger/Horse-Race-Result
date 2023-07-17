import Link from "next/link";
import { Home } from 'react-feather'

export default function Header() {
    return (
        <header>
            <Link href="/">
                <Home />
            </Link>
        </header>
    )
}