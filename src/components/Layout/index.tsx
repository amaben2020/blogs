import React from 'react'
import Footer from "../footer/Footer"
import Header from "../header/header"

type ChildrenProps = {
  children: React.ReactNode
}

const Layout = ({ children }: ChildrenProps) => {
  return (
    <div>
      <Header />
      <main style={{ border: '1px solid gray', color: 'black' }}>
        {children}
      </main>
      <Footer />
    </div>

  )
}

export default Layout