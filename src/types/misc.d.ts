type IStaticDataField = {
  id: string;
  field: string;
  value: string;
};

type IDynamicDataField = Pick<IStaticDataField, "id" | "field"> & {
  value: string;
};
