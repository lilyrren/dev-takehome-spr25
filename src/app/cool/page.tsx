import { Collection } from "@/app/admin/_components/collections";

export default function Kewl() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-300 text-white gap-5">
      {/* 
      Write something unique about you here! 
      It could be a club you're part of, a weird skill you have, or something special that happened to you.
      Feel free to put links, images, whatever! 
      Don't worry about styling- we aren't grading you on this- it's just to get to know you better! :) 
      */}
      <p className="text-center text-wrap text-lg break-words max-w-prose">
        Hello! My name is Lily. I would say that I am a collector. I love collecting Sonny Angels and Smiskis. Now, I am
        trying to get my hands on some labubu dolls 😆😆😆
      </p>
      <div className="flex flex-col items-center justify-center w-full">
        <Collection />
      </div>
    </div>
  );
}
