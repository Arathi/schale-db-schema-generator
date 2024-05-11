import { Card, Checkbox, Table, TableProps } from 'antd';
import { CSSProperties } from 'react';
import Schema from '@/domains/schema';

type Props = {
  schema?: Schema;
  onIgnoreChange?: (name: string, ignore: boolean) => void;
  style?: CSSProperties;
};

const SchemaCard: React.FC<Props> = ({ schema, onIgnoreChange, style }) => {
  if (schema === undefined) {
    return null;
  }

  const { name, types = new Set(), properties = {} } = schema;

  let definition = name;
  if (types.size > 0) {
    definition += `: ${[...types].join(' | ')}`;
  }

  const columns: TableProps<Schema>['columns'] = [
    {
      key: 'ignore',
      title: '忽略',
      dataIndex: 'ignore',
      render: (value: boolean | undefined, record: Schema) => {
        const checked = value ?? false;
        return (
          <Checkbox
            checked={checked}
            onChange={event => {
              if (onIgnoreChange !== undefined) {
                const ignore = event.target.checked;
                onIgnoreChange(record.name, ignore);
              }
            }}
          />
        );
      },
    },
    {
      key: 'name',
      title: '属性',
      dataIndex: 'name',
    },
    {
      key: 'types',
      title: '类型',
      dataIndex: 'types',
      render: typeSet => {
        return [...typeSet].join(' | ');
      },
    },
    {
      key: 'amount',
      title: '出现次数',
      dataIndex: 'amount',
    },
  ];

  const dataSource: Schema[] = [];
  const keys = Object.keys(properties);
  keys.forEach(key => {
    const property = properties[key];
    dataSource.push(property);
  });

  return (
    <Card title={definition} style={style}>
      <Table
        columns={columns}
        dataSource={dataSource}
        size="small"
        pagination={false}
      />
    </Card>
  );
};

export default SchemaCard;
