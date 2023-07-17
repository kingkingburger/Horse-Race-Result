import Header from './components/header'

export default function SubLayout({ children }) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}