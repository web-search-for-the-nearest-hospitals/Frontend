import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './DropDownInput.module.scss';
import cn from 'classnames';
import { createToast } from '~/shared/lib';
interface IDropDownInput {
  values: readonly string[];
  state: string;
  setState: (newVal: string) => void;
  placeholder?: string;
}

// Альтернатива этим кастомам https://react-select.com/home
export default function DropDownInput({ values, state, setState, placeholder = 'Выберите значение' }: IDropDownInput) {
  const [visibleValue, setVisibleValue] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);
  const listRef = useRef<HTMLUListElement | null>(null);

  const handleInputClick = () => setIsOpen((prevVal) => !prevVal);

  const toFocusOption = useCallback(
    () => (listRef.current?.children[focusIndex] as HTMLElement)?.focus(),
    [focusIndex, listRef],
  );

  const handleOptionClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    setIsOpen(false);

    // сужение типа
    if (e.target instanceof HTMLLIElement) {
      setState(e.target.innerText);
    } else {
      createToast('error', 'Невозможно обработать клик');
    }
  };

  const checkClick = useCallback(
    (e: Event) => {
      const dropdownInput = (e.target as HTMLElement).closest(`.${styles['drop-down-input']}`);
      if (!dropdownInput && isOpen) {
        setIsOpen(false);
      }
    },
    [isOpen],
  );

  const onKeyInput = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      handleInputClick();
    } else if (e.key === 'ArrowDown' && isOpen) {
      toFocusOption();
    } else if (e.key === 'Tab') {
      setFocusIndex(0);
      setIsOpen(false);
    }
  };

  const onKeyOption = (e: React.KeyboardEvent<HTMLElement>) => {
    const len = listRef.current?.children.length || 0;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusIndex((prevVal) => Math.min(prevVal + 1, len - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusIndex((prevVal) => Math.max(prevVal - 1, 0));
    } else if (e.key === 'Enter') {
      handleOptionClick(e);
    } else if (e.key === 'Tab') {
      setFocusIndex(0);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    setVisibleValue(state ?? placeholder);
  }, [state, placeholder]);

  useEffect(() => {
    if (isOpen) {
      toFocusOption();
      window.addEventListener('click', checkClick);
      return () => window.removeEventListener('click', checkClick);
    } else {
      setFocusIndex(0);
    }
    return undefined;
  }, [isOpen, toFocusOption, checkClick]);

  return (
    <div className={styles['drop-down-input']}>
      <div
        className={cn(styles['drop-down-input__value'], isOpen ? styles['drop-down-input__value_open'] : '')}
        onClick={handleInputClick}
        tabIndex={0}
        role="input"
        onKeyDown={onKeyInput}
      >
        {visibleValue}
      </div>
      <ul
        className={cn(styles['drop-down-input__list'], isOpen ? styles['drop-down-input__list_opened'] : '')}
        ref={listRef}
      >
        {values.map((el, i) => (
          <li
            key={`${i}_${el}`}
            className={cn(
              styles['drop-down-input__option'],
              visibleValue === el ? styles['drop-down-input__option_selected'] : '',
            )}
            onClick={handleOptionClick}
            tabIndex={-1}
            onKeyDown={onKeyOption}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
}
