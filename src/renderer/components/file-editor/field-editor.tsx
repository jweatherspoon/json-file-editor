import { FieldSchema } from '../../../shared/models/file-info.interface';
import { EditorProps } from '../../models/editor-props';
import StringEditor from './editors/string-editor';

const FieldEditor = ({ schema, editorProps }: FieldEditorProps) => {
  if (schema.type === 'string') {
    return <StringEditor {...editorProps} />;
  }

  return null;
};

export interface FieldEditorProps {
  schema: FieldSchema;
  editorProps: EditorProps<any>;
}

export default FieldEditor;
