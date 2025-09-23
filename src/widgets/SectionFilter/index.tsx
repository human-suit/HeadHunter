import { useState } from 'react';
import { useSelector } from 'react-redux';
import { TextInput, Button, Select } from '@mantine/core';
import { addSkill, removeSkill, setCity } from '@/features/modal/filtersSlice';
import { fetchVacancies } from '@/features/modal/modalSlice';
import { locateIcon } from '@shared/assets/';
import { useAppDispatch } from '@/hooks/useReduxHooks';
import type { RootState } from '@/app/store';
import style from './index.module.scss';

export default function SectionFilter() {
  const dispatch = useAppDispatch();
  const { city, skills, searchText } = useSelector(
    (state: RootState) => state.filters
  );
  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;
    const updatedSkills = [...skills, trimmed];
    dispatch(addSkill(trimmed));
    dispatch(
      fetchVacancies({ city, skills: updatedSkills, text: searchText.trim() })
    );
    setSkillInput('');
  };

  const handleCityChange = (value: string | null) => {
    const newCity = value ?? '';
    dispatch(setCity(newCity));
    dispatch(
      fetchVacancies({ city: newCity, skills, text: searchText.trim() })
    );
  };

  const handleRemoveSkill = (skill: string) => {
    dispatch(removeSkill(skill));
    dispatch(
      fetchVacancies({
        city,
        skills: skills.filter((s) => s !== skill),
        text: searchText.trim(),
      })
    );
  };

  return (
    <div className={style.sectionFilter}>
      <div className={style.blockFilter}>
        <p>Ключевые навыки</p>

        <div className={style.inputRow}>
          <TextInput
            className={style.input}
            placeholder="Навык"
            value={skillInput}
            onChange={(e) => setSkillInput(e.currentTarget.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
          />
          <Button className={style.plusBtn} onClick={handleAddSkill}>
            +
          </Button>
        </div>

        <div className={style.grid}>
          {skills.map((skill) => (
            <span key={skill} className={style.skill}>
              <p>{skill}</p>
              <Button
                variant="subtle"
                size="xs"
                className={style.deleteBtn}
                onClick={() => handleRemoveSkill(skill)}
              >
                ✕
              </Button>
            </span>
          ))}
        </div>
      </div>

      <div className={style.filterCity}>
        <img src={locateIcon} alt="locate Icon" />
        <Select
          className={style.citySelect}
          value={city}
          onChange={handleCityChange}
          data={[
            { value: '', label: 'Выберите город' },
            { value: 'Москва', label: 'Москва' },
            { value: 'Санкт-Петербург', label: 'Санкт-Петербург' },
            { value: 'all', label: 'Все' },
          ]}
        />
      </div>
    </div>
  );
}
