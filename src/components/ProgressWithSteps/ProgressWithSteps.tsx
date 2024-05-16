import React, { CSSProperties } from 'react';
import styles from './ProgressWithSteps.module.less';
import { IconSuccess, IconDotsProgress } from '@icons/index';
import { Text } from '@components/Text';
import classNames from 'classnames';

type Step = {
  title: React.ReactNode
  subtitle?: React.ReactNode
}

export type ProgressWithStepsProps = {
  steps: Step[];
  currentStep: number;
  title?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

type StepItemProps = Step & {
  completed?: boolean
}

const StepItem: React.FC<StepItemProps> = ({ title, subtitle, completed }) => {
  return (
    <div
      className={classNames(styles.stepItem, {
        [styles.stepItemCompleted]: completed,
      })}
    >
      {completed
        ? <IconSuccess className={styles.stepItemIcon} />
        : <IconDotsProgress className={styles.stepItemIcon} />
      }
      <div className={styles.stepItemBody}>
        <Text className={styles.stepItemTitle} medium size="body1">{title}</Text>
        {completed && <Text className={styles.stepItemSubtitle}>{subtitle}</Text>}
      </div>
    </div>
  );
};

const ProgressWithSteps: React.FC<ProgressWithStepsProps> = ({
  title = 'Progress',
  steps = [],
  currentStep,
  ...props
}) => {
  const inProgressStepIndex = steps.findIndex((_, index) => index === currentStep - 1);
  const stepsToShow = steps.slice(0, inProgressStepIndex + 1);

  return (
    <div {...props}>
      <div className={styles.header}>
        <Text size="body1" medium className={styles.title}>{title}</Text>
        <Text size="body2" medium className={styles.stepNumber}>Step {currentStep} of {steps.length}</Text>
      </div>
      <div className={styles.stepsWrapper}>
        {stepsToShow.map((item, index) => (
          <StepItem key={index} {...item} completed={index !== inProgressStepIndex} />
        ))}
      </div>
    </div>
  );
};

export default ProgressWithSteps;
