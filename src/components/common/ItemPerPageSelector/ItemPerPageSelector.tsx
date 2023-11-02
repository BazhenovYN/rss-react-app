import styles from './ItemPerPageSelector.module.scss';

type Size = {
  [key: string]: number;
};

interface IProps {
  sizes: Size;
  currentValue: number;
  onChange: (value: number) => void;
}

function ItemPerPageSelector({ sizes, currentValue, onChange }: IProps) {
  return (
    <div className={styles.select}>
      <div>Items per page:</div>
      <select
        name="per-page"
        onChange={(event) => onChange(Number(event.target.value))}
      >
        {Object.entries(sizes).map(([key, value]) => (
          <option key={key} selected={currentValue === value} value={value}>
            {value.toString()}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ItemPerPageSelector;
