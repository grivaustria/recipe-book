import type { Procedure } from "../../../types/dish.type";

type ProcedureListProps = {
  procedure: Procedure[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  labelClass: string;
  inputClass: string;
  removeButtonClass: string;
  addButtonClass: string;
};

const ProcedureList = ({
  procedure,
  onChange,
  onAdd,
  onRemove,
  labelClass,
  inputClass,
  removeButtonClass,
  addButtonClass,
}: ProcedureListProps) => (
  <>
    <div className="hidden w-full grid-cols-[minmax(0,0.35fr)_minmax(0,2.8fr)_auto] gap-2 md:grid">
      <span className={labelClass}>Step</span>
      <span className={labelClass}>Procedure</span>
      <span className={labelClass}>Options</span>
    </div>

    {procedure.map((stepItem, index) => (
      <div
        key={index}
        className="grid w-full gap-2 md:grid-cols-[minmax(0,0.35fr)_minmax(0,2.8fr)_auto]"
      >
        <input className={inputClass} type="text" value={index + 1} readOnly />
        <input
          className={inputClass}
          type="text"
          placeholder="e.g. Marinate the chicken for 30 minutes"
          value={stepItem.step}
          onChange={(event) => onChange(index, event.target.value)}
          required={index === 0}
        />
        <div className="flex items-center gap-2">
          <button
            className={removeButtonClass}
            type="button"
            onClick={() => onRemove(index)}
          >
            &#10005;
          </button>

          {index === procedure.length - 1 && (
            <button className={addButtonClass} type="button" onClick={onAdd}>
              Add Item
            </button>
          )}
        </div>
      </div>
    ))}
  </>
);

export default ProcedureList;
