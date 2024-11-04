import { useNavigate } from 'react-router-dom';
import styles from './landingPage.module.css'

export default function LandingPage() {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/project/add')
  }

  return (
    <div className="flex ml-[70px]">
      <div>
        <h2 className="text-HeaderBg uppercase text-[20px]">Virtual Museum</h2>
        <h1 className="font-HomePageFont font-bold text-[88px] text-white">
          <span>Where every</span>
          <br />
          <span className="relative top-[84px] inline-block w-[200px] h-[12px] bg-white mr-[54px] ml-[-89px]">
            &nbsp;
          </span>
          <span>place</span>
          <br />
          <span>tells a story</span>
        </h1>
        <button onClick={handleNavigate} className={`flex justify-between px-[30px] p-5 uppercase border rounded-md w-[300px] cursor-pointer ${styles.mouseHover}`}>
          <p>Get Started</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
      <div></div>
    </div>
  );
}
