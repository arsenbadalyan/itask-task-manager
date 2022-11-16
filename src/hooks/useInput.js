import { useState } from 'react';

const useInput = () => {
  const [value, setValue] = useState('');
  return [value, (e) => setValue(e.target.value)];
};

export default useInput;
