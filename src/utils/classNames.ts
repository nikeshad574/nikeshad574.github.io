export default function cns(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
