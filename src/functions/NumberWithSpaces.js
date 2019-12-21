export default function NumberWithSpaces(string) {
  return string.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
