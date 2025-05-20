export const Input = ({
  ref,
  className,
  type,
  placeholder,
  value,
  onChange,
  readOnly,
}) => {
  return (
    <input
      ref={ref}
      className={className}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      readOnly={readOnly}
    />
  );
};
