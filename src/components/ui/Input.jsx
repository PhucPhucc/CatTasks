import React from "react";

const Input = ({
  label,
  id,
  value,
  setValue,
  onEnter,
  icon,
  className,
  ...props
}) => {
  let css =
    "w-full h-full border px-4 py-2 ring-offset-background text-foreground bg-card border-input rounded-xl placeholder:text-muted-foreground focus:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none ";
  if (className) css += className;
  return (
    <>
      {label && <label htmlFor={id} className="font-semibold font-display text-sm pb-2 inline-block">{label}</label>}
      <div className="relative h-full">
        {icon && (
          <div className="absolute top-1/2 left-6 -translate-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        <input
          id={id}
          name={id}
          onChange={setValue}
          value={value}
          className={css}
          // placeholder="What need to be done?"
          {...props}
          onKeyDown={onEnter}
        />
      </div>
    </>
  );
};

export default Input;
