import { FieldSchema } from '../../../shared/models/file-info.interface';
import { EditorProps } from '../../models/editor-props';
import BooleanEditor from './editors/boolean-editor';
import DropdownEditor from './editors/dropdown-editor';
import StringEditor from './editors/string-editor';

const FieldEditor = ({ schema, editorProps }: FieldEditorProps) => {
  if (schema.type === 'string') {
    return <StringEditor {...editorProps} />;
  }

  if (schema.type === 'boolean') {
    return <BooleanEditor {...editorProps} />;
  }

  if (schema.type === 'enum') {
    return <DropdownEditor {...editorProps} />;
  }

  return null;
};

export interface FieldEditorProps {
  schema: FieldSchema;
  editorProps: EditorProps<any>;
}

export default FieldEditor;
