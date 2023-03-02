import React, {useEffect} from 'react';
import Footer from './pages/home/footer';
import Header from './pages/home/header';
import Part1 from './pages/home/part1';
import Part2 from './pages/home/part2';
import Part3 from './pages/home/part3';



const Home = () => {
    useEffect(()=>{
        document.body.style.overflowX = 'hidden'

        let Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
        let s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/6400b2f74247f20fefe394a9/1gqhbm60n';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();
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
