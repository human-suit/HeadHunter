// import { Logo } from '../../shared/ui';
import style from './index.module.scss';
import { Sertch } from '../../shared/assets/';
import { fetchVacancies } from '@/features/modal/modalSlice';
import { useAppDispatch } from '@/hooks/useReduxHooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { setSearchText } from '@/features/modal/filtersSlice';

export default function SectionSertch() {
  const dispatch = useAppDispatch();

  const { city, skills, searchText } = useSelector(
    (state: RootState) => state.filters
  );

  const onSearch = () => {
    if (searchText.trim()) {
      dispatch(fetchVacancies({ text: searchText.trim(), city, skills }));
    }
  };

  return (
    <div className={style.sectionSertch}>
      <div>
        <h1>Список вакансий</h1>
        <h2>по профессии Frontend-разработчик</h2>
      </div>
      <div>
        <img src={Sertch} alt="search" />
        <input
          type="text"
          placeholder="Должность или название компании"
          value={searchText}
          onChange={(e) => dispatch(setSearchText(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch();
            }
          }}
        />
        <button onClick={onSearch}>Найти</button>
      </div>
    </div>
  );
}
