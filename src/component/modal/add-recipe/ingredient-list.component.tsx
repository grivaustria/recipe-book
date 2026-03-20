import {
  BoldItalicUnderlineToggles,
  ListsToggle,
  MDXEditor,
  UndoRedo,
  markdownShortcutPlugin,
  listsPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";

type IngredientListProps = {
  markdown: string;
  onChange: (markdown: string) => void;
  labelClass: string;
};

const IngredientList = ({
  markdown,
  onChange,
  labelClass,
}: IngredientListProps) => (
  <div className="flex flex-col gap-2">
    <span className={labelClass}>Ingredients</span>
    <p className="text-sm text-stone-500">
      Enter one ingredient per line. Bullets are optional. Use this format:{" "}
      <code className="rounded bg-stone-200 px-1 py-0.5">
        quantity | unit | ingredient
      </code>
    </p>
    <MDXEditor
      className="mdx-editor-root"
      contentEditableClassName="mdx-editor-content"
      markdown={markdown}
      onChange={onChange}
      plugins={[
        listsPlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <ListsToggle options={["bullet", "number"]} />
            </>
          ),
        }),
      ]}
    />
  </div>
);

export default IngredientList;
