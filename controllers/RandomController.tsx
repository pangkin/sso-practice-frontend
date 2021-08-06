import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import RandomView from '../views/RandomView';

export default function RandomController() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(10);
  const [random, setRandom] = useState<number | null>(null);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [pop, setPop] = useState<number[]>([]);

  useEffect(() => {
    let arr: number[] = [];
    for (let i = min; i <= max; i++) {
      arr.push(i);
    }
    setNumbers(arr);
  }, [min, max]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, className } = e.target;
    const valueToNumber = parseInt(value);
    if (className === 'max') {
      if (valueToNumber < min) {
        alert('최대값이 최소값보다 작아요');
        return;
      }
      setMax(valueToNumber);
    } else if (className === 'min') {
      if (valueToNumber > max) {
        alert('최소값이 최대값보다 커요');
        return;
      }
      setMin(valueToNumber);
    }
    setPop([]);
  };

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (numbers.length <= 0) {
      setRandom(null);
      return;
    }
    const num = Math.floor(Math.random() * numbers.length);
    setRandom(numbers[num]);
    setPop([...pop, numbers.splice(num, 1)[0]]);
  };

  const reset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMin(1);
    setMax(10);
    setRandom(null);
    setPop([]);
    let arr = [];
    for (let i = min; i <= max; i++) {
      arr.push(i);
    }
    setNumbers(arr);
  };

  return (
    <RandomView
      onChange={onChange}
      onClick={onClick}
      reset={reset}
      data={{ min, max, random, pop }}
    />
  );
}