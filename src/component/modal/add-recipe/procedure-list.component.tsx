import type { Procedure } from "../../../types/dish.type";
import {
  ContentContainer,
  InputText,
  LabelText,
  OptionsContainer,
} from "../add-recipe/add-recipe.styles";

import { RemoveButton, AddItemButton } from "../../button/button.styled";

type ProcedureListProps = {
  procedure: Procedure[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
};

const ProcedureList = ({
  procedure,
  onChange,
  onAdd,
  onRemove,
}: ProcedureListProps) => {
  return (
    <>
      <ContentContainer>
        <LabelText>Procedure</LabelText>
        <LabelText></LabelText>
        <LabelText></LabelText>
      </ContentContainer>

      {procedure.map((stepItem, index) => (
        <ContentContainer key={index}>
          <InputText type="text" value={index + 1} readOnly />
          <InputText
            type="text"
            placeholder="e.g. Marinate the chicken for 30 minutes"
            value={stepItem.step}
            onChange={(event) => onChange(index, event.target.value)}
            required={index === 0}
          />
          <OptionsContainer>
            <RemoveButton type="button" onClick={() => onRemove(index)}>
              &#10005;
            </RemoveButton>

            {index === procedure.length - 1 && (
              <AddItemButton type="button" onClick={onAdd}>
                Add Item
              </AddItemButton>
            )}
          </OptionsContainer>
        </ContentContainer>
      ))}
    </>
  );
};

export default ProcedureList;
