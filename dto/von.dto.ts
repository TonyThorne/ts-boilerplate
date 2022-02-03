/*
This is a CLASS and not an INTERFACE to allow tests to verify the structure.
If this was an INTERFACE then only the typescript transpiler would have access to this ability.
*/
export class VON {
  _metadata: any = null;
  patient: any = null;
  clinicalHistory: any = null;
  references: any = null;
}

export type json = any;
