import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaArrowLeft, FaPause, FaPlay } from "react-icons/fa";
import Icons from "./Component/Icons";
import { FaRegHeart } from "react-icons/fa";
import { FaMusic } from "react-icons/fa";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import images1 from "./kaam/images/poster- (1).jpg"
import { SONGS } from "./Data/Songs";
import { TbPlayerTrackNext, TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";



const App = () => {


  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentImage, setcurrentImage] = useState(images1)
  const [currentSongName, setcurrentSongName] = useState("song1")
  const audioRef = useRef(null)
  const [songDuration, setsongDuration] = useState(0)
  const [songTime, setsongTime] = useState(0)
  const [currentIndex, setcurrentIndex] = useState(0)




  const handlePlayPause = (selectedSong) => {
    if (selectedSong.song === currentTrack && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentTrack(selectedSong.song);
      setIsPlaying(true);
      setcurrentImage(selectedSong.image)
      setcurrentSongName(selectedSong.title)
      setcurrentIndex(selectedSong.id)
    }
  };

  useEffect(() => {
    const songHandlePlayPause = async()=>{
      try {
        await isPlaying? (audioRef.current.play()) : (audioRef.current.pause());
        
      } catch (error) {
        console.log(error)
      }
    }
    songHandlePlayPause()
  }, [currentTrack, isPlaying])


  useEffect(() => {
      const handleSongDuration = ()=>{
        setsongDuration(Math.floor(audioRef.current.duration))
      }
      const handleSongTime = ()=>{
        setsongTime(Math.floor(audioRef.current.currentTime))
      }
      

      audioRef.current.addEventListener('loadedmetadata', handleSongDuration);
      audioRef.current.addEventListener('timeupdate', handleSongTime)
      return () => {
        audioRef.current.removeEventListener('loadedmetadata', handleSongDuration);
      audioRef.current.removeEventListener('timeupdate', handleSongTime)

      };

  }, [])
  // console.log(Math.floor(audioRef.current.duration))

  const formatTime = (timeInSeconds)=>{
    const minute = Math.floor(timeInSeconds/60)
    const second = Math.floor(timeInSeconds % 60)
    return `${minute}:${second}`
  }

  const handleTimeChange = (e)=>{
    const newTime = e.target.value 
    audioRef.current.currentTime = newTime
    setsongTime(newTime)
  }
  
  const handlePlayNext = ()=>{
    setcurrentIndex(currentIndex+1)
    if(currentIndex < 16){
      const newSong = SONGS[currentIndex].song
    const newSongName = SONGS[currentIndex].title
    const newSongImage = SONGS[currentIndex].image
    setCurrentTrack(newSong)
    setcurrentSongName(newSongName)
    setcurrentImage(newSongImage)
    }
    else{
      setcurrentIndex(0)
    }
  }
  const handlePlayprev = ()=>{

      setcurrentIndex(currentIndex-1)
    if(currentIndex > 1){
      const newSong = SONGS[currentIndex-2].song
      const newSongName = SONGS[currentIndex-2].title
      const newSongImage = SONGS[currentIndex-2].image
      setCurrentTrack(newSong)
      setcurrentSongName(newSongName)
      setcurrentImage(newSongImage)
    }
    else{
     setcurrentIndex(17)
    }

    
  }




  return (
    <div className=" w-screen h-full lg:h-screen bg flex items-center justify-center lg:py-0 py-10">
      {/* music div  */}
      <div className=" w-full  lg:w-[60%] h-[80%]  px-6 lg:flex-row flex-col flex lg:justify-between items-center justify-center">
        {/* left div  */}
        <div className=" w-[100%] lg:w-[40%] h-full bg2 rounded-2xl flex items-center justify-between flex-col -mt-8 p-6">
          {/* upper part  */}
          <div className=" w-full flex items-center justify-between text-white">
            <Icons IconName={FaArrowLeft} />
            <p>Playing music...</p>
            <Icons IconName={GiHamburgerMenu} />
          </div>
          <div className=" flex flex-col items-center justify-center gap-3">
            <img
              src={currentImage}
              alt=""
              className=" w-48 rounded-full h-48 object-cover shadowWhite icon-bg animate-spin  "
            />
            <p className=" text-white text-xl">{currentSongName}</p>

          </div>

          <div>
          <div className=" w-full flex justify-between">
          <p></p>
          <p className=" text-red-500">{`${formatTime(songDuration)}`}</p>

          </div>
            <input type="range" className=" w-80 custom-range" onChange={handleTimeChange}  style={{
    background: `linear-gradient(to right, #eb9722 ${((songTime / songDuration) * 100)}%, gray 0)`
  }} value={songTime} max={songDuration} />
          </div>
          <div className=" flex gap-5">
              <div className=" text-2xl icon-bg flex items-center justify-center h-fit p-4 bg  text-white cursor-pointer rounded-full hover:text-orange-500">
                <TbPlayerTrackPrevFilled  onClick={handlePlayprev} />
              </div>
            <div className=" icon-bg shadowWhite2 p-4 px-5 text-2xl text-orange-500 cursor-pointer rounded-full">
              <button onClick={() => setIsPlaying(!isPlaying)}>
                {
                  isPlaying ? (<FaPause/>):(<FaPlay/>)
                }
              </button>
            </div>
            <div className=" text-2xl icon-bg flex items-center justify-center h-fit p-4  text-white bg cursor-pointer rounded-full hover:text-orange-500">
              <TbPlayerTrackNextFilled   onClick={handlePlayNext} />
            </div>
          </div>
        </div>

        {/* right div  */}
        <div className=" w-[100%] lg:w-[40%] lg:h-full bg2 rounded-2xl mt-8 pt-8 px-3  flex flex-col gap-10  ">
     
        <div className=" w-full flex justify-between items-center">
            <Icons IconName={FaRegHeart} />
            <div>
              <img
                src={currentImage}
                alt=""
                className=" w-48 rounded-full h-48 object-cover shadowWhite icon-bg animate-spin  "
              />
            </div>
            <Icons IconName={FaMusic} />
          </div>
     <div className="flex flex-col lg:h-full h-[300px] gap-5 overflow-auto container lg:pb-0 pb-8">
    <audio ref={audioRef} src={currentTrack}/>
      {SONGS.map((data) => (
        <div
          className={`${currentTrack === data.song ?"w-full flex justify-between items-center p-2 bg-orange-400 rounded-full":"w-full flex justify-between items-center p-2 shadowWhite rounded-full"}`}
          key={data.id}
        >
          <div>
            <img src={data.image} alt="" className="hidden" />
            <p className="hidden">{data.song}</p>
            <p className="text-white">{data.title}</p>
          </div>
          <button onClick={() => handlePlayPause(data)}>
            {currentTrack === data.song && isPlaying ? (
              <Icons IconName={FaPause} />
            ) : (
              <Icons IconName={FaPlay} />
            )}
          </button>
        </div>
      ))}
    </div>
        </div>
      </div>
    </div>
  );
};

export default App;
