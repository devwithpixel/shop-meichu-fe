export default function Image(props?: React.ComponentProps<"img">) {
  return <img loading={props?.loading ?? "lazy"} {...props} />;
}
