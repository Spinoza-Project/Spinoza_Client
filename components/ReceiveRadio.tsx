interface PropsType {
  label: string;
  value: string;
  receive: 'parcel' | 'direct' | 'pickup';
  onChangeReceive: (e: any) => void;
}
const ReceiveRadio: React.FC<PropsType> = ({
  label,
  value,
  receive,
  onChangeReceive,
}) => {
  return (
    <div className='flex flex-1 items-center justify-between py-3 px-8 bg-gray-200 rounded-xl drop-shadow-md'>
      <label htmlFor={value} className='flex-1'>
        {label}
      </label>
      <input
        type='radio'
        id={value}
        name={value}
        value={value}
        onChange={onChangeReceive}
        checked={receive === value}
      />
    </div>
  );
};

export default ReceiveRadio;
