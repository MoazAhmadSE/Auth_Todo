export const Input = ({ className, type, placeholder, value, onChange }) => {
  return (
    <input
      className={className}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
