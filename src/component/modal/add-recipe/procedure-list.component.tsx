import {
  BoldItalicUnderlineToggles,
  ListsToggle,
  MDXEditor,
  UndoRedo,
  markdownShortcutPlugin,
  listsPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";

type ProcedureListProps = {
  markdown: string;
  onChange: (markdown: string) => void;
  labelClass: string;
};

const ProcedureList = ({
  markdown,
  onChange,
  labelClass,
}: ProcedureListProps) => (
  <div className="flex flex-col gap-2">
    <span className={labelClass}>Procedure</span>
    <p className="text-sm text-stone-500">
      Enter one step per line. Numbering or bullets are optional.
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

export default ProcedureList;
