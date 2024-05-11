import {
  Flex,
  Button,
  Input,
  Collapse,
  CollapseProps,
  Table,
  TableProps,
} from 'antd';
import { useModel } from '@modern-js/runtime/model';
import { useState } from 'react';
import { appModel } from '@/models';
import Property from '@/domains/Property';
import PropertyTable from '@/components/PropertyTable';

import './index.scss';

type L10N = Record<string, Record<string, string>>;

const StudentPage = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [state, actions] = useModel(appModel);
  const [l10n, setL10N] = useState<L10N>({});

  async function generate() {
    let url = `https://schale.gg/data/cn/students.min.json`;

    const students: any[] = await fetch(url).then(resp => resp.json());
    console.info('获取学生列表：', students);
    setStudents(students);

    url = `https://schale.gg/data/cn/localization.min.json`;
    const l10n: L10N = await fetch(url).then(resp => resp.json());
    setL10N(l10n);

    const properties = generateProperties('Student', students);
    actions.addStruct('Student', properties);
  }

  function generateProperties(name: string, array: any[]): Property[] {
    const properties: Property[] = [];
    array.forEach(element => {
      Object.keys(element).forEach(key => {
        const ptKey = `${name}.${key}`;
        const value = element[key];
        const type: string = state.propertyTypes[ptKey] ?? typeof value;
        const property: Property = {
          name: key,
          types: [type],
          amount: 1,
          ignore: false,
        };
        const existsIndex = properties.findIndex(p => p.name === key);
        if (existsIndex !== -1) {
          const exists = properties[existsIndex];
          properties[existsIndex] = {
            name: key,
            types: [...exists.types, type],
            amount: exists.amount + property.amount,
            ignore: exists.ignore && property.ignore,
          };
        } else {
          properties.push(property);
        }
      });
    });
    properties.forEach(p => {
      const typeSet = new Set([...p.types]);
      if (p.amount < array.length) {
        typeSet.add('undefined');
      }
      p.types = [...typeSet];
    });
    return properties;
  }

  function generateEnum(key: string, enumName?: string) {
    const name = enumName ?? key;
    const values = new Set<string>();
    students.forEach(student => {
      const value = student[key];
      values.add(value);
    });
    actions.addEnum(name, [...values]);
  }

  function generateEquipmentType() {
    const equip1s = new Set<string>();
    const equip2s = new Set<string>();
    const equip3s = new Set<string>();

    students.forEach(student => {
      const equip1 = student.Equipment[0];
      const equip2 = student.Equipment[1];
      const equip3 = student.Equipment[2];
      equip1s.add(equip1);
      equip2s.add(equip2);
      equip3s.add(equip3);
    });

    actions.addEnum('EquipmentTypeSlot1', [...equip1s]);
    actions.addEnum('EquipmentTypeSlot2', [...equip2s]);
    actions.addEnum('EquipmentTypeSlot3', [...equip3s]);
  }

  const structs: CollapseProps['items'] = Object.keys(state.structs).map(
    key => ({
      key,
      label: key,
      children: (
        <PropertyTable
          name={key}
          onChange={(name, value) => actions.ignore(key, name, value)}
        />
      ),
    }),
  );

  const enums: CollapseProps['items'] = Object.keys(state.enums).map(key => {
    const values = state.enums[key].map(code => {
      const group = l10n[key];
      let description: string = code;
      if (group?.[code] !== undefined) {
        description = group[code];
      }
      return {
        code,
        description,
      };
    });
    const columns: TableProps['columns'] = [
      {
        key: 'code',
        title: '键',
        dataIndex: 'code',
      },
      {
        key: 'description',
        title: '说明',
        dataIndex: 'description',
      },
    ];

    return {
      key,
      label: key,
      children: (
        <Table
          key={key}
          columns={columns}
          dataSource={values}
          size="small"
          pagination={false}
        />
      ),
    };
  });

  return (
    <Flex className="student-generator" justify="center">
      <Flex className="left" flex={1} gap={8} vertical>
        <Flex className="buttons" gap={8}>
          <Button onClick={generate}>生成</Button>
          <Button>生成 Student</Button>
          <Button
            onClick={() => {
              generateEnum('School');
              generateEnum('SquadType');
              generateEnum('TacticRole');
              generateEnum('Position');
              generateEnum('BulletType');
              generateEnum('ArmorType');
              generateEnum('WeaponType');
              generateEquipmentType();
            }}
          >
            生成枚举
          </Button>
        </Flex>
        <Flex flex={1}>
          <Input.TextArea value={state.source} />
        </Flex>
      </Flex>
      <Flex className="middle" flex={1} gap={8} vertical>
        <div>结构：</div>
        <Collapse items={structs} size={'small'} />
      </Flex>
      <Flex className="right" flex={1} gap={8} vertical>
        <div>枚举 / 字面量类型：</div>
        <Collapse items={enums} size={'small'} />
      </Flex>
    </Flex>
  );
};

export default StudentPage;
