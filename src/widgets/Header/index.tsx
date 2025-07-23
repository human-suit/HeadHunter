import { Logo } from '../../shared/ui';
import style from './index.module.scss';
import { PersonIcon } from '../../shared/assets/';

export default function Header() {
  return (
    <div className={style.header}>
      <Logo />
      <ul>
        <li>
          <p>Вакансии FE</p>
          <div></div>
        </li>
        <li>
          <img src={PersonIcon} alt="PersonIcon" />
          <p>Обо мне</p>
        </li>
      </ul>
    </div>
  );
}
