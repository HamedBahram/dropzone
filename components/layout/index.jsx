import { Montserrat, Playfair_Display } from '@next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat'
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display'
})

const Layout = ({ children }) => {
  return (
    <>
      <header></header>
      <main
        className={`${montserrat.variable} ${playfairDisplay.variable} font-sans`}
      >
        {children}
      </main>
      <footer></footer>
    </>
  )
}

export default Layout
