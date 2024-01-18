import React, { useCallback, useEffect, useState } from 'react';
import createToast from '~/shared/lib/toast/createToast';

interface IUseDropDownInputProps {
  values: readonly string[];
  styles: Record<string, string>;
  setState: ((newVal: string | null) => void) | ((newVal: string) => void);
  isContentEditable: boolean | undefined;
  listRef: React.MutableRefObject<HTMLUListElement | null>;
  inputRef: React.MutableRefObject<HTMLDivElement | null>;
}

export default function useDropDownInput({
  // eslint-disable-next-line prettier/prettier
  values, styles, setState, isContentEditable, listRef, inputRef,
}: IUseDropDownInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [visibleList, setVisibleList] = useState(values);
  const [isOpen, setIsOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);

  const findClosest = (e: React.FocusEvent) => e.relatedTarget?.closest(`.${styles['drop-down-input__list']}`);
  const checkKey = (el: Element | null) => el?.getAttribute('data-key') !== listRef.current?.getAttribute('data-key');
  const handleFocus = () => setIsFocused(true);
  const toFocusOption = useCallback(
    () => (listRef.current?.children[focusIndex] as HTMLElement)?.focus(),
    [focusIndex, listRef],
  );

  const handleOptionClick = (i: number) => {
    setIsOpen(false);

    if (visibleList[i]) {
      setState(visibleList[i]!);
    } else {
      createToast('error', 'Невозможно обработать клик');
    }
  };

  // срабатывает при смене фокуса
  const handleBlur: React.FocusEventHandler<HTMLElement> = (e) => {
    const dropdownInput = findClosest(e);
    const isDifferentInput = checkKey(dropdownInput || null);
    if (isDifferentInput) {
      const val = inputRef.current?.outerText || '';
      if (values.includes(val)) {
        setState(val);

        // если пользователь не может вводить, то не нужно обнулять видимое значение
      } else if (isContentEditable) {
        setState('');
      }
      // задержка, чтобы пользователь не замечал смены state
      // 200 - длительность анимации сокрытия
      setTimeout(() => setVisibleList(values), 200);
      setIsFocused(false);
    }
  };

  const onKeyInput = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      inputRef.current?.blur();
    } else if (e.key === 'ArrowDown' && isOpen) {
      e.preventDefault();
      toFocusOption();
    } else if (e.key === 'Tab') {
      setFocusIndex(0);
      setIsOpen(false);
    }
  };

  const onKeyOption = (e: React.KeyboardEvent<HTMLElement>, i: number) => {
    const len = listRef.current?.children.length || 0;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusIndex((prevVal) => Math.min(prevVal + 1, len - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusIndex((prevVal) => Math.max(prevVal - 1, 0));
    } else if (e.key === 'Enter') {
      handleOptionClick(i);
      setFocusIndex(0);
    } else if (e.key === 'Tab') {
      setFocusIndex(0);
      setIsOpen(false);
    }
  };

  // реагирует на ввод пользователя
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isContentEditable) {
      const query = e.target.outerText;
      const filteredValues = values.filter((el) => new RegExp(query, 'ig').test(el));
      setVisibleList(filteredValues);
    }
  };

  // переключает стейт видимости списка dropDown
  useEffect(() => {
    if (isFocused) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isFocused]);

  // переключает фокус на элементы списка при нажатии клавиш
  useEffect(() => {
    if (isOpen) {
      toFocusOption();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toFocusOption]);

  return {
    // eslint-disable-next-line prettier/prettier
    handleOptionClick, onChangeInput, onKeyInput, onKeyOption, handleBlur, handleFocus,
    // eslint-disable-next-line prettier/prettier
    isFocused, isOpen, visibleList,
  };
}
