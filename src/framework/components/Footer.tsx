import React from 'react'

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
    return (
        <footer className="antialiased font-sans text-gray-400 text-sm break-all text-center mt-8 mb-4">
            © {new Date().getFullYear()}{' '}
            <a href="https://notasoftwaredevelopmentcompany.com" className="hover:text-black hover:underline">
                notasoftwaredevelopmentcompany
            </a>
            {` `}
        </footer>
    )
}
