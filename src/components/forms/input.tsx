import styles from './input.module.css';

type InputProps = React.ComponentProps<'input'> & {
  label: string;
  error?: string;
};

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={props.name} className={styles.label}>
        {label}
      </label>
      <input
        id={props.name}
        name={props.name}
        className={styles.input}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
