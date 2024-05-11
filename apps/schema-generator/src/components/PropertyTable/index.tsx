import { Checkbox, Table, TableProps } from 'antd';
import { useModel } from '@modern-js/runtime/model';
import Property from '@/domains/Property';
import { appModel } from '@/models';

type Props = {
  name: string;
  onChange: (name: string, value: boolean) => void;
};

const PropertyTable: React.FC<Props> = ({ name, onChange }) => {
  const [state] = useModel(appModel);
  const properties = state.structs[name];
  if (properties === undefined) {
    return null;
  }

  const columns: TableProps<Property>['columns'] = [
    {
      key: 'ignore',
      title: '忽略',
      render: (_, record) => {
        return (
          <Checkbox
            checked={record.ignore}
            onChange={evt => {
              const value = evt.target.checked;
              onChange(record.name, value);
            }}
          />
        );
      },
    },
    {
      key: 'name',
      title: '字段',
      dataIndex: 'name',
    },
    {
      key: 'types',
      title: '类型',
      render: (_, record: Property) => {
        const { name, types } = record;
        const spans: React.ReactNode[] = [];
        types.forEach((type, index) => {
          let color: string | undefined;
          if (type === 'object') {
            color = 'orange';
          } else if (
            type === 'number' ||
            type === 'string' ||
            type === 'boolean' ||
            type === 'null' ||
            type === 'undefined'
          ) {
            color = 'green';
          } else if (!state.contains(type)) {
            color = 'red';
          } else {
            color = 'blue';
          }
          if (index > 0) {
            spans.push(' | ');
          }
          spans.push(
            <span key={`${name}`} style={{ color }}>
              {type}
            </span>,
          );
        });
        return <div>{spans}</div>;
      },
    },
    {
      key: 'amount',
      title: '数量',
      dataIndex: 'amount',
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={properties}
      size={'small'}
      pagination={false}
    />
  );
};

export default PropertyTable;
