import Link from 'next/link';
import { MouseEvent, ReactNode } from 'react';

import styles from './Button.module.scss';

type Props = {
  href?: string;
  fullwidth?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
};

function Button(props: Props) {
  return props.href ? (
    props.fullwidth ? (
      <Link href={props.href} passHref>
        <button
          className={`${styles.fullwidth} ${styles.cyan} ${styles.button}`}
          {...props}
        />
      </Link>
    ) : (
      <Link href={props.href} passHref>
        <button className={`${styles.cyan}  ${styles.button}`} {...props} />
      </Link>
    )
  ) : props.fullwidth ? (
    <button className={`${styles.fullwidth} ${styles.button}`} {...props} />
  ) : (
    <button className={styles.button} {...props} />
  );
}

export default Button;
