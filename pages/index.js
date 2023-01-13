import React, {useEffect} from 'react';
import Footer from './pages/home/footer';
import Header from './pages/home/header';
import Part1 from './pages/home/part1';
import Part2 from './pages/home/part2';
import Part3 from './pages/home/part3';



const Home = () => {
    useEffect(()=>{
        document.body.style.overflowX = 'hidden'
      },[])

    return <>
        <Header/>
        <Part1/>
        <Part2/>
        <Part3/>
        <Footer/>

    </>;
};


Home.getNormalPage = function getNormalPage(page) {
    return page;
};

export default Home;
