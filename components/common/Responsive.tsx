import styles from './Responsive.module.scss';
import type {} from 'next/types/index'
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode,
}

export default function Responsive({ children, ...rest }: Props) {
  return (
    <div className={styles.resionsive} {...rest}>
      {children}
    </div>
  );
}
