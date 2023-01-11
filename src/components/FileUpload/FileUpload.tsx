import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { useMemo, useRef } from 'react';
import { useModal } from '../Modal/useModal';
import styles from './FileUpload.module.less';

type FileUploadRenderFunctionProps = {
  onClick: (e: React.MouseEvent) => void;
}

type FileUploadRenderFunction = (props: FileUploadRenderFunctionProps) => React.ReactNode

export type FileUploadProps = {
  children?: React.ReactNode | FileUploadRenderFunction
  onChange?: (file: File) => void
  validation?: (file: File) => Promise<boolean>
  maxFileSize?: number
  accept?: string
  className?: string
}

const FileUpload: React.FC<FileUploadProps> = ({
  children,
  onChange,
  validation = () => Promise.resolve(true),
  maxFileSize,
  accept,
  className,
}) => {
  const id = useMemo(() => nanoid(), []);
  const inputRef = useRef<HTMLInputElement>(null);
  const { message } = useModal();

  const handleClick = () => {
    inputRef.current.click();
  };

  const onFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (accept) {
      if (!file.type.includes(accept)) {
        message.error('Invalid file format');
      }
    }

    if (maxFileSize) {
      if (file.size > maxFileSize) {
        message.error(`Image must be smaller than ${maxFileSize / 1024 * 1024}Kb`);
        return;
      }
    }

    try {
      await validation(file);
      onChange?.(file);
    } catch (error) {
      message.error(
        String(error instanceof Error ? error.message : error)
      );
    }
  };

  return (
    <div className={classNames(styles.wrapper, className)}>
      <input
        ref={inputRef}
        className={styles.input}
        type="file"
        name="file"
        onChange={onFileInputChange}
        id={id}
      />
      <label htmlFor={id} className={styles.label}>
        {typeof children === 'function' ? children({ onClick: handleClick }) : children}
      </label>
    </div>
  );
};

export default FileUpload;
