import React, { lazy, Suspense } from 'react';
// import './App.css';

// 注意此为 V6版本
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './views/Home'
import Department from './views/Department'
import Employee from './views/Employee'
import Navigation from './views/Navigation'

// 懒加载
// const Home = lazy(() => import('./views/Home'))
// const Department = lazy(() => import('./views/Department'))
// const Employee = lazy(() => import('./views/Employee'))


function App() {
  return (
    // 没有上一级的 tree; Add a <Suspense fallback=...> component higher in the tree
    // <Suspense fallback={<Home />}>
    <BrowserRouter>
      <div className=" container">
        <h3 className='m-3 d-flex justify-content-center'> Test</h3>

        <Navigation />
        <Routes>
          {/* V6 特性 没有 Switch */}
          <Route path='/' element={<Home />} />
          <Route path='/department' element={<Department />} />
          <Route path='/employee' element={<Employee />} />
        </Routes>
      </div>
    </BrowserRouter>
    /* </Suspense> */
  );
}

export default App;
