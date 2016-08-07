export default function toSnakeCase(value) {
  return value.split(' ').join('_').toLowerCase();
}
