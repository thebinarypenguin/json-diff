import { ChangeEvent } from "react";

import './FilePicker.css';

export interface IFilePickerProps {
  name: string;
  onChange: Function;
  onError: Function;
}

const FilePicker = (props: IFilePickerProps) => {
  const { name, onChange, onError } = props;

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    try {
      if (files) {
        const contents = await files[0].text();
        onChange(contents);
      }
    } catch (err) {
      onError(err);
    }
  };

  return <input type="file" id={name} name={name} className="filePicker" onChange={handleChange} />;
};

export default FilePicker;
