import { model } from '@modern-js/runtime/model';
import Property from '@/domains/Property';

type State = {
  structs: Record<string, Property[]>;
  enums: Record<string, string[]>;
  types: Record<string, string | any[]>;
  propertyTypes: Record<string, string>;
  ignoreProperties: Record<string, any>;
};

function generateInterface(name: string, properties?: Property[]): string {
  if (properties === undefined) {
    return '';
  }
  const lines: string[] = properties
    .filter(p => !p.ignore)
    .map(p => {
      const { name, types } = p;
      return `  ${name}: ${types.join(' | ')};`;
    });
  return `export interface ${name} {
${lines.join('\n')}
}`;
}

function generateEnum(name: string, values: string[]): string {
  const lines: string[] = values.map(value => `  ${value} = '${value}',`);
  return `export enum ${name} {
${lines.join('\n')}
}`;
}

function generateType(name: string, values: string | any[]): string {
  if (values instanceof Array) {
    const lines = values.map(value => {
      const type = typeof value;
      if (type === 'number' || type === 'boolean') {
        return `  | ${value}`;
      }
      return `  | "${value}"`;
    });
    return `export type ${name} =
${lines.join('\n')};`;
  }
  return `export type ${name} = ${values};`;
}

export const appModel = model<State>('student').define({
  state: {
    structs: {},
    enums: {},
    types: {
      Released: '[boolean, boolean, boolean]',
      StarGrade: [1, 2, 3],
      BattleAdaptation: [0, 1, 2, 3, 4, 5],
      Skills: 'Skill[]',
      EquipmentTypes:
        '[EquipmentTypeSlot1, EquipmentTypeSlot2, EquipmentTypeSlot3]',
      Skill: 'any',
      Weapon: 'any',
      Gear: 'any',
    },
    propertyTypes: {
      'Student.IsReleased': 'Released',
      'Student.School': 'School',
      'Student.StarGrade': 'StarGrade',
      'Student.SquadType': 'SquadType',
      'Student.TacticRole': 'TacticRole',
      'Student.Position': 'Position',
      'Student.BulletType': 'BulletType',
      'Student.ArmorType': 'ArmorType',
      'Student.StreetBattleAdaptation': 'BattleAdaptation',
      'Student.OutdoorBattleAdaptation': 'BattleAdaptation',
      'Student.IndoorBattleAdaptation': 'BattleAdaptation',
      'Student.WeaponType': 'WeaponType',
      'Student.Equipment': 'EquipmentTypes',
      'Student.Skills': 'Skills',
      'Student.Weapon': 'Weapon',
      'Student.Gear': 'Gear',
    },
    ignoreProperties: {
      'Student.CharHeightImperial': '有CharHeightMetric就行',
    },
  },
  computed: {
    Student: state => state.structs.Student,
    contains: state => {
      return (name: string) => {
        const keys = [];
        keys.push(...Object.keys(state.structs));
        keys.push(...Object.keys(state.enums));
        keys.push(...Object.keys(state.types));
        const keySet = new Set(keys);
        return keySet.has(name);
      };
    },
    source: state => {
      // const Released = `type Released = ${state.types.Released};`;
      const types = Object.keys(state.types).map(key => {
        return generateType(key, state.types[key]);
      });
      const enums = Object.keys(state.enums).map(key => {
        return generateEnum(key, state.enums[key]);
      });
      const Student = generateInterface('Student', state.structs.Student);
      return [...types, ...enums, Student].join('\n\n');
    },
  },
  actions: {
    addStruct: (state, name: string, properties: Property[]) => {
      state.structs[name] = properties;
    },

    addEnum: (state, name: string, values: string[]) => {
      state.enums[name] = values;
    },

    ignore: (state, struct: string, name: string, value: boolean) => {
      const property = state.structs[struct].find(p => p.name === name);
      if (property !== undefined) {
        property.ignore = value;
      }
    },
  },
});
