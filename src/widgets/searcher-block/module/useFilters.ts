import { useState } from 'react';

export function useFilters() {
  const [searchClinic, setSearchClinic] = useState('');
  const [clinic, setClinic] = useState('');
  const [doctor, setDoctor] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchClinic(event.target.value);
  };

  const handleChangeClinic = (data: string) => {
    setClinic(data);
  };

  const handleChangeDoctor = (data: string) => {
    setDoctor(data);
  };

  return { handleChangeClinic, handleChangeDoctor, handleInputChange, clinic, doctor, searchClinic };
}
