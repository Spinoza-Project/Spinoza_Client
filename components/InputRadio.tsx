interface PropsType {
  value: string;
  place: string;
  className?: string;
  onChange: (e: any) => void;
}
const InputRadio: React.FC<PropsType> = ({
  value,
  place,
  className = '',
  onChange,
}) => {
  return (
    <div className='flex w-full flex-col items-center'>
      <label
        htmlFor={place}
        className='flex w-full items-center justify-between rounded-full bg-primary px-3 py-1 text-white'
      >
        {place}
        <input
          type='radio'
          id={place}
          name={place}
          value={place}
          required
          onChange={onChange}
          checked={place === value}
          className='form-check-input ml-2 cursor-pointer appearance-none border border-white bg-white bg-contain bg-center bg-no-repeat text-primary transition duration-200 checked:border-2 checked:border-white checked:bg-primary focus:border-primary focus:outline-none focus:ring-primary'
        />
      </label>
    </div>
  );
};

export default InputRadio;
