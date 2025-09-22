import React from 'react';
import { Field,useField } from 'formik';

const FieldFileInput = ({ classes,name, ...rest }) => {
  const { fileUploadContainer, labelClass, fileNameClass, fileInput } = classes;


      const [{ value,...restField },meta,helpers] = useField(name)
  // return (
  //   <Field name={rest.name}>
  //     {props => {
  //       const { field } = props;

        const getFileName = () => {
          if (value) {
            return value.name;
          }
          return '';
        };

        const onchange = (e) =>{
          const file = e.target.files[0];
          helpers.setValue(file,false);
        }

        return (
          <div className={fileUploadContainer}>
            <label htmlFor='fileInput' className={labelClass}>
              Choose file
            </label>
            <span id='fileNameContainer' className={fileNameClass}>
              {getFileName()}
            </span>
            <input
              {...restField}
              className={fileInput}
              onChange={onchange}
              id='fileInput'
              type='file'
            />
          </div>
        );
};

export default FieldFileInput;
