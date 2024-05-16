
import { TextAreaInputWrapperProps } from '@components/input/TextAreaInputWrapper';
import { LOADING_STATUSES } from '@const/loading-statuses';

export interface MentionsProps<T extends Record<string, unknown>> extends TextAreaInputWrapperProps {
  className?: string;
  children: React.ReactElement;

  suggestions: T[];
  renderSuggestionItem: (item: T) => React.ReactElement;

  suggestionsLoadingStatus: LOADING_STATUSES;
  refreshSuggestions: (query: string) => void;
}
