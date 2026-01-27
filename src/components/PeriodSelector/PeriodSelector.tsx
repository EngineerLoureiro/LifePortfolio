import {
  CustomPeriodSelector,
  PresetPeriodSelector,
  type PeriodSelectorState,
} from "loureiro-sreactcomponentlibrary";

type PeriodSelectorProps = {
  value: PeriodSelectorState;
  onChange: (next: PeriodSelectorState) => void;
};

export function PeriodSelector(props: PeriodSelectorProps) {
  const { value, onChange } = props;

  const presetPeriodSelectorValue =
    value.type === "preset" ? value.preset : undefined;

  const customPeriodSelectorDate =
    value.type === "custom" ? value.range : undefined;

  const isCustomPeriodSelectorOpen =
    value.type === "custom" ? value.open : false;
  return (
    <>
      <PresetPeriodSelector
        value={presetPeriodSelectorValue}
        onChange={(value) => {
          onChange({ type: "preset", preset: value });
        }}
      />
      <CustomPeriodSelector
        date={customPeriodSelectorDate}
        isOpen={isCustomPeriodSelectorOpen}
        toogleOpen={() => {
          if (value.type === "custom") {
            onChange({ ...value, open: !value.open });
          } else {
            onChange({ type: "custom", range: undefined, open: true });
          }
        }}
        onChange={(range) => {
          if (value.type === "custom") {
            onChange({ ...value, range });
          } else {
            // defensive fallback if custom emits while not in custom mode
            onChange({ type: "custom", range, open: true });
          }
        }}
      />
    </>
  );
}
