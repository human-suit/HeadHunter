import style from './index.module.scss';
import { locateIcon, WhitePlus } from '@shared/assets/';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { addSkill, removeSkill, setCity } from '@/features/modal/filtersSlice';
import type { RootState } from '@/app/store';
import { fetchVacancies } from '@/features/modal/modalSlice';
import { useAppDispatch } from '@/hooks/useReduxHooks';

export default function SectionFilter() {
  const dispatch = useAppDispatch();
  const { city, skills, searchText } = useSelector(
    (state: RootState) => state.filters
  );
  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = () => {
    const trimmedSkill = skillInput.trim();

    if (trimmedSkill) {
      const updatedSkills = [...skills, trimmedSkill];

      dispatch(addSkill(trimmedSkill));
      dispatch(
        fetchVacancies({ city, skills: updatedSkills, text: searchText.trim() })
      );
      setSkillInput('');
    }
  };

  const handleAddCity = (e: string) => {
    dispatch(setCity(e));
    dispatch(fetchVacancies({ city: e, skills, text: searchText.trim() }));
  };
  const reternBut = (skill: string) => {
    dispatch(removeSkill(skill));
    dispatch(fetchVacancies({ city, skills, text: searchText.trim() }));
  };

  return (
    <div className={style.sectionFilter}>
      <div>
        <p>Ключевые навыки</p>
        <input
          type="text"
          placeholder="Навык"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddSkill();
            }
          }}
        />
        <button onClick={handleAddSkill}>
          <img src={WhitePlus} alt="plus" />
        </button>

        <div className={style.grid}>
          {skills.map((skill) => (
            <span key={skill}>
              <p>{skill}</p>
              <button onClick={() => reternBut(skill)}>✕</button>
            </span>
          ))}
        </div>
      </div>

      <div className={style.filterCity}>
        <img src={locateIcon} alt="locate Icon" />
        <select
          id="city"
          name="city"
          value={city}
          onChange={(e) => handleAddCity(e.target.value)}
        >
          <option value="">Выберите город:</option>
          <option value="Москва">Москва</option>
          <option value="Санкт-Петербург">Санкт-Петербург</option>
          <option value="all">Все</option>
        </select>
      </div>
    </div>
  );
}
