import React from 'react'

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
    return (
        <footer className="antialiased font-sans text-gray-400 text-xs md:text-sm break-all text-center mt-20 mb-2 md:mb-20">
            © {new Date().getFullYear()}{' '}
            <a href="https://notasoftwaredevelopmentcompany.com" className="hover:text-black hover:underline">
                notasoftwaredevelopmentcompany
            </a>
            {` `}
        </footer>
    )
}
