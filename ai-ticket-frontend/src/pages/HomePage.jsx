import { motion } from "framer-motion";
import { Ticket, CheckCircle, Clock, BarChart3, Activity, Github } from "lucide-react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import heroAnimation from "../animation/hero.json";
import PageTransition from "../components/PageTransition.jsx";
import arrow from "../icon/arrow1.svg"
import rightArrow from "../icon/rightarrow.png"
import aichip from "../icon/aichip.png"
import userNetwork from "../icon/usernetwork.png"
import workflow from "../icon/workflow1.png"
import mail from "../icon/mail.png"
import aiFiles from "../icon/aifiles.png"
import securityShild from "../icon/securityshield.png"
import linkedIn from "../icon/linkedin.png"
import gitHub from "../icon/github.png"
import twitter from "../icon/twitter.png"

export default function HomePage() {

  const handleTilt = (e) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * 4;
  const rotateY = ((centerX - x) / centerX) * 4;

  card.style.transform = `
    rotateX(${rotateX}deg) 
    rotateY(${rotateY}deg) 
    scale(0.98)
  `;
};

const resetTilt = (e) => {
  const card = e.currentTarget;
  card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
};

  return (

     <div className="min-h-screen pt-20 w-full bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#1E293B] text-white px-4 md:px-10 pt-8 overflow-x-hidden flex justify-center ">

    <div className="w-full md:w-[85%] flex flex-col">

      <div className="header flex flex-col md:flex-row w-full">
         <div className="w-full md:w-1/2 my-10 text-center md:text-left ">
            <h1 className="text-3xl md:text-5xl text-cyan-500 font-bold tracking-tight my-2">Intelli Assist</h1>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-200 mb-5">AI-Powered Support <br /> Ticketing System</h1>

            <h2 className="font-extralight text-left text-md text-gray-300 opacity-80  mb-10">Intelli Assist transforms traditional support workflows with an AI-driven ticketing system that’s fast, intelligent, and effortlessly scalable. Powered by advanced LLM analysis and automated event-based processing, it categorizes issues, assigns the right moderators, and delivers actionable insights within seconds. With a modern UI, smooth animations, and role-based dashboards, Intelli Assist brings clarity, efficiency, and automation to every step of your support lifecycle.</h2>

            <Link to="/login" className="flex w-fit items-center gap-3 font-semibold px-6 py-1 mt-7 mb-5 rounded-2xl shadow-lg hover:opacity-70 transition-all duration-300 bg-gradient-to-b from-[rgb(7,95,80)] via-[rgb(10,100,110)] to-[rgb(10,98,205)] inset-shadow-cyan-500/70 shadow-white/50 shadow-sm inset-shadow-sm  " > Let's GO 

              <img src={arrow} alt="Arrow Right" className="w-5 h-auto " />

            </Link>

        </div>
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl -z-10"></div>

        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          
        <div className="w-full object-fit flex justify-center items-start mt-12 overflow-hidden ">

            <Lottie animationData={heroAnimation} loop className="w-full"/>

        </div>
        </div>
      </div>

      <div className="about h-auto relative overflow-hidden bg-gradient-to-b from-[#1E1B4B]/50 via-[#1E293B]/50 via-black/50 to-black w-[140%] -ml-[20%] pb-[5%] pt-[10%]">

        <div className="absolute left-1/2 -translate-x-1/2 w-[140%] h-[400%]  rounded-t-full border-t-[8px] border-[#054971] bg-gradient-to-b from-[#0F172A] via-[#1E1B4B] to-[#1E293B]" >

          <div className="absolute left-1/2 -translate-x-1/2 mt-[px] w-full h-[400%] rounded-t-full pointer-events-none shadow-[inset_0_-5px_50px_rgba(8,72,139,0.8)] z-10">
          </div>

        </div>

        <div className="relative text-center mt-[4rem] overflow-hidden  ">
          <h2 className="text-lg tracking-wider font-extralight opacity-70 ">ABOUT</h2>
          <h1 className="text-5xl my-2 tracking-tight font-extrabold bg-gradient-to-b from-[#01dfb3] via-[#0398b9] to-[#045bc3] bg-clip-text text-transparent">Intelli Assist</h1>

          <div className="flex flex-col justify-center mx-[20%] md:mx-[25%] items-center mt-15 gap-10 text-white/80 font-light tracking-tight ">

            <div className="flex flex-col md:flex-row w-full gap-4">
              <div className="w-full md:w-1/12 justify-center flex">
                <img src={rightArrow} alt="" className="w-12 h-10" />
              </div>
              <div className="w-full md:w-11/12 text-left ">
                <h1 className="mt-1 text-md md:text-xl text-white/70 tracking-normal md:tracking-tight">TicketAI is an intelligent, next-generation support management system designed to simplify how teams handle customer issues. Powered by advanced AI analysis, TicketAI automatically reads, understands, and categorizes incoming tickets with exceptional precision. The result is a smarter, faster, and more organized workflow that lets support teams focus on meaningful work while the system handles the repetitive tasks.</h1>
              </div>
            </div>

            <div className="flex flex-col md:flex-row w-full gap-4  ">
              <div className="w-full md:w-1/12 justify-center flex">
                <img src={rightArrow} alt="" className="w-12 h-10" />
              </div>
              <div className="w-full md:w-11/12 text-left ">
                <h1 className="mt-1 text-md md:text-xl text-white/70 tracking-normal md:tracking-tight ">Every feature in TicketAI is built to enhance clarity and productivity. Our AI-driven engine intelligently assigns tickets to the right agents, prioritizes urgent issues, and provides real-time insights into team performance. With a modern dashboard, smooth animations, and a beautifully refined UI, TicketAI transforms complicated ticket management into an elegant, intuitive experience. Whether you're a startup or a large organization, the system adapts effortlessly to your support needs.</h1>
              </div>
            </div>

            <div className="flex flex-col md:flex-row w-full gap-4 ">
              <div className="w-full md:w-1/12 justify-center flex">
                <img src={rightArrow} alt="" className="w-12 h-10" />
              </div>
              <div className="w-full md:w-11/12 text-left ">
                <h1 className="mt-1 text-md md:text-xl text-white/70 tracking-normal md:tracking-tight">Built with MERN + Inngest automation, TicketAI brings a smooth animated UI, real-time updates, and consistent email notifications ensuring a professional and efficient support experience.</h1>
              </div>
            </div>

          </div>

        </div>
        
      </div>

      <div className="keyfeatures pt-30  asolute">

        <div className="key-Header flex justify-center flex-col text-center ">

          <h2 className="text-lg tracking-wider font-extralight opacity-70">KEY FEATURES</h2>
          <h1 className="text-4xl md:text-6xl my-3 tracking-tight font-extrabold bg-white/70 bg-clip-text text-transparent "> Explore the <span className="bg-gradient-to-b from-[#01dfb3] via-[#0398b9] to-[#045bc3] bg-clip-text text-transparent">Capabilities</span> </h1>

        </div>

        <div className="flex mt-[5rem] flex-col gap-[5rem]">

        <div className="relative w-full md:w-[80%] mx-auto perspective-[1200px]">

          <div
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            className="relative flex flex-col md:flex-row items-center gap-10 rounded-2xl p-8 bg-white/[0.01] backdrop-blur-[25px] border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out will-change-transform hover:shadow-[0_2px_10px_rgba(255,255,255,0.1)] ">

            {/* Glass Light Reflection */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-40 pointer-events-none"></div>

            {/* Subtle Edge Line */}
            <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none"></div>

            {/* Soft Professional Glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition duration-500 pointer-events-none bg-gradient-to-r from-cyan-400/10 via-transparent to-purple-400/10 blur-xl"></div>

            {/* Image */}
            <div className="w-full md:w-1/2 flex justify-center relative z-10 ">
              <img src={aichip} alt="" className="object-contain w-[60%] transition-transform duration-500" />
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center relative z-10 ">
              <h1 className="text-3xl font-semibold text-cyan-600 mb-3 tracking-tight">
                AI-Powered Ticket Classification
              </h1>

              <p className="text-lg text-white/80 font-light leading-relaxed">
                Our system automatically reads and understands each ticket using advanced AI.
                It analyzes user messages, identifies the issue category, and generates
                smart insights instantly saving moderators valuable time.
              </p>
            </div>

          </div>
        </div>

        {/* <div className=" relative w-full md:w-[80%] mx-auto flex flex-col md:flex-row items-center gap-10 border-2 border-gray-400/50 rounded-2xl p-5 shadow-md shadow-gray-400/40">
          <div className="img w-full md:w-1/2 justify-center flex">
            <img src={aichip} alt="" className="object-cover w-[50%]" />
          </div>
          <div className="feature w-full md:w-1/2 flex flex-col justify-center">
            <h1 className="text-3xl my-2 text-cyan-600 font-bold tracking-tight">AI-Powered Ticket Classification</h1>
            <h2 className=" text-lg font-light text-white/80 tracking-tight ">Our system automatically reads and understands each ticket using advanced AI. It analyzes user messages, identifies the issue category, and generates smart insights instantly saving moderators valuable time.</h2>
          </div>
        </div> */}

        <div className="relative w-full md:w-[80%] mx-auto perspective-[1200px]">

          <div
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            className="relative flex flex-col md:flex-row items-center gap-10 rounded-2xl p-8 bg-white/[0.01] backdrop-blur-[25px] border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out will-change-transform hover:shadow-[0_2px_10px_rgba(255,255,255,0.1)] ">

            {/* Glass Light Reflection */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-40 pointer-events-none"></div>

            {/* Subtle Edge Line */}
            <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none"></div>

            {/* Soft Professional Glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition duration-500 pointer-events-none bg-gradient-to-r from-cyan-400/10 via-transparent to-purple-400/10 blur-xl"></div>

            {/* Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center relative z-10 order-2 md:order-1">
              <h1 className="text-3xl font-semibold text-cyan-600 mb-3 tracking-tight">
                Smart Moderator Assignment
              </h1>

              <p className="text-lg text-white/80 font-light leading-relaxed">
               Ticket AI matches every ticket with the most suitable moderator based on expertise and skill sets. This ensures issues reach the right person immediately, improving accuracy and response efficiency.
              </p>
            </div>

            {/* Image */}
            <div className="w-full md:w-1/2 flex justify-center relative z-10 order-1 md:order-2">
              <img src={userNetwork} alt="" className="object-contain w-[60%] transition-transform duration-500" />
            </div>

          </div>
        </div>

        <div className="relative w-full md:w-[80%] mx-auto perspective-[1200px]">

          <div
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            className="relative flex flex-col md:flex-row items-center gap-10 rounded-2xl p-8 bg-white/[0.01] backdrop-blur-[25px] border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out will-change-transform hover:shadow-[0_2px_10px_rgba(255,255,255,0.1)] ">

            {/* Glass Light Reflection */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-40 pointer-events-none"></div>

            {/* Subtle Edge Line */}
            <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none"></div>

            {/* Soft Professional Glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition duration-500 pointer-events-none bg-gradient-to-r from-cyan-400/10 via-transparent to-purple-400/10 blur-xl"></div>

            {/* Image */}
            <div className="w-full md:w-1/2 flex justify-center relative z-10">
              <img src={workflow} alt="" className="object-contain w-[60%] transition-transform duration-500" />
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center relative z-10">
              <h1 className="text-3xl font-semibold text-cyan-600 mb-3 tracking-tight">
                Real-Time Ticket Workflow Automation
              </h1>

              <p className="text-lg text-white/80 font-light leading-relaxed">
               From ticket creation to admin review, the entire lifecycle is automated. Status changes trigger background events, ensuring smooth transitions from TODO → In Progress → Completed without manual involvement.
              </p>
            </div>

          </div>
        </div>

        <div className="relative w-full md:w-[80%] mx-auto perspective-[1200px]">

          <div
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            className="relative flex flex-col md:flex-row items-center gap-10 rounded-2xl p-8 bg-white/[0.01] backdrop-blur-[25px] border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out will-change-transform hover:shadow-[0_2px_10px_rgba(255,255,255,0.1)] ">

            {/* Glass Light Reflection */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-40 pointer-events-none"></div>

            {/* Subtle Edge Line */}
            <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none"></div>

            {/* Soft Professional Glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition duration-500 pointer-events-none bg-gradient-to-r from-cyan-400/10 via-transparent to-purple-400/10 blur-xl"></div>

            {/* Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center relative z-10 order-2 md:order-1">
              <h1 className="text-3xl font-semibold text-cyan-600 mb-3 tracking-tight">
                Instant Email Notifications
              </h1>

              <p className="text-lg text-white/80 font-light leading-relaxed">
               Important updates never slip through. Ticket AI sends automatic, beautifully formatted emails for assignments, status updates, and admin reviews—keeping everyone connected at all times.
              </p>
            </div>

            {/* Image */}
            <div className="w-full md:w-1/2 flex justify-center relative z-10 order-1 md:order-2">
              <img src={mail} alt="" className="object-contain w-[60%] transition-transform duration-500" />
            </div>

          </div>
        </div>

        <div className="relative w-full md:w-[80%] mx-auto perspective-[1200px]">

          <div
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            className="relative flex flex-col md:flex-row items-center gap-10 rounded-2xl p-8 bg-white/[0.01] backdrop-blur-[25px] border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out will-change-transform hover:shadow-[0_2px_10px_rgba(255,255,255,0.1)] ">

            {/* Glass Light Reflection */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-40 pointer-events-none"></div>

            {/* Subtle Edge Line */}
            <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none"></div>

            {/* Soft Professional Glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition duration-500 pointer-events-none bg-gradient-to-r from-cyan-400/10 via-transparent to-purple-400/10 blur-xl"></div>

            {/* Image */}
            <div className="w-full md:w-1/2 flex justify-center relative z-10">
              <img src={aiFiles} alt="" className="object-contain w-[60%] transition-transform duration-500" />
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center relative z-10">
              <h1 className="text-3xl font-semibold text-cyan-600 mb-3 tracking-tight">
               AI-Generated Helpful Notes
              </h1>

              <p className="text-lg text-white/80 font-light leading-relaxed">
              Every ticket comes with clear, AI-generated notes that summarize the issue and highlight what matters most. Moderators instantly know what to focus on—no digging required.
              </p>
            </div>

          </div>
        </div>

        <div className="relative w-full md:w-[80%] mx-auto perspective-[1200px]">

          <div
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            className="relative flex flex-col md:flex-row items-center gap-10 rounded-2xl p-8 bg-white/[0.01] backdrop-blur-[25px] border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out will-change-transform hover:shadow-[0_2px_10px_rgba(255,255,255,0.1)] ">

            {/* Glass Light Reflection */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-40 pointer-events-none"></div>

            {/* Subtle Edge Line */}
            <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none"></div>

            {/* Soft Professional Glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition duration-500 pointer-events-none bg-gradient-to-r from-cyan-400/10 via-transparent to-purple-400/10 blur-xl"></div>

            {/* Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center relative z-10 order-2 md:order-1">
              <h1 className="text-3xl font-semibold text-cyan-600 mb-3 tracking-tight">
                Secure Authentication & Role Control
              </h1>

              <p className="text-lg text-white/80 font-light leading-relaxed">
               With JWT-based authentication and role-based routing, your workspace stays secure. Users, moderators, and admins access only the features designed for them.
              </p>
            </div>

            {/* Image */}
            <div className="w-full md:w-1/2 flex justify-center relative z-10 order-1 md:order-2">
              <img src={securityShild} alt="" className="object-contain w-[60%] transition-transform duration-500" />
            </div>

          </div>
        </div>

        </div>

      </div>

      <div className="footer pt-10 relative overflow-hidden bg-gradient-to-b from-[#1E1B4B]/50 via-[#1E293B]/50 via-black/50 to-black w-[140%] -ml-[20%]">
      
        <div className="text-white relative w-full md:w-[80%] py-10 mx-auto mt-15 flex flex-col px-6">

          <h1 className="text-3xl md:text-5xl mx-auto font-bold tracking-tight my-10 mt-15 flex text-center bg-gradient-to-b from-[#01dfb3] via-[#0398b9] to-[#045bc3] bg-clip-text text-transparent border-b-5 rounded-br-2xl rounded-bl-2xl border-white/50 pb-1 px-3">Ticket AI</h1>

          <div className="flex flex-col md:flex-row w-full mt-16 justify-between items-center gap-6">
            <h1 className="tracking-wide text-5xl md:text-6xl font-bold bg-gradient-to-b from-white/50 via-white/20  to-transparent bg-clip-text text-transparent">SOCIAL MEDIA</h1>
            <div className="overflow-hidden flex items-center gap-3 px-10 py-5">

              <a href="https://www.linkedin.com/in/mayank-bhadakan/" target="_blank" rel="noopener noreferrer"> 
              <img src={linkedIn} alt="" className="w-[2rem] h-[2rem] md:w-[3rem] md:h-[3rem] transition-transform duration-300 ease-out hover:scale-110" />
              </a>

              <a href="https://github.com/Mayank-Bhadakan" target="_blank" rel="noopener noreferrer">
              <img src={gitHub} alt="" className="w-[2rem] h-[2rem] md:w-[3rem] md:h-[3rem] transition-transform duration-300 ease-out hover:scale-110" />
              </a>

              {/* <a href="https://www.linkedin.com/in/YOUR_ID" target="_blank" rel="noopener noreferrer"> */}
              <img src={twitter} alt="" className="w-[2rem] h-[2rem] md:w-[3rem] md:h-[3rem] transition-transform duration-300 ease-out hover:scale-110" />
              {/* </a> */}
              
            </div>
          </div>

          <span className="w-full opacity-30 "><hr  /></span>

          <h1 className="text-md mx-auto font-bold tracking-tight mt-5 md:mt-15 flex text-center text-white/30 ">Copyright© 2025 Ticket AI  Pvt. Ltd. All Rights Reserved</h1>

        </div>
      
      </div>
   
    </div>

    </div>

  );
}
