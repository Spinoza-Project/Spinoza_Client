interface PropsType {
  value: string;
  donatePlace: string;
  className?: string;
  onChange: (e: any) => void;
}
const InputRadio: React.FC<PropsType> = ({
  value,
  donatePlace,
  className = '',
  onChange,
}) => {
  return (
    <div className='flex w-full flex-col items-center'>
      <label
        htmlFor={value}
        className='flex w-full items-center justify-between rounded-full bg-primary px-3 py-1 text-white'
      >
        {value}
        <input
          type='radio'
          id={value}
          name={value}
          value={value}
          required
          onChange={onChange}
          checked={donatePlace === value}
          className='form-check-input ml-2 cursor-pointer appearance-none border border-white bg-white bg-contain bg-center bg-no-repeat text-primary transition duration-200 checked:border-2 checked:border-white checked:bg-primary focus:border-primary focus:outline-none focus:ring-primary'
        />
      </label>
    </div>
  );
};

export default InputRadio;
