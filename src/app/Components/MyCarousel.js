
import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import './Carousel.css'
export default class NextJsCarousel extends Component {
  
    render() {
      const projects = {
        "Python":[
          {
            "name":"GPT Bot",
            "desc":"Generate blog for wordpress sites by titles.",
            "screenshots":["/screenshots/GPT/1.png"]
            
          },
          {
            "name":"Switcher App",
            "tools":"CustomTkinter, pymongo",
            "desc":"Switcher is a tool for Israeli DJs that converts Tracks names from English to Hebrew.",
            "screenshots":["/screenshots/Switcher/1.png", "/screenshots/Switcher/2.png", "/screenshots/Switcher/3.png"]
          },
          {
            "name":"Yelp Nearby jobs responder",
            "tools":"Selenium Webdriver, Impalib, BeautifulSoup, customTkinter",
            "desc":"Automate prompt responses to Yelp Nearby Leads (By default, a lead is lost if it doesn't receive a response within a short period of time).",
            "screenshots":["/screenshots/Yelp/1.png"]
          },
          {
            "name":"Jobs SMS Bot",
            "tools":"Twilio, CSV, Flask",
            "desc":"A Flask server called SMS Leads Bot gathers job leads from a lead supplier and distributes them to staff members. It perfectly matches leads with the best employee based on their special abilities and present availability by utilising sophisticated algorithms. The bot also offers real-time employee progress tracking, making sure that all duties are openly tracked and taken care of. It delivers frequent notifications to staff members to ensure that leads are promptly replied to, maintaining workflow efficiency.It is very important to understand that a Flask server hosts and manages the bot. It is linked with services like Twilio and Google Voice to enable real-time monitoring and easy communication. The bot, however, lacks a graphical user interface (GUI), making it a backend tool that is streamlined and optimized for speed and performance.",
            "url":"https://github.com/Bar856/SMS-JOBS-bot-TWILLIO-"
          }
        ],
        "WebApps":[
          {
            "name":"Minerva LMS",
            "tools":"React, Node.js, FireBase Firestore, Docker, AWS.",
            "desc":"virtual patient simulations and real-time data analytics, distinctive and immersive learning environment.",
            "screenshots":["/screenshots/Minerva/2.png", "/screenshots/Minerva/2.png"],
            "url":"https://minervaxr.com/"
          },
          {
            "name":"RF Integrations-Lab Mapping",
            "tools":"HTML, CSS",
            "desc":"A web application built with Next.js, allowing users to manage RF Integrations-Lab. It provides an interactive interface to view, update, and clear the ownership status of different stations.",
            "screenshots":["/screenshots/RF/RF.png"],
            "url":"https://github.com/Bar856/or-boxes"
          },{
            "name":"MinervaXR Official Site",
            "tools":"Next.js",
            "desc":"A web app created with next.js showing minerva projects and products including hidden system for managing users",
            "screenshots":["/screenshots/minervaSite.png"],
            "url":"https://github.com/Bar856/or-boxes"
          },
        ],
        "mobileApps":[
          {
            "name":"Mirror Like APP",
            "tools":"TypeScript, Expo.dev, firebase",
            "desc":"App created for cleaning company including Efficient customer management such as Generate quote requests, manage work schedules, handle emergency cleaning, and set cleaning reminders.Empowered employees: easily access personal schedules, and navigate directly to customer locations with built-in maps.Manager access:Oversee work arrangements, manage user access, and control all aspects of your business with ease.",
            "screenshots":["/screenshots/mirrorlike.png", "/screenshots/Minerva/2.png"],
            "url":"https://minervaxr.com/"
          }
        ]
    }  
    function openInNewTab(url) {
      if (url){
        var win = window.open(url, '_blank');
        win.focus();
      }
    }
      return (
        <div className='flex center flex-col'>
          <div className='rounded-lg center w-1/2 px-8 flex flex-col mt-10'>
            <h2 className='center'>Web</h2>
            <Carousel className='carousel' showThumbs={false} dynamicHeight={false}  showStatus={false} infiniteLoop={true} transitionTime={4000} autoPlay={true} interval={5000}>
              {
                projects.WebApps.map((v,i)=>{
                  return (
                    <div key={i} className='flex flex-col item center'>
                        <h3 onClick={()=>{openInNewTab(v?.url)}} className="cursor-pointer mt-5 underline hover hover:bg-neutral-500">{v.name}</h3>
                        <h4>{v.desc}</h4>
                        <Image width={1000} height={500} className='projectsImg rounded-lg' src={v.screenshots[0]} alt={v.name}/>
                    </div>
                  )
                })
              }
            </Carousel>
          </div>
          <div className='rounded-lg center w-1/2 px-8 flex flex-col mt-10'>
            <h2 className='center'>Mobile</h2>
            <Carousel className='carousel' showThumbs={false} dynamicHeight={false}  showStatus={false} infiniteLoop={true} transitionTime={4000} autoPlay={true} interval={5000}>
              {
                projects.mobileApps.map((v,i)=>{
                  return (
                    <div key={i} className='flex flex-col item center'>
                        <h3 onClick={()=>{openInNewTab(v?.url)}} className="cursor-pointer mt-5 underline hover hover:bg-neutral-500">{v.name}</h3>
                        <h4>{v.desc}</h4>
                        <Image width={1000} height={500} className='projectsImg rounded-lg' src={v.screenshots[0]} alt={v.name}/>
                    </div>
                  )
                })
              }
            </Carousel>
          </div>
          <div className='rounded-lg center w-1/2 flex flex-col mt-10'>
            <h2 className=''>Software</h2>
            <Carousel className='carousel' showThumbs={false} dynamicHeight={false}  showStatus={false} infiniteLoop={true} transitionTime={4000} autoPlay={true} interval={5000}>
              {
                projects.Python.map((v,i)=>{
                  return (
                    <div key={i} className='flex flex-col item center'>
                        <h3 onClick={()=>{openInNewTab(v?.url)}} className="cursor-pointer mt-5 underline hover hover:bg-neutral-500">{v.name}</h3>
                        <h4>{v.desc}</h4>
                        {v.screenshots &&<Image width={1000} height={1000} className='projectsImg rounded-lg' src={v.screenshots[0]} alt={v.name}/> }
                    </div>
                  )
                })
              }
            </Carousel>
          </div> 
        </div>
    );
  }
};