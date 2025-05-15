export const Input = ({ className, type, placeholder, value, onChange, readOnly }) => {
  return (
    <input
      className={className}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      readOnly={readOnly}
    />
  );
};
