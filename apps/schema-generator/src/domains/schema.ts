export default interface Schema {
  name: string;
  types?: Set<string>;
  amount?: number;
  ignore?: boolean;
  properties?: Record<string, Schema>;
}
