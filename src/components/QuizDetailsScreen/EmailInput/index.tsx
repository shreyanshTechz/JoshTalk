import React, { useState, ChangeEvent } from 'react';

interface EmailInputProps {
  label: string;
  value: string;
  onChange: (email: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ label, value, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="email-input">
      <label htmlFor="email">{label}</label>
      <input
        type="email"
        id="email"
        value={value}
        onChange={handleChange}
        placeholder="Enter your email"
      />
    </div>
  );
};

export default EmailInput;
