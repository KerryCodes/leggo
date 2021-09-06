import { FormProps } from 'antd';
import React from 'react';
import { TPostSchemaModel, TSchema } from '../../../public/interface';
export declare function CreateSchemasModel(props: React.PropsWithoutRef<{
    formProps: FormProps;
    schemaList: TSchema[];
    onPostSchemaModel: TPostSchemaModel;
}>): JSX.Element;
