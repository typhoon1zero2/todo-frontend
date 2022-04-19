import React from 'react'
import { Outlet } from 'react-router-dom'
import '../../App.css';
import { AiOutlineCheck } from "react-icons/ai";

function Layout() {
    return (
        <div className="layout">
          <header>
            <h1 className="title" ><AiOutlineCheck />To-Do-List</h1>
          </header>
          <main>
            <Outlet />
          </main>
        </div>
      )
}

export default Layout