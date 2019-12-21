export default function NumberWithSpaces(str) {
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
