import styles from './ItemPerPageSelector.module.scss';

type Size = {
  [key: string]: number;
};

interface IProps {
  sizes: Size;
  selectedValue: number;
  onChange: (value: number) => void;
}

function ItemPerPageSelector({ sizes, selectedValue, onChange }: IProps) {
  return (
    <div className={styles.select}>
      <div>Items per page:</div>
      <select
        name="per-page"
        onChange={(event) => onChange(Number(event.target.value))}
        value={selectedValue}
      >
        {Object.entries(sizes).map(([key, value]) => (
          <option key={key} value={value}>
            {value.toString()}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ItemPerPageSelector;
