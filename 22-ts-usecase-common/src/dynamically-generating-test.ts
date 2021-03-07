export function add(args: Array<number>) {
  return args.reduce((prev: number, curr: number) => prev + curr, 0);
}
