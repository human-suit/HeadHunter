import style from './index.module.scss';
import { LogoIcon } from '../../assets';

export default function Logo() {
  return (
    <a href="/" className={style.logo}>
      <img src={LogoIcon} alt="HeadHUnter Icon" />
      <p>.FrontEnd</p>
    </a>
  );
}
