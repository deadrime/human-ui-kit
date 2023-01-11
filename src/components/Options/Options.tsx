import React from 'react';
import styles from './Options.module.less';
import { TextInputWrapper } from '@components/input/TextInputWrapper';
import Button from '@components/buttons';
import IconButton from '@components/buttons/IconButton';
import IconClose from '@icons/close.svg';
import IconPlus from '@icons/plus.svg';
import { Form } from '@components/Form';

const renderFieldPlaceholder = (index) => `Option ${index + 1}`;

type OptionsComponentProps = {
  value?: string[]
  onChange?: (value: string[]) => void
  min?: number
  max?: number
}

const OptionsComponent: React.FC<OptionsComponentProps> = ({
  value: options,
  onChange,
  min,
  max,
}) => {
  const showRemove = options.length > min;

  const onRemove = (index: number) => {
    onChange(options.filter((_, fieldIndex) => index !== fieldIndex));
  };

  const add = () => {
    onChange([...options, null]);
  };

  const handleChange = (index, value) => {
    options[index] = value;
    onChange(options);
  };

  return (
    <div className={styles.optionsWrapper}>
      {options?.map?.((value, index) => (
        <TextInputWrapper
          key={index}
          value={options[index]}
          onChange={value => handleChange(index, value)}
          outlined
          placeholder={renderFieldPlaceholder(index)}
          suffix={showRemove &&
            <IconButton
              size="small"
              variant="secondary"
              transparent
              icon={<IconClose width={20} />}
              onClick={() => onRemove(index)}
              className={styles.closeBtn}
            />
         }
        />
      ))}
      {!max ||
        (options.length < max && (
          <Button
            variant="secondary"
            filled
            fullWidth
            onClick={() => add()}
            icon={<IconPlus />}
          >
            Add option
          </Button>
        ))
      }
    </div>
  );
};

const Options = ({
  name = 'options',
  max = Infinity,
  min = 0,
}) => {
  // TODO: Highlight empty fields
  return (
    <Form.Item
      name={name}
      rules={[
        {
          validateTrigger: ['onFinish'],
          validator: async (fields: string[]) => {
            if (!fields.every(field => Boolean(field))) {
              return Promise.reject('Missing option name');
            }
          },
        },
      ]}
    >
      <OptionsComponent max={max} min={min} />
    </Form.Item>
  );
};

export default Options;
