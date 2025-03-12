import { Link } from 'react-router';
import { PiUsersFill } from "react-icons/pi";
import { MdQuestionMark } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { TfiArrowTopRight } from "react-icons/tfi";
import s from './HomePage.module.css'

export default function Home () {
  return (
    <div className={s.container}>
      <div className={s.mainTextContainer}>
        <div className={s.secondaryTextContainer}>
          <h1 className={s.mainTitle}>The road to the <span>depths</span> of the human soul</h1>
          <p>We help you to reveal your potential, overcome challenges and find a guide in your own life with the help of our experienced psychologists.</p>
        </div>
        <Link className={s.getStartedLink} to='/psychologists'>Get started <TfiArrowTopRight className={s.getStartedLinkIcon}/></Link>
      </div>
      <div className={s.rightContainer}>
        <img className={s.mainImg} src="../../../public/mainImg.jpg" alt="a woman psychologist with glasses" />
        <div className={s.usersGroup}>
          <PiUsersFill className={s.usersGroupIcon} />
        </div>
        <div className={s.questionGroup}>
          <MdQuestionMark className={s.questionGroupIcon} />
        </div>
        <div className={s.lowerWrapper}>
          <div className={s.iconContainer}>
            <FaCheck className={s.iconCheck} />
          </div>
          <div>
            <p className={s.text}>Experienced psychologists</p>
            <p className={s.textNumbers}>15,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}