import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createToast } from '~/shared/lib';

interface IUseDropDownInputProps {
  values: readonly string[];
  styles: Record<string, string>;
  setState: ((newVal: string | null) => void) | ((newVal: string) => void);
  contentEditable: boolean | undefined;
}

export default function useDropDownInput({ values, styles, setState, contentEditable }: IUseDropDownInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [visibleList, setVisibleList] = useState(values);
  const [isOpen, setIsOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);
  const listRef = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLDivElement | null>(null);
  const listKey = useRef(Math.random().toString());

  const findClosest = (e: React.FocusEvent) => e.relatedTarget?.closest(`.${styles['drop-down-input__list']}`);
  const checkKey = (el: Element | null) => el?.getAttribute('data-key') !== listRef.current?.getAttribute('data-key');

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
      } else {
        setState('');
      }
      setVisibleList(values);
      setIsFocused(false);
    }
  };

  const handleFocus = () => setIsFocused(true);

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
    if (contentEditable) {
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
    handleOptionClick,
    onChangeInput,
    onKeyInput,
    onKeyOption,
    handleBlur,
    handleFocus,
    listKey,
    isFocused,
    isOpen,
    inputRef,
    listRef,
    visibleList,
  };
}
